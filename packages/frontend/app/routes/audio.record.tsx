import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

import { Button } from "~/components/ui/button";

import { useState, useRef, useEffect } from "react";
import localforage from "localforage";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";

export default function RecordAudio() {
  const { user } = useLoaderData<typeof loader>();
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // New state for audio URL
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for audio element
  const fetcher = useFetcher();
  const navigate = useNavigate();
  useEffect(() => {
    localforage
      .getItem<Blob>("audioBlob")
      .then((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        }
      })
      .catch((error) => {
        console.error("Error retrieving audio Blob from storage:", error);
      });
  }, []);

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
        localforage.setItem("audioBlob", audioBlob).catch((error) => {
          console.error("Error saving audio Blob to storage:", error);
        });
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
      console.log("stopping recording");
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePlayAudio = async () => {
    if (audioUrl) {
      const blobAudio = await localforage.getItem<Blob>("audioBlob");
      if (blobAudio) {
        audioRef.current = new Audio(URL.createObjectURL(blobAudio));
      }
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      }
      if (audioRef.current.paused) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
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

  const handleSaveAudio = async () => {
    if (audioUrl) {
      console.log("Saving audio:", audioUrl);
      const audioBlob = await localforage.getItem<Blob>("audioBlob");
      if (audioBlob) {
        const fileName = `audio-${Date.now()}.wav`;
        const audioFile = new File([audioBlob], "audio.wav", {
          type: "audio/wav",
        });
        // audioId: modelId,
        // fileName: formData.get("file") as string,
        // userId: formData.get("userId") as string,
        // title: modelId,
        // createdAt: new Date().toISOString(),
        // console.log("audioFile", audioFile);
        const formData = new FormData();
        formData.append("file", audioFile);
        formData.append("modelId", fileName);
        formData.append("userId", user?.userId || "na");
        await fetcher.submit(formData, {
          method: "post",
          encType: "multipart/form-data",
          action: "/api/audio/add",
        });
        setAudioUrl(null);
        setIsRecording(false);
        //delete localforage
        localforage.removeItem("audioBlob");
        navigate("/audio");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen mt-12 space-y-4">
      <Button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        variant={audioUrl ? "secondary" : "default"}
        className="shadow-md"
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioUrl && (
        <>
          <Button
            onClick={handlePlayAudio}
            variant="secondary"
            className="shadow-md"
          >
            Play Recorded Audio
          </Button>
          <Button
            onClick={handleStopAudio}
            variant="secondary"
            className="shadow-md"
          >
            Stop Audio
          </Button>
          <Button onClick={handleSaveAudio} className="shadow-md mt-8">
            Save Audio
          </Button>
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
