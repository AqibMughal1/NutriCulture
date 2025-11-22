"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Recipe Customization View
 * 
 * Allows users to edit and modify AI-generated suggestions
 * Users can say "I don't have this, I have that" and get updated recommendations
 */
export default function RecipeCustomizationView() {
  const [originalRecipe, setOriginalRecipe] = useState("");
  const [userModifications, setUserModifications] = useState("");
  const [customizedRecipe, setCustomizedRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCustomize = async () => {
    // TODO: Implement AI API call to modify recipe based on user's available ingredients
    setLoading(true);
    // Placeholder for AI integration
    setTimeout(() => {
      setCustomizedRecipe("Customized recipe based on your modifications will appear here...");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Recipe Customization</CardTitle>
            <CardDescription>
              Modify AI suggestions based on your available ingredients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="original">Original Recipe/Suggestion</Label>
              <Textarea
                id="original"
                placeholder="Paste the original recipe or AI suggestion here..."
                value={originalRecipe}
                onChange={(e) => setOriginalRecipe(e.target.value)}
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modifications">Your Modifications</Label>
              <Textarea
                id="modifications"
                placeholder="e.g., I don't have chicken, I have tofu. I don't have rice, I have quinoa..."
                value={userModifications}
                onChange={(e) => setUserModifications(e.target.value)}
                rows={6}
              />
            </div>
            <Button onClick={handleCustomize} disabled={loading || !originalRecipe || !userModifications}>
              {loading ? "Customizing Recipe..." : "Customize Recipe"}
            </Button>
            
            {customizedRecipe && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Customized Recipe:</h3>
                <p className="whitespace-pre-wrap">{customizedRecipe}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

