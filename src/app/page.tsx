"use client";

import { type FC } from "react";
import { Landing, Microphone } from "icons";
import { Button } from "@/components/ui/button";
import { Router, useRouter } from "next/router";
import Link from "next/link";

const Page: FC = () => {
  return (
    <main className="mx-24 my-8">
      <div className="mt-10 flex h-[50vh] items-center justify-center">
        <div className="flex flex-col space-y-6">
          <p className="text-4xl font-bold">
            Transform Your Messy <span className="text-[#0D9488]">Talk</span>{" "}
            into Clear <span className="text-[#0D9488]">Text</span>
          </p>
          <p className="text-2xl font-light text-[#6a6a6a]">
            Effortlessly convert your voice recordings into accurate and
            easy-to-read text using AI technology
          </p>
        </div>
        <Landing className="h-[850px] w-[850px]" />
      </div>
      <div className="mt-8 flex items-center justify-center">
        <Button
          variant="outline"
          className="h-12 w-36 rounded-[8px] bg-[#0D9488] text-lg font-semibold text-white"
        >
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </main>
  );
};

export default Page;
