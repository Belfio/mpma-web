import {
  ActionFunctionArgs,
  UploadHandler,
  UploadHandlerPart,
  unstable_parseMultipartFormData,
  json,
  redirect,
} from "@remix-run/node";
import db from "~/lib/db";
import { randomId } from "~/lib/utils";
import { s3UploaderHandler } from "~/services/upload.server";

// TODO:
// this https://andrekoenig.de/articles/progressively-enhanced-file-uploads-remix
// and  https://github.com/paalamugan/optimizing-large-file-upload-performance/blob/main/app/utils/uploadFile.ts

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("add file");
  const modelId = randomId();
  const folder = "models";
  const s3uploaderWithId: UploadHandler = (props: UploadHandlerPart) =>
    s3UploaderHandler(props, modelId, folder);

  const formData = await unstable_parseMultipartFormData(
    request,
    s3uploaderWithId
  );

  return redirect("/models");
};

const getFilesSize = (modelId: string) => {
  // const files = db.file.findMany({
  //   where: {
  //     modelId: modelId,
  //   },
  // });
  // return files.reduce((acc, file) => acc + file.size, 0);
  console.log("getFilesSize TBD", modelId[0]);
  return "n/a";
};
