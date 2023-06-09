"use client";

import { Button } from "@/components/ui/button";
import { Google } from "icons/google";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { UserNav } from "./user-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./label";
import { Input } from "./input";
import Link from "next/link";
import { useStore } from "@/stores/openai-key";
export default function MainNav({ user, expires }: Session) {
  const [updateOpenAIAPIKey] = useStore((state) => [state.updateOpenAIAPIKey]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

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
    <div className="mx-12 flex justify-between py-12 text-center">
      <Link href="/">
        <h2 className="text-2xl font-bold">
          Audio<span className="text-[#1FB2A7]">AI</span>
        </h2>
      </Link>
      {!user && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-[8px]">
              Sign in
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
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

      {user && (
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="z-10 rounded-[8px]"
              >
                Setup OpenAI
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add OpenAI API Key</DialogTitle>
                <DialogDescription>
                  Go to API keys in OpenAI and create a new secret key
                </DialogDescription>
              </DialogHeader>
              <div className="grid justify-center gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="name"
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="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"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => updateOpenAIAPIKey(apiKey)}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <UserNav user={user} expires={expires} />
        </div>
      )}
    </div>
  );
}
