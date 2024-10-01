import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, json, Link, redirect, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";
import { AudioType } from "~/lib/types";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const audios = useLoaderData<AudioType[]>();
  return (
    <div className="flex flex-col h-full mt-12 justify-center">
      <div className="flex flex-col gap-4 justify-center text-center">
        {audios &&
          audios.map((audio) => (
            <div
              key={audio.audioId}
              className="flex gap-4 justify-center items-center"
            >
              <Link to={`/audio/id/${audio.audioId}`}>
                <Button key={audio.audioId} variant="link" className="">
                  {audio.title}
                </Button>
              </Link>
              <Form method="post" action="/api/audio/delete">
                <input type="hidden" name="audioId" value={audio.audioId} />
                <input type="hidden" name="fileName" value={audio.fileName} />
                <Button variant="outline">Delete</Button>
              </Form>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/audio/upload">
          <Button variant="outline">Upload</Button>
        </Link>
      </div>
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  if (!user) {
    return redirect("/login");
  }
  const audio = await db.audio.getAll(user.userId);
  console.log("audio", audio);
  return json(audio);
};
