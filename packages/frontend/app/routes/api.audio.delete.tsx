import { ActionFunctionArgs, redirect } from "@remix-run/node";
import db from "~/lib/db";
import s3 from "~/lib/s3";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) return redirect("/login");
  const formData = await request.formData();
  const audioId = formData.get("audioId") as string;
  const fileName = formData.get("fileName") as string;
  await db.audio.delete(audioId);
  await s3.audio.delete(fileName);
  const jsonFilename = fileName.split(".")[0] + ".json";
  await s3.audio.delete(jsonFilename);
  return redirect("/audio");
};
