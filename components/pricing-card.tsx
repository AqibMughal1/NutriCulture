"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Check, Sparkle, Crown, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CardSpotlight } from "./ui/card-spotlight";
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";

// Update Tiers Here
export const tiers = [
  {
    name: "Free Tier",
    price: "0",
    features: [
      "New Deployment Configuration Guide",
      "Basic cloud deployment recommendations",
      "Step-by-step setup instructions",
      "Community support",
      "Basic templates and examples",
      "Limited to 5 configurations per month",
      "Email support (48-hour response)",
    ],
    cta: "Get Started Free",
    yourProduct: false,
    description: "Perfect for getting started with cloud deployments",
  },
  {
    name: "OptimalCloud Pro",
    priceBefore: "$599",
    price: "299",
    features: [
      "Everything in Free Tier",
      "Existing Project Optimization",
      "Custom Deployment Requirements",
      "Upload Config for Optimization",
      "Unlimited configurations",
      "Priority support 24/7",
      "Advanced AI recommendations",
      "Cost optimization analysis",
      "Performance optimization",
      "Custom SLA agreements",
      "Dedicated account manager",
      "Access to beta features",
    ],
    cta: "Upgrade to Pro",
    yourProduct: true,
    description: "Complete solution for professional cloud optimization",
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

  const Step = ({ title }: { title: string }) => {
    return (
      <li className="flex gap-2 items-start">
        <CheckIcon />
        <p className="text-white">{title}</p>
      </li>
    );
  };

  const CheckIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-blue-500 mt-1 shrink-0"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
          fill="currentColor"
          strokeWidth="0"
        />
      </svg>
    );
  };

  return (
    <section id="pricing" className="scroll-mt-4">
      <div className="mx-auto flex flex-col items-center pb-8 md:mt-20">
        <h2 className="pb-4 text-5xl font-extrabold text-foreground">
          Choose Your Plan
        </h2>
        <p className="text-md opacity-50 max-w-lg text-center">
          Start free or upgrade to unlock powerful optimization features
        </p>
      </div>

      {/* Why Choose OptimalCloud - Enhanced */}
      <div className="w-full max-w-6xl mx-auto mb-16 px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 rounded-3xl p-8 md:p-12 border border-foreground/10 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <Sparkle className="h-4 w-4" />
                Trusted by 10,000+ Developers
                <Sparkle className="h-4 w-4" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Why OptimalCloud is Your Best Choice
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers who have reduced their cloud costs by <span className="font-bold text-green-600">65%</span> and 
                improved deployment speed by <span className="font-bold text-blue-600">10x</span> with our AI-powered platform.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-blue-200/50 dark:border-blue-800/50">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Rocket className="h-8 w-8 text-white dark:text-black" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">Deploy in Minutes</h4>
                <p className="text-muted-foreground mb-4">Setup your cloud infrastructure 10x faster with our AI-guided deployment process. No more weeks of configuration!</p>
                <div className="text-2xl font-bold text-blue-600">10x Faster</div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-green-200/50 dark:border-green-800/50">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">Cut Costs by 65%</h4>
                <p className="text-muted-foreground mb-4">Our intelligent optimization algorithms automatically reduce your cloud spending without compromising performance.</p>
                <div className="text-2xl font-bold text-green-600">Save $1000s</div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-purple-200/50 dark:border-purple-800/50">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">24/7 Expert Support</h4>
                <p className="text-muted-foreground mb-4">Get instant help from certified cloud architects whenever you need it. Your success is our priority.</p>
                <div className="text-2xl font-bold text-purple-600">Always Here</div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 text-center">
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-sm font-semibold">⭐⭐⭐⭐⭐ 4.9/5 from 2,000+ reviews</div>
                <div className="text-sm font-semibold">💰 $50M+ in cloud costs saved</div>
                <div className="text-sm font-semibold">🚀 99.9% uptime guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col sm:place-items-center md:flex-row items-center justify-center gap-8 mt-10 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <CardSpotlight
            key={tier.name}
            className={`relative flex shadow-xl flex-col justify-between w-full max-w-[450px] h-[700px] p-8 transition-all duration-300 hover:scale-[1.02] ${
              tier.yourProduct 
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-950/20 to-purple-950/20' 
                : 'border border-green-500 bg-gradient-to-br from-green-950/20 to-emerald-950/20'
            }`}
          >
            {/* Free/Popular badge */}
            {tier.yourProduct ? (
              <div className="px-4 py-2 text-white text-sm bg-gradient-to-r from-blue-600 to-purple-600 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
                <Crown className="h-3 w-3" />
                Most Popular
              </div>
            ) : (
              <div className="px-4 py-2 text-white text-sm bg-gradient-to-r from-green-600 to-emerald-600 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
                <Rocket className="h-3 w-3" />
                Free Forever
              </div>
            )}

            {/* Card Content */}
            <div className="flex-1 relative z-10 flex flex-col">
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${tier.yourProduct ? "text-blue-400" : "text-green-400"}`}>
                  {tier.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {tier.description}
                </p>
              </div>

              <div className="text-center mb-8">
                {tier.priceBefore && (
                  <span className="font-semibold mr-2 line-through text-lg opacity-75 text-muted-foreground">
                    {tier.priceBefore}
                  </span>
                )}
                <span className="text-5xl font-bold text-white">${tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 mt-1 ${tier.yourProduct ? "text-blue-400" : "text-green-400"}`} />
                    <span className="text-white text-sm leading-6">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - Now inside the card content */}
              <div className="mt-auto pt-6 relative z-50">
                <Button
                  onClick={tier.yourProduct ? onClick : handleFreeTier}
                  disabled={tier.yourProduct ? isLoading : false}
                  className={`w-full py-4 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative z-50 cursor-pointer ${
                    tier.yourProduct 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
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
      <div className="text-center mt-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-green-500 text-white rounded-full p-2">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
              30-Day Money-Back Guarantee
            </h3>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Not satisfied? Get a full refund within 30 days. No questions asked. We're confident you'll love OptimalCloud!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-green-600">
            <span>✅ Cancel anytime</span>
            <span>✅ No setup fees</span>
            <span>✅ Full refund guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};