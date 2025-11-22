"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function NewPasswordView() {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  if (!token) {
    redirect("/forgot-password");
  }

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(async () => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await authClient.resetPassword(
        {
          newPassword: values.password,
          token: token,
        },
        {
          onError(context) {
            toast.error(context.error.message);
          },
          onSuccess() {
            toast.success("Password reset successfully");
            router.push("/login");
          },
        }
      );
    });
  };
  return (
    <CardWrapper
      headerTitle="Reset Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground/90">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your new password"
                      type="password"
                      className="bg-background/50 dark:bg-background/30 border border-foreground/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground/90">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm your new password"
                      type="password"
                      className="bg-background/50 dark:bg-background/30 border border-foreground/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl" 
            disabled={isPending} 
            type="submit"
          >
            {isPending ? "Updating password..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
} 