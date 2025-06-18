"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ChangeEvent,
} from "react";

import { useChat } from "@ai-sdk/react";
import { ChatRequestOptions, UIMessage } from "ai";
import { Model, models } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useSession } from "@/lib/auth-client";

type ChatMessageContextType = {
  messages: UIMessage[];
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  chats: any[];
  setChats: React.Dispatch<React.SetStateAction<any[]>>;

  chatMessages: any[];
  activeChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>;

  selectedModel: Model;
  setSelectedModel: React.Dispatch<React.SetStateAction<Model>>;

  selectedImages: FileList | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<FileList | null>>;

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

const LOCAL_STORAGE_KEY = "selectedChatModel";

export const ChatMessageProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  // Use custom useLocalStorage hook here
  const [selectedModel, setSelectedModel] = useLocalStorage<Model>(
    LOCAL_STORAGE_KEY,
    models[0]
  );

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    status,
    error,
    stop,
  } = useChat({
    experimental_prepareRequestBody: ({ messages }) => ({
      messages,
      selectedModel,
    }),
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e, {
      experimental_attachments: selectedImages ?? undefined,
    });
    handleInputChange({ target: { value: "" } } as any);

    // update in the database if the user is logged in
    if (session?.user) {
      // get the chat
      // update the message
    }
  };

  return (
    <ChatMessageContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleFormSubmit,
        chats,
        setChats,
        chatMessages,
        activeChatId,
        setActiveChatId,
        setChatMessages,

        selectedModel,
        setSelectedModel,

        selectedImages,
        setSelectedImages,

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
