import { authOptions } from "@/server/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Google } from "icons/google";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

export async function SignInDialog() {
  const session = await getServerSession(authOptions);
  console.log(session);
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
  );
}
