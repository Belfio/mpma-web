import type { UploadHandlerPart } from "@remix-run/node";
import s3 from "~/lib/s3";

export const s3UploaderHandler: <T extends UploadHandlerPart>(
  props: T,
  valueId: string,
  folder: string
) => Promise<string> = async (props, valueId, folder) => {
  const { filename, data, contentType } = props;

  // If it is not a file, I'll hadle it!
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

  // If it is a file, I'll upload it to S3
  const extension = filename.split(".").pop();
  const s3FileName = `${folder}/${valueId}.${extension}`;
  await s3.audio.upload(data, s3FileName, contentType);
  return s3FileName;
};

export const externalLinkUploader = async (
  datasetUrl: string,
  datasetId: string
) => {
  const url = new URL(datasetUrl as string);
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = blob.stream().getReader();
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      let result;
      while (!(result = await reader.read()).done) {
        yield result.value;
      }
    },
  };
  const s3FileName = `datasetFile-${datasetId}.zip`;
  const s3Url = await s3.datasets.upload(
    asyncIterable,
    s3FileName,
    "application/zip"
  );

  return s3Url;
};
