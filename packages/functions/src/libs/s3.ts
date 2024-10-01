import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"; // ES Modules import
import { Resource } from "sst";
// const { S3Client, ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import
const client = new S3Client({ region: "us-east-1" });

// list the files inside a bucket
async function listFiles(bucketName: string) {
  const input = {
    // ListObjectsRequest
    Bucket: bucketName, // required
    // Delimiter: "STRING_VALUE",
    // EncodingType: "url",
    // Marker: "STRING_VALUE",
    // MaxKeys: Number("int"),
    // Prefix: "STRING_VALUE",
    // RequestPayer: "requester",
    // ExpectedBucketOwner: "STRING_VALUE",
    // OptionalObjectAttributes: [ // OptionalObjectAttributesList
    //   "RestoreStatus",
    // ],
  };

  const command = new ListObjectsCommand(input);
  const response = await client.send(command);

  return response;
}

async function getFile(bucketName: string, key: string) {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const response = await client.send(command);
  return response;
}

async function putFile(bucketName: string, key: string, file: string) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
  });
  const response = await client.send(command);
  return response;
}

const s3 = {
  uploads: {
    list: () => listFiles(Resource.AudioUploadBucket.name),
    get: (key: string) => getFile(Resource.AudioUploadBucket.name, key),
    put: (key: string, file: string) =>
      putFile(Resource.AudioUploadBucket.name, key, file),
    bucketName: Resource.AudioUploadBucket.name,
  },
};

export default s3;
