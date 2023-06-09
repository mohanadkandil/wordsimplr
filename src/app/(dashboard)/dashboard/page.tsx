"use client";

import { useWhisper } from "@chengsokdara/use-whisper";
import Head from "next/head";
import { type FC, useEffect, useState } from "react";
import { Arrow, Microphone } from "icons";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStore } from "@/stores/openai-key";

const Page: FC = () => {
  const [apiKey] = useStore((state) => [state.apiKey]);

  console.log(apiKey);
  const [transcribedText, setTranscribedText] = useState(
    "I'm always thinking about implementing user interactions and transcriptions so I'm always looking for a new behavior in. So thank you so much for your help. This is Monica Ndio."
  );

  const { transcript, transcribing, startRecording, recording, stopRecording } =
    useWhisper({
      apiKey: apiKey ?? "test",
      streaming: true,
      timeSlice: 1_000,
      whisperConfig: {
        language: "en",
      },
    });

  const generateSummarizedText = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: transcribedText,
      }),
    });

    const answer = await response.json();
    console.log(answer);
    return answer;
  };

  const startRecordingProcess = async () => {
    if (recording) await stopRecording();
    else await startRecording();
  };

  useEffect(() => {
    if (transcribing === false)
      if (transcript.text) setTranscribedText(transcript.text);
  }, [transcribing]);

  console.log(transcribing);
  console.log(transcribedText);
  return (
    <>
      <Head>
        <title>VNAI</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-24 my-8 flex min-h-screen flex-col">
        <div className="relative mt-10 flex flex-col items-center gap-5">
          <p className="text-3xl font-bold">
            Transform jumbled ideas into crystal-clear text effortlessly
          </p>
          <div className="absolute ml-36 mt-10">
            <Arrow className="ml-10 h-28 w-28" />
          </div>
          <div className="flex flex-col items-center gap-4 py-6">
            <button
              onClick={() => startRecordingProcess()}
              className={cn(
                "flex h-24 w-24 items-center justify-center rounded-full border border-[#D0D5E6]",
                recording ? "bg-[#59E881]" : null
              )}
            >
              <Microphone className="h-20 w-20 font-thin" />
            </button>
            <Button
              variant="destructive"
              size="sm"
              className="rounded-[8px] bg-[#59E881]"
              onClick={generateSummarizedText}
            >
              Summarize
            </Button>
          </div>

          <p>{transcript.text}</p>
        </div>
        <section className="mt-24 flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Your Notes</h1>
          <div className="flex flex-wrap justify-center gap-5 py-12">
            <Card
              title="High School"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nemo
        laborum eius, quibusdam veritatis nihil doloribus facilis voluptates,
        voluptas architecto mollitia? Optio, aliquid animi distinctio qui beatae
        nostrum deserunt cum?"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
function shallow(state: unknown): unknown {
  throw new Error("Function not implemented.");
}
