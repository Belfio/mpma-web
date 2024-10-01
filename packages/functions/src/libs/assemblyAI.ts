import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.AAI_TOKEN || "",
});

// Request parameters

const transcribe = async (fileUrl: string): Promise<string | null> => {
  const data = {
    audio: fileUrl,
  };
  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.text);
  return transcript.text || null;
};

const aai = {
  transcribe,
};
export default aai;
