"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface BMIData {
  bmi: number | null;
  category: string | null;
  goal: "lose" | "gain" | "maintain" | null;
  height: number | null;
  weight: number | null;
  heightUnit: "cm" | "ft" | "in";
  weightUnit: "kg" | "lb";
}

interface BMIContextType {
  bmiData: BMIData;
  setBMIData: (data: BMIData) => void;
  clearBMIData: () => void;
}

const BMIContext = createContext<BMIContextType | undefined>(undefined);

export function BMIProvider({ children }: { children: ReactNode }) {
  const [bmiData, setBMIDataState] = useState<BMIData>({
    bmi: null,
    category: null,
    goal: null,
    height: null,
    weight: null,
    heightUnit: "cm",
    weightUnit: "kg",
  });

  const setBMIData = (data: BMIData) => {
    setBMIDataState(data);
    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("bmiData", JSON.stringify(data));
    }
  };

  const clearBMIData = () => {
    setBMIDataState({
      bmi: null,
      category: null,
      goal: null,
      height: null,
      weight: null,
      heightUnit: "cm",
      weightUnit: "kg",
    });
    if (typeof window !== "undefined") {
      localStorage.removeItem("bmiData");
    }
  };

  // Load from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bmiData");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setBMIDataState(parsed);
        } catch (e) {
          // Invalid data, ignore
        }
      }
    }
  }, []);

  return (
    <BMIContext.Provider value={{ bmiData, setBMIData, clearBMIData }}>
      {children}
    </BMIContext.Provider>
  );
}

export function useBMI() {
  const context = useContext(BMIContext);
  if (context === undefined) {
    throw new Error("useBMI must be used within a BMIProvider");
  }
  return context;
}

