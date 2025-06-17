"use client";

import { useEffect, useRef } from "react";
import { LogIn, Search } from "lucide-react";
import { useSidebar } from "../hooks/use-sidebar";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { useSession } from "@/lib/auth-client";

export function Sidebar() {
  const { data: session } = useSession();
  const { open, setOpen } = useCommandPalette();

  const { sidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside on mobile/tablet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        overlayRef.current &&
        overlayRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, closeSidebar]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-150 ease-in-out lg:hidden",
          sidebarOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 h-full w-86 px-4 pb-4 flex flex-col bg-[#ECD5F1] dark:bg-[#140E12] shadow-lg transition-transform duration-150 ease-in-out z-50 lg:bg-transparent dark:lg:bg-transparent",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "sm:translate-x-0 sm:static sm:shadow-none",
          "lg:w-64"
        )}
      >
        <div className="w-full overflow-y-auto flex flex-col items-center justify-start space-y-4">
          <h1 className="py-4 text-lg font-bold">Nova.Chat</h1>
          <Button className="w-full">New chat</Button>
          <div className="relative w-full h-9 border-b border-pink-800/20">
            <Search
              size={16}
              className="absolute top-1/2 left-1 -translate-y-1/2 text-[#A74370]"
            />
            <Input
              onFocus={() => setOpen(true)}
              placeholder="Search your threads..."
              className="pl-8 text-[#A74370] placeholder:text-[#A74370]"
            />
          </div>
        </div>

        <div className="flex-1 w-full"></div>

        <div className="w-full h-14 rounded-lg flex items-center justify-start text-pink-900 hover:bg-gray-100 dark:hover:bg-gray-700  px-4">
          {!session?.user ? (
            <Link
              href="/auth"
              className="space-x-2 flex items-center justify-start"
            >
              <LogIn size={16} />
              <span className="leading-normal tracking-tight">Login</span>
            </Link>
          ) : (
            <Link
              href="/subscription"
              className="flex items-center justify-center space-x-4"
            >
              <img
                src={session?.user?.image ?? ""}
                width={32}
                height={32}
                alt={session.user.name}
                className="rounded-full"
              />

              <div className="flex flex-col">
                <p className="font-medium text-sm">{session?.user.name}</p>
                <p className="text-xs">Free</p>
              </div>
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
