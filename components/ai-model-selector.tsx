"use client";

import { Model, models } from "@/lib/constants";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Crown,
  Heart,
  Search,
} from "lucide-react";
import React, { useState, useRef, useLayoutEffect } from "react";
import { ModelCard } from "@/components/ai-model-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatMessage } from "@/hooks/use-chat-messages";
import { cn } from "@/lib/utils";

export default function AIModelSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedModel, setSelectedModel } = useChatMessage();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  type CapabilityKey = "fast" | "vision" | "search" | "pdfs" | "reasoning";
  const [capabilities, setCapabilities] = useState<
    Record<CapabilityKey, boolean>
  >({
    fast: false,
    vision: false,
    search: false,
    pdfs: false,
    reasoning: false,
  });

  // Ref for closing dropdown on outside click
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteModels = filteredModels.filter(
    (model) => model.category === "favorites"
  );
  const otherModels = filteredModels.filter(
    (model) => model.category === "others"
  );

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setIsOpen(false);
    setSearchQuery("");
    setShowAll(false);
  };

  const toggleShowAll = () => setShowAll((prev) => !prev);

  // Close dropdown when clicking outside
  useLayoutEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      // If click is inside dropdown or filter, do not close
      if (
        (dropdownRef.current &&
          dropdownRef.current.contains(e.target as Node)) ||
        (filterRef.current && filterRef.current.contains(e.target as Node))
      ) {
        return;
      }
      setIsOpen(false);
      setShowAll(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <div ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <Button
        variant="ghost"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="text-pink-900 dark:text-pink-100"
      >
        <img
          src={`${selectedModel.icon}`}
          width={18}
          height={18}
          className="aspect-auto "
        />
        <span className="hidden md:flex">{selectedModel.name}</span>
        <ChevronDown size={16} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 bottom-10 mb-2 bg-white backdrop-blur-md border border-gray-200 rounded-xl overflow-hidden flex flex-col z-[60] w-full max-w-screen-sm transition-all duration-150",
            "dark:bg-[#100A0E] dark:text-white dark:border-pink-950/20"
          )}
          style={
            showAll
              ? { height: `calc(100vh - ${100}px)`, width: "100%" }
              : { height: 500, width: 380, maxWidth: "100%" }
          }
        >
          {/* Search */}
          <div
            className={cn(
              "p-2 pb-0 text-pink-900 border-pink-800 shrink-0",
              "dark:text-white"
            )}
          >
            <div className="relative">
              <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("border-b pl-10")}
              />
            </div>
          </div>

          {/* Upgrade Section */}
          <div
            className={cn(
              "m-4 p-4 rounded-sm bg-gradient-to-b from-pink-400/20 via-pink-300/10 to-white border border-pink-800/20",
              "from-pink-400/20 via-pink-300/10 to-transparent border border-pink-800/20"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={cn(
                  "font-bold text-xl text-[#454554]",
                  "dark:text-white"
                )}
              >
                Unlock all models + higher limits
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1 text-pink-400">
                <span className="text-3xl font-bold">$8</span>
                <span className="dark:text-pink-100">/ month</span>
              </div>
              <Button>
                <span className="font-bold text-sm">Upgrade now</span>
              </Button>
            </div>
          </div>

          {/* Models Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Favorites Section */}
            {!showAll && (
              <div>
                {favoriteModels.slice(0, 5).map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    selectedModel={selectedModel}
                    handleModelSelect={handleModelSelect}
                  />
                ))}
              </div>
            )}
            {showAll && (
              <div className="space-y-6">
                {/* Favorites Section */}
                <div>
                  <h3 className="font-semibold text-gray-900">Favorites</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                    {favoriteModels.map((model) => (
                      <div key={model.id}>
                        <ModelCard
                          model={model}
                          isGridView={true}
                          selectedModel={selectedModel}
                          handleModelSelect={handleModelSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Others Section */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Others</h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                    {otherModels.map((model) => (
                      <div key={model.id}>
                        <ModelCard
                          model={model}
                          isGridView={true}
                          selectedModel={selectedModel}
                          handleModelSelect={handleModelSelect}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 px-1 py-1 shrink-0 pr-2">
            <div className="flex items-center justify-between text-sm">
              {/* Show All Toggle */}
              <div className="shrink-0">
                <Button variant="ghost" type="button" onClick={toggleShowAll}>
                  {showAll ? (
                    <>
                      <ChevronLeft className="w-4 h-4" />
                      Favorites
                    </>
                  ) : (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show all ({otherModels.length +
                        favoriteModels.length -
                        5}{" "}
                      more)
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
