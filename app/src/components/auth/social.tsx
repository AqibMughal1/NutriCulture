"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const Social = () => {
  const onClick = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    }, {
      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <div className="flex gap-3 mt-4">
      <Button
        className="rounded-xl w-full border border-primary/20 bg-background/50 dark:bg-background/30 text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 shadow-lg backdrop-blur-sm"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGoogle className="mr-2 " size={18} /> 
        Google
      </Button>
      <Button
        className="rounded-xl w-full border border-primary/20 bg-background/50 dark:bg-background/30 text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 shadow-lg backdrop-blur-sm"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="mr-2 text-gray-700 dark:text-gray-300" size={18} /> 
        GitHub
      </Button>
    </div>
  );
};
