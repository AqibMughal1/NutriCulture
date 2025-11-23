"use client";

import { authClient } from "@/lib/auth-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { EmailVerificationModal } from "./email-verification-modal";

interface RouteProtectionProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

export function RouteProtection({ 
  children, 
  requireEmailVerification = false 
}: RouteProtectionProps) {
  const user = useCurrentUser();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    // Check if user is logged in
    if (!user || !session?.user) {
      toast.error("Please sign in to access this feature");
      router.push("/login");
      return;
    }

    // Show warning if email is not verified (but allow access)
    if (!session.user.emailVerified) {
      toast.warning("Please verify your email address for the best experience. Check your inbox for the verification link.", {
        duration: 5000,
      });
    }
  }, [user, session, isPending, router]);

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated
  if (!user || !session?.user) {
    return null;
  }

  return (
    <div className="pt-16 md:pt-20">
      <EmailVerificationModal />
      {children}
    </div>
  );
}

