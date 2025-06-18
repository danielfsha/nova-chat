"use client";

import { useSession } from "@/lib/auth-client";
import { UsageStats } from "./usage-stats";
import { KeyboardShortcuts } from "./keyboard-shortcuts";

export default function SettingsSidebar() {
  const { data: session } = useSession();

  return (
    <aside className="hidden flex-col items-center justify-center space-y-4 lg:flex">
      {/* top */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <img
          src={`${session?.user.image}`}
          className="w-42 h-42 rounded-full"
          alt={session?.user.name}
        />

        <h1 className="text-center text-3xl font-bold text-[#501854] lg:text-left dark:text-white">
          {session?.user.name}
        </h1>
        <h1 className="text-pink-500 dark:text-pink-200">
          {session?.user.email}
        </h1>
        <p>Free</p>
      </div>

      {/* middle  */}
      <UsageStats
        resetTime="5:00 PM"
        currentUsage={1}
        maxUsage={20}
        remainingMessages={19}
      />

      {/* bottom */}
      <KeyboardShortcuts />
    </aside>
  );
}
