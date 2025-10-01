"use client";

import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
// Removed get-started actions - now using direct navigation
import { authClient } from "@/lib/auth-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  CheckCircle,
  Cloud,
  Cog,
  FileCheck,
  FileText,
  Rocket,
  Settings,
  Upload,
  ArrowRight,
  Crown,
  Lock,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GetStartedView() {
  const user = useCurrentUser();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // Check if user has premium access (admin or subscribed user)
  const hasPremiumAccess = user?.role === "admin" || Boolean(session?.user?.stripeCustomerId);

  const handlePaidFeature = (featureName: string, projectType: string) => {
    if (!user) {
      toast.error("Please sign in to access premium features");
      router.push("/login");
      return;
    }

    // Allow admin access to all features
    if (user.role === "admin") {
      router.push(`/new-project?type=${projectType}`);
      return;
    }

    // Check if regular user has subscription (using stripeCustomerId as indicator)
    if (!session?.user?.stripeCustomerId) {
      toast.error(`${featureName} is a premium feature. Please upgrade to access it.`);
      router.push("/pricing");
      return;
    }

    // User has subscription, proceed with redirect
    router.push(`/new-project?type=${projectType}`);
  };

  const handleFreeFeature = (projectType: string) => {
    if (!user) {
      toast.error("Please sign in to get started");
      router.push("/login");
      return;
    }
    
    router.push(`/new-project?type=${projectType}`);
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-6 mt-20">
      {/* Header Section */}
      <div className="text-center flex flex-col gap-6 mb-16">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent tracking-tight">
            Get Started with OptimalCloud
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start with our free tier or unlock premium features with a subscription
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-full"></div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* FREE TIER - New Deployment Guide Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full max-w-[550px] h-[500px] p-8 transition-all duration-300 hover:scale-105 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          {/* Free Badge */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10">
            FREE
          </div>
          
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-green-600 transition-colors duration-300">
                New Deployment Guide
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Complete guide for new cloud deployments - Always Free!
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Analyze your application requirements</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Automated cloud deployment script</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Step-by-step configuration guide</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Best practices and recommendations</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleFreeFeature("new-deployment-guide")}
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Start Free Chat
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* PREMIUM - Existing Project Optimization Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full max-w-[550px] h-[500px] p-8 transition-all duration-300 hover:scale-105 border border-foreground/10 hover:border-yellow-500/30 bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          {/* Premium Badge */}
          <div className={`absolute top-1/2 -translate-y-1/2 right-4 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg flex items-center gap-1 z-10 ${
            hasPremiumAccess 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-yellow-500 to-orange-500'
          }`}>
            <Crown className="h-3 w-3" />
            {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-yellow-600 transition-colors duration-300">
                Existing Project Optimization
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Optimize your current cloud infrastructure
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Review current application requirements</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Analyze existing configuration setup</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Automated optimization scripts</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Guided step-by-step improvements</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handlePaidFeature("Existing Project Optimization", "existing-deployment-guide")}
              >
                {hasPremiumAccess ? (
                  <Settings className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <Lock className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                )}
                Optimize Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* PREMIUM - Submit Requirements Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full max-w-[550px] h-[500px] p-8 transition-all duration-300 hover:scale-105 border border-foreground/10 hover:border-purple-500/30 bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          {/* Premium Badge */}
          <div className={`absolute top-1/2 -translate-y-1/2 right-4 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg flex items-center gap-1 z-10 ${
            hasPremiumAccess 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-purple-500 to-indigo-500'
          }`}>
            <Crown className="h-3 w-3" />
            {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-purple-600 transition-colors duration-300">
                Submit Deployment Requirements
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get custom deployment recommendations
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Fill out detailed requirements form</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Select your preferred cloud platform</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">AI-generated deployment strategy</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Customized configuration markdown</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handlePaidFeature("Submit Deployment Requirements", "submit-requirements-to-get-deployment-guide")}
              >
                {hasPremiumAccess ? (
                  <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Lock className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                )}
                Submit Requirements
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* PREMIUM - Upload Config Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full max-w-[550px] h-[500px] p-8 transition-all duration-300 hover:scale-105 border border-foreground/10 hover:border-orange-500/30 bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          {/* Premium Badge */}
          <div className={`absolute top-1/2 -translate-y-1/2 right-4 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg flex items-center gap-1 z-10 ${
            hasPremiumAccess 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-orange-500 to-red-500'
          }`}>
            <Crown className="h-3 w-3" />
            {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
              <Upload className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-orange-600 transition-colors duration-300">
                Upload Config for Optimization
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze and optimize your cloud configuration
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Upload your cloud configuration file</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Cost optimization recommendations</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Performance optimization options</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Balanced optimization based on usage</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handlePaidFeature("Upload Config for Optimization", "upload-config-to-get-recommendations")}
              >
                {hasPremiumAccess ? (
                  <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Lock className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                )}
                Upload & Optimize
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>
      </div>

      {/* Enhanced Call to Action Section - Only show for non-premium users */}
      {!hasPremiumAccess && (
      <div className="relative mt-20 mb-8">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-700/10 rounded-3xl blur-xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        {/* Main Content */}
        <div className="relative bg-gradient-to-br from-slate-50/80 to-blue-50/80 dark:from-slate-900/80 dark:to-blue-950/80 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-2xl p-8 md:p-12 overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Unlock Premium Features
              </h2>
              <div className="p-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-full">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your cloud deployment experience with advanced optimization tools, 
              custom deployment strategies, and priority support.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Advanced Optimization</h3>
              <p className="text-sm text-muted-foreground">AI-powered optimization for cost, performance, and security</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Custom Strategies</h3>
              <p className="text-sm text-muted-foreground">Tailored deployment plans for your specific needs</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Priority Support</h3>
              <p className="text-sm text-muted-foreground">24/7 expert support and dedicated assistance</p>
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 mb-8 border border-green-200/50 dark:border-green-800/50">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-2xl font-bold text-green-600">Starting at $9.99/month</div>
              <div className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                30-day free trial
              </div>
            </div>
            <p className="text-center text-muted-foreground text-sm">
              No setup fees • Cancel anytime • Full access to all premium features
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              onClick={() => router.push("/pricing")}
            >
              <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              View Pricing Plans
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button
              variant="outline"
              className="border-2 border-blue-600/30 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-8 py-4 rounded-xl transition-all duration-300 font-semibold group"
              onClick={() => router.push("/contact")}
            >
              <span className="text-blue-600 group-hover:text-blue-700">Talk to Sales</span>
            </Button>
                     </div>
         </div>
       </div>
       )}

       {/* Premium User Success Message */}
       {hasPremiumAccess && (
       <div className="relative mt-20 mb-8">
         <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-lg rounded-3xl border border-green-200/50 dark:border-green-800/50 shadow-2xl p-8 md:p-12 text-center">
           <div className="inline-flex items-center gap-3 mb-6">
             <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
               <CheckCircle className="h-6 w-6 text-white" />
             </div>
             <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
               Premium Access Activated
             </h2>
             <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full">
               <Crown className="h-6 w-6 text-white" />
             </div>
           </div>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
             You have full access to all OptimalCloud.AI features. Start optimizing your cloud infrastructure today!
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Button
               className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
               onClick={() => router.push("/dashboard")}
             >
               <Rocket className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
               View Dashboard
               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
             </Button>
             <Button
               variant="outline"
               className="border-2 border-green-600/30 hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 px-8 py-4 rounded-xl transition-all duration-300 font-semibold group"
               onClick={() => router.push("/contact")}
             >
               <span className="text-green-600 group-hover:text-green-700">Get Support</span>
             </Button>
           </div>
         </div>
       </div>
       )}
     </main>
   );
 }
