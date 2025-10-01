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
import { ForgotPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default function ForgotPasswordView() {
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(async () => {
      await authClient.forgetPassword(
        {
          email: values.email,
          redirectTo: "/new-password",
        },
        {
          onError(context) {
            toast.error(context.error.message);
          },
          onSuccess() {
            toast.success(
              "Please check your email for a link to reset your password"
            );
          },
        }
      );
    });
  };
  return (
    <CardWrapper
      headerTitle="Forgot Password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground/90">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
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
            {isPending ? "Sending reset link..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
} 