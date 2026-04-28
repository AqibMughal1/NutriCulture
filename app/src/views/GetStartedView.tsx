"use client";

import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { authClient } from "@/lib/auth-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  CheckCircle,
  Calculator,
  Apple,
  UtensilsCrossed,
  Edit,
  ChefHat,
  Camera,
  ArrowRight,
  Crown,
  Lock,
  Sparkles,
  Heart,
  Brain,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { EmailVerificationModal } from "@/components/auth/email-verification-modal";

export default function GetStartedView() {
  const user = useCurrentUser();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [bmiToSend, setBmiToSend] = useState(false);

  const hasPremiumAccess = user?.role === "admin" || Boolean(session?.user?.stripeCustomerId);

  const handleBMICalculator = () => router.push("/bmi-calculator");

  const handleFeature = (route: string, featureName: string, isPremium: boolean = false) => {
    if (!user || !session?.user) {
      toast.error("Please sign in to access features");
      router.push("/login");
      return;
    }
    if (!session.user.emailVerified) {
      toast.warning("Please verify your email address for the best experience. Check your inbox for the verification link.", { duration: 5000 });
    }
    if (isPremium && !hasPremiumAccess) {
      toast.error(`${featureName} is a premium feature. Please upgrade to access it.`);
      router.push("/pricing");
      return;
    }
    router.push(route);
  };

  // Reusable feature list items
  const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-2.5">
      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-foreground/80">{text}</span>
    </li>
  );

  // Reusable free badge
  const FreeBadge = ({ color }: { color: string }) => (
    <span className={`bg-${color}-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex-shrink-0`}>FREE</span>
  );

  return (
    <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8 md:pb-12 mt-14 md:mt-20">
      <EmailVerificationModal />

      {/* Header */}
      <div className="text-center flex flex-col gap-4 md:gap-6 mb-8 md:mb-16">
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight px-4">
            Get Started with NutriCulture
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Start your personalized nutrition journey. Calculate your BMI, then explore nutrition analysis, meal recommendations, recipe generation, and healthy substitutes.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full" />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">

        {/* BMI Calculator */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          {/* Icon + Title + Badge */}
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 flex-shrink-0">
              <Calculator className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-green-600 transition-colors duration-300 flex-1 leading-tight">BMI Calculator</h3>
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex-shrink-0">FREE</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Calculate your BMI with multiple units. System determines your health goal and shares it across all modules.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Multiple units (cm, ft/in, kg, lb)", "Auto goal determination (lose/gain)", "BMI data shared across all modules"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={handleBMICalculator}>
              <Calculator className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              Calculate BMI
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

        {/* AI Meal Suggestions */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-950/40 dark:to-cyan-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300 flex-shrink-0">
              <Apple className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-teal-600 transition-colors duration-300 flex-1 leading-tight">AI Meal Suggestions</h3>
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex-shrink-0">FREE</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Enter your preferences and location to get restaurant recommendations and dishes near you.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Enter eating preferences & restrictions", "Location-based restaurant results", "Dishes tailored to your health goal"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={() => handleFeature("/ai-meal-suggestions", "AI Meal Suggestions")}>
              <Apple className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Get Suggestions
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

        {/* Ingredient Substitution */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 flex-shrink-0">
              <UtensilsCrossed className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300 flex-1 leading-tight">Ingredient Substitution</h3>
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex-shrink-0">FREE</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Enter the ingredients you have and get healthy substitute recipes tailored to your goal.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Enter minimum ingredients available", "Healthy substitutes based on your goal", "Simple recipes with minimal ingredients"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={() => handleFeature("/ingredient-substitution", "Ingredient Substitution")}>
              <UtensilsCrossed className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Substitute Ingredients
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

        {/* Recipe Customization */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/40 dark:to-pink-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 flex-shrink-0">
              <Edit className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors duration-300 flex-1 leading-tight">Recipe Customization</h3>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0 ${hasPremiumAccess ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
              <Crown className="h-3 w-3" />
              {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Enter your ingredients and get healthy recipe suggestions tailored to your BMI goal.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Enter ingredients you have available", "Healthy recipe suggestions", "Recipes optimized for your BMI goal"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={() => handleFeature("/recipe-customization", "Recipe Customization", true)}>
              {hasPremiumAccess
                ? <Edit className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                : <Lock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
              Customize Recipe
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

        {/* Healthy Recipes */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-950/40 dark:to-red-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300 flex-shrink-0">
              <ChefHat className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-orange-600 transition-colors duration-300 flex-1 leading-tight">Healthy Recipes</h3>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0 ${hasPremiumAccess ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}>
              <Crown className="h-3 w-3" />
              {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Browse a curated library of healthy recipes optimized for your specific BMI goal.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Browse curated healthy recipes", "Filtered by your health goal", "Easy-to-follow instructions"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={() => handleFeature("/healthy-recipes", "Healthy Recipes", true)}>
              {hasPremiumAccess
                ? <ChefHat className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                : <Lock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
              Browse Recipes
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

        {/* Nutrition Analysis (PREMIUM) */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border border-foreground/10 hover:border-pink-500/30 bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300 flex-shrink-0">
              <Camera className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-pink-600 transition-colors duration-300 flex-1 leading-tight">Nutrition Analysis</h3>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0 ${hasPremiumAccess ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'}`}>
              <Crown className="h-3 w-3" />
              {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Upload a food photo to get a detailed breakdown of proteins, fats, carbs, vitamins and more.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Upload any food photo", "Optional: add estimated weight", "Full nutrition breakdown (proteins, fats, vitamins)"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={() => handleFeature("/nutrition-analysis", "Nutrition Analysis", true)}>
              {hasPremiumAccess
                ? <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                : <Lock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
              Analyze Image
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

        {/* Nutrition Chat */}
        <CardSpotlight className="group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/40 dark:to-purple-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 flex-shrink-0">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-600 transition-colors duration-300 flex-1 leading-tight">Nutrition Chat</h3>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0 ${hasPremiumAccess ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}>
              <Crown className="h-3 w-3" />
              {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
            Chat with an AI nutritionist about meal plans, recipes, and get personalized dietary advice.
          </p>
          <ul className="flex flex-col gap-3 flex-1 relative z-10">
            {["Ask any nutrition question", "Recreate meal plans you don't like", "Personalized dietary advice"].map(f => <FeatureItem key={f} text={f} />)}
          </ul>
          <div className="mt-5 relative z-10">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={() => handleFeature("/nutrition-chat", "Nutrition Chat", true)}>
              {hasPremiumAccess
                ? <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                : <Lock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />}
              Start Chatting
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </CardSpotlight>

      </div>

      {/* Upgrade CTA — non-premium only */}
      {!hasPremiumAccess && (
        <div className="relative mt-20 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-teal-600/10 to-emerald-700/10 rounded-3xl blur-xl" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-green-400/20 to-teal-400/20 rounded-full blur-3xl" />
          <div className="relative bg-gradient-to-br from-slate-50/80 to-green-50/80 dark:from-slate-900/80 dark:to-green-950/80 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-2xl p-8 md:p-12 overflow-hidden">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">Unlock Premium Features</h2>
                <div className="p-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 rounded-full">
                  <Crown className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Get advanced AI-powered image nutrition analysis and priority support for your health journey.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Camera, color: "green", label: "Image Analysis", desc: "AI-powered meal photo analysis" },
                { icon: Brain, color: "teal", label: "Advanced AI", desc: "Enhanced AI recommendations" },
                { icon: Heart, color: "emerald", label: "Priority Support", desc: "24/7 expert nutrition guidance" },
              ].map(({ icon: Icon, color, label, desc }) => (
                <div key={label} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{label}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 mb-8 border border-green-200/50 dark:border-green-800/50">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-2xl font-bold text-green-600">Starting at $9.99/month</div>
                <div className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">30-day free trial</div>
              </div>
              <p className="text-center text-muted-foreground text-sm">No setup fees • Cancel anytime • Full access to all premium features</p>
            </div>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 hover:from-green-700 hover:via-teal-700 hover:to-emerald-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group" onClick={() => router.push("/pricing")}>
                <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                View Pricing Plans
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Premium success banner */}
      {hasPremiumAccess && (
        <div className="relative mt-20 mb-8">
          <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-lg rounded-3xl border border-green-200/50 dark:border-green-800/50 shadow-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Premium Access Activated</h2>
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              You have full access to all NutriCulture features. Start your personalized nutrition journey today!
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group" onClick={() => router.push("/dashboard")}>
              <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
