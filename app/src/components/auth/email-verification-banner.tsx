"use client";

import { authClient } from "@/lib/auth-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, Mail, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function EmailVerificationBanner() {
  const user = useCurrentUser();
  const { data: session } = authClient.useSession();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show if user is not logged in, email is verified, or banner is dismissed
  if (!user || !session?.user || session.user.emailVerified || isDismissed) {
    return null;
  }

  const handleResendVerification = async () => {
    try {
      // Use better-auth API to resend verification email
      const response = await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify({
          email: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send verification email");
      }

      toast.success("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification email");
    }
  };

  return (
    <Alert className="mb-4 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
      <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-200">
        Email Verification Required
      </AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-300 mt-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="mb-2">
              Please verify your email address to access all features and ensure account security.
            </p>
            <p className="text-sm mb-3">
              Check your inbox at <strong>{user.email}</strong> for the verification link.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleResendVerification}
                className="border-yellow-600 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-300 dark:hover:bg-yellow-900/30"
              >
                <Mail className="h-4 w-4 mr-2" />
                Resend Verification Email
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="text-yellow-700 hover:text-yellow-800 dark:text-yellow-300 dark:hover:text-yellow-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

