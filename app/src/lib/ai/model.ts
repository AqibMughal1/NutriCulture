import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const chatModel = openrouter.chat("openrouter/free") as any;
export const visionModel = openrouter.chat("openrouter/free") as any;

