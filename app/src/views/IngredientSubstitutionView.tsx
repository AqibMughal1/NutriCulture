"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Ingredient Substitution Generator View
 * 
 * Users can input recipe data, and the AI will suggest healthier ingredient alternatives
 * This maintains the same AI prompting pattern from the existing project
 */
export default function IngredientSubstitutionView() {
  const [recipe, setRecipe] = useState("");
  const [substitutions, setSubstitutions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSubstitutions = async () => {
    // TODO: Implement AI API call to analyze recipe and suggest healthier alternatives
    setLoading(true);
    // Placeholder for AI integration
    setTimeout(() => {
      setSubstitutions("Healthier ingredient substitutions will appear here...");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Ingredient Substitution Generator</CardTitle>
            <CardDescription>
              Enter your recipe and get healthier ingredient alternatives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipe">Recipe Ingredients & Instructions</Label>
              <Textarea
                id="recipe"
                placeholder="Enter your recipe here with ingredients and instructions..."
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                rows={10}
              />
            </div>
            <Button onClick={handleGenerateSubstitutions} disabled={loading || !recipe}>
              {loading ? "Analyzing Recipe..." : "Generate Substitutions"}
            </Button>
            
            {substitutions && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Healthier Alternatives:</h3>
                <p className="whitespace-pre-wrap">{substitutions}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

