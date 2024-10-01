// import { audioUploadSubscriber } from "./functions";

export const audioUploadBucket = new sst.aws.Bucket("AudioUploadBucket");
audioUploadBucket.subscribe({
  handler: "packages/functions/src/s3subscription.index",
  link: [audioUploadBucket],
  environment: {
    OPENAI_ORG: process.env.OPENAI_ORG,
    OPENAI_PROJECT: process.env.OPENAI_PROJECT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AAI_TOKEN: process.env.AAI_TOKEN,
  },
});
