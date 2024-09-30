import { userTable, credTable, audioTable } from "./database";
import { audioUploadBucket } from "./storage";

export const site = new sst.aws.Remix("MPMA-Web", {
  path: "./packages/frontend",
  link: [userTable, credTable, audioUploadBucket, audioTable],
  environment: {
    OPENAI_ORG: process.env.OPENAI_ORG,
    OPENAI_PROJECT: process.env.OPENAI_PROJECT,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AAI_TOKEN: process.env.AAI_TOKEN,
  },
  // domain:
  //   $app.stage === "prod"
  //     ? {
  //         name: "biomeddb.com",
  //         dns: sst.cloudflare.dns(),
  //       }
  //     : undefined,
});
