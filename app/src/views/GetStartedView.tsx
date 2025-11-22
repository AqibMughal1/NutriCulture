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
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function GetStartedView() {
  const user = useCurrentUser();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [bmiToSend, setBmiToSend] = useState(false);

  // Check if user has premium access (admin or subscribed user)
  const hasPremiumAccess = user?.role === "admin" || Boolean(session?.user?.stripeCustomerId);

  const handleBMICalculator = () => {
    // Navigate to BMI calculator
    router.push("/bmi-calculator");
  };

  const handleFeature = (route: string, featureName: string, isPremium: boolean = false) => {
    if (!user) {
      toast.error("Please sign in to access features");
      router.push("/login");
      return;
    }

    if (isPremium && !hasPremiumAccess) {
      toast.error(`${featureName} is a premium feature. Please upgrade to access it.`);
      router.push("/pricing");
      return;
    }

    router.push(route);
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-6 mt-20">
      {/* Header Section */}
      <div className="text-center flex flex-col gap-6 mb-16">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight">
            Get Started with NutriCulture
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our six main modules: BMI Calculator, AI Meal Suggestions, Ingredient Substitution, Recipe Customization, Healthy Recipes, and Nutrition Analysis
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full"></div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* FREE - BMI Calculator Card (First Option) */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full h-[500px] p-8 transition-all duration-300 hover:scale-105 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/40 dark:to-emerald-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          {/* Free Badge */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-green-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10">
            FREE
          </div>
          
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <Calculator className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-green-600 transition-colors duration-300">
                BMI Calculator
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Module 1: Calculate BMI and optionally send to AI for personalized advice
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Calculate your BMI instantly</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Get health category assessment</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Optional: Send BMI to AI for personalized advice</span>
              </li>
            </ul>

            <div className="mt-auto space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={handleBMICalculator}
              >
                <Calculator className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Calculate BMI
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* FREE - AI Meal Suggestions Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full h-[500px] p-8 transition-all duration-300 hover:scale-105 border-2 border-teal-200 dark:border-teal-800 hover:border-teal-400 dark:hover:border-teal-600 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-950/40 dark:to-cyan-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-teal-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10">
            FREE
          </div>
          
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300">
              <Apple className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-teal-600 transition-colors duration-300">
                AI Meal Suggestions
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Module 2: Get AI suggestions based on preferences, health goals, and nutrition info
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Based on your preferences</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Health goals consideration</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Detailed nutrition info (proteins, vitamins, fats)</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleFeature("/ai-meal-suggestions", "AI Meal Suggestions")}
              >
                <Apple className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Get Suggestions
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* FREE - Ingredient Substitution Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full h-[500px] p-8 transition-all duration-300 hover:scale-105 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10">
            FREE
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <UtensilsCrossed className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300">
                Ingredient Substitution
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Module 3: Replace ingredients with healthier alternatives in your recipes
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Upload your recipe</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">AI suggests healthier alternatives</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Get optimized recipe version</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleFeature("/ingredient-substitution", "Ingredient Substitution")}
              >
                <UtensilsCrossed className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Substitute Ingredients
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* FREE - Recipe Customization Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full h-[500px] p-8 transition-all duration-300 hover:scale-105 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-950/40 dark:to-pink-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-purple-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10">
            FREE
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <Edit className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-purple-600 transition-colors duration-300">
                Recipe Customization
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Module 4: Edit and modify AI suggestions based on your available ingredients
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Modify AI recommendations</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Replace unavailable ingredients</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Get updated recipe suggestions</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleFeature("/recipe-customization", "Recipe Customization")}
              >
                <Edit className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Customize Recipe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* FREE - Healthy Recipes Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full h-[500px] p-8 transition-all duration-300 hover:scale-105 border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 dark:hover:border-orange-600 bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-950/40 dark:to-red-950/40 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg z-10">
            FREE
          </div>
          
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-orange-500/25 transition-all duration-300">
              <ChefHat className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-orange-600 transition-colors duration-300">
                Healthy Recipes
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Module 5: South Asian & Middle Eastern dishes with calorie and cuisine filters
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Filter by calorie range</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Cuisine preferences</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Personalized recommendations</span>
              </li>
            </ul>
            
            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleFeature("/healthy-recipes", "Healthy Recipes")}
              >
                <ChefHat className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Browse Recipes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>

        {/* PREMIUM - Image Nutrition Analysis Card */}
        <CardSpotlight className="group relative flex flex-col justify-between w-full h-[500px] p-8 transition-all duration-300 hover:scale-105 border border-foreground/10 hover:border-pink-500/30 bg-secondary/70 dark:bg-secondary/50 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden">
          <div className={`absolute top-1/2 -translate-y-1/2 right-4 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg flex items-center gap-1 z-10 ${
            hasPremiumAccess 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
              : 'bg-gradient-to-r from-pink-500 to-rose-500'
          }`}>
            <Crown className="h-3 w-3" />
            {hasPremiumAccess ? 'UNLOCKED' : 'PREMIUM'}
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300">
              <Camera className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-pink-600 transition-colors duration-300">
                Nutrition Analysis
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Module 6: Image-based analysis identifying proteins, vitamins, and fats
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 relative z-10 flex-1">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Upload meal image</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Identify proteins, vitamins, fats</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover/item:scale-110 transition-transform duration-200" />
                <span className="text-foreground/90">Detailed nutritional breakdown</span>
              </li>
            </ul>

            <div className="mt-auto">
              <Button
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                onClick={() => handleFeature("/nutrition-analysis", "Nutrition Analysis", true)}
              >
                {hasPremiumAccess ? (
                  <Camera className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Lock className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                )}
                Analyze Image
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </CardSpotlight>
      </div>

      {/* Enhanced Call to Action Section - Only show for non-premium users */}
      {!hasPremiumAccess && (
      <div className="relative mt-20 mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-teal-600/10 to-emerald-700/10 rounded-3xl blur-xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-green-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative bg-gradient-to-br from-slate-50/80 to-green-50/80 dark:from-slate-900/80 dark:to-green-950/80 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-2xl p-8 md:p-12 overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Unlock Premium Features
              </h2>
              <div className="p-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 rounded-full">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get advanced AI-powered image nutrition analysis and priority support 
              for your health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Image Analysis</h3>
              <p className="text-sm text-muted-foreground">AI-powered meal photo analysis</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Advanced AI</h3>
              <p className="text-sm text-muted-foreground">Enhanced AI recommendations</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Priority Support</h3>
              <p className="text-sm text-muted-foreground">24/7 expert nutrition guidance</p>
            </div>
          </div>

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 hover:from-green-700 hover:via-teal-700 hover:to-emerald-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              onClick={() => router.push("/pricing")}
            >
              <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              View Pricing Plans
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
            You have full access to all Nutri Culture features. Start your personalized nutrition journey today!
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <Button
               className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
               onClick={() => router.push("/dashboard")}
             >
              <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
               View Dashboard
               <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
             </Button>
           </div>
         </div>
       </div>
       )}
     </main>
   );
 }
