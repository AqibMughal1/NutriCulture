import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, verifications } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      // Redirect to a page with error message
      const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                      process.env.NEXT_PUBLIC_APP_URL || 
                      "http://localhost:3000";
      return NextResponse.redirect(
        `${baseURL}/?error=verification_failed&message=Invalid verification link. Please request a new verification email.`
      );
    }

    // Find the verification token
    const verification = await db.query.verifications.findFirst({
      where: and(
        eq(verifications.identifier, email),
        eq(verifications.value, token),
        gt(verifications.expiresAt, new Date())
      ),
    });

    if (!verification) {
      // Token is invalid or expired
      const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                      process.env.NEXT_PUBLIC_APP_URL || 
                      "http://localhost:3000";
      return NextResponse.redirect(
        `${baseURL}/?error=verification_failed&message=Verification link is invalid or has expired. Please request a new verification email.`
      );
    }

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                      process.env.NEXT_PUBLIC_APP_URL || 
                      "http://localhost:3000";
      return NextResponse.redirect(
        `${baseURL}/?error=verification_failed&message=User not found.`
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      // Already verified, just redirect to success
      const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                      process.env.NEXT_PUBLIC_APP_URL || 
                      "http://localhost:3000";
      return NextResponse.redirect(
        `${baseURL}/?verified=true&message=Email is already verified.`
      );
    }

    // Update user's emailVerified status
    await db
      .update(users)
      .set({
        emailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Delete the used verification token
    await db
      .delete(verifications)
      .where(eq(verifications.id, verification.id));

    // Redirect to success page
    const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                    process.env.NEXT_PUBLIC_APP_URL || 
                    "http://localhost:3000";
    return NextResponse.redirect(
      `${baseURL}/?verified=true&message=Email verified successfully!`
    );
  } catch (error: any) {
    console.error("Error verifying email:", error);
    const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                    process.env.NEXT_PUBLIC_APP_URL || 
                    "http://localhost:3000";
    return NextResponse.redirect(
      `${baseURL}/?error=verification_failed&message=An error occurred during verification. Please try again.`
    );
  }
}

