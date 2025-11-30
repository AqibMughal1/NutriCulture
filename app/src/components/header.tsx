"use client";

import { Cover } from "@/components/ui/cover";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Sparkles, Heart, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export const Header = () => {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="w-full flex flex-col items-center my-10 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <Highlight className="text-white dark:text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl block mb-4">
                  Your Personal. AI-Powered. Nutritionist
                </Highlight>
                <div className="h-6 md:h-8"></div>
                <Cover className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl block mt-4">
                  NutriCulture
                </Cover>
              </h1>
            </motion.div>

            {/* Decorative Sparkles */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-2 mt-8 mb-6"
            >
              <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
              <Heart className="w-5 h-5 text-teal-400 animate-pulse" />
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </motion.div>
            
            {/* Description with Better Typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-6 mt-4"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground text-center max-w-3xl leading-relaxed font-light">
                Transform your health journey with personalized{" "}
                <span className="font-semibold text-green-400">AI-powered nutrition guidance</span>, 
                {" "}meal suggestions, and{" "}
                <span className="font-semibold text-teal-400">dietary insights</span>
              </p>
              
              {/* CTA Button with Enhanced Design */}
              <Link href="/get-started">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 hover:from-green-700 hover:via-teal-700 hover:to-emerald-700 text-white border-0 py-7 text-lg md:text-xl font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform mt-4"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                      Get Started Now
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </motion.div>
              </Link>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Free to Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-500" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Personalized Plans</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};
