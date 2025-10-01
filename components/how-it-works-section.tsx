"use client";

import { motion } from "motion/react";
import { Upload, Settings, Play, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Upload Your Code",
    description: "Simply upload your application code or connect your Git repository. We support all major programming languages and frameworks.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "AI Configuration",
    description: "Our AI analyzes your code and automatically generates optimal cloud configurations tailored to your application's needs.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <Play className="w-8 h-8" />,
    title: "Deploy Instantly",
    description: "Deploy with one click across multiple cloud providers. Monitor the deployment process in real-time with detailed logs.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Go Live",
    description: "Your application is now live and optimized. Enjoy automatic scaling, monitoring, and continuous optimization.",
    color: "from-orange-500 to-orange-600"
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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From code to cloud in four simple steps. Our AI-powered platform handles the complexity so you can focus on building.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <div className="absolute inset-0 w-16 h-16 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-20 -z-10"></div>
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
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
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
            Ready to experience the future of cloud deployment?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}; 