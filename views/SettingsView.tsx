import { currentSession } from "@/lib/api/user";
import { auth } from "@/lib/auth";
import { Subscription } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "@/app/(root)/(routes)/settings/_components/profile-form";
import SubscriptionForm from "@/app/(root)/(routes)/settings/_components/subscription-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CreditCard, Settings, Shield } from "lucide-react";

export default async function SettingsView() {
  const { user } = await currentSession();
  if (!user) redirect("/login");

  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });
  const subscriptionData = subscriptions.find(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

  // Map the subscription data to match the expected Subscription type
  const subscription = subscriptionData
    ? ({
        id: subscriptionData.id,
        plan: subscriptionData.plan,
        referenceId: subscriptionData.id, // Using ID as reference ID
        stripeCustomerId: subscriptionData.stripeCustomerId || null,
        stripeSubscriptionId: subscriptionData.stripeSubscriptionId || null,
        status: subscriptionData.status || null,
        periodStart: subscriptionData.periodStart || null,
        periodEnd: subscriptionData.periodEnd || null,
        cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd || null,
        seats: subscriptionData.seats || null,
      } as Subscription)
    : null;

  return (
    <div className="grid gap-8">
      {/* Profile Section */}
      <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.01] border border-foreground/10 hover:border-primary/30 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl">
        <CardHeader className="pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Profile Settings
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Manage your profile information and avatar
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 relative z-10">
          <ProfileForm />
        </CardContent>
      </Card>

      {/* Subscription Section */}
      <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.01] border border-foreground/10 hover:border-primary/30 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl">
        <CardHeader className="pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                Subscription
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Manage your subscription and billing information
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 relative z-10">
          <SubscriptionForm subscription={subscription} />
        </CardContent>
      </Card>

      
    </div>
  );
} 