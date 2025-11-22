import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calculator,
  Apple,
  UtensilsCrossed,
  Edit,
  ChefHat,
  Camera,
  CheckCircle,
  ArrowRight,
  HeadphonesIcon,
  Heart,
  Brain,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";

const services = [
  {
    id: "bmi-calculator",
    icon: Calculator,
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index instantly and get personalized health category assessment. Optionally send your BMI to AI for customized nutrition advice.",
    features: [
      "Instant BMI calculation",
      "Health category assessment",
      "Optional AI-powered advice",
      "Track your health metrics"
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20",
    popular: true,
    route: "/bmi-calculator",
    free: true
  },
  {
    id: "ai-meal-suggestions",
    icon: Apple,
    title: "AI Meal Suggestions",
    description: "Get personalized meal recommendations based on your dietary preferences, health goals, and nutritional requirements with detailed protein, vitamin, and fat information.",
    features: [
      "Personalized meal plans",
      "Health goal consideration",
      "Detailed nutrition breakdown",
      "Preference-based suggestions"
    ],
    color: "from-teal-500 to-cyan-500",
    bgColor: "from-teal-50/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20",
    popular: false,
    route: "/ai-meal-suggestions",
    free: true
  },
  {
    id: "ingredient-substitution",
    icon: UtensilsCrossed,
    title: "Ingredient Substitution",
    description: "Transform any recipe into a healthier version by replacing ingredients with AI-suggested healthier alternatives that maintain taste and nutrition.",
    features: [
      "Recipe analysis",
      "Healthier alternatives",
      "Nutrition optimization",
      "Taste preservation"
    ],
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20",
    popular: false,
    route: "/ingredient-substitution",
    free: true
  },
  {
    id: "recipe-customization",
    icon: Edit,
    title: "Recipe Customization",
    description: "Edit and modify AI-generated recipe suggestions to match your available ingredients and dietary preferences. Full control over your meal planning.",
    features: [
      "Edit AI suggestions",
      "Ingredient replacement",
      "Custom modifications",
      "Updated recommendations"
    ],
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20",
    popular: false,
    route: "/recipe-customization",
    free: true
  },
  {
    id: "healthy-recipes",
    icon: ChefHat,
    title: "Healthy Recipes",
    description: "Discover healthy South Asian and Middle Eastern dishes tailored to your preferences with filters for calorie range, cuisine type, and dietary restrictions.",
    features: [
      "South Asian & Middle Eastern cuisine",
      "Calorie range filtering",
      "Cuisine preferences",
      "Personalized recommendations"
    ],
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50/50 to-red-50/50 dark:from-orange-900/20 dark:to-red-900/20",
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
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50/50 to-rose-50/50 dark:from-pink-900/20 dark:to-rose-900/20",
    popular: false,
    route: "/nutrition-analysis",
    free: false
  }
];

const supportTiers = [
  {
    name: "Free",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Access to 5 free modules",
      "Basic AI meal suggestions",
      "BMI calculator",
      "Community support"
    ],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20"
  },
  {
    name: "Premium",
    price: "$9.99/month",
    description: "For health enthusiasts",
    features: [
      "All 6 modules unlocked",
      "Image nutrition analysis",
      "Priority AI support",
      "Advanced recommendations"
    ],
    color: "from-teal-500 to-cyan-500",
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
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20"
  }
];

export default function ServicesView() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-6 mt-20">
        {/* Header Section */}
        <div className="text-center flex flex-col gap-6 mb-32">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Six powerful modules to transform your nutrition journey with AI-powered guidance and personalized recommendations
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 rounded-full"></div>
          </div>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service) => (
            <Card key={service.id} className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-foreground/10 hover:border-primary/30 bg-gradient-to-br ${service.bgColor} backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl`}>
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                    Popular
                  </Badge>
                </div>
              )}
              {service.free ? (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                    FREE
                  </Badge>
                </div>
              ) : (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-lg">
                    PREMIUM
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${service.color} rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href={service.route}>
                  <Button className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg text-white border-0 transition-all duration-300 group-hover:scale-[1.02]`}>
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Tiers Section */}
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
              <Card key={tier.name} className={`group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-foreground/10 hover:border-primary/30 bg-gradient-to-br ${tier.bgColor} backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl`}>
                {tier.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 shadow-lg">
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4 relative z-10 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${tier.color} rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300`}>
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                    {tier.name}
                  </CardTitle>
                  <div className="text-3xl font-bold mb-2">{tier.price}</div>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={tier.name === "Free" ? "/get-started" : "/pricing"}>
                    <Button className={`w-full bg-gradient-to-r ${tier.color} hover:shadow-lg text-white border-0 transition-all duration-300 group-hover:scale-[1.02]`}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-50 via-teal-50 to-emerald-50 dark:from-green-900/20 dark:via-teal-900/20 dark:to-emerald-900/20 rounded-3xl p-16 border border-foreground/10 shadow-xl mt-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Let's discuss how NutriCulture can help transform your nutrition journey and improve your health with AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/get-started">
              <Button variant="outline" className="px-8 py-3 rounded-xl font-semibold border-2 border-green-600 hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-950/30 transition-all duration-300">
                Get Started Free
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
