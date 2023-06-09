"use client";

import { type FC } from "react";
import { Landing, Microphone } from "icons";
import { Button } from "@/components/ui/button";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Page: FC = () => {
  return (
    <main className="mx-12 flex min-h-screen flex-col justify-center">
      <div className="mt-10 flex h-[50vh] items-center justify-center">
        <div className="flex flex-col space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="relative z-[100] text-[16vw] font-extrabold leading-[0.9] tracking-[-2px] text-[#1E2B3A] md:mb-[37px] md:ml-[-10px] md:text-[132px]"
          >
            Transform Your Messy <br />
            <span className="text-[#0D9488]">Talk</span> into Clear{" "}
            <span className="text-[#0D9488]">Text</span>
          </motion.h1>
        </div>
        <div className="h-full w-full rounded-xl bg-white"></div>
      </div>
      <div className="mt-8 flex items-start">
        <Link
          href="/dashboard"
          className="group flex scale-100 items-center justify-center rounded-full bg-[#f5f7f9] px-4 py-2 text-[13px] font-semibold text-[#1E2B3A] no-underline transition-all duration-75 active:scale-95"
          style={{
            boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
          }}
        >
          Try it out
          <ArrowUpRight className="ml-2 h-5 w-5 rotate-45" />
        </Link>
      </div>
    </main>
  );
};

export default Page;
