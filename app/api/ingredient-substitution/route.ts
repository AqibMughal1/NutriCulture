import { chatModel } from "@/lib/ai/model";
import { INGREDIENT_SUBSTITUTION_PROMPT } from "@/lib/ai/prompt";
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
    const { recipe, bmiData } = await request.json();

    let systemPrompt = INGREDIENT_SUBSTITUTION_PROMPT;
    if (bmiData?.bmi) {
      systemPrompt += `\nUser Profile — BMI: ${bmiData.bmi} (${bmiData.category}), Goal: ${bmiData.goal ?? "not set"}.`;
    }

    const prompt = `
Original Recipe:
${recipe}

Please provide healthier ingredient substitutions for the above recipe.
`;

    const result = await generateObject({
      model: chatModel,
      system: systemPrompt,
      prompt,
      schema: z.object({
        substitutions: z.string().describe("A well-formatted string listing the healthier alternatives and why they are healthier. Use bullet points and paragraphs for readability."),
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Ingredient Substitution Error:", error);
    return NextResponse.json({ error: "Failed to generate substitutions" }, { status: 500 });
  }
}
