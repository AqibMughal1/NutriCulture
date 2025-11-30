"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBMI } from "@/contexts/bmi-context";
import { useRouter } from "next/navigation";
import { ArrowRight, ChefHat } from "lucide-react";
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
    
    // Dummy response - in real implementation, this would call an AI model
    setTimeout(() => {
      const ingredientList = ingredients.split(",").map(i => i.trim()).filter(Boolean);
      
      // Generate recipes based on user goal
      let suggestedRecipes = [];
      
      if (bmiData.goal && bmiData.goal === "lose") {
        suggestedRecipes = [
          {
            name: "Light Vegetable Stir Fry",
            description: "A low-calorie, high-fiber dish perfect for weight loss",
            ingredients: ingredientList.slice(0, 3).join(", ") + " (and more)",
            calories: 250,
            protein: "15g",
            carbs: "30g",
            fats: "8g",
            healthBenefits: "High in fiber, low in calories, promotes satiety",
            instructions: "1. Heat oil in a pan\n2. Add vegetables and stir fry for 5 minutes\n3. Season with herbs and spices\n4. Serve hot",
          },
          {
            name: "Grilled Protein Salad",
            description: "Lean protein with fresh vegetables",
            ingredients: ingredientList.slice(0, 2).join(", ") + " (and more)",
            calories: 300,
            protein: "25g",
            carbs: "20g",
            fats: "10g",
            healthBenefits: "High protein, low carb, helps maintain muscle mass",
            instructions: "1. Grill your protein choice\n2. Prepare fresh salad\n3. Combine and add light dressing\n4. Enjoy",
          },
        ];
      } else if (bmiData.goal === "gain") {
        suggestedRecipes = [
          {
            name: "Protein-Rich Power Bowl",
            description: "High-calorie, nutrient-dense meal for healthy weight gain",
            ingredients: ingredientList.slice(0, 4).join(", ") + " (and more)",
            calories: 550,
            protein: "35g",
            carbs: "60g",
            fats: "18g",
            healthBenefits: "High in protein and healthy fats, promotes muscle growth",
            instructions: "1. Cook grains and proteins\n2. Add healthy fats (avocado, nuts)\n3. Combine all ingredients\n4. Top with seeds",
          },
          {
            name: "Nutrient-Dense Smoothie Bowl",
            description: "Calorie-rich smoothie with toppings",
            ingredients: ingredientList.slice(0, 3).join(", ") + " (and more)",
            calories: 450,
            protein: "20g",
            carbs: "65g",
            fats: "15g",
            healthBenefits: "Easy to digest, high in calories and nutrients",
            instructions: "1. Blend fruits and protein\n2. Add nut butter and seeds\n3. Top with granola\n4. Serve immediately",
          },
        ];
      } else {
        suggestedRecipes = [
          {
            name: "Balanced Meal Plate",
            description: "Well-rounded meal for maintaining healthy weight",
            ingredients: ingredientList.slice(0, 3).join(", ") + " (and more)",
            calories: 400,
            protein: "25g",
            carbs: "45g",
            fats: "12g",
            healthBenefits: "Balanced macronutrients, supports overall health",
            instructions: "1. Prepare lean protein\n2. Add whole grains\n3. Include vegetables\n4. Add healthy fats",
          },
          {
            name: "Mediterranean Style Bowl",
            description: "Heart-healthy Mediterranean-inspired dish",
            ingredients: ingredientList.slice(0, 4).join(", ") + " (and more)",
            calories: 380,
            protein: "20g",
            carbs: "40g",
            fats: "15g",
            healthBenefits: "Rich in antioxidants, supports heart health",
            instructions: "1. Prepare base (quinoa/rice)\n2. Add vegetables and protein\n3. Drizzle with olive oil\n4. Garnish with herbs",
          },
        ];
      }

      setRecipes(suggestedRecipes);
      setLoading(false);
      toast.success("Healthy recipes generated based on your goal!");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Health Aware Recipe Generator - Step 4</CardTitle>
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

                <Button
                  onClick={() => router.push("/ingredient-substitution")}
                  className="w-full"
                  size="lg"
                >
                  Continue to Recipe Substitute Generator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
