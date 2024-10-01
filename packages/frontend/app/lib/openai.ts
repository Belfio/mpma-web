import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG,
  project: process.env.OPENAI_PROJECT,
  apiKey: process.env.OPENAI_API_KEY,
});

const audioTranscription = async (audioStream: File) =>
  await openai.audio.transcriptions.create({
    file: audioStream,
    model: "whisper-1",
    response_format: "verbose_json",
    timestamp_granularities: ["segment"],
  });

const audioTranslation = async (audioStream: File) =>
  await openai.audio.translations.create({
    file: audioStream,
    model: "whisper-1",
  });

const audioCreateSpeech = async (
  text: string,
  filePath: string
): Promise<{ speechFile: string; path: string; text: string }> => {
  const speechFile = path.resolve(filePath);

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  return {
    speechFile,
    path: speechFile,
    text: text,
  };
};

const textChat = async (instruction: string, text: string, name?: string) =>
  await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${instruction}. ${name ? "Call me " + name : ""}`,
      },
      { role: "user", content: text },
    ],
    model: "gpt-4o",
  });

const imageChat = async (
  instruction: string,
  text: string,
  imageUrl: string
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: instruction,
      },
      {
        role: "user",
        content: [
          { type: "text", text: text },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0];
};

const getFunctionParams = async (
  textToParse: string,
  functionInstruction: string,
  functionName: string,
  params: {
    paramKey: string;
    paramType: string;
    paramDescription: string;
    paramEnum?: string[];
    isRequired: boolean;
  }[]
) => {
  const messages: ChatCompletionMessageParam[] = [
    { role: "user", content: textToParse },
  ];
  const tools = [
    {
      type: "function",
      function: {
        name: functionName,
        description: functionInstruction,
        parameters: {
          type: "object",
          properties: params.reduce((acc, param) => {
            acc[param.paramKey] = {
              type: param.paramType,
              description: param.paramDescription,
              enum: param.paramEnum,
            };
            return acc;
          }, {}),
          required: params
            .filter((param) => param.isRequired)
            .map((param) => param.paramKey),
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    tools: tools.map((tool) => ({
      ...tool,
      type: "function", // Ensure type is explicitly "function"
    })),
    tool_choice: "auto",
  });

  console.log(response);
};

const createAssistant = async (
  name: string,
  instruction: string,
  tools: OpenAI.Beta.Assistants.AssistantTool[]
) => {
  const assistant = await openai.beta.assistants.create({
    name,
    instructions: instruction,
    tools: tools,
    model: "gpt-4o",
  });

  return assistant;
};

const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

const addMessageToThread = async (threadId: string, message: string) => {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
};

const runAssistant = async (threadId: string, assistantId: string) => {
  const run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
  });
  return run;
};

const oai = {
  audioTranscription,
  audioTranslation,
  audioCreateSpeech,
  textChat,
  imageChat,
  getFunctionParams,
  createAssistant,
  createThread,
  addMessageToThread,
  runAssistant,
};

export default oai;
