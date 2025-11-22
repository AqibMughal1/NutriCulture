"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Healthy Recipe Generator View
 * 
 * Generates healthy South Asian and Middle Eastern dishes
 * Features:
 * - User preferences
 * - Calorie range filter
 * - Cuisine type filter
 */
export default function HealthyRecipesView() {
  const [preferences, setPreferences] = useState("");
  const [calorieRange, setCalorieRange] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [recipes, setRecipes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipes = async () => {
    // TODO: Implement AI API call to generate recipes based on filters
    setLoading(true);
    // Placeholder for AI integration
    setTimeout(() => {
      setRecipes("Healthy recipe suggestions will appear here...");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Healthy Recipe Generator</CardTitle>
            <CardDescription>
              Get healthy South Asian and Middle Eastern dish recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calorie Range</Label>
                <Input
                  id="calories"
                  placeholder="e.g., 300-500 calories"
                  value={calorieRange}
                  onChange={(e) => setCalorieRange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger id="cuisine">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="south-asian">South Asian</SelectItem>
                    <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="pakistani">Pakistani</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                    <SelectItem value="persian">Persian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">Dietary Preferences</Label>
              <Input
                id="preferences"
                placeholder="e.g., Vegetarian, Gluten-free, Low-carb..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerateRecipes} disabled={loading}>
              {loading ? "Generating Recipes..." : "Generate Recipes"}
            </Button>
            
            {recipes && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Recipe Suggestions:</h3>
                <p className="whitespace-pre-wrap">{recipes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

