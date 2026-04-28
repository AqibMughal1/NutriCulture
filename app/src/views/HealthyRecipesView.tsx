"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBMI } from "@/contexts/bmi-context";
import { useRouter } from "next/navigation";
import { ArrowRight, ChefHat, RefreshCw } from "lucide-react";
import { toast } from "sonner";

/**
 * Health Aware Recipe Generator View - Step 4
 * 
 * Users enter ingredients they have
 * System suggests healthy recipes based on BMI goal
 * Provides healthy alternatives instead of unhealthy dishes
 */
export default function HealthyRecipesView() {
  const { bmiData } = useBMI();
  const router = useRouter();
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipes = async () => {
    if (!ingredients.trim()) {
      toast.error("Please enter the ingredients you have");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/healthy-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          bmiData,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate healthy recipes");

      const data = await response.json();
      setRecipes(data.recipes);
      toast.success("Healthy recipes generated based on your goal!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating healthy recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Health Aware Recipe Generator</CardTitle>
            <CardDescription className="text-base">
              Enter the ingredients you have, and we'll suggest healthy recipes tailored to your health goals.
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
              <Label htmlFor="ingredients" className="text-base font-semibold">What Ingredients Do You Have?</Label>
              <Textarea
                id="ingredients"
                placeholder="e.g., chicken, rice, vegetables, olive oil, tomatoes, onions, garlic..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={5}
              />
              <p className="text-sm text-muted-foreground">
                Separate ingredients with commas. The system will suggest healthy alternatives based on your goal.
              </p>
            </div>

            <Button 
              onClick={handleGenerateRecipes} 
              disabled={loading || !ingredients.trim()}
              className="w-full"
              size="lg"
            >
              {loading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Generating Healthy Recipes..." : "Generate Healthy Recipes"}
            </Button>
            
            {recipes && (
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-bold">Recommended Healthy Recipes</h3>
                <div className="space-y-4">
                  {recipes.map((recipe, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <ChefHat className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <h4 className="text-xl font-bold mb-1">{recipe.name}</h4>
                            <p className="text-muted-foreground mb-3">{recipe.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
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
                            <div className="mb-3">
                              <p className="text-sm font-semibold mb-1">Ingredients:</p>
                              <p className="text-sm text-muted-foreground">{recipe.ingredients}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-semibold mb-1">Health Benefits:</p>
                              <p className="text-sm text-green-700 dark:text-green-300">{recipe.healthBenefits}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-1">Instructions:</p>
                              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">{recipe.instructions}</pre>
                            </div>
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
