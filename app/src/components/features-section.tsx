"use client";

import { motion } from "motion/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Apple, Zap, Heart, Brain, UtensilsCrossed, Camera } from "lucide-react";

const features = [
  {
    icon: <Apple className="w-8 h-8" />,
    title: "AI Meal Suggestions",
    description: "Get personalized meal recommendations based on your preferences, health goals, and nutritional needs.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    title: "Ingredient Substitution",
    description: "Transform any recipe into a healthier version with AI-powered ingredient alternatives.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Health Goal Tracking",
    description: "Track your nutrition goals with detailed insights on proteins, vitamins, fats, and more.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Smart Recipe Generator",
    description: "Discover healthy South Asian and Middle Eastern dishes tailored to your dietary preferences.",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Image Nutrition Analysis",
    description: "Upload a meal photo and instantly get detailed nutritional breakdown and analysis.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Recipe Customization",
    description: "Edit and modify AI suggestions to match your available ingredients and preferences.",
    color: "from-teal-500 to-green-500"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for personalized nutrition guidance, meal planning, and healthy lifestyle management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardSpotlight className="h-full p-8 group cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color} text-white transform group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 