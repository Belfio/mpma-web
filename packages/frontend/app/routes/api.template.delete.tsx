import { ActionFunctionArgs, redirect } from "@remix-run/node";
import db from "~/lib/db";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) return redirect("/login");
  const formData = await request.formData();
  const templateId = formData.get("templateId") as string;
  await db.template.delete(templateId);

  return redirect("/template");
};
