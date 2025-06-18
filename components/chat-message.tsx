import React from "react";
import { UIMessage } from "ai";
import { CodeSnippet } from "./code-snippet";
import { cn } from "@/lib/utils";
import Loader from "./loader";
import Image from "next/image";

export default function ChatMessage({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start w-full min-w-0",
        isUser ? "justify-end pl-16" : "justify-start pr-16"
      )}
    >
      <div
        className={cn(
          "flex flex-col space-y-4 max-w-[70%] min-w-0", // limit max width of message container
          "min-w-0"
        )}
      >
        {/* Text and code parts */}
        {message.parts?.map((part, idx) => {
          switch (part.type) {
            case "text":
              return (
                <div
                  key={`text-${idx}-${part.text.substring(0, 10)}`}
                  className={cn(
                    "bg-[#F7E6F4] border border-[#F1C4E6]/50 text-[#492C61]",
                    "dark:bg-[#2B2532] dark:text-white dark:border-pink-50/5",
                    "px-4 py-3 rounded-xl break-words whitespace-pre-wrap max-w-full"
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

        {/* Attachments container */}
        {message.experimental_attachments && (
          <div className="flex flex-col space-y-2 mt-2 max-w-full">
            {message.experimental_attachments
              .filter(
                (attachment) =>
                  attachment?.contentType?.startsWith("image/") ||
                  attachment?.contentType?.startsWith("application/pdf")
              )
              .map((attachment, index) => {
                if (attachment.contentType?.startsWith("image/")) {
                  return (
                    <Image
                      key={`attachment-image-${index}`}
                      src={attachment.url}
                      alt={attachment.name ?? `attachment-${index}`}
                      width={500}
                      height={500}
                      className="rounded-md object-contain max-w-full max-h-[500px]"
                    />
                  );
                }
                if (attachment.contentType?.startsWith("application/pdf")) {
                  return (
                    <iframe
                      key={`attachment-pdf-${index}`}
                      src={attachment.url}
                      title={attachment.name ?? `attachment-${index}`}
                      width="500"
                      height="600"
                      className="rounded-md border"
                    />
                  );
                }
                return null;
              })}
          </div>
        )}
      </div>
    </div>
  );
}
