"use client";

import { Button } from "@/components/ui/button";

import { PanelLeft, Plus, Search, Settings2 } from "lucide-react";
import { useSidebar } from "../hooks/use-sidebar";
import { ModeToggle } from "./theme-switch";
import { AnimatePresence, motion } from "framer-motion";

import { useCommandPalette } from "@/hooks/use-command-palette";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  const { sidebarOpen, toggleSidebar } = useSidebar();
  const { setOpen } = useCommandPalette();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-[100] flex items-center px-3">
      <div className="flex items-center justify-between w-full">
        {/* Sidebar Toggle + Buttons */}
        <div
          className={`flex items-center rounded-sm backdrop-blur-3xl bg-pink-200/30 dark:bg-[#1A171D] p-[2px]`}
        >
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            className="pointer-events-auto text-[#A74370] dark:text-pink-200"
            aria-label="Toggle sidebar"
          >
            <PanelLeft size={16} />
          </Button>
          <AnimatePresence initial={false}>
            {!sidebarOpen && (
              <motion.div
                className="flex items-center pointer-events-auto"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
                style={{ overflow: "hidden", display: "flex" }}
              >
                <motion.button
                  className="w-8 h-7 flex items-center justify-center text-[#A74370] dark:text-pink-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 600, damping: 30 }}
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open search"
                >
                  <Search size={16} />
                </motion.button>
                <motion.button
                  className="w-8 h-7 flex items-center justify-center text-[#A74370] dark:text-pink-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 30,
                    delay: 0.08,
                  }}
                  type="button"
                  aria-label="New chat"
                >
                  <Plus size={16} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side controls */}
        <div
          className={cn(
            "flex items-center bg-pink-200/30 rounded-sm",
            "dark:text-pink-200 dark:bg-[#1A171D]"
          )}
        >
          <Link href="/settings/subscription">
            <Button variant="ghost" size="sm" aria-label="Settings">
              <Settings2 className="w-5 h-5 " />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
