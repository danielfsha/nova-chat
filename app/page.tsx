import { MainContent } from "@/components/main";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export default function Chat() {
  return (
    <div className="h-screen overflow-hidden bg-[#F2E1F4] dark:bg-[#21141E] dark:text-white">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content - Fixed positioned */}
      <MainContent />
    </div>
  );
}
