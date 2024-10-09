import openai from "~/lib/openai";

export const transcriptToReport = async (
  transcript: string,
  report: string
): Promise<{ title: string; summary: string }> => {
  const prompt = `
    You are an expert in AI and you are given a transcript of a meeting and a report.
    You need to create a report based on the transcript.
    The report is a json with the following structure:
    {
        "title": "Title of the report",
        "summary": "Summary of the report",
    }
    `;
  const text = `
    The transcript is: ${transcript}
    The report is: ${report}
    `;
  const response = await openai.textChat(prompt, text);
  console.log("response", response);
  try {
    return JSON.parse(response as string);
  } catch (error) {
    console.error(error);
    return { title: "", summary: "" };
  }
};
