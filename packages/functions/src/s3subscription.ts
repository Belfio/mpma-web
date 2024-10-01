import { S3Event } from "aws-lambda";
import { runTranscription } from "./transcribing";
import s3 from "./libs/s3";

export const index = async (event: S3Event) => {
  console.log("S3 subscription triggered", event);

  // if ObjectCreated:Put event, then trigger transcribing
  console.log(
    "Event name check - ObjectCreated:Put : ",
    event.Records[0].eventName
  );
  if (event.Records[0].eventName !== "ObjectCreated:Put") {
    return;
  }
  console.log("File format check - .m4a: ", event.Records[0].s3.object.key);
  if (!event.Records[0].s3.object.key.endsWith(".m4a")) {
    return;
  }
  console.log("transcribing...");
  const key = event.Records[0].s3.object.key;
  const transcript = await runTranscription(key);

  console.log("transcript: ", transcript);
  const file = JSON.stringify(transcript);
  const jsonKey = key.replace(".m4a", ".json");
  await s3.uploads.put(jsonKey, file);

  return {
    statusCode: 200,
    body: "ok",
  };
};
