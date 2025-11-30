"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBMI } from "@/contexts/bmi-context";
import { ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

/**
 * Recipe Substitute Generator View - Step 5
 * 
 * Creates dishes with minimum ingredients
 * Provides healthy alternatives based on user's goal
 */
export default function RecipeCustomizationView() {
  const { bmiData } = useBMI();
  const [availableIngredients, setAvailableIngredients] = useState("");
  const [substitutedRecipes, setSubstitutedRecipes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSubstitutes = async () => {
    if (!availableIngredients.trim()) {
      toast.error("Please enter the ingredients you have available");
      return;
    }

    setLoading(true);
    
    // Dummy response - in real implementation, this would call an AI model
    setTimeout(() => {
      const ingredientList = availableIngredients.split(",").map(i => i.trim()).filter(Boolean);
      
      // Generate minimal ingredient recipes based on goal
      let recipes = [];
      
      if (bmiData.goal === "lose") {
        recipes = [
          {
            name: "Simple Veggie Bowl",
            originalIngredients: "chicken, rice, heavy cream, butter",
            substitutedIngredients: ingredientList.slice(0, 3).join(", ") + " (minimal ingredients)",
            calories: 220,
            protein: "12g",
            carbs: "25g",
            fats: "6g",
            whyHealthy: "Uses minimal ingredients, low in calories, high in fiber",
            instructions: `1. Prepare ${ingredientList[0] || "vegetables"}\n2. Lightly steam or sauté\n3. Season with herbs\n4. Serve simple and fresh`,
          },
          {
            name: "Quick Protein Salad",
            originalIngredients: "fried chicken, white bread, mayo",
            substitutedIngredients: ingredientList.slice(0, 2).join(", ") + " (simple preparation)",
            calories: 180,
            protein: "15g",
            carbs: "15g",
            fats: "5g",
            whyHealthy: "Minimal processing, fresh ingredients, low calorie",
            instructions: `1. Use fresh ${ingredientList[0] || "greens"}\n2. Add ${ingredientList[1] || "protein"} if available\n3. Light dressing\n4. Ready in minutes`,
          },
        ];
      } else if (bmiData.goal === "gain") {
        recipes = [
          {
            name: "High-Calorie Power Mix",
            originalIngredients: "simple salad, water",
            substitutedIngredients: ingredientList.slice(0, 3).join(", ") + " (calorie-dense)",
            calories: 480,
            protein: "28g",
            carbs: "55g",
            fats: "20g",
            whyHealthy: "Uses minimal ingredients but maximizes calories and nutrients",
            instructions: `1. Combine ${ingredientList[0] || "grains"} with ${ingredientList[1] || "protein"}\n2. Add healthy fats\n3. Simple preparation\n4. High calorie content`,
          },
        ];
      } else {
        recipes = [
          {
            name: "Balanced Simple Meal",
            originalIngredients: "processed food, high sodium items",
            substitutedIngredients: ingredientList.slice(0, 3).join(", ") + " (whole foods)",
            calories: 350,
            protein: "20g",
            carbs: "40g",
            fats: "12g",
            whyHealthy: "Minimal ingredients, whole foods, balanced nutrition",
            instructions: `1. Use ${ingredientList[0] || "whole grains"}\n2. Add ${ingredientList[1] || "lean protein"}\n3. Include ${ingredientList[2] || "vegetables"}\n4. Simple and balanced`,
          },
        ];
      }

      setSubstitutedRecipes(recipes);
      setLoading(false);
      toast.success("Healthy substitute recipes generated!");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Recipe Substitute Generator - Step 5</CardTitle>
            <CardDescription className="text-base">
              Enter the minimum ingredients you have, and we'll create healthy dishes tailored to your goal with minimal ingredients.
            </CardDescription>
            {bmiData.goal && (
              <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Your Goal:</strong> {bmiData.goal === "lose" ? "Lose Weight" : bmiData.goal === "gain" ? "Gain Weight" : "Maintain Weight"}
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="ingredients" className="text-base font-semibold">Available Ingredients (Minimum)</Label>
              <Textarea
                id="ingredients"
                placeholder="e.g., rice, chicken, vegetables... (list the minimum ingredients you have)"
                value={availableIngredients}
                onChange={(e) => setAvailableIngredients(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Enter the minimum ingredients you have. We'll create healthy dishes using these, optimized for your goal.
              </p>
            </div>

            <Button 
              onClick={handleGenerateSubstitutes} 
              disabled={loading || !availableIngredients.trim()}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {loading ? "Generating Substitutes..." : "Generate Healthy Substitutes"}
            </Button>
            
            {substitutedRecipes && (
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold">Healthy Substitute Recipes</h3>
                <div className="space-y-4">
                  {substitutedRecipes.map((recipe, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h4 className="text-xl font-bold mb-2">{recipe.name}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded">
                              <p className="text-xs text-muted-foreground">Calories</p>
                              <p className="font-bold">{recipe.calories}</p>
                            </div>
                            <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                              <p className="text-xs text-muted-foreground">Protein</p>
                              <p className="font-bold">{recipe.protein}</p>
                            </div>
                            <div className="p-2 bg-orange-50 dark:bg-orange-950/30 rounded">
                              <p className="text-xs text-muted-foreground">Carbs</p>
                              <p className="font-bold">{recipe.carbs}</p>
                            </div>
                            <div className="p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded">
                              <p className="text-xs text-muted-foreground">Fats</p>
                              <p className="font-bold">{recipe.fats}</p>
                            </div>
                          </div>
                          <div className="mb-3 p-3 bg-red-50 dark:bg-red-950/30 rounded">
                            <p className="text-sm font-semibold mb-1 text-red-700 dark:text-red-300">❌ Instead of:</p>
                            <p className="text-sm text-muted-foreground">{recipe.originalIngredients}</p>
                          </div>
                          <div className="mb-3 p-3 bg-green-50 dark:bg-green-950/30 rounded">
                            <p className="text-sm font-semibold mb-1 text-green-700 dark:text-green-300">✅ Use:</p>
                            <p className="text-sm text-muted-foreground">{recipe.substitutedIngredients}</p>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm font-semibold mb-1">Why This is Healthy:</p>
                            <p className="text-sm text-green-700 dark:text-green-300">{recipe.whyHealthy}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-1">Simple Instructions:</p>
                            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{recipe.instructions}</pre>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                    🎉 You've completed the full workflow! All modules have used your BMI data to provide personalized recommendations.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
