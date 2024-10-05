import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, redirect, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";
import { TemplateType } from "~/lib/types";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const templates = useLoaderData<TemplateType[]>();
  return (
    <div className="flex flex-col gap-4 mt-12 items-center justify-center">
      {templates?.length !== 0 ? (
        templates.map((template: TemplateType) => (
          <div key={template.templateId} className="flex ">
            <Link to={`/template/id/${template.templateId}`}>
              <Button variant="link">{template.title}</Button>
            </Link>
            <Form
              action={`/template/id/${template.templateId}/delete`}
              method="post"
            >
              <input
                type="hidden"
                name="templateId"
                value={template.templateId}
              />
              <Button variant="outline">Delete</Button>
            </Form>
          </div>
        ))
      ) : (
        <p>No templates yet</p>
      )}
      <Link to="/template/create">
        <Button variant="outline">Create a new report template</Button>
      </Link>
      <Link to="/template/upload">
        <Button variant="outline">Upload a template</Button>
      </Link>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) {
    return redirect("/login");
  }
  const templates = await db.template.getAll(user.userId);
  return json(templates);
}
