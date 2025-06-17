import { customProvider } from "ai";

import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";

const GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error("GOOGLE_GENERATIVE_AI_API_KEY isn't set in .env");
}

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY isn't set in .env");
}

export const LLM_PROVIDERS = customProvider({
  languageModels: {
    default: groq("deepseek-r1-distill-llama-70b"),

    // GOOGLE
    "gemini-2.5-flash": google("gemini-2.5-flash-preview-04-17"),
    "gemini-2.0-flash": google("gemini-2.0-flash"),

    // GROQ
    "qwen-qwq-32b": groq("qwen-qwq-32b"), // <-- Removed leading space here
    "gemma-2": groq("gemma2-9b-it"),
    "llama-4": groq("meta-llama/llama-4-scout-17b-16e-instruct"),
    deepseek: groq("deepseek-r1-distill-llama-70b"),
    "mistral-saba": groq("mistral-saba-24b"),
  },

  imageModels: {},
});
