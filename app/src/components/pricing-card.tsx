"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Check, Sparkle, Crown, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CardSpotlight } from "@/components/ui/card-spotlight";

// Update Tiers Here
export const tiers = [
  {
    name: "Free Tier",
    price: "0",
    features: [
      "BMI Calculator",
      "AI Meal Suggestions",
      "Ingredient Substitution",
      "Recipe Customization",
      "Healthy Recipes",
      "Basic nutrition tracking",
      "Community support",
      "Email support (48-hour response)",
    ],
    cta: "Get Started Free",
    yourProduct: false,
    description: "Perfect for starting your nutrition journey",
  },
  {
    name: "NutriCulture Pro",
    priceBefore: "$19.99",
    price: "9.99",
    features: [
      "Everything in Free Tier",
      "Image-based Nutrition Analysis",
      "Advanced AI meal planning",
      "Personalized nutrition coaching",
      "Unlimited meal suggestions",
      "Priority support 24/7",
      "Detailed nutritional breakdowns",
      "Custom meal plan generation",
      "Progress tracking & analytics",
      "Access to premium recipes",
      "Dedicated nutritionist support",
      "Early access to new features",
    ],
    cta: "Upgrade to Pro",
    yourProduct: true,
    description: "Complete solution for your personalized nutrition journey",
  },
];

export const PricingCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const router = useRouter();

  const onClick = async () => {
    if (!session) {
      toast("👇 Sign in to purchase!");
      router.push("/login");
      return;
    }
    try {
      setIsLoading(true);
      const { error } = await authClient.subscription.upgrade({
        plan: "pro",
        successUrl: "/",
        cancelUrl: "/",
      });
      if (error) {
        toast.error(error?.message || "An error occurred! Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreeTier = () => {
    router.push("/get-started");
  };

  return (
    <section id="pricing" className="scroll-mt-4 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center flex flex-col gap-4 md:gap-6 mb-8 md:mb-16">
        <div className="space-y-3 md:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight px-4">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Start free or upgrade to unlock powerful AI-powered nutrition features
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full"></div>
        </div>
      </div>

      {/* Why Choose NutriCulture - Enhanced */}
      <div className="w-full mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 rounded-3xl p-8 md:p-12 border border-green-200/50 dark:border-green-500/30 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-400/20 to-teal-400/20 dark:from-green-500/10 dark:to-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-emerald-400/20 dark:from-teal-500/10 dark:to-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Sparkle className="h-4 w-4" />
                Trusted by 10,000+ Users
                <Sparkle className="h-4 w-4" />
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 dark:from-green-400 dark:via-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Why NutriCulture is Your Best Choice
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who have improved their health by <span className="font-bold text-green-600 dark:text-green-400">85%</span> and 
                achieved their nutrition goals <span className="font-bold text-teal-600 dark:text-teal-400">3x faster</span> with our AI-powered platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <CardSpotlight className="group relative text-center p-6 rounded-xl md:rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/50 dark:to-emerald-950/50 dark:border-green-600 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 shadow-2xl hover:shadow-3xl">
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Personalized Plans</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Get customized meal plans tailored to your health goals, dietary preferences, and nutritional needs in minutes.</p>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">AI-Powered</div>
                </div>
              </CardSpotlight>
              
              <CardSpotlight className="group relative text-center p-6 rounded-xl md:rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-950/50 dark:to-cyan-950/50 dark:border-teal-600 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 shadow-2xl hover:shadow-3xl">
                <div className="relative z-10">
                  <div className="bg-teal-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Better Health Outcomes</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Users report 85% improvement in health metrics and achieve their nutrition goals 3x faster with our guidance.</p>
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">85% Better</div>
                </div>
              </CardSpotlight>
              
              <CardSpotlight className="group relative text-center p-6 rounded-xl md:rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/50 dark:to-emerald-950/50 dark:border-green-600 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 shadow-2xl hover:shadow-3xl">
                <div className="relative z-10">
                  <div className="bg-amber-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">24/7 Nutrition Support</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Get instant help from certified nutritionists whenever you need it. Your health journey is our priority.</p>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Always Here</div>
                </div>
              </CardSpotlight>
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div>⭐⭐⭐⭐⭐ 4.9/5 from 2,000+ reviews</div>
                <div>💚 10,000+ healthy users</div>
                <div>🎯 95% goal achievement rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-16">
        {tiers.map((tier, index) => (
          <CardSpotlight
            key={tier.name}
            className={`group relative flex flex-col justify-between w-full max-w-[400px] mx-auto min-h-[600px] md:h-[700px] p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-3xl overflow-hidden ${
              tier.yourProduct 
                ? 'border-2 border-teal-500 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-950/50 dark:to-cyan-950/50 dark:border-teal-600' 
                : 'border-2 border-green-500 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/50 dark:to-emerald-950/50 dark:border-green-600'
            }`}
          >
            {/* Free/Popular badge */}
            {tier.yourProduct ? (
              <div className="absolute top-2 md:top-1/2 md:-translate-y-1/2 right-2 md:right-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold shadow-lg flex items-center gap-1 z-20">
                <Crown className="h-3 w-3" />
                <span className="hidden sm:inline">Most Popular</span>
                <span className="sm:hidden">Popular</span>
              </div>
            ) : (
              <div className="absolute top-2 md:top-1/2 md:-translate-y-1/2 right-2 md:right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold shadow-lg flex items-center gap-1 z-20">
                <Rocket className="h-3 w-3" />
                Free Forever
              </div>
            )}

            {/* Card Content */}
            <div className="flex-1 relative z-10 flex flex-col pt-8 md:pt-12">
              <div className="text-center mb-6">
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${tier.yourProduct ? "text-teal-600 dark:text-teal-400" : "text-green-600 dark:text-green-400"}`}>
                  {tier.name}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <div className="text-center mb-8">
                {tier.priceBefore && (
                  <span className="font-semibold mr-2 line-through text-lg opacity-75 text-muted-foreground">
                    {tier.priceBefore}
                  </span>
                )}
                <span className="text-4xl md:text-5xl font-bold text-foreground">${tier.price}</span>
                <span className="text-muted-foreground text-lg">/month</span>
              </div>

              <ul className="space-y-3 md:space-y-4 mb-8 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${tier.yourProduct ? "text-teal-500" : "text-green-500"}`} />
                    <span className="text-foreground text-sm md:text-base leading-6">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-auto pt-6 relative z-50">
                <Button
                  onClick={tier.yourProduct ? onClick : handleFreeTier}
                  disabled={tier.yourProduct ? isLoading : false}
                  className={`w-full py-4 md:py-6 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative z-50 cursor-pointer text-base md:text-lg ${
                    tier.yourProduct 
                      ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  {tier.yourProduct && isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      {tier.cta}
                      {tier.yourProduct ? (
                        <Sparkle className="ml-2 h-4 w-4" />
                      ) : (
                        <Rocket className="ml-2 h-4 w-4" />
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardSpotlight>
        ))}
      </div>

      {/* Money Back Guarantee */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-6 md:p-8 border-2 border-green-200 dark:border-green-800 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full p-2 md:p-3">
              <Check className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
              30-Day Money-Back Guarantee
            </h3>
          </div>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Not satisfied? Get a full refund within 30 days. No questions asked. We're confident you'll love NutriCulture!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base font-semibold text-green-600 dark:text-green-400">
            <span>✅ Cancel anytime</span>
            <span>✅ No setup fees</span>
            <span>✅ Full refund guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};