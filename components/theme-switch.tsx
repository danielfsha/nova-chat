"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const ModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button onClick={toggleTheme} size={"icon"} variant="ghost">
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
