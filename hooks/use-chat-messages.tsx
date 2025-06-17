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
import { Model, models } from "@/lib/constants";

type ChatMessageContextType = {
  messages: UIMessage[];
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  chats: any[];
  chatMessages: any[];
  activeChatId: string | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>;

  selectedModel: Model;
  setSelectedModel: React.Dispatch<React.SetStateAction<Model>>;

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
  // Initialize selectedModel with the first model by default
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);

  // On mount, load selected model from localStorage if available
  useEffect(() => {
    const savedModelJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedModelJSON) {
      try {
        const parsedModel: Model = JSON.parse(savedModelJSON);
        // Optional: Validate parsedModel has an id and matches one of the known models
        const modelFromStorage = models.find((m) => m.id === parsedModel.id);
        if (modelFromStorage) {
          setSelectedModel(parsedModel);
        } else {
          // If parsed model is invalid or unknown, fallback to default
          setSelectedModel(models[0]);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
      } catch (error) {
        console.error(
          "Failed to parse selected model from localStorage:",
          error
        );
        setSelectedModel(models[0]);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
  }, []);

  // When selectedModel changes, save the whole object as JSON to localStorage
  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedModel));
    }
  }, [selectedModel]);

  // Pass selectedModel to useChat to use correct model
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
    experimental_prepareRequestBody: ({ messages }) => {
      return {
        messages,
        selectedModel,
      };
    },
  });

  const [chats, setChats] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
    handleInputChange({ target: { value: "" } } as any);
    // Save messages to DB or context if needed
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
        activeChatId,
        setActiveChatId,
        setChatMessages,

        selectedModel,
        setSelectedModel,

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
