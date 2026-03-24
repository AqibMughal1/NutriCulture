"use client";

import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Button } from "@/components/ui/button";
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
  Heart,
  Brain,
  Rocket,
  MessageCircle,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

const services = [
  {
    id: "bmi-calculator",
    icon: Calculator,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index instantly and get personalized health category assessment. AI uses this to customize your nutrition advice.",
    features: [
      "Instant BMI calculation",
      "Health category assessment",
      "Optional AI-powered advice",
      "Track your health metrics"
    ],
    color: "green",
    popular: false,
    route: "/bmi-calculator",
    free: true
  },
  {
    id: "ai-meal-suggestions",
    icon: Apple,
    title: "AI Meal Suggestions",
    description: "Get personalized meal recommendations based on your dietary preferences, health goals, and nutritional requirements.",
    features: [
      "Personalized meal plans",
      "Health goal consideration",
      "Detailed nutrition breakdown",
      "Preference-based suggestions"
    ],
    color: "teal",
    popular: false,
    route: "/ai-meal-suggestions",
    free: true
  },
  {
    id: "ingredient-substitution",
    icon: UtensilsCrossed,
    title: "Ingredient Substitution",
    description: "Transform any recipe into a healthier version by replacing ingredients with AI-suggested healthier alternatives that maintain taste.",
    features: [
      "Recipe analysis",
      "Healthier alternatives",
      "Nutrition optimization",
      "Taste preservation"
    ],
    color: "blue",
    popular: false,
    route: "/ingredient-substitution",
    free: true
  },
  {
    id: "recipe-customization",
    icon: Edit,
    title: "Recipe Customization",
    description: "Edit and modify AI-generated recipe suggestions to match your available ingredients and dietary preferences. Full control over meals.",
    features: [
      "Edit AI suggestions",
      "Ingredient replacement",
      "Custom modifications",
      "Updated recommendations"
    ],
    color: "purple",
    popular: false,
    route: "/recipe-customization",
    free: true
  },
  {
    id: "healthy-recipes",
    icon: ChefHat,
    title: "Healthy Recipes",
    description: "Discover healthy dishes tailored to your preferences with filters for calorie range, cuisine type, and dietary restrictions.",
    features: [
      "Diverse cuisine options",
      "Calorie range filtering",
      "Cuisine preferences",
      "Personalized recommendations"
    ],
    color: "orange",
    popular: false,
    route: "/healthy-recipes",
    free: true
  },
  {
    id: "nutrition-analysis",
    icon: Camera,
    title: "Nutrition Analysis",
    description: "Upload a photo of your meal and get instant AI-powered analysis identifying proteins, vitamins, fats, and other nutritional components.",
    features: [
      "Image-based analysis",
      "Protein identification",
      "Vitamin & fat breakdown",
      "Detailed nutrition report"
    ],
    color: "pink",
    popular: true,
    route: "/nutrition-analysis",
    free: false
  },
  {
    id: "nutrition-chat",
    icon: MessageCircle,
    title: "Nutrition Chat",
    description: "Chat directly with an AI nutritionist to ask questions, tweak meal plans, or get immediate dietary advice.",
    features: [
      "Ask any nutrition question",
      "Recreate meal plans",
      "Personalized dietary advice",
      "Immediate assistance"
    ],
    color: "indigo",
    popular: false,
    route: "/nutrition-chat",
    free: true
  }
];

const supportTiers = [
  {
    name: "Free",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Access to 6 free modules",
      "Basic AI meal suggestions",
      "BMI calculator",
      "Community support"
    ],
    color: "green",
    bgColor: "from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20",
    popular: false
  },
  {
    name: "Premium",
    price: "$9.99/month",
    description: "For health enthusiasts",
    features: [
      "All 7 modules unlocked",
      "Image nutrition analysis",
      "Priority AI support",
      "Advanced recommendations"
    ],
    color: "teal",
    bgColor: "from-teal-50/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20",
    popular: true
  },
  {
    name: "Pro",
    price: "Custom",
    description: "For nutrition professionals",
    features: [
      "Everything in Premium",
      "Bulk analysis",
      "Custom meal plans",
      "Dedicated support"
    ],
    color: "purple",
    bgColor: "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20",
    popular: false
  }
];

import { authClient } from "@/lib/auth-client";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ServicesView() {
  const user = useCurrentUser();
  const { data: session } = authClient.useSession();
  const hasPremiumAccess = user?.role === "admin" || Boolean(session?.user?.stripeCustomerId);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 mt-14 md:mt-10">
        
        {/* Header Section */}
        <div className="text-center flex flex-col gap-4 md:gap-6 mb-16 md:mb-24">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight px-4">
              Our Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4">
              Seven powerful modules to transform your nutrition journey with AI-powered guidance and personalized recommendations.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full" />
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-32">
          {services.map((service) => {
            const Icon = service.icon;
            // The premium card gets slightly different styling to match GetStartedView
            const isPremiumCard = !service.free;
            
            return (
              <CardSpotlight 
                key={service.id} 
                className={`group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 
                  ${isPremiumCard 
                    ? 'border border-foreground/10 hover:border-pink-500/30 bg-secondary/70 dark:bg-secondary/50' 
                    : `border-2 border-${service.color}-200 dark:border-${service.color}-800 hover:border-${service.color}-400 dark:hover:border-${service.color}-600 bg-gradient-to-br from-${service.color}-50/80 to-${service.color === 'blue' ? 'indigo' : service.color === 'purple' ? 'pink' : service.color === 'orange' ? 'red' : service.color === 'indigo' ? 'purple' : 'emerald'}-50/80 dark:from-${service.color}-950/40 dark:to-${service.color === 'blue' ? 'indigo' : service.color === 'purple' ? 'pink' : service.color === 'orange' ? 'red' : service.color === 'indigo' ? 'purple' : 'emerald'}-950/40`
                  } 
                  backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden`}
              >
                {/* Icon + Title + Badge */}
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className={`p-3 bg-gradient-to-br ${isPremiumCard ? 'from-pink-500 to-rose-500' : `from-${service.color}-500 to-${service.color}-600`} rounded-xl shadow-lg group-hover:shadow-${service.color}-500/25 transition-all duration-300 flex-shrink-0`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold text-foreground group-hover:text-${service.color}-600 transition-colors duration-300 flex-1 leading-tight`}>
                    {service.title}
                  </h3>
                  
                  {isPremiumCard ? (
                    <span className="text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 flex-shrink-0 bg-gradient-to-r from-pink-500 to-rose-500">
                      <Crown className="h-3 w-3" />
                      PREMIUM
                    </span>
                  ) : (
                    <span className={`bg-${service.color}-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex-shrink-0`}>
                      FREE
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
                  {service.description}
                </p>
                
                <ul className="flex flex-col gap-3 flex-1 relative z-10">
                  {service.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-5 relative z-10">
                  <Link href={service.route}>
                    <Button className={`w-full bg-gradient-to-r ${isPremiumCard ? 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700' : `from-${service.color}-600 to-${service.color}-700 hover:from-${service.color}-700 hover:to-${service.color}-800`} text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                      {isPremiumCard ? (
                        <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <Icon className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      )}
                      Try Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </CardSpotlight>
            );
          })}
        </div>

        {/* Support Tiers Section (unchanged visually besides layout tweaks) */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that best fits your nutrition journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTiers.map((tier) => (
              <CardSpotlight 
                key={tier.name} 
                className={`group flex flex-col w-full min-h-[400px] md:h-[460px] p-5 sm:p-6 md:p-7 border-2 border-${tier.color.split('-')[1]}-200 dark:border-${tier.color.split('-')[1]}-800 hover:border-${tier.color.split('-')[1]}-400 dark:hover:border-${tier.color.split('-')[1]}-600 bg-gradient-to-br ${tier.bgColor} backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 overflow-hidden`}
              >
                {/* Header Row: Icon + Title + Badge */}
                <div className="flex items-start justify-between mb-2 relative z-10 w-full">
                  <div className="flex items-center gap-4 flex-1 pr-2">
                    <div className={`p-3 bg-gradient-to-br from-${tier.color.split('-')[1]}-500 to-${tier.color.split('-')[1]}-600 rounded-xl shadow-lg group-hover:shadow-${tier.color.split('-')[1]}-500/25 transition-all duration-300 flex-shrink-0`}>
                      <Heart className="h-7 w-7 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold text-foreground group-hover:text-${tier.color.split('-')[1]}-600 transition-colors duration-300 flex-1 leading-tight`}>
                      {tier.name}
                    </h3>
                  </div>
                  {tier.popular && (
                    <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-lg flex-shrink-0 mt-1">
                      Recommended
                    </span>
                  )}
                </div>

                {/* Price and Description */}
                <div className="relative z-10 mb-6 mt-2 ml-1">
                  <div className="text-3xl font-extrabold mb-1 text-foreground">
                    {tier.price}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {tier.description}
                  </p>
                </div>
                
                {/* Features List */}
                <ul className="flex flex-col gap-3 flex-1 relative z-10">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <div className="mt-6 relative z-10">
                  <Link href={tier.name === "Free" ? "/get-started" : "/pricing"}>
                    <Button className={`w-full bg-gradient-to-r from-${tier.color.split('-')[1]}-600 to-${tier.color.split('-')[1]}-700 hover:from-${tier.color.split('-')[1]}-700 hover:to-${tier.color.split('-')[1]}-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>
              </CardSpotlight>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-green-50/80 via-teal-50/80 to-emerald-50/80 dark:from-slate-900/80 dark:via-green-950/40 dark:to-teal-950/40 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-green-200/50 dark:border-green-800/50 shadow-2xl mt-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-400/20 to-teal-400/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss how NutriCulture can help transform your nutrition journey and improve your health with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 hover:from-green-700 hover:via-teal-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/get-started">
                <Button className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 group hover:scale-105 border-0 bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 text-foreground backdrop-blur-sm">
                  Get Started Free
                  <Rocket className="ml-2 h-4 w-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
