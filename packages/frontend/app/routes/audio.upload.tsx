// import UploadForm from "~/components/UploadForm";
// import { useState } from "react";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { UserType } from "~/lib/types";

export default function UploadAudio() {
  // const [files, setFiles] = useState<FileList | null>(null);
  // const fetcher = useFetcher();
  const { user } = useLoaderData<{ user: UserType }>();
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   console.log("handleSubmit");
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget as HTMLFormElement);
  //   if (!files) return;
  //   Array.from(files).map((file) => formData.append(file.name, file));
  //   console.log("sending files?", files.length);
  //   await fetcher.submit(formData, {
  //     method: "post",
  //     encType: "multipart/form-data",
  //     action: "/api/audio/add",
  //   });
  // };

  if (!user) return;
  return (
    <div className="flex h-screen mt-12 justify-center">
      <div className="flex flex-col gap-4 max-w-[540px] mx-auto">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="mt-4 mb-2 text-xl font-bold">
            Upload your audio recording
          </h2>
          <Form
            method="post"
            // onSubmit={handleSubmit}
            encType="multipart/form-data"
            action="/api/audio/add"
          >
            <input type="hidden" name="userId" value={user.userId} />

            <Input type="file" name="file" accept=".m4a" />
            <Button type="submit">Upload</Button>
            {/* <UploadForm files={files} setFiles={setFiles} className="mt-3" /> */}
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  console.log("authed", user);
  return { user };
}
