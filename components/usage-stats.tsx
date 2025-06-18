import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UsageStatsProps {
  resetTime: string;
  currentUsage: number;
  maxUsage: number;
  remainingMessages: number;
}

export function UsageStats({
  resetTime,
  currentUsage,
  maxUsage,
  remainingMessages,
}: UsageStatsProps) {
  const usagePercentage = (currentUsage / maxUsage) * 100;

  return (
    <div
      className={cn(
        "p-4 space-y-3 w-full rounded-md bg-[#FAF3FB]",
        "dark:bg-[#0B080B]"
      )}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-pink-950 font-bold mb-1 dark:text-white">
          Message <br /> Usage
        </h3>
        <p className="text-gray-400 text-xs">Resets today at {resetTime}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Standard</span>
          <span className="text-pink-950 dark:text-white">
            {currentUsage}/{maxUsage}
          </span>
        </div>
        <Progress value={usagePercentage} className="h-2" />
        <p className="text-pink-400 text-sm font-medium">
          {remainingMessages} messages remaining
        </p>
      </div>
    </div>
  );
}
