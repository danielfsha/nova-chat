import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const shortcuts = [
  { action: "Search", keys: ["Ctrl", "K"] },
  { action: "New Chat", keys: ["Ctrl", "Shift", "O"] },
  { action: "Toggle Sidebar", keys: ["Ctrl", "B"] },
];

export function KeyboardShortcuts() {
  return (
    <div
      className={cn(
        "p-4 space-y-3 w-full rounded-md bg-[#FAF3FB] text-pink-950 font-bold mb-1 ",
        "dark:bg-[#0B080B] dark:text-white"
      )}
    >
      <h3 className="font-medium">Keyboard Shortcuts</h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.action}
            className="flex items-center text-sm justify-between"
          >
            <span>{shortcut.action}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={cn(
                    "text-xs px-2 py-1 bg-pink-200 rounded-none border-none text-pink-950",
                    ""
                  )}
                >
                  {key}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
