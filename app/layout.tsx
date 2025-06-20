import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { ChatMessageProvider } from "@/hooks/use-chat-messages";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPaletteProvider } from "@/hooks/use-command-palette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Chat",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatMessageProvider>
            <SidebarProvider>
              <CommandPaletteProvider>{children}</CommandPaletteProvider>
            </SidebarProvider>
          </ChatMessageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
