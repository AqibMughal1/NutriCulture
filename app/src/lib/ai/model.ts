import { createOpenAI } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openai = createOpenAI({
  baseURL: "https://models.inference.ai.azure.com",
});

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// export const chatModel = openai.chat("gpt-4o");
export const chatModel = openrouter.chat("openai/gpt-4o");
