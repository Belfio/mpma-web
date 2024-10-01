import { useState } from "react";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { AudioType, UserType } from "~/lib/types";
import db from "~/lib/db";

export default function UploadAudio() {
  const { user, audio } = useLoaderData<{ user: UserType; audio: AudioType }>();
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
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const { audioId } = params;
  console.log("audioId", audioId);
  if (!audioId) return { user, audio: "Error" };
  const audio = await db.audio.get(audioId);
  console.log("authed");
  return { user, audio };
}
