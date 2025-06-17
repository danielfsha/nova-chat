"use client";

import { useState } from "react";

interface UseClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<void>;
}

export const useClipboard = (resetDelay: number = 2000): UseClipboardReturn => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);

      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch (fallbackError) {
        console.error("Fallback copy method also failed:", fallbackError);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return { copied, copyToClipboard };
};
