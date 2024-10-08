import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
    <div className="flex items-center  w-2/3 m-auto mt-12 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold text-center">
              From audio to report
            </h1>
            <p className="text-lg text-center mt-4 font-light">
              Upload a conversation or record it with our app. Our AI system
              will transcribe the audio and use it to complete your report. Stop
              wasting time on repetitive tasks, and let the AI automate the note
              taking, and revision of your reports.
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link to="/audio" className="mt-8">
            <Button>Get started</Button>
          </Link>
        </CardContent>
      </Card>
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
