import { searchWebTool } from "./web-search";
import { scrapeWebTool } from "./scrape-web";
import { generateCodeSnippetTool } from "./generate-code-snippet";
import { runCodeTool } from "./run-code";

export const tools = {
  searchWeb: searchWebTool,
  scrapeWeb: scrapeWebTool,
  generateCodeSnippet: generateCodeSnippetTool,
  runCode: runCodeTool,
};
