import { Upload, AlertCircle } from "lucide-react";

import { cn } from "~/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export default function UploadForm({
  className,
  setFiles,
}: {
  className?: string;
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}) {
  const addFile = (file: File) => {
    setFiles((prevFiles: FileList | null) => {
      const dataTransfer = new DataTransfer();
      if (prevFiles) {
        Array.from(prevFiles).forEach((f) => dataTransfer.items.add(f));
      }
      dataTransfer.items.add(file);
      return dataTransfer.files;
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleInput", e.target.files);
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => addFile(file));
    }
  };
  return (
    <div className={cn("max-w-4xl mx-auto", className)}>
      <div className=" rounded  mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center relative">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop your model files here, or click to select files
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => handleInput(e)}
            title="Upload your model files"
            className="absolute w-full h-full custom-file-input opacity-0"
            name="notebookFile"
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Select Files
          </button>
        </div>
        <Alert className=" mx-auto mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Supported Formats</AlertTitle>
          <AlertDescription>
            We accept various file types including .py, .pkl, .h5, .pt, .onnx,
            .json, .yaml, and more. Total upload size limit: 5GB
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
