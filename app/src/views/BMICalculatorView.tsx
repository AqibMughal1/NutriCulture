"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * BMI Calculator View
 * 
 * Standard BMI calculator with height and weight inputs
 * Calculates BMI and provides health category
 */
export default function BMICalculatorView() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert cm to meters
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));
      
      // Determine category
      if (calculatedBMI < 18.5) {
        setCategory("Underweight");
      } else if (calculatedBMI < 25) {
        setCategory("Normal weight");
      } else if (calculatedBMI < 30) {
        setCategory("Overweight");
      } else {
        setCategory("Obese");
      }
    }
  };

  const getCategoryColor = () => {
    if (!category) return "";
    if (category === "Normal weight") return "text-green-600";
    if (category === "Underweight" || category === "Overweight") return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>
              Calculate your Body Mass Index to understand your health status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="e.g., 175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="e.g., 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={calculateBMI} disabled={!height || !weight}>
              Calculate BMI
            </Button>
            
            {bmi !== null && (
              <Alert className={getCategoryColor()}>
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">Your BMI: {bmi}</p>
                    <p className="font-semibold">Category: {category}</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

