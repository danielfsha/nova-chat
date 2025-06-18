"use client";

import { signOut, useSession } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
}
