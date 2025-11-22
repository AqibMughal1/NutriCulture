"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Image-based Nutrition Analysis View
 * 
 * Users can upload an image of their meal
 * AI analyzes the image and identifies:
 * - Proteins
 * - Vitamins
 * - Fats
 * - Other nutritional information
 */
export default function NutritionAnalysisView() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
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

  const handleAnalyze = async () => {
    if (!image) return;
    
    // TODO: Implement image upload and AI analysis
    // This will use the existing upload API pattern and AI model integration
    setLoading(true);
    // Placeholder for AI integration
    setTimeout(() => {
      setAnalysis("Nutritional analysis will appear here with proteins, vitamins, fats, etc.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Image-based Nutrition Analysis</CardTitle>
            <CardDescription>
              Upload an image of your meal to get detailed nutritional information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Upload Meal Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            
            {preview && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-lg p-4">
                  <img 
                    src={preview} 
                    alt="Meal preview" 
                    className="max-w-full h-auto max-h-64 mx-auto rounded"
                  />
                </div>
              </div>
            )}
            
            <Button 
              onClick={handleAnalyze} 
              disabled={loading || !image}
            >
              {loading ? "Analyzing Image..." : "Analyze Nutrition"}
            </Button>
            
            {analysis && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Nutritional Analysis:</h3>
                <div className="space-y-2">
                  <p className="whitespace-pre-wrap">{analysis}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

