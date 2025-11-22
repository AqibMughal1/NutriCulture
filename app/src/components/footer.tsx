import Link from "next/link";
import { Logo } from "@/components/logo";
import { Heart, Apple, UtensilsCrossed, Calculator, ChefHat, Camera } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 backdrop-blur-lg py-16 mt-20 rounded-t-3xl shadow-2xl border-t border-green-500/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block font-extrabold mb-6">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-4">
              Your personal AI-powered nutritionist. Transform your health journey with personalized meal suggestions, recipe optimization, and dietary insights.
            </p>
            <div className="flex items-center gap-2 text-green-400">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-semibold">Powered by AI</span>
            </div>
          </div>

          {/* Features / Modules */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Our Modules
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/bmi-calculator" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>BMI Calculator</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-meal-suggestions" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <Apple className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>AI Meal Suggestions</span>
                </Link>
              </li>
              <li>
                <Link href="/ingredient-substitution" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <UtensilsCrossed className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Ingredient Substitution</span>
                </Link>
              </li>
              <li>
                <Link href="/healthy-recipes" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <ChefHat className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Healthy Recipes</span>
                </Link>
              </li>
              <li>
                <Link href="/nutrition-analysis" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                  <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Nutrition Analysis</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/get-started" className="hover:text-green-400 transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-green-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-green-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-green-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Connect
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:hello@nutriculture.app"
                  className="hover:text-green-400 transition-colors"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/nutriculture"
                  className="hover:text-green-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nutriculture"
                  className="hover:text-green-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-green-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-green-400">NutriCulture</span>. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-green-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
