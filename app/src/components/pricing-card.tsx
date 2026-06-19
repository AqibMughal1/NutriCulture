"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Check, Sparkle, Crown, Rocket, Zap, Shield, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

      {/* Why Choose NutriCulture */}
      <div className="w-full mb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-teal-50 to-emerald-50 dark:from-gray-900/80 dark:via-gray-900/90 dark:to-gray-900/80 rounded-3xl p-8 md:p-12 border border-green-200/50 dark:border-green-500/20 shadow-2xl">
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
              {[
                {
                  icon: Rocket,
                  title: "Personalized Plans",
                  desc: "Get customized meal plans tailored to your health goals, dietary preferences, and nutritional needs in minutes.",
                  stat: "AI-Powered",
                  color: "green",
                  iconBg: "from-green-500 to-green-600",
                },
                {
                  icon: Zap,
                  title: "Better Health Outcomes",
                  desc: "Users report 85% improvement in health metrics and achieve their nutrition goals 3x faster with our guidance.",
                  stat: "85% Better",
                  color: "teal",
                  iconBg: "from-teal-500 to-teal-600",
                },
                {
                  icon: Crown,
                  title: "24/7 Nutrition Support",
                  desc: "Get instant help from certified nutritionists whenever you need it. Your health journey is our priority.",
                  stat: "Always Here",
                  color: "emerald",
                  iconBg: "from-emerald-500 to-emerald-600",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative text-center p-6 md:p-8 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-gray-200/60 dark:border-white/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-green-300 dark:hover:border-green-500/30"
                >
                  <div className={`bg-gradient-to-br ${item.iconBg} rounded-2xl w-14 h-14 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{item.desc}</p>
                  <div className={`text-lg font-bold text-${item.color}-600 dark:text-${item.color}-400`}>{item.stat}</div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span>4.9/5 from 2,000+ reviews</span>
                </div>
                <div>💚 10,000+ healthy users</div>
                <div>🎯 95% goal achievement rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-16">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`group relative flex flex-col w-full rounded-2xl md:rounded-3xl transition-all duration-500 overflow-hidden ${
              tier.yourProduct
                ? "shadow-[0_0_40px_-8px_rgba(20,184,166,0.3)] hover:shadow-[0_0_60px_-8px_rgba(20,184,166,0.45)]"
                : "shadow-xl hover:shadow-2xl"
            }`}
          >
            {/* Card border glow */}
            <div className={`absolute inset-0 rounded-2xl md:rounded-3xl p-[1.5px] ${
              tier.yourProduct
                ? "bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-500"
                : "bg-gradient-to-br from-green-400/60 via-emerald-400/60 to-green-500/60"
            }`}>
              <div className="absolute inset-[1.5px] rounded-[calc(1.5rem-1.5px)] md:rounded-[calc(1.5rem-1.5px)] bg-white dark:bg-gray-950"></div>
            </div>

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                {tier.yourProduct ? (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-500/25">
                    <Crown className="h-3.5 w-3.5" />
                    Most Popular
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/25">
                    <Rocket className="h-3.5 w-3.5" />
                    Free Forever
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="text-center mb-6">
                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                  tier.yourProduct
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent"
                }`}>
                  {tier.name}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  {tier.priceBefore && (
                    <span className="text-lg line-through text-muted-foreground/60 mr-1">
                      {tier.priceBefore}
                    </span>
                  )}
                  <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                    ${tier.price}
                  </span>
                  <span className="text-muted-foreground text-base font-medium">/mo</span>
                </div>
                {tier.priceBefore && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    <Zap className="h-3 w-3" />
                    Save 50% — Limited time offer
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className={`h-px mb-6 ${
                tier.yourProduct
                  ? "bg-gradient-to-r from-transparent via-teal-300/40 dark:via-teal-500/20 to-transparent"
                  : "bg-gradient-to-r from-transparent via-green-300/40 dark:via-green-500/20 to-transparent"
              }`}></div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                      tier.yourProduct
                        ? "bg-teal-100 dark:bg-teal-500/15"
                        : "bg-green-100 dark:bg-green-500/15"
                    }`}>
                      <Check className={`h-3 w-3 ${
                        tier.yourProduct ? "text-teal-600 dark:text-teal-400" : "text-green-600 dark:text-green-400"
                      }`} />
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button
                  onClick={tier.yourProduct ? onClick : handleFreeTier}
                  disabled={tier.yourProduct ? isLoading : false}
                  className={`w-full py-5 md:py-6 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer text-sm md:text-base group/btn ${
                    tier.yourProduct 
                      ? "bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 hover:from-teal-500 hover:via-cyan-500 hover:to-teal-500 shadow-teal-500/25 hover:shadow-teal-500/40" 
                      : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-green-500/25 hover:shadow-green-500/40"
                  }`}
                >
                  {tier.yourProduct && isLoading ? (
                    "Processing..."
                  ) : (
                    <span className="flex items-center gap-2">
                      {tier.cta}
                      {tier.yourProduct ? (
                        <Sparkle className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                      ) : (
                        <Rocket className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      )}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Money Back Guarantee */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-6 md:p-8 border border-green-200/60 dark:border-green-500/15 shadow-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full p-2.5 shadow-lg shadow-green-500/25">
                <Shield className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                30-Day Money-Back Guarantee
              </h3>
            </div>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              Not satisfied? Get a full refund within 30 days. No questions asked. We&apos;re confident you&apos;ll love NutriCulture!
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base font-semibold text-green-600 dark:text-green-400">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Cancel anytime</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> No setup fees</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Full refund guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};