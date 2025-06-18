import { MainContent } from "@/components/main";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";

export default function Chat() {
  return (
    <div
      className={cn(
        "h-screen overflow-hidden bg-gradient-to-br from-[#F3E6F5] to-[#F0DBF4]",
        "dark:from-[#1C131A] dark:to-[#100A0E] dark:text-white"
      )}
    >
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content - Fixed positioned */}
      <MainContent />
    </div>
  );
}
