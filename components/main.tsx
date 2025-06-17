"use client";

import { motion } from "framer-motion";

import Mask from "./mask";

import { useSidebar } from "../hooks/use-sidebar";

import Chat from "./chat";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainContent() {
  const isMobile = useIsMobile();
  const { sidebarOpen } = useSidebar();

  return (
    <main
      className="fixed bottom-0 transition-all duration-150 ease-in-out z-10 border border-gray-300 bg-[#FDF7FD] dark:bg-[#211D26] dark:border-[#322028]"
      style={{
        height: sidebarOpen ? "calc(100vh - 16px)" : "100vh",
        width: sidebarOpen && !isMobile ? "calc(100vw - 256px)" : "100vw",
        left: sidebarOpen && !isMobile ? "256px" : "0px",
        borderTopLeftRadius: sidebarOpen ? "16px" : "0",
      }}
    >
      <motion.div
        className="absolute"
        animate={{
          right: sidebarOpen ? -120 : -350,
          top: -25,
        }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        style={{ pointerEvents: "none", right: -350, top: -25 }}
      >
        <Mask className="" />
      </motion.div>

      <div className="w-full h-full overflow-hidden max-w-3xl mx-auto px-2">
        <Chat />
      </div>
    </main>
  );
}
