import { streamText } from "ai";

import { tools } from "@/lib/ai/tools";
import { BASE_PROMPT } from "@/lib/ai/prompts";
import { LLM_PROVIDERS } from "@/lib/ai/providers";
import { Model } from "@/lib/constants";

export const MODEL = (model: Model) => {
  switch (model.id) {
    case "gemini-2.5-flash":
      return LLM_PROVIDERS.languageModel("gemini-2.5-flash");

    case "qwen-qwq-32b":
      return LLM_PROVIDERS.languageModel("qwen-qwq-32b");

    case "gemma-2":
      return LLM_PROVIDERS.languageModel("gemma-2");

    case "llama-4":
      return LLM_PROVIDERS.languageModel("llama-4");

    case "deepseek":
      return LLM_PROVIDERS.languageModel("deepseek");

    case "mistral-saba":
      return LLM_PROVIDERS.languageModel("mistral-saba");

    default:
      return LLM_PROVIDERS.languageModel("qwen-qwq-32b");
  }
};

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, selectedModel } = await req.json();
  console.log("Selected model:", selectedModel);

  const result = await streamText({
    model: MODEL(selectedModel),
    system: BASE_PROMPT,
    messages,
    tools,
    maxSteps: 20,
    maxTokens: 8200,
  });

  return result.toDataStreamResponse();
}
