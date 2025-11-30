"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export function VerificationHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verified = searchParams.get("verified");
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (verified === "true") {
      // Show success toast
      toast.success(message || "Email verified successfully!", {
        icon: <CheckCircle className="h-5 w-5" />,
        duration: 5000,
      });

      // Refresh the page data to update session
      router.refresh();

      // Clean up URL by removing query params after a short delay
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("verified");
        url.searchParams.delete("message");
        router.replace(url.pathname + (url.search || ""));
      }, 100);
    } else if (error === "verification_failed") {
      // Show error toast
      toast.error(message || "Verification failed. Please try again.", {
        icon: <XCircle className="h-5 w-5" />,
        duration: 7000,
      });

      // Clean up URL by removing query params after a short delay
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("error");
        url.searchParams.delete("message");
        router.replace(url.pathname + (url.search || ""));
      }, 100);
    }
  }, [searchParams, router]);

  return null;
}

