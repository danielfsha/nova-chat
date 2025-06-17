"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { categories } from "@/lib/constants";

import { motion } from "framer-motion";
import { useChatMessage } from "@/hooks/use-chat-messages";

export default function Greeting() {
  const [activeFilter, setActiveFilter] = useState("create");
  const { handleInputChange } = useChatMessage();

  const activeCategory =
    categories.find((cat) => cat.id === activeFilter) || categories[0];

  return (
    <div className="flex flex-col justify-start items-start mt-2 pt-[189px] space-y-6 px-4 lg:px-12">
      <h1 className="text-center text-3xl font-bold text-[#501854] lg:text-left">
        How can I help you, daniel?
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 lg:justify-start w-full">
        {categories.map((category) => (
          <button
            onClick={() => setActiveFilter(category.id)}
            key={category.id}
            className={`px-4 py-4 text-fuchsia-900/90 text-sm font-normal leading-tight tracking-tight flex flex-col items-center justify-center backdrop-blur-md rounded-lg bg-[#F1C4E6]/30 border border-[#F1C4E6]/70 w-auto ${
              category.id === activeCategory.id &&
              "bg-pink-900/80 rounded-xl outline-offset-[-1.50px] outline-neutral-700/50 backdrop-blur-lg text-white"
            } lg:flex-row lg:space-x-2 lg:rounded-full lg:py-2 lg:w-auto lg:justify-start`}
          >
            {category.icon}
            <span className="font-bold tracking-normal">{category.title}</span>
          </button>
        ))}
      </div>

      {/* Suggestions List */}
      {activeCategory.suggestions.map((suggestion, index) => (
        <div
          className="flex flex-col w-full space-y-0.5 mb-0.5" // add mb-4 here
          key={index}
        >
          <div
            onClick={() =>
              handleInputChange({
                target: { value: suggestion.text },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="text-sm tracking-wide leading-normal py-2 text-[#77347C] border-b-pink-950/10 hover:bg-pink-900/10 px-4 rounded-sm"
          >
            {suggestion.text}
          </div>

          <div
            className={`border-b border-b-pink-950/20 w-full ${
              index === activeCategory.suggestions.length - 1 && "opacity-0"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
}
