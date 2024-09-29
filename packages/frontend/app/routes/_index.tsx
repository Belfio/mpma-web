import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center w-2/3 m-auto">
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

        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          qui una lista di cose
        </nav>
      </div>
    </div>
  );
}
