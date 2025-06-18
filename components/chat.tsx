"use client";

import { useChatMessage } from "@/hooks/use-chat-messages";
import ChatMessage from "./chat-message";
import ChatMessageForm from "./chat-message-form";
import Greeting from "./greeting";
import { SearchThreadsCommand } from "./search-threads-command";
import Loader from "./loader";
import { useSession } from "@/lib/auth-client";

export default function Chat() {
  const { data: session } = useSession();
  const { messages, status } = useChatMessage();

  return (
    <div className="relative flex flex-col w-full max-w-4xl mx-auto h-full">
      {messages.length === 0 && <Greeting />}
      <div className="flex-1 overflow-y-auto px-4 py-32 pt-18 space-y-12 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {(status === "submitted" || status === "streaming") && <Loader />}
      </div>
      <div className="sticky bottom-0 bg-background pt-4">
        <ChatMessageForm />
      </div>
      <SearchThreadsCommand />
    </div>
  );
}
