import { ActionFunctionArgs, redirect } from "@remix-run/node";
import db from "~/lib/db";
import { randomId } from "~/lib/utils";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) return redirect("/login");
  const formData = await request.formData();
  const template = formData.get("template") as string;
  const title = formData.get("title") as string;
  await db.template.create({
    userId: user.userId,
    templateId: randomId(),
    title,
    template,
    createdAt: new Date().toISOString(),
  });

  return redirect("/template");
};
