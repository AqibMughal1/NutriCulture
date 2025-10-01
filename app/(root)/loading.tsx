"use client";

import { Progress } from "@/components/ui/progress";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 p-1"
            >
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
            </motion.div>
            
            {/* Pulse effect */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold text-foreground mb-2">
            OptimalCloud.Ai
          </h2>
          <p className="text-sm text-muted-foreground">
            Optimizing your cloud experience...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-64"
        >
          <Progress 
            value={progress} 
            variant="purple"
            className="h-2 bg-secondary/50"
          />
          <div className="mt-2 text-center">
            <span className="text-xs text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex space-x-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
