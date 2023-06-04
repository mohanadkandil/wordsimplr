"use client";

import { useWhisper } from "@chengsokdara/use-whisper";
import Head from "next/head";
import { FC, useEffect, useRef, useState } from "react";
import { Microphone } from "icons";
import { Button } from "@/components/ui/button";

const Page: FC = () => {
  const [transcribedText, setTranscribedText] = useState(
    "I'm always thinking about implementing user interactions and transcriptions so I'm always looking for a new behavior in. So thank you so much for your help. This is Monica Ndio."
  );

  const {
    transcript,
    transcribing,
    recording,
    speaking,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: "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",
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
        <div className="flex justify-between text-center">
          <h2 className="text-2xl font-bold">
            Audio<span className="text-[#1FB2A7]">AI</span>
          </h2>
        </div>
        <div className="mt-20 flex flex-col items-center gap-5">
          <p className="text-3xl font-bold">
            Transform jumbled ideas into crystal-clear text effortlessly
          </p>
          <button
            onClick={() => startRecording()}
            className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D0D5E6]"
          >
            <Microphone className="h-16 w-16" />
          </button>
          <Button onClick={generateSummarizedText}>Summarize</Button>
          <p>Recording: {recording}</p>
          <p>Speaking: {speaking}</p>
          <p>Transcribing: {transcribing}</p>

          <button onClick={() => pauseRecording()}>Pause</button>
          <button onClick={() => stopRecording()}>Stop</button>
          <p>{transcript.text}</p>
        </div>
      </main>
    </>
  );
};

export default Page;