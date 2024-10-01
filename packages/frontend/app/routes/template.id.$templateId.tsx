import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, useLoaderData } from "@remix-run/react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
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
  const template = useLoaderData<TemplateType>();
  if (!template) return <div>Template not found</div>;
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-2/3 w-2/4 m-auto">
        <Link to="/template">
          <Button variant="ghost">
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
        </Link>
        <Form
          action="/api/template/create"
          method="post"
          className="h-2/3 w-full m-auto"
        >
          <Input
            name="title"
            placeholder="Title"
            defaultValue={template.title}
            className="w-full resize-none h-fit border-0 text-xl my-12 shadow-none focus-visible:ring-0"
          />
          <Textarea
            placeholder={`Copy and paste here a report/document/email you want our AI to adopt and customise. Feel free to maintain real names or replace customisable content with [*] for a small piece of text and [***] for long pieces of text. 


`}
            defaultValue={template.template}
            className="w-full resize-none h-full border-0 text-xl my-12 shadow-none"
            name="template"
          />
          <div className="flex justify-end">
            <Button type="submit" className="" variant="secondary">
              Change
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const { templateId } = params;
  console.log("templateId", templateId);
  if (!templateId) return { user, report: "Error" };
  const report = await db.template.get(templateId);

  return json(report);
}
