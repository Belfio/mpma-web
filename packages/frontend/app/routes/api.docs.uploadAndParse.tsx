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

export const pdfDataExtraction = openai.pdfDataExtraction;

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
