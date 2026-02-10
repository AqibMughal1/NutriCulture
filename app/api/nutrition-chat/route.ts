import { chatModel } from "@/lib/ai/model";
import { NUTRITION_CHAT_SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { messages as messagesTable, projects } from "@/lib/db/schema";
import {
  generateUUID,
  getMostRecentUserMessage,
  getTrailingMessageId,
} from "@/lib/utils";
import { streamText } from "ai";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await currentSession();
  if (!session || !session.user) redirect("/login");

  const {
    id,
    messages,
    bmiData,
  }: {
    id: string;
    messages: Array<any>;
    bmiData?: {
      bmi: number | null;
      category: string | null;
      goal: "lose" | "gain" | "maintain" | null;
    };
  } = await request.json();

  const message = getMostRecentUserMessage(messages);
  if (!message) notFound();

  // Find or create nutrition chat project
  let chat = await db.query.projects.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, id),
        operators.eq(fields.userId, session.user.id),
        operators.eq(fields.type, "nutrition-chat")
      );
    },
    with: {
      messages: true,
    },
  });

  // If chat doesn't exist, create it
  if (!chat) {
    const [newChat] = await db
      .insert(projects)
      .values({
        id,
        name: "Nutrition Chat",
        userId: session.user.id,
        type: "nutrition-chat",
      })
      .returning();

    chat = await db.query.projects.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
      with: {
        messages: true,
      },
    });
  }

  if (!chat) notFound();

  // Save user message
  await db.insert(messagesTable).values({
    id: message.id,
    role: "user",
    parts: message.parts,
    attachments: (message as any).experimental_attachments ?? [],
    createdAt: new Date(),
    projectId: chat.id,
  });

  // Build system prompt with BMI context
  let systemPrompt = NUTRITION_CHAT_SYSTEM_PROMPT;
  if (bmiData) {
    const bmiContext = `
    
USER'S CURRENT HEALTH PROFILE:
- BMI: ${bmiData.bmi || "Not calculated yet"}
- Category: ${bmiData.category || "Not determined"}
- Health Goal: ${bmiData.goal === "lose" ? "Lose Weight" : bmiData.goal === "gain" ? "Gain Weight" : bmiData.goal === "maintain" ? "Maintain Weight" : "Not set"}

Use this information to provide personalized nutrition advice tailored to the user's specific health goal.
`;
    systemPrompt += bmiContext;
  }

  const result = streamText({
    model: chatModel,
    messages,
    system: systemPrompt,

    onChunk(chunk) {
      console.log(chunk);
    },
    onError(e) {
      console.log(e);
    },
    async onFinish(e) {
      if (!e.response.messages || e.response.messages.length === 0) {
        return;
      }

      const responseMessages = e.response.messages;

      for (const responseMessage of responseMessages) {
        if (responseMessage.role === 'assistant') {
          // Convert content to parts format expected by DB if needed
          let parts: any[] = [];
          if (typeof responseMessage.content === 'string') {
            parts = [{ type: 'text', text: responseMessage.content }];
          } else if (Array.isArray(responseMessage.content)) {
            parts = responseMessage.content;
          }

          await db.insert(messagesTable).values({
            id: generateUUID(),
            role: "assistant",
            parts: parts,
            attachments: (responseMessage as any).experimental_attachments ?? [],
            createdAt: new Date(),
            projectId: chat.id,
          });
        }
      }
    },
  });

  result.consumeStream();

  return (result as any).toDataStreamResponse({});
}

