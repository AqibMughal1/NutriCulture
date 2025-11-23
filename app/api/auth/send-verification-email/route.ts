import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, verifications } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { Resend } from "resend";
import { LinkEmail } from "@/emails/verify-email";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Get the session to verify the user is logged in
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the email matches the logged-in user
    if (session.user.email !== email) {
      return NextResponse.json(
        { error: "Email does not match your account" },
        { status: 403 }
      );
    }

    // Check if email is already verified
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

    // Delete any existing verification tokens for this email
    await db.delete(verifications).where(
      eq(verifications.identifier, email)
    );

    // Create new verification token (better-auth format: identifier = email, value = token)
    await db.insert(verifications).values({
      id: randomBytes(16).toString("hex"),
      identifier: email,
      value: token,
      expiresAt: expiresAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate verification URL (better-auth expects this format)
    const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
                    process.env.NEXT_PUBLIC_APP_URL || 
                    "http://localhost:3000";
    // Better-auth verification endpoint format
    const verificationURL = `${baseURL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    // Send verification email
    await resend.emails.send({
      to: email,
      from: "NutriCulture <hello@nutriculture.app>",
      subject: "Verify your email",
      react: LinkEmail({ url: verificationURL }),
    });

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send verification email" },
      { status: 500 }
    );
  }
}

