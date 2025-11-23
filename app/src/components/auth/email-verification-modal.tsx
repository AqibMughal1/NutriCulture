"use client";

import { authClient } from "@/lib/auth-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function EmailVerificationModal() {
  const user = useCurrentUser();
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Check if modal should be open
  useEffect(() => {
    if (user && session?.user && !session.user.emailVerified) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user, session]);

  // Don't show if user is not logged in or email is verified
  if (!user || !session?.user || session.user.emailVerified) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const response = await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
    } finally {
      setIsResending(false);
    }
  };

  // Allow closing but show reminder
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !session?.user?.emailVerified) {
      // User is trying to close without verifying
      toast.info("Please verify your email when you receive it. The modal will appear again until you verify.", {
        duration: 5000,
      });
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              Verify Your Email Address
            </DialogTitle>
          </div>
          <DialogDescription className="text-base pt-2">
            Please verify your email address to access all features and ensure account security.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">Check your inbox</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification link to{" "}
                  <span className="font-semibold text-foreground">{user.email}</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-border/50">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">What's next?</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>Your account will be verified automatically</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> The verification link will expire in 1 hour. If you don't see the email, check your spam folder or click the button below to resend.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleResendVerification}
            disabled={isResending}
            className="w-full sm:w-auto"
          >
            <Mail className="h-4 w-4 mr-2" />
            {isResending ? "Sending..." : "Resend Verification Email"}
          </Button>
          <Button
            onClick={() => {
              // Allow user to continue but show a reminder
              setOpen(false);
              toast.info("Please verify your email when you receive it. You can continue using the app, but some features may be limited.");
            }}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            I'll Verify Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

