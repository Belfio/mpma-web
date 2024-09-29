import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-2/3 w-2/4 m-auto">
        <Link to="/reports">
          <Button variant="ghost">
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
        </Link>
        <Textarea
          placeholder={`Copy and paste here a report you want to adopt. Replace all the short pieces of data with [*] and the long text with [***]. 
For example, something like: 


Our new client [*] expressed an interest in [***].
List of requests:
- [*]
- [*]
- [*]
[***]


`}
          className="w-full resize-none h-full border-0 text-xl my-12"
          autoFocus
        />
        <Button>Save</Button>
      </div>
    </div>
  );
}
