import UploadForm from "~/components/UploadForm";
import { useState } from "react";

export default function UploadAudio() {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-4 max-w-[540px] mx-auto">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="mt-4 mb-2 text-xl font-bold">
            Step 1: Select a Dataset
          </h2>
          <UploadForm files={files} setFiles={setFiles} className="mt-3" />
        </div>
      </div>
    </div>
  );
}
