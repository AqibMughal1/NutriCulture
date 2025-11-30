import { Navbar } from "@/components/navbar";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { GlobalLoadingBar } from "@/components/global-loading-bar";
import { BMIProvider } from "@/contexts/bmi-context";
import { VerificationHandler } from "@/components/auth/verification-handler";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriCulture",
  description: "The best nutrition tracker the web 🌎 🚀",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BMIProvider>
            <Suspense fallback={null}>
              <VerificationHandler />
            </Suspense>
            <GlobalLoadingBar />
            <Navbar />
            {children}
            <Toaster />
          </BMIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
