import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { UserContext } from "~/providers/userContext";
import { authenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
  return (
    <div className="flex items-center  w-2/3 m-auto mt-12">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="text-4xl font-bold">From audio to report</h1>
          <p className="text-xl text-center">
            Upload a conversation or record it with our app. Our AI system will
            transcribe the audio and use it to complete your report. Stop
            wasting time on repetitive tasks, and let the AI automate the note
            taking, and revision of your reports.
          </p>
        </header>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  console.log("authed");
  return { user };
}
