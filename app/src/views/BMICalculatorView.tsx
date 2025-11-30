"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBMI } from "@/contexts/bmi-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

/**
 * BMI Calculator View - Step 1
 * 
 * Enhanced BMI calculator with:
 * - Multiple unit support (cm, ft/in, kg, lb)
 * - Automatic goal determination (lose/gain weight)
 * - Stores BMI data in context for other modules
 * - Sends BMI data to backend
 */
export default function BMICalculatorView() {
  const { setBMIData } = useBMI();
  const router = useRouter();
  
  const [heightValue, setHeightValue] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft" | "in">("cm");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState<"lose" | "gain" | "maintain" | null>(null);

  // Convert height to meters
  const convertHeightToMeters = (): number => {
    if (heightUnit === "cm") {
      return parseFloat(heightValue) / 100;
    } else if (heightUnit === "ft") {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      return totalInches * 0.0254; // Convert inches to meters
    } else if (heightUnit === "in") {
      return parseFloat(heightValue) * 0.0254;
    }
    return 0;
  };

  // Convert weight to kg
  const convertWeightToKg = (): number => {
    if (weightUnit === "kg") {
      return parseFloat(weightValue);
    } else if (weightUnit === "lb") {
      return parseFloat(weightValue) * 0.453592; // Convert lbs to kg
    }
    return 0;
  };

  const calculateBMI = async () => {
    const heightInMeters = convertHeightToMeters();
    const weightInKg = convertWeightToKg();
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
      const roundedBMI = parseFloat(calculatedBMI.toFixed(1));
      setBmi(roundedBMI);
      
      // Determine category
      let newCategory = "";
      if (calculatedBMI < 18.5) {
        newCategory = "Underweight";
        setGoal("gain");
      } else if (calculatedBMI < 25) {
        newCategory = "Normal weight";
        setGoal("maintain");
      } else if (calculatedBMI < 30) {
        newCategory = "Overweight";
        setGoal("lose");
      } else {
        newCategory = "Obese";
        setGoal("lose");
      }
      setCategory(newCategory);

      // Store in context
      const heightInCm = heightUnit === "cm" 
        ? parseFloat(heightValue) 
        : heightUnit === "ft"
        ? ((parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0)) * 2.54
        : parseFloat(heightValue) * 2.54;

      setBMIData({
        bmi: roundedBMI,
        category: newCategory,
        goal: calculatedBMI < 18.5 ? "gain" : calculatedBMI >= 25 ? "lose" : "maintain",
        height: heightInCm,
        weight: weightUnit === "kg" ? parseFloat(weightValue) : parseFloat(weightValue) * 0.453592,
        heightUnit: heightUnit === "ft" ? "cm" : heightUnit,
        weightUnit,
      });

      // Send to backend (dummy API call)
      try {
        // TODO: Replace with actual API endpoint
        const response = await fetch("/api/bmi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bmi: roundedBMI,
            category: newCategory,
            goal: calculatedBMI < 18.5 ? "gain" : calculatedBMI >= 25 ? "lose" : "maintain",
            height: heightInCm,
            weight: weightInKg,
          }),
        });
        
        if (response.ok) {
          toast.success("BMI data saved successfully!");
        }
      } catch (error) {
        console.error("Failed to save BMI data:", error);
        // Don't show error to user, just log it
      }
    } else {
      toast.error("Please enter valid height and weight values");
    }
  };

  const getCategoryColor = () => {
    if (!category) return "";
    if (category === "Normal weight") return "text-green-600";
    if (category === "Underweight" || category === "Overweight") return "text-yellow-600";
    return "text-red-600";
  };

  const getGoalText = () => {
    if (!goal) return "";
    if (goal === "lose") return "Your goal: Lose Weight";
    if (goal === "gain") return "Your goal: Gain Weight";
    return "Your goal: Maintain Weight";
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">BMI Calculator - Step 1</CardTitle>
            <CardDescription className="text-base">
              Calculate your Body Mass Index and determine your health goal. This information will be used across all modules.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Height Input */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Height</Label>
              <div className="flex gap-4">
                <Select value={heightUnit} onValueChange={(value: "cm" | "ft" | "in") => setHeightUnit(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cm">Centimeters</SelectItem>
                    <SelectItem value="ft">Feet & Inches</SelectItem>
                    <SelectItem value="in">Inches</SelectItem>
                  </SelectContent>
                </Select>
                
                {heightUnit === "ft" ? (
                  <div className="flex gap-2 flex-1">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Feet"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Inches"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        max={11}
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    type="number"
                    placeholder={heightUnit === "cm" ? "e.g., 175" : "e.g., 70"}
                    value={heightValue}
                    onChange={(e) => setHeightValue(e.target.value)}
                    className="flex-1"
                  />
                )}
              </div>
            </div>

            {/* Weight Input */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Weight</Label>
              <div className="flex gap-4">
                <Select value={weightUnit} onValueChange={(value: "kg" | "lb") => setWeightUnit(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="lb">Pounds</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder={weightUnit === "kg" ? "e.g., 70" : "e.g., 154"}
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <Button 
              onClick={calculateBMI} 
              disabled={
                !weightValue || 
                (heightUnit === "ft" ? (!heightFeet && !heightInches) : !heightValue)
              }
              className="w-full"
              size="lg"
            >
              Calculate BMI
            </Button>
            
            {bmi !== null && (
              <Alert className={getCategoryColor()}>
                <AlertDescription>
                  <div className="space-y-3">
                    <p className="text-3xl font-bold">Your BMI: {bmi}</p>
                    <p className="text-lg font-semibold">Category: {category}</p>
                    {goal && (
                      <p className="text-lg font-semibold text-blue-600">{getGoalText()}</p>
                    )}
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">
                        Your BMI data has been saved and will be used by all modules to provide personalized recommendations.
                      </p>
                      <Button
                        onClick={() => router.push("/nutrition-analysis")}
                        className="w-full"
                        variant="outline"
                      >
                        Continue to Nutrition Analysis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
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
