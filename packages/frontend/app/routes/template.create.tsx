import type { MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);
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
            ref={inputRef}
            className="w-full resize-none h-fit border-0 text-xl my-12 shadow-none focus-visible:ring-0"
          />
          <Textarea
            placeholder={`Copy and paste here a report/document/email you want our AI to adopt and customise. Feel free to maintain real names or replace customisable content with [*] for a small piece of text and [***] for long pieces of text. 


`}
            className="w-full resize-none h-full border-0 text-xl my-12 shadow-none"
            name="template"
          />
          <div className="flex justify-end">
            <Button type="submit" className="" variant="secondary">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
