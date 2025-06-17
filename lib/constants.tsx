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
    id: "gemini-2.6-pro",
    name: "Gemini 2.6 Pro",
    type: "Google",
    status: "pro",
    capabilities: ["reasoning", "vision", "code"],
    icon: "gemini.svg",
    description: "Advanced reasoning and analysis",
    category: "favorites",
  },
  {
    id: "gpt-imagegen",
    name: "GPT ImageGen",
    type: "OpenAI",
    status: "pro",
    capabilities: ["image-gen"],
    icon: "openai.svg",
    description: "AI-powered image generation",
    category: "favorites",
  },
  {
    id: "o1-mini",
    name: "o1-mini",
    type: "OpenAI",
    status: "available",
    capabilities: ["reasoning", "code"],
    icon: "openai.svg",
    description: "Optimized for coding tasks",
    category: "favorites",
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    type: "Anthropic",
    status: "available",
    capabilities: ["reasoning", "writing", "code"],
    icon: "claude.svg",
    description: "Best for creative writing and analysis",
    category: "favorites",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    type: "DeepSeek",
    status: "limited",
    capabilities: ["reasoning", "code"],
    icon: "deepseek.svg",
    description: "Specialized reasoning model",
    category: "favorites",
  },
  // Others category
  {
    id: "gemini-2.0-flash",
    name: "Gemini 2.0 Flash",
    type: "Google",
    status: "available",
    capabilities: ["fast", "vision"],
    icon: "gemini.svg",
    description: "Previous generation flash model",
    category: "others",
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
    id: "Meta",
    name: "Meta",
    type: "Meta",
    status: "available",
    capabilities: ["fast", "code"],
    icon: "meta.svg",
    description: "Compact but powerful",
    category: "others",
  },
  {
    id: "gpt-4o",
    name: "GPT 4o",
    type: "OpenAI",
    status: "pro",
    capabilities: ["reasoning", "vision", "code"],
    icon: "openai.svg",
    description: "Advanced multimodal model",
    category: "others",
  },
  {
    id: "gpt-4.1",
    name: "GPT 4.1",
    type: "OpenAI",
    status: "limited",
    capabilities: ["reasoning", "writing"],
    icon: "openai.svg",
    description: "Latest GPT iteration",
    category: "others",
  },
  {
    id: "Mistral",
    name: "Mistral",
    type: "OpenAI",
    status: "available",
    capabilities: ["fast", "code"],
    icon: "mistral.svg",
    description: "Efficient mini version",
    category: "others",
  },
  {
    id: "Qwen",
    name: "Qwen",
    type: "OpenAI",
    status: "available",
    capabilities: ["fast"],
    icon: "qwen.svg",
    description: "Ultra-lightweight model",
    category: "others",
  },
  {
    id: "Perplexity",
    name: "Perplexity",
    type: "Perplexity",
    status: "limited",
    capabilities: ["reasoning"],
    icon: "perplexity.svg",
    description: "Next-gen reasoning",
    category: "others",
  },
  {
    id: "Grok",
    name: "Grok",
    type: "Grok",
    status: "limited",
    capabilities: ["reasoning"],
    icon: "grok.svg",
    description: "Alternative o3 instance",
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
  fast: "bg-[#D1ECE6] text-[#43C7AC]",
  vision: "bg-[#D6E0F1] text-[#4189C9]",
  code: "bg-[#DAD7F2] text-[#555BCE]",
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
