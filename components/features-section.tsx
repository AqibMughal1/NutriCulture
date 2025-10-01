"use client";

import { motion } from "motion/react";
import { CardSpotlight } from "./ui/card-spotlight";
import { Cloud, Zap, Shield, Cog, Rocket, Globe } from "lucide-react";

const features = [
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Multi-Cloud Support",
    description: "Deploy seamlessly across AWS, Azure, and Google Cloud Platform with unified management.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Automated deployment pipelines that get your applications live in minutes, not hours.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Built-in security scanning, compliance checks, and encrypted deployment channels.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Cog className="w-8 h-8" />,
    title: "Smart Configuration",
    description: "AI-powered configuration optimization based on your application's specific needs.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Auto-Scaling",
    description: "Dynamic resource allocation that scales with your traffic and optimizes costs.",
    color: "from-red-500 to-rose-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global CDN",
    description: "Worldwide content delivery network for optimal performance across all regions.",
    color: "from-indigo-500 to-blue-500"
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
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to deploy, manage, and scale your applications in the cloud with confidence.
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