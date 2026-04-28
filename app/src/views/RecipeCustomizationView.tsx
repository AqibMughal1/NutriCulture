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
    
    try {
      const response = await fetch("/api/recipe-customization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          availableIngredients,
          bmiData,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate customized recipes");

      const data = await response.json();
      setSubstitutedRecipes(data.recipes);
      toast.success("Healthy substitute recipes generated!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating customized recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Recipe Substitute Generator</CardTitle>
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
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
