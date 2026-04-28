import { visionModel } from "@/lib/ai/model";
import { NUTRITION_ANALYSIS_PROMPT } from "@/lib/ai/prompt";
import { currentSession } from "@/lib/api/user";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await currentSession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { image, estimatedWeight, weightUnit, bmiData } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    let systemPrompt = NUTRITION_ANALYSIS_PROMPT;
    if (bmiData?.bmi) {
      systemPrompt += `\nUser Profile — BMI: ${bmiData.bmi} (${bmiData.category}), Goal: ${bmiData.goal ?? "not set"}.`;
    }

    const weightInfo = estimatedWeight 
      ? `Estimated Weight: ${estimatedWeight} ${weightUnit}` 
      : "No estimated weight provided. Please guess an average serving size.";

    const promptText = `
Please analyze this food image and provide a detailed nutritional breakdown.
${weightInfo}
`;

    const result = await generateObject({
      model: visionModel,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: promptText },
            { type: "image", image },
          ],
        },
      ],
      schema: z.object({
        dishName: z.string().describe("The name of the identified dish"),
        weight: z.string().describe("The estimated weight, e.g., '250g'"),
        nutrition: z.object({
          calories: z.number().describe("Total calories as a number"),
          protein: z.string().describe("Protein, e.g., '15.0g'"),
          carbs: z.string().describe("Carbohydrates, e.g., '25.0g'"),
          fats: z.string().describe("Fats, e.g., '8.0g'"),
          fiber: z.string().describe("Fiber, e.g., '3.0g'"),
          sodium: z.string().describe("Sodium, e.g., '400mg'"),
        }),
        vitamins: z.object({
          vitaminA: z.string().describe("Vitamin A, e.g., '450 IU'"),
          vitaminC: z.string().describe("Vitamin C, e.g., '25mg'"),
          vitaminD: z.string().describe("Vitamin D, e.g., '2.5 IU'"),
          vitaminE: z.string().describe("Vitamin E, e.g., '3.2mg'"),
          vitaminK: z.string().describe("Vitamin K, e.g., '45mcg'"),
        }),
        minerals: z.object({
          calcium: z.string().describe("Calcium, e.g., '120mg'"),
          iron: z.string().describe("Iron, e.g., '2.5mg'"),
          potassium: z.string().describe("Potassium, e.g., '350mg'"),
          magnesium: z.string().describe("Magnesium, e.g., '45mg'"),
        }),
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Nutrition Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze nutrition" }, { status: 500 });
  }
}
