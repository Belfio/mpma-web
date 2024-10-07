import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

import { Button } from "~/components/ui/button";

import { useState, useRef } from "react";

export default function RecordAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // New state for audio URL
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for audio element

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayAudio = () => {
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      }
      if (audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current = null; // Clear the ref to allow replay
    }
  };

  return (
    <div className="flex h-screen mt-12 justify-center">
      <Button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioUrl && (
        <>
          <Button onClick={handlePlayAudio}>Play Recorded Audio</Button>
          <Button onClick={handleStopAudio}>Stop Audio</Button>
        </>
      )}
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  console.log("authed", user);
  return { user };
}
