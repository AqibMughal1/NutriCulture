"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Subscription } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { BadgeCheck, CalendarIcon, XCircle, CreditCard, Crown, Loader2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type SubscriptionFormProps = {
  subscription: Subscription | null;
};

export default function SubscriptionForm({
  subscription,
}: SubscriptionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);

      const { data } = await authClient.subscription.cancel({
        returnUrl: "/settings",
        // optional defaults to userId
      });

      if (data) {
        router.push(data.url);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const { error } = await authClient.subscription.upgrade({
        plan: "pro",
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      });
      if (error) {
        toast.error(error?.message || "An error occurred! Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {subscription ? (
        <Card className="bg-gradient-to-br from-green-50/50 via-white/50 to-emerald-50/50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-green-900/50 border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    subscription.status === "active" 
                      ? "bg-green-500" 
                      : subscription.status === "trialing" 
                        ? "bg-blue-500" 
                        : "bg-gray-500"
                  }`}></div>
                  <span className="text-sm text-muted-foreground">
                    {subscription.status === "active"
                      ? "Active subscription"
                      : subscription.status === "trialing"
                        ? "Trial period"
                        : "Inactive subscription"}
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subscription.periodStart && subscription.periodEnd && (
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Billing Period
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {subscription.periodStart && formatDate(new Date(subscription.periodStart))} - {subscription.periodEnd && formatDate(new Date(subscription.periodEnd))}
                  </p>
                </div>
              </div>
            )}
            {subscription.cancelAtPeriodEnd && (
              <div className="flex items-center gap-3 p-3 bg-red-50/50 dark:bg-red-900/20 rounded-lg border border-red-200/50 dark:border-red-800/50">
                <XCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">
                    Cancellation Scheduled
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300">
                    Your subscription will cancel at the end of the current billing period.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleManageSubscription} 
              disabled={isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Manage Subscription
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-purple-50/50 via-white/50 to-indigo-50/50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-purple-900/50 border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-md">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Upgrade to Pro
                </span>
                <p className="text-sm text-muted-foreground mt-1">
                  Unlock premium features and capabilities
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <BadgeCheck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Unlimited Cloud Accounts</p>
                  <p className="text-xs text-muted-foreground">Connect multiple cloud providers</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <BadgeCheck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Priority Support</p>
                  <p className="text-xs text-muted-foreground">Get help when you need it most</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg">
                <BadgeCheck className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Advanced Features</p>
                  <p className="text-xs text-muted-foreground">Access to premium optimization tools</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubscribe} 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Crown className="mr-2 h-4 w-4" />
                  Subscribe Now
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
