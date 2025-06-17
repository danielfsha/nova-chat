import { customProvider } from "ai";

import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { deepseek } from "@ai-sdk/deepseek";
import { xai } from "@ai-sdk/xai";

const GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const XAI_API_KEY = process.env.XAI_API_KEY;

if (!GOOGLE_GENERATIVE_AI_API_KEY) {
  throw new Error("GOOGLE_GENERATIVE_AI_API_KEY isn't set in .env");
}

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY isn't set in .env");
}

if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY isn't set in .env");
}

if (!DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY isn't set in .env");
}

if (!XAI_API_KEY) {
  throw new Error("XAI_API_KEY isn't set in .env");
}

export const LLM_PROVIDERS = customProvider({
  languageModels: {
    default: google("gemini-1.5-pro"),

    // GOOGLE
    "gemini-2.5-flash": google("gemini-2.5-flash-preview-04-17"),
    "gemini-2.0-flash": google("gemini-2.0-flash"),
    "gemini-2.5-flash-lite": google("gemini-2.0-flash-lite"),
    "gemini-2.5-pro": google("gemini-2.5-pro-exp-03-25"),

    // OPENAI
    "gpt-04-mini": openai("o4-mini-2025-04-16"),
    "gpt-4.1-mini": openai("gpt-4.1-mini"),
    "gpt-4.1-nano": openai("gpt-4.1-nano"),

    // CLAUDE/ANTHROPIC
    "claude-4-sonnet": anthropic("claude-4-sonnet-20250514"),

    // DEEPSEEK
    "deepseek-reasoner": deepseek("deepseek-reasoner"),
    "deepseek-chat": deepseek("deepseek-chat"),

    // XAI/GROQ
    "groq-3": xai("grok-3"),
    "groq-3-mini": xai("grok-3-mini"),
  },

  imageModels: {},
});
