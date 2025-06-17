import dotenv from "dotenv";
dotenv.config({});

import { Daytona, Sandbox } from "@daytonaio/sdk";

let sandboxInstance: Sandbox | null = null;
let daytonaInstance: Daytona | null = null;

const DAYTONA_API_KEY = process.env.DAYTONA_API_KEY;

if (!DAYTONA_API_KEY) {
  throw new Error("DAYTONA_API_KEY is not defined");
}

type CreateSandboxOptions = {
  language: "typescript" | "python";
};

export async function getDaytonaSandbox(
  language: CreateSandboxOptions["language"] = "typescript"
): Promise<Sandbox> {
  if (sandboxInstance) {
    return sandboxInstance;
  }

  daytonaInstance = new Daytona({ apiKey: DAYTONA_API_KEY });
  sandboxInstance = await daytonaInstance.create({ language });

  return sandboxInstance;
}

export async function cleanupDaytonaSandbox(): Promise<void> {
  if (sandboxInstance && daytonaInstance) {
    await daytonaInstance.remove(sandboxInstance);
    sandboxInstance = null;
    daytonaInstance = null;
  }
}

// usage

// import { getDaytonaSandbox } from './daytonaSandboxManager';

// (async () => {
//   const sandbox = await getDaytonaSandbox();

//   const response = await sandbox.process.codeRun('console.log("Hello from file A")');
//   console.log(response.result);
// })();
