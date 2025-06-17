import { streamText } from "ai";
import { google } from "@ai-sdk/google";

import { tools } from "@/lib/ai/tools";

import { BASE_PROMPT } from "@/lib/ai/prompts";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-1.5-flash"),
    system: BASE_PROMPT,
    messages,
    tools: tools,
    maxSteps: 20,
    maxTokens: 8200,
  });

  return result.toDataStreamResponse();
}
