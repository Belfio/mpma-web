import UploadForm from "~/components/UploadForm";
import { useState } from "react";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export default function UploadAudio() {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="flex h-screen mt-12 justify-center">
      <div className="flex flex-col gap-4 max-w-[540px] mx-auto">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="mt-4 mb-2 text-xl font-bold">
            Upload your audio recording
          </h2>
          <UploadForm files={files} setFiles={setFiles} className="mt-3" />
        </div>
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
