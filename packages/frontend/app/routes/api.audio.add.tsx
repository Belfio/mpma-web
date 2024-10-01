import {
  ActionFunctionArgs,
  UploadHandler,
  UploadHandlerPart,
  unstable_parseMultipartFormData,
  redirect,
} from "@remix-run/node";
import db from "~/lib/db";
import { AudioType } from "~/lib/types";
import { randomId } from "~/lib/utils";
import { authenticator } from "~/services/auth.server";
import { s3UploaderHandler } from "~/services/upload.server";

// TODO:
// this https://andrekoenig.de/articles/progressively-enhanced-file-uploads-remix
// and  https://github.com/paalamugan/optimizing-large-file-upload-performance/blob/main/app/utils/uploadFile.ts

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  console.log("add file");
  const modelId = randomId();
  const folder = user?.userId || "na";
  const s3uploaderWithId: UploadHandler = (props: UploadHandlerPart) =>
    s3UploaderHandler(props, modelId, folder);

  const formData = await unstable_parseMultipartFormData(
    request,
    s3uploaderWithId
  );
  console.log("formData", formData);
  const audioProfile: AudioType = {
    audioId: modelId,
    fileName: formData.get("file") as string,
    userId: formData.get("userId") as string,
    title: modelId,
    createdAt: new Date().toISOString(),
  };

  await db.audio.create({
    ...audioProfile,
  });

  return redirect(`/audio`);
};

// const getFilesSize = (modelId: string) => {
//   // const files = db.file.findMany({
//   //   where: {
//   //     modelId: modelId,
//   //   },
//   // });
//   // return files.reduce((acc, file) => acc + file.size, 0);
//   console.log("getFilesSize TBD", modelId[0]);
//   return "n/a";
// };
