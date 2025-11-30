"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useBMI } from "@/contexts/bmi-context";
import { useRouter } from "next/navigation";
import { ArrowRight, Upload, X, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

/**
 * Food Nutrition Analysis View - Step 2
 * 
 * Users can upload an image of their meal with optional weight
 * Returns dummy response with dish name, weight, and nutrition breakdown
 */
export default function NutritionAnalysisView() {
  const { bmiData } = useBMI();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [estimatedWeight, setEstimatedWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"g" | "oz" | "lb">("g");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    
    setLoading(true);
    
    // Dummy response - in real implementation, this would call an AI model
    setTimeout(() => {
      const dummyDishes = [
        { name: "Grilled Chicken Salad", weight: estimatedWeight || "250g" },
        { name: "Pasta Carbonara", weight: estimatedWeight || "300g" },
        { name: "Vegetable Stir Fry", weight: estimatedWeight || "200g" },
        { name: "Beef Burger", weight: estimatedWeight || "350g" },
        { name: "Salmon with Rice", weight: estimatedWeight || "400g" },
      ];
      
      const randomDish = dummyDishes[Math.floor(Math.random() * dummyDishes.length)];
      
      // Generate dummy nutrition data
      const weightInGrams = weightUnit === "g" 
        ? parseFloat(estimatedWeight) || 250
        : weightUnit === "oz"
        ? (parseFloat(estimatedWeight) || 8.8) * 28.35
        : (parseFloat(estimatedWeight) || 0.55) * 453.592;

      const analysisData = {
        dishName: randomDish.name,
        weight: `${weightInGrams.toFixed(0)}g`,
        nutrition: {
          calories: Math.round(weightInGrams * 1.5),
          protein: `${(weightInGrams * 0.15).toFixed(1)}g`,
          carbs: `${(weightInGrams * 0.25).toFixed(1)}g`,
          fats: `${(weightInGrams * 0.08).toFixed(1)}g`,
          fiber: `${(weightInGrams * 0.03).toFixed(1)}g`,
          sodium: `${(weightInGrams * 0.4).toFixed(0)}mg`,
        },
        vitamins: {
          vitaminA: "450 IU",
          vitaminC: "25mg",
          vitaminD: "2.5 IU",
          vitaminE: "3.2mg",
          vitaminK: "45mcg",
        },
        minerals: {
          calcium: "120mg",
          iron: "2.5mg",
          potassium: "350mg",
          magnesium: "45mg",
        },
      };

      setAnalysis(analysisData);
      setLoading(false);
      toast.success("Nutrition analysis completed!");
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Food Nutrition Analysis - Step 2</CardTitle>
            <CardDescription className="text-base">
              Upload a picture of your meal and optionally provide the estimated weight to get detailed nutrition information.
            </CardDescription>
            <div className="flex items-center justify-between gap-4 mt-2">
              {bmiData.goal && (
                <div className="flex-1 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Your Goal:</strong> {bmiData.goal === "lose" ? "Lose Weight" : bmiData.goal === "gain" ? "Gain Weight" : "Maintain Weight"}
                  </p>
                </div>
              )}
              <Link href="/nutrition-chat">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with AI
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <Label htmlFor="image" className="text-base font-semibold">Upload Meal Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                {preview ? (
                  <div className="relative">
                    <img 
                      src={preview} 
                      alt="Meal preview" 
                      className="max-w-full h-auto max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <Label htmlFor="image" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 underline">Click to upload</span> or drag and drop
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Weight Input */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Estimated Weight (Optional)</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="e.g., 250"
                  value={estimatedWeight}
                  onChange={(e) => setEstimatedWeight(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as "g" | "oz" | "lb")}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="g">Grams (g)</option>
                  <option value="oz">Ounces (oz)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </div>
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              disabled={loading || !image}
              className="w-full"
              size="lg"
            >
              {loading ? "Analyzing Image..." : "Analyze Nutrition"}
            </Button>
            
            {analysis && (
              <div className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Dish: {analysis.dishName}</h3>
                      <p className="text-muted-foreground">Weight: {analysis.weight}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Calories</p>
                        <p className="text-xl font-bold">{analysis.nutrition.calories}</p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Protein</p>
                        <p className="text-xl font-bold">{analysis.nutrition.protein}</p>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Carbs</p>
                        <p className="text-xl font-bold">{analysis.nutrition.carbs}</p>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Fats</p>
                        <p className="text-xl font-bold">{analysis.nutrition.fats}</p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Fiber</p>
                        <p className="text-xl font-bold">{analysis.nutrition.fiber}</p>
                      </div>
                      <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Sodium</p>
                        <p className="text-xl font-bold">{analysis.nutrition.sodium}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <h4 className="font-semibold mb-2">Vitamins</h4>
                        <div className="space-y-1 text-sm">
                          <p>Vitamin A: {analysis.vitamins.vitaminA}</p>
                          <p>Vitamin C: {analysis.vitamins.vitaminC}</p>
                          <p>Vitamin D: {analysis.vitamins.vitaminD}</p>
                          <p>Vitamin E: {analysis.vitamins.vitaminE}</p>
                          <p>Vitamin K: {analysis.vitamins.vitaminK}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Minerals</h4>
                        <div className="space-y-1 text-sm">
                          <p>Calcium: {analysis.minerals.calcium}</p>
                          <p>Iron: {analysis.minerals.iron}</p>
                          <p>Potassium: {analysis.minerals.potassium}</p>
                          <p>Magnesium: {analysis.minerals.magnesium}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={() => router.push("/ai-meal-suggestions")}
                  className="w-full"
                  size="lg"
                >
                  Continue to Meal Recommender
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
