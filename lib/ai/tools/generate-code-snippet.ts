import { streamObject, tool } from "ai";
import { z } from "zod";
import { LLM_PROVIDERS } from "../providers";

export const generateCodeSnippetTool = tool({
  description:
    "Generate a high-quality code snippet in the programming language specified by the user. Return an object with the language and the code snippet as plain text without any additional explanations.",
  parameters: z.object({
    language: z
      .string()
      .describe(
        "The programming language in which to generate the code snippet"
      ),
    prompt: z
      .string()
      .describe(
        "A detailed description or instructions for the code to generate"
      ),
  }),
  execute: async ({ language, prompt }) => {
    const { partialObjectStream } = await streamObject({
      model: LLM_PROVIDERS.languageModel("gemini-2.5-flash"),
      schema: z.object({
        language: z
          .string()
          .describe("The language used in the generated code"),
        code: z.string().describe("The actual generated code snippet"),
      }),
      system: `
        You are a professional software developer.
        Generate a concise, clean, and efficient ${language} code snippet based on the instructions below.
        Do not add any comments, explanations, or extra text.
        Only return a JSON object matching the schema with "language" and "code" fields.
      `,
      prompt,
    });

    let accumulatedCode = "";
    let outputLanguage = language;

    for await (const partial of partialObjectStream) {
      if (partial.code) {
        accumulatedCode += partial.code;
      }
      if (partial.language) {
        outputLanguage = partial.language;
      }
    }

    return {
      language: outputLanguage,
      code: accumulatedCode.trim(),
    };
  },
});
