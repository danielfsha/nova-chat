"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Globe, Paperclip, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AiModelSelector from "@/components/ai-model-selector";
import Link from "next/link";

import { useChatMessage } from "@/hooks/use-chat-messages";
import { cn } from "@/lib/utils";

export default function ChatMessageForm() {
  const {
    input: globalInput,
    handleInputChange,
    handleFormSubmit,
    status,
    stop,
  } = useChatMessage();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Local input state separate from global input to avoid overwrite conflicts
  const [localInput, setLocalInput] = useState(globalInput);
  const [isUserTyping, setIsUserTyping] = useState(false);

  // Track last transcript for inactivity
  const [lastTranscript, setLastTranscript] = useState("");
  const [lastTranscriptTime, setLastTranscriptTime] = useState(Date.now());

  // Sync global input to localInput when global input changes externally
  useEffect(() => {
    if (!isUserTyping) {
      setLocalInput(globalInput);
    }
  }, [globalInput, isUserTyping]);

  // Handle local input changes (user typing)
  function handleLocalInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setIsUserTyping(true);
    setLocalInput(e.target.value);
    handleInputChange(e);
  }

  // When user stops typing for 1.5 seconds, reset isUserTyping to false to allow transcription updates again
  useEffect(() => {
    if (!isUserTyping) return;
    const timeout = setTimeout(() => {
      setIsUserTyping(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [localInput, isUserTyping]);

  function handleTextareaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.key === "Enter" && e.shiftKey) || (e.key === "Enter" && e.ctrlKey)) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  function handleCleanAndSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typeof localInput === "string") {
      const cleaned = localInput.replace(/^[\s\n]+|[\s\n]+$/g, "");
      if (cleaned !== localInput) {
        setLocalInput(cleaned);
        handleInputChange({ target: { value: cleaned } } as any);
      }
    }
    handleFormSubmit(e);
    setIsUserTyping(false);
    setLastTranscript("");
    setLocalInput(""); // reset local input after submit
    handleInputChange({ target: { value: "" } } as any); // reset global input after submit
  }

  function handleAttachClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) return;

    setSelectedImages(imageFiles);

    // TODO: upload or handle images here
    console.log("Selected images:", imageFiles);

    e.target.value = "";
  }

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 w-full h-auto p-2 pb-0 bg-gradient-to-b from-fuchsia-200/60 via-fuchsia-200 to-fuchsia-200/20 rounded-tl-[20px] rounded-tr-[20px] backdrop-blur-blur z-[100]",
        "dark:from-[#27202C] via-[#27202C] to-[#27202C] border-pink-500/10 border"
      )}
    >
      <form
        ref={formRef}
        onSubmit={handleCleanAndSubmit}
        className={cn(
          "relative bg-[#FAF0FB] flex flex-col items-center justify-center rounded-t-[10px] space-y-2 py-1 border",
          "bg-[#2B2531]"
        )}
      >
        <Textarea
          rows={1}
          value={localInput}
          onChange={handleLocalInputChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Type your message here..."
          className="min-h-[48px] max-h-48"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {selectedImages.length > 0 && (
          <div className="flex space-x-2 overflow-x-auto py-1 px-2 max-w-full">
            {selectedImages.map((file, idx) => {
              const url = URL.createObjectURL(file);
              return (
                <img
                  key={idx}
                  src={url}
                  alt={file.name}
                  className="h-16 w-16 object-cover rounded-md"
                  onLoad={() => URL.revokeObjectURL(url)}
                />
              );
            })}
          </div>
        )}

        <div className="w-full flex items-center justify-between px-2 py-1">
          <div className="flex items-center space-x-1">
            <AiModelSelector />

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              type="button"
              onClick={handleAttachClick}
              aria-label="Attach images"
            >
              <Paperclip size={16} />
            </Button>
            <Button variant="outline" className="rounded-full" type="button">
              <Globe size={16} />
              Search
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-1">
            <Button
              size="icon"
              type={
                status === "streaming" || status === "submitted"
                  ? "button"
                  : "submit"
              }
              onClick={
                status === "streaming" || status === "submitted"
                  ? stop
                  : undefined
              }
            >
              {!(status === "streaming" || status === "submitted") ? (
                <ArrowUp size={16} />
              ) : (
                <div className="bg-white rounded-xs w-4 h-4"></div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
