"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const stats = [
  {
    number: 50000,
    suffix: "+",
    label: "Meals Analyzed",
    description: "AI-powered nutrition analysis for healthier choices"
  },
  {
    number: 10000,
    suffix: "+",
    label: "Active Users",
    description: "People transforming their health with personalized nutrition"
  },
  {
    number: 95,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Users achieving their health and nutrition goals"
  },
  {
    number: 24,
    suffix: "/7",
    label: "AI Support",
    description: "Round-the-clock AI nutritionist available anytime"
  }
];

interface CounterProps {
  target: number;
  suffix: string;
}

const Counter = ({ target, suffix }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#10B981"
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the growing community of health-conscious individuals who trust Nutri Culture for their nutrition journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter target={stat.number} suffix={stat.suffix} />
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-400 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 