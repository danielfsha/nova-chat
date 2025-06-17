import { getDaytonaSandbox } from "@/lib/daytona";
import { tool } from "ai";
import { z } from "zod";

export const runCodeTool = tool({
  description:
    "Run the provided TS/JS or python code using an isolated sandbox called Daytona.",
  parameters: z.object({
    language: z
      .string()
      .describe(
        "The language used to create the sandbox; like typescript, javascript and python"
      ),
    code: z.string().describe("Actual code to run in the sandbox"),
  }),
  execute: async ({ language, code }) => {
    const sandbox = await getDaytonaSandbox();
    const response = await sandbox.process.codeRun(code);

    return response.result;
  },
});
