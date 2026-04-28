import { chatModel } from "@/lib/ai/model";
import { RECIPE_CUSTOMIZATION_PROMPT } from "@/lib/ai/prompt";
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
    const { availableIngredients, bmiData } = await request.json();

    let systemPrompt = RECIPE_CUSTOMIZATION_PROMPT;
    if (bmiData?.bmi) {
      systemPrompt += `\nUser Profile — BMI: ${bmiData.bmi} (${bmiData.category}), Goal: ${bmiData.goal ?? "not set"}.`;
    }

    const prompt = `
Available Ingredients:
${availableIngredients}

Please generate healthy substitute recipes using these minimal ingredients.
`;

    const result = await generateObject({
      model: chatModel,
      system: systemPrompt,
      prompt,
      schema: z.object({
        recipes: z.array(
          z.object({
            name: z.string().describe("Name of the recipe"),
            originalIngredients: z.string().describe("What the user would typically use instead (unhealthy version), e.g. 'processed food, high sodium items'"),
            substitutedIngredients: z.string().describe("The healthy ingredients used from the available list"),
            calories: z.number().describe("Estimated total calories"),
            protein: z.string().describe("Estimated protein, e.g. '20g'"),
            carbs: z.string().describe("Estimated carbs, e.g. '40g'"),
            fats: z.string().describe("Estimated fats, e.g. '12g'"),
            whyHealthy: z.string().describe("Brief explanation of why this recipe is healthy"),
            instructions: z.string().describe("Simple step-by-step instructions (use newlines for each step)")
          })
        ),
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Recipe Customization Error:", error);
    return NextResponse.json({ error: "Failed to generate customized recipes" }, { status: 500 });
  }
}
