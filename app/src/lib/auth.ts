import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import Stripe from "stripe";

import { ResetPassword } from "@/emails/reset-email";
import { LinkEmail } from "@/emails/verify-email";
import { Resend } from "resend";
import { db } from "./db";
const stripeClient = new Stripe(process.env.STRIPE_API_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        to: user.email,
        from: "NutriCulture <hello@nutriculture.app>",
        subject: "Reset your password",
        react: ResetPassword({ url }),
      });
    },
    requireEmailVerification: false, // Allow login without verification, but prompt for verification
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        to: user.email,
        from: "NutriCulture <hello@nutriculture.app>",
        subject: "Verify your email",
        react: LinkEmail({ url }),
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "pro",
            priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
          },
        ],
        getCheckoutSessionParams(data, request) {
          return {
            params: {
              allow_promotion_codes: true,
            },
          };
        },
      },
    }),
  ],
  trustedOrigins: [
    "http://localhost:3000",
    "https://www.nutriculture.app/",
    "https://nutriculture.app/",
  ],
});
