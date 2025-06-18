import React from "react";
import { UIMessage } from "ai";
import { CodeSnippet } from "./code-snippet";
import { cn } from "@/lib/utils";
import Loader from "./loader";

export default function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start w-full min-w-0",
        isUser ? "justify-end pl-16" : "justify-start pr-16"
      )}
    >
      <div className={cn("flex flex-col space-y-4 max-w-full", "min-w-0")}>
        {message.parts?.map((part, idx) => {
          switch (part.type) {
            case "text":
              return (
                <div
                  key={`text-${idx}-${part.text.substring(0, 10)}`}
                  className={cn(
                    "bg-[#F7E6F4] border border-[#F1C4E6]/50 text-[#492C61]",
                    "dark:bg-[#2B2532] dark:text-white dark:border-pink-50/10",
                    "px-4 py-3 rounded-xl"
                  )}
                >
                  {part.text}
                </div>
              );

            case "file":
              if (part.mimeType.startsWith("image/")) {
                return (
                  <img
                    key={`image-${idx}`}
                    src={`data:${part.mimeType};base64,${part.data}`}
                    alt="Uploaded image"
                    className="max-w-full max-h-96 object-contain rounded-md"
                  />
                );
              }
              // If other file types, you can add handling here
              return null;

            case "tool-invocation":
              const callId = part.toolInvocation.toolCallId;
              switch (part.toolInvocation.toolName) {
                case "generateCodeSnippet":
                  switch (part.toolInvocation.state) {
                    case "call":
                      return (
                        <div
                          key={`code-generation-call-${callId}`}
                          className="max-w-full"
                        >
                          <Loader />
                        </div>
                      );

                    case "result":
                      return (
                        <div
                          key={`generated-code-${callId}`}
                          className="max-w-full overflow-x-auto"
                        >
                          <CodeSnippet
                            code={part.toolInvocation.result.code}
                            language={part.toolInvocation.result.language}
                          />
                        </div>
                      );

                    default:
                      return null;
                  }

                default:
                  return null;
              }

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
