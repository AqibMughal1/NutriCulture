import { chatModel } from "@/lib/ai/model";
import { AI_MEAL_SUGGESTIONS_PROMPT } from "@/lib/ai/prompt";
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
    const { preferences, address, city, bmiData } = await request.json();

    let systemPrompt = AI_MEAL_SUGGESTIONS_PROMPT;
    if (bmiData?.bmi) {
      systemPrompt += `\nUser Profile — BMI: ${bmiData.bmi} (${bmiData.category}), Goal: ${bmiData.goal ?? "not set"}.`;
    }

    const prompt = `
User Preferences: ${preferences}
Address: ${address}
City: ${city}

Please provide 5 realistic meal recommendations near this location that align with the user's preferences and health goals.
`;

    const result = await generateObject({
      model: chatModel,
      system: systemPrompt,
      prompt,
      schema: z.object({
        suggestions: z.array(
          z.object({
            name: z.string().describe("Restaurant name"),
            dish: z.string().describe("Name of the dish"),
            address: z.string().describe("Street address of the restaurant"),
            distance: z.string().describe("Distance from the user, e.g., '0.5 miles'"),
            cuisine: z.string().describe("Type of cuisine, e.g., 'Healthy', 'Mediterranean'"),
            price: z.string().describe("Price range, e.g., '$$'"),
            rating: z.number().describe("Rating out of 5.0")
          })
        ),
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("AI Meal Suggestions Error:", error);
    return NextResponse.json({ error: "Failed to generate suggestions" }, { status: 500 });
  }
}
