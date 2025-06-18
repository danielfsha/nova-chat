"use client";

import { signOut, useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/theme-switch";
import SettingsSidebar from "@/components/settings-sidebar";
import SettingsContent from "@/components/settings-content";

export default function Page() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="h-screen w-full max-w-screen-lg overflow-hidden mx-auto px-3">
      <header className="flex items-center justify-between py-4 w-full">
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft size={16} />
            <span>Back to Chat</span>
          </Button>
        </Link>
        <div className="flex items-center justify-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </header>

      <section className="flex items-start justify-center w-full pt-8">
        <SettingsSidebar />
        <SettingsContent />
      </section>
    </div>
  );
}
