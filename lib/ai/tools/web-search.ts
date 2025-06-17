import { tool } from "ai";

import Exa from "exa-js";
import { z } from "zod";

const EXA_API_KEY = process.env.EXA_API_KEY;

if (!EXA_API_KEY) {
  throw new Error("EXA_API_KEY is not set");
}

const exa = new Exa(EXA_API_KEY);

export const searchWebTool = tool({
  description: "Search the web using to find the best results from user query",
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }: { query: string }) => {
    const response = await exa.search(query, {
      numResults: 10,
    });

    return response.results.map((r) => r.url);
  },
});
