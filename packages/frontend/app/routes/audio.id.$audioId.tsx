import { authenticator } from "~/services/auth.server";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AudioType, ReportType, TemplateType, UserType } from "~/lib/types";
import db from "~/lib/db";
import s3, { readableToFile } from "~/lib/s3";
import { Combobox } from "~/components/ui/combobox";

export default function UploadAudio() {
  const { user, audio, transcript, reports, templates } = useLoaderData<{
    user: UserType;
    audio: AudioType;
    transcript: string;
    reports: ReportType[];
    templates: TemplateType[];
  }>();
  if (!audio) return <div>Error</div>;
  return (
    <div className="flex h-screen mt-12 justify-center">
      <div className="flex flex-col gap-4 max-w-[540px] mx-auto">
        <div className="max-w-4xl mx-auto px-8">
          <Form method="post">
            <Input
              placeholder="Audio recording title"
              name="title"
              defaultValue={audio.title}
            />
            <Input
              placeholder="Audio recording description"
              name="description"
              defaultValue={audio.description}
            />
            <p>Created at: {audio.createdAt}</p>

            <input type="hidden" name="userId" value={user.userId} />
            <input type="hidden" name="audioId" value={audio.audioId} />

            <Button type="submit">Save</Button>
            <p>{transcript && JSON.stringify(transcript)}</p>
          </Form>
          {reports &&
            reports.map((report) => (
              <div key={report.reportId}>
                <p>{report.title}</p>
                <p>{report.report}</p>
              </div>
            ))}
          {templates && (
            <Form action={`/api/report/ai`} method="post">
              <Combobox
                input={templates.map((template) => ({
                  value: template.templateId,
                  label: template.title,
                }))}
              />
              <input type="hidden" name="userId" value={user.userId} />
              <input type="hidden" name="audioId" value={audio.audioId} />
              <Button type="submit">Create report</Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) return redirect("/login");
  const { audioId } = params;
  console.log("audioId", audioId);
  if (!audioId) return { user, audio: "Error" };
  const audio = await db.audio.get(audioId);
  const transcriptReadable = await s3.audio.getStream(
    audio?.fileName.split(".")[0] + ".json"
  );
  const transcript = await readableToFile(
    transcriptReadable,
    "transcript.json"
  );
  console.log("transcript", await transcript.text());
  console.log("authed", audio?.fileName.split(".")[0] + ".json");
  const reports = await db.report.getAll(user.userId);
  const templates = await db.template.getAll(user.userId);
  return json({
    user,
    audio,
    transcript: await transcript.text(),
    reports,
    templates,
  });
}
