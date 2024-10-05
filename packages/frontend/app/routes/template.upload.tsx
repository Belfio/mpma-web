import {
  unstable_parseMultipartFormData,
  UploadHandlerPart,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import openai from "~/lib/openai";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-2/3 w-2/4 m-auto">
        <Form method="post" encType="multipart/form-data">
          <Input type="file" name="template" />
          <Button type="submit" className="" variant="secondary">
            Upload
          </Button>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploaderHandlerGetFile
  );
  const file = formData.get("template") as File;

  console.log(file.name);

  const data = await openai.pdfDataExtraction(
    file,
    "Who is the main character of the story?"
  );
  const value = await openai.textChat(
    data,
    "What is the name? Just text me the name",
    "",
    z.object({
      name: z.string(),
    })
  );
  console.log(value);
  return json({ success: true });
}

export const uploaderHandlerGetFile: <T extends UploadHandlerPart>(
  props: T
) => Promise<string | File> = async (props) => {
  const { filename, data, contentType } = props;

  // If it is not a file, I'll handle it!
  if (!filename || !data || !contentType) {
    // Collect all chunks of data
    const chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }

    // Combine all chunks into a single Buffer
    const buffer = Buffer.concat(chunks);

    // Convert buffer to string
    const bufferString = buffer.toString();
    // console.log("bufferString", bufferString);

    return bufferString;
  }
  const blobPart = await convertToBlobPart(data);

  const file = new File([blobPart], filename, { type: contentType });

  return file;
};

async function convertToBlobPart(
  asyncIterable: AsyncIterable<Uint8Array>
): Promise<BlobPart> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of asyncIterable) {
    chunks.push(chunk);
  }
  return new Blob(chunks);
}
