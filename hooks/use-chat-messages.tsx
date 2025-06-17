"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  ChangeEvent,
} from "react";

import { useChat } from "@ai-sdk/react";
import { ChatRequestOptions, UIMessage } from "ai";

type ChatMessage = {};

type Chat = {};

type ChatMessageContextType = {
  messages: UIMessage[];
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  chats: Chat[];
  chatMessages: any[]; // fix the message defn
  actviveChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>;

  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  status: "submitted" | "streaming" | "ready" | "error";
  error: Error | undefined;
  stop: () => void;
};

const ChatMessageContext = createContext<ChatMessageContextType | undefined>(
  undefined
);

export const ChatMessageProvider = ({ children }: { children: ReactNode }) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    status,
    error,
    stop,
  } = useChat({});

  const [chats, setChats] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [actviveChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    // fetch the chats and available messages
  }, []);

  // submit the message to the AI model
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with input:", input);
    handleSubmit();
    handleInputChange({ target: { value: "" } } as any);
    console.log(messages);
    // save messages to database and and also to the app context
  };

  return (
    <ChatMessageContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleFormSubmit,
        chats,
        chatMessages,
        actviveChatId,
        setActiveChatId,
        setChatMessages,

        reload,
        status,
        error,
        stop,
      }}
    >
      {children}
    </ChatMessageContext.Provider>
  );
};

export const useChatMessage = () => {
  const context = useContext(ChatMessageContext);
  if (!context) {
    throw new Error("useChatMessage must be used within a ChatMessageProvider");
  }
  return context;
};
