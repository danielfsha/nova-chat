import { tool } from "ai";
import { z } from "zod";

import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

if (!FIRECRAWL_API_KEY) {
  throw new Error("FIRECRAWL_API_KEY is not set");
}

const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

export const scrapeWebTool = tool({
  description: "Extract the important content from website URL",
  parameters: z.object({
    url: z.string(),
  }),
  execute: async ({ url }: { url: string }) => {
    const scrapeResult = (await app.scrapeUrl(url, {
      formats: ["markdown"],
    })) as ScrapeResponse;

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    return scrapeResult;
  },
});
