import { z } from "zod";
import openai from "~/lib/openai";
import OpenAI from "openai";

export const idCardDataExtraction = async (imageUrl: string) => {
  const idDeets = z.object({
    name: z.string(),
    surname: z.string(),
    idNumber: z.number(),
    dob: z.string(),
    gender: z.string(),
    nationality: z.string(),
    expiryDate: z.string(),
  });

  const answer = await openai.imageChat(
    "You are an image inspector and you read text from images",
    "Give me the name, surname and id number from the id card",
    imageUrl,
    idDeets
  );
  if (!answer.message.content) {
    return "error";
  }
  return JSON.parse(answer.message.content);
};

// export const uploadAndParse = async (request: Request) => {
//   const formData = await request.formData();
//   const file = formData.get("file") as File;
//   //   const url = await uploadFileToS3(file);
//   return idCardDataExtraction(url);
// };

export const pdfDataExtraction = async (
  file: File,
  prompt: string,
  tools: OpenAI.Beta.Assistants.AssistantTool[] = [{ type: "file_search" }]
) => {
  const assistant = await openai.createAssistant(
    "Information Extraction Assistant",
    "Read the document thoroughly and extract the information I am oing to ask you",
    tools
  );
  console.log(assistant);

  const fileId = await openai.uploadFile(file);

  const thread = await openai.createThread();

  await openai.addMessageToThread(thread.id, prompt, fileId);
  console.log(thread);
  const run = await openai.runAssistant(thread.id, assistant.id);
  const messages = await openai.runPollingOneMinute(thread.id, run.id);
  console.log(messages);
};

export const idCardFunction: OpenAI.Beta.Assistants.AssistantTool = {
  type: "function",
  function: {
    name: "idCardFunction",
    description: "Extracts the name, surname and id number from an id card",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The name of the person",
        },
        surname: {
          type: "string",
          description: "The surname of the person",
        },
        idNumber: {
          type: "string",
          description: "The id number of the person",
        },
      },
      required: ["name", "surname", "idNumber"],
    },
  },
};

export const titleFunction: OpenAI.Beta.Assistants.AssistantTool = {
  type: "function",
  function: {
    name: "titleFunction",
    description: "Extracts the title from a title document",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the document",
        },
      },
      required: ["title"],
    },
  },
};
