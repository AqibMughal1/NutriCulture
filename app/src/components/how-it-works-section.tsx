"use client";

import { motion } from "motion/react";
import { User, Brain, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    icon: <User className="w-8 h-8" />,
    title: "Set Your Profile",
    description: "Create your profile with health goals, dietary preferences, allergies, and nutritional requirements.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI Analysis",
    description: "Our AI nutritionist analyzes your profile and generates personalized meal suggestions and dietary recommendations.",
    color: "from-teal-500 to-cyan-600"
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8" />,
    title: "Get Recommendations",
    description: "Receive customized recipes, ingredient substitutions, and meal plans tailored to your specific needs.",
    color: "from-blue-500 to-indigo-600"
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From profile to personalized nutrition in three simple steps. Our AI-powered platform makes healthy eating easy and accessible.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Step Number */}
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 rounded-md bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-20`}>
                      {index + 1}
                    </div>
                    <div className="absolute inset-0 w-16 h-16 rounded-md bg-gradient-to-r from-green-500 to-teal-500 animate-pulse opacity-20 -z-10"></div>
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-4 rounded-full bg-gradient-to-r ${step.color} text-white`}
                  >
                    {step.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Connecting Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-teal-500"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to transform your health with AI-powered nutrition?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}; 