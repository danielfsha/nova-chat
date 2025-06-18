"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const ModeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, set mounted to true
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch and flicker
  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      size={"icon"}
      variant="ghost"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <Sun className="w-6 h-6 drop-shadow-sm" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <Moon className="w-6 h-6 drop-shadow-sm" />
        </motion.div>
      </div>
    </Button>
  );
};
