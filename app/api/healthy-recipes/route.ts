import { chatModel } from "@/lib/ai/model";
import { HEALTHY_RECIPES_PROMPT } from "@/lib/ai/prompt";
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
    const { ingredients, bmiData } = await request.json();

    let systemPrompt = HEALTHY_RECIPES_PROMPT;
    if (bmiData?.bmi) {
      systemPrompt += `\nUser Profile — BMI: ${bmiData.bmi} (${bmiData.category}), Goal: ${bmiData.goal ?? "not set"}.`;
    }

    const prompt = `
Ingredients I have:
${ingredients}

Please generate healthy recipes using these ingredients.
`;

    const result = await generateObject({
      model: chatModel,
      system: systemPrompt,
      prompt,
      schema: z.object({
        recipes: z.array(
          z.object({
            name: z.string().describe("Name of the recipe"),
            description: z.string().describe("A short description of the recipe"),
            ingredients: z.string().describe("The ingredients required for the recipe"),
            calories: z.number().describe("Estimated total calories"),
            protein: z.string().describe("Estimated protein, e.g. '25g'"),
            carbs: z.string().describe("Estimated carbs, e.g. '45g'"),
            fats: z.string().describe("Estimated fats, e.g. '15g'"),
            healthBenefits: z.string().describe("Explanation of the health benefits"),
            instructions: z.string().describe("Simple step-by-step instructions (use newlines for each step)")
          })
        ),
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Healthy Recipes Error:", error);
    return NextResponse.json({ error: "Failed to generate healthy recipes" }, { status: 500 });
  }
}
