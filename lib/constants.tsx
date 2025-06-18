export const SIDEBAR_WIDTH = 256;

import { generateId } from "ai";
import { genSaltSync, hashSync } from "bcrypt-ts";

import {
  Sparkles,
  Brain,
  Zap,
  ImageIcon,
  Code,
  MessageSquare,
  Filter,
  Compass,
  Code2,
  GraduationCap,
} from "lucide-react";

export interface Model {
  id: string;
  name: string;
  type: string;
  status: "available" | "pro" | "limited";
  capabilities: string[];
  icon: React.ReactNode;
  description?: string;
  category: "favorites" | "others";
}

export const models: Model[] = [
  {
    id: "deepseek",
    name: "DeepSeek R1",
    type: "Groq",
    status: "limited",
    capabilities: ["fast", "code"],
    icon: "deepseek.svg",
    description: "Specialized reasoning model",
    category: "favorites",
  },
  {
    id: "qwen-qwq-32b",
    name: "Qwen QWQ 32B",
    type: "Groq",
    status: "available",
    capabilities: ["analysis", "code"],
    icon: "qwen.svg",
    description: "High capacity Groq model for inference",
    category: "favorites",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    type: "Google",
    status: "available",
    capabilities: ["fast", "vision", "code"],
    icon: "gemini.svg",
    description: "Fastest model with vision capabilities",
    category: "favorites",
  },
  {
    id: "gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    type: "Google",
    status: "available",
    capabilities: ["fast", "code"],
    icon: "gemini.svg",
    description: "Lightweight version",
    category: "others",
  },
  {
    id: "gemma-2",
    name: "Gemma 2",
    type: "Groq",
    status: "limited",
    capabilities: ["code"],
    icon: "google.svg",
    description: "Efficient Groq model for text generation",
    category: "others",
  },
  {
    id: "llama-4",
    name: "Llama 4",
    type: "Groq",
    status: "limited",
    capabilities: ["fast", "code"],
    icon: "meta.svg",
    description: "Versatile Llama model with chat features",
    category: "others",
  },

  {
    id: "mistral-saba",
    name: "Mistral Saba",
    type: "Groq",
    status: "limited",
    capabilities: ["fast"],
    icon: "mistral.svg",
    description: "Powerful Mistral model with chat support",
    category: "others",
  },
];

export const capabilityIcons = {
  fast: <Zap className="w-4 h-4" />,
  vision: <ImageIcon className="w-4 h-4" />,
  code: <Code className="w-4 h-4" />,
  reasoning: <Brain className="w-4 h-4" />,
  "advanced-reasoning": <Brain className="w-4 h-4" />,
  "image-gen": <ImageIcon className="w-4 h-4" />,
  writing: <MessageSquare className="w-4 h-4" />,
  analysis: <Filter className="w-4 h-4" />,
};

export const capabilityColors = {
  fast: "bg-[#D1ECE6]/90 text-[#43C7AC]",
  vision: "bg-[#D6E0F1]/90 text-[#4189C9]",
  code: "bg-[#DAD7F2]/90 text-[#555BCE]",
  reasoning: "bg-orange-100 text-orange-700 border-orange-200",
  "advanced-reasoning": "bg-red-100 text-red-700 border-red-200",
  "image-gen": "bg-pink-100 text-pink-700 border-pink-200",
  writing: "bg-indigo-100 text-indigo-700 border-indigo-200",
  analysis: "bg-teal-100 text-teal-700 border-teal-200",
};

export interface Suggestion {
  text: string;
  description: string;
}

export interface FilterCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  suggestions: Suggestion[];
}

export const categories: FilterCategory[] = [
  {
    id: "create",
    title: "Create",
    icon: <Sparkles className="w-4 h-4" />,
    color: "from-purple-500 to-pink-500",
    suggestions: [
      {
        text: "Design a modern landing page",
        description: "Create a sleek, responsive website",
      },
      {
        text: "Generate a logo concept",
        description: "Design a unique brand identity",
      },
      {
        text: "Build a mobile app mockup",
        description: "Prototype your next app idea",
      },
      {
        text: "Create social media graphics",
        description: "Design engaging visual content",
      },
    ],
  },
  {
    id: "explore",
    title: "Explore",
    icon: <Compass className="w-4 h-4" />,
    color: "from-blue-500 to-cyan-500",
    suggestions: [
      {
        text: "Analyze market trends",
        description: "Discover emerging opportunities",
      },
      { text: "Research competitors", description: "Study industry landscape" },
      {
        text: "Explore new technologies",
        description: "Stay ahead of the curve",
      },
      {
        text: "Investigate user behavior",
        description: "Understand your audience",
      },
    ],
  },
  {
    id: "code",
    title: "Code",
    icon: <Code2 className="w-4 h-4" />,
    color: "from-green-500 to-emerald-500",
    suggestions: [
      {
        text: "Build a React component",
        description: "Create reusable UI elements",
      },
      {
        text: "Optimize database queries",
        description: "Improve application performance",
      },
      {
        text: "Debug a complex issue",
        description: "Solve tricky programming problems",
      },
      {
        text: "Implement authentication",
        description: "Secure your application",
      },
    ],
  },
  {
    id: "learn",
    title: "Learn",
    icon: <GraduationCap className="w-4 h-4" />,
    color: "from-orange-500 to-red-500",
    suggestions: [
      {
        text: "Master React hooks",
        description: "Deep dive into modern React patterns",
      },
      {
        text: "Learn TypeScript basics",
        description: "Add type safety to your code",
      },
      {
        text: "Understand design patterns",
        description: "Write better, maintainable software",
      },
      {
        text: "Study algorithm complexity",
        description: "Optimize your coding solutions",
      },
    ],
  },
];

export function generateHashedPassword(password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return hash;
}

export function generateDummyPassword() {
  const password = generateId(12);
  const hashedPassword = generateHashedPassword(password);

  return hashedPassword;
}

export const guestRegex = /^guest-\d+$/;

export const DUMMY_PASSWORD = generateDummyPassword();

export const messages: Array<any> = [
  {
    id: "msg1",
    role: "user",
    parts: [{ type: "text", text: "Hi there!" }],
    content: "Hi there!",
    createdAt: new Date("2025-06-08T10:00:00Z"),
  },
  {
    id: "msg2",
    role: "assistant",
    parts: [{ type: "text", text: "Hello! How can I help you today?" }],
    content: "Hello! How can I help you today?",
    createdAt: new Date("2025-06-08T10:00:05Z"),
  },
  {
    id: "msg3",
    role: "user",
    parts: [{ type: "text", text: "Tell me a fun fact." }],
    content: "Tell me a fun fact.",
    createdAt: new Date("2025-06-08T10:01:00Z"),
  },
  {
    id: "msg4",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Did you know? Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs!",
      },
    ],
    content:
      "Did you know? Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs!",
    createdAt: new Date("2025-06-08T10:01:05Z"),
  },
];
