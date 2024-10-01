import { Readable } from "stream";
import { sdkStreamMixin } from "@aws-sdk/util-stream-node";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";

export const s3FileToFile = async (
  s3File: GetObjectCommandOutput,
  keyParam: string
): Promise<File> => {
  const sdkStream = sdkStreamMixin(s3File.Body as Readable);
  const buffer = await streamToBuffer(sdkStream);
  const blob = new Blob([buffer], { type: s3File.ContentType });
  const file = new File([blob], keyParam, { type: s3File.ContentType });
  return file;
};

export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};
