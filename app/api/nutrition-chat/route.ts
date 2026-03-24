import { chatModel } from "@/lib/ai/model";
import { NUTRITION_CHAT_SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { messages as messagesTable, projects } from "@/lib/db/schema";
import {
  generateUUID,
  getMostRecentUserMessage,
} from "@/lib/utils";
import { streamText, convertToModelMessages } from "ai";
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
    await db
      .insert(projects)
      .values({
        id,
        name: "Nutrition Chat",
        userId: session.user.id,
        type: "nutrition-chat",
      });

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
    id: generateUUID(),
    role: "user",
    parts: message.parts,
    attachments: (message as any).experimental_attachments ?? [],
    createdAt: new Date(),
    projectId: chat.id,
  });

  // Build compact system prompt (only append BMI if set)
  let systemPrompt = NUTRITION_CHAT_SYSTEM_PROMPT;
  if (bmiData?.bmi) {
    systemPrompt += `\nUser profile — BMI: ${bmiData.bmi} (${bmiData.category}), Goal: ${bmiData.goal ?? "not set"}.`;
  }

  // Cap to last 10 messages to reduce payload size and latency
  const recentMessages = messages.slice(-7);
  const modelMessages = await convertToModelMessages(recentMessages);

  const result = streamText({
    model: chatModel,
    messages: modelMessages,
    system: systemPrompt,

    onError(e) {
      console.log(e);
    },
    async onFinish(e) {
      if (!e.response.messages || e.response.messages.length === 0) {
        return;
      }

      const responseMessages = e.response.messages;

      for (const responseMessage of responseMessages) {
        if (responseMessage.role === "assistant") {
          let parts: any[] = [];
          if (typeof responseMessage.content === "string") {
            parts = [{ type: "text", text: responseMessage.content }];
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

  return result.toUIMessageStreamResponse();
}

