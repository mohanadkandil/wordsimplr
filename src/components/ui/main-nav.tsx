"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Google } from "icons/google";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { UserNav } from "./user-nav";

export default function MainNav({ user, expires }: Session) {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log("google error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-12 my-12 flex justify-between text-center">
      <h2 className="text-2xl font-bold">
        Audio<span className="text-[#1FB2A7]">AI</span>
      </h2>
      {!user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sign in</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription className="font-medium">
                Sign in and take the full leverage of converting your messy
                recordings into a clear text
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Button onClick={loginWithGoogle}>
                {isLoading !== null ? (
                  <Google className="mr-2 h-4 w-4" />
                ) : (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {user && <UserNav user={user} expires={expires} />}
    </div>
  );
}
