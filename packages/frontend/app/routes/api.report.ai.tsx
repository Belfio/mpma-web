import { ActionFunctionArgs, redirect } from "@remix-run/node";
import db from "~/lib/db";
import s3 from "~/lib/s3";
import { ReportType } from "~/lib/types";
import { randomId } from "~/lib/utils";
import { authenticator } from "~/services/auth.server";
import { transcriptToReport } from "~/services/reporting.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) return redirect("/login");
  const formData = await request.formData();
  const templateId = formData.get("comboValue") as string;
  const audioId = formData.get("audioId") as string;
  const audio = await db.audio.get(audioId);
  console.log(templateId, audioId, formData);
  const reportTemplate = await db.template.get(templateId);
  if (!reportTemplate) return redirect("/reports");
  const transcriptFileName = `${audio?.fileName?.split(".")[0]}.json`;
  console.log("transcriptFileName", transcriptFileName);
  const transcriptBuffer = await s3.audio.get(transcriptFileName);
  const transcript = transcriptBuffer.toString();
  console.log("transcript", transcript);
  const reportResult = await transcriptToReport(
    transcript,
    reportTemplate.template
  );
  console.log("reportResult", reportResult);
  if (!reportResult.title || !reportResult.summary) {
    throw new Error("No title or summary");
  }
  const report: ReportType = {
    userId: user.userId,
    reportId: randomId(),
    audioId,
    title: reportResult.title,
    report: reportResult.summary,
    templateId,
    createdAt: new Date().toISOString(),
  };
  await db.report.create(report);
  console.log("transcript", transcript);
  console.log("report", report);
  return redirect(`/audio/id/${audioId}`);
};
