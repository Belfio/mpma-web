import { APIGatewayProxyEventV2 } from "aws-lambda";
import { Resource } from "sst";
// import s3 from "../libs/s3";
// import oai from "../libs/openai";
import aai from "../libs/assemblyAI";
// import { s3FileToFile } from "../libs/util";

export async function handler(event: APIGatewayProxyEventV2) {
  const keyParam = event.queryStringParameters?.keyUrl;

  if (!keyParam) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No keyUrl provided" }),
    };
  }
  let transcript;
  try {
    transcript = await runTranscription(keyParam);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(transcript),
  };
}

export const runTranscription = async (keyParam: string) => {
  const bucketName = Resource.AudioUploadBucket.name;

  const fileUrl = `https://${bucketName}.s3.amazonaws.com/${keyParam}`;

  console.log("fileUrl: ", fileUrl);
  const timeNow = new Date();
  const transcript = await aai.transcribe(fileUrl);
  console.log("transcript: ", transcript);
  console.log("time is: ", new Date().toISOString());
  const timeElapsed = (new Date().getTime() - timeNow.getTime()) / 1000;
  console.log("timeElapsed (in seconds): ", timeElapsed);
  // const audioFromS3 = await s3.uploads.get(keyParam);
  // const audioFile = await s3FileToFile(audioFromS3, keyParam);
  // const transcriptOAI = await oai.audioTranscription(audioFile);
  // console.log("transcript: ", transcriptOAI);
  // console.log("time is: ", new Date().toISOString());
  // const secondTimeElapsed = (new Date().getTime() - timeNow.getTime()) / 1000;
  // console.log("secondTimeElapsed (in seconds): ", secondTimeElapsed);
  return transcript;
};
