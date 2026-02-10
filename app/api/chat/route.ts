import { chatModel } from "@/lib/ai/model";
import {
  CHAT_SYSTEM_PROMPT,
  EXISTING_DEPLOYMENT_GUIDE_PROMPT,
  NEW_DEPLOYMENT_GUIDE_SYSTEM_PROMPT,
  UPLOAD_CONFIG_OPTIMIZATION_PROMPT,
} from "@/lib/ai/prompt";
import { currentSession } from "@/lib/api/user";
import { db } from "@/lib/db";
import { messages as messagesTable } from "@/lib/db/schema";
import {
  generateUUID,
  getMostRecentUserMessage,
  getTrailingMessageId,
} from "@/lib/utils";
import { streamText } from "ai";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const maxDuration = 60; // to extend vercel serverless function limit

const getSystemPrompt = async (
  type:
    | "new-deployment-guide"
    | "existing-deployment-guide"
    | "submit-requirements-to-get-deployment-guide"
    | "upload-config-to-get-recommendations",
  project?: any
) => {
  if (type === "new-deployment-guide") {
    return NEW_DEPLOYMENT_GUIDE_SYSTEM_PROMPT;
  }
  if (type === "existing-deployment-guide") {
    return EXISTING_DEPLOYMENT_GUIDE_PROMPT;
  }
  if (type === "upload-config-to-get-recommendations") {
    const configContent = project?.configFileContent || "";
    const optimizationFocus = project?.optimizationType || "balanced";
    const optimizationContext = `
    
OPTIMIZATION FOCUS: ${optimizationFocus.toUpperCase()}
OPTIMIZATION TYPE: ${optimizationFocus}

${configContent
        ? `CONFIGURATION FILE CONTENT:
\`\`\`
${configContent}
\`\`\``
        : "No configuration file uploaded yet. Please ask the user to upload their cloud configuration file first."
      }
    `;

    return UPLOAD_CONFIG_OPTIMIZATION_PROMPT + optimizationContext;
  }
  if (type === "submit-requirements-to-get-deployment-guide") {
    return CHAT_SYSTEM_PROMPT; // Use general chat prompt for requirements submission
  }
  return CHAT_SYSTEM_PROMPT;
};

export async function POST(request: NextRequest) {
  const session = await currentSession();
  if (!session || !session.user) redirect("/login");

  const {
    id,
    messages,
  }: {
    id: string;
    messages: Array<any>;
  } = await request.json();

  const message = getMostRecentUserMessage(messages);
  if (!message) notFound();

  const chat = await db.query.projects.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, id),
        operators.eq(fields.userId, session.user.id)
      );
    },
    with: {
      messages: true,
    },
  });
  if (!chat) notFound();

  await db.insert(messagesTable).values({
    id: message.id,
    role: "user",
    parts: message.parts,
    attachments: (message as any).experimental_attachments ?? [],
    createdAt: new Date(),
    projectId: chat.id,
  });

  const result = streamText({
    model: chatModel,
    messages,
    system: await getSystemPrompt(chat.type as any, chat),

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
