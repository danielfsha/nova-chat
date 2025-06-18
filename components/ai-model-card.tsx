import Image from "next/image";
import { cn } from "@/lib/utils";
import { capabilityColors, capabilityIcons, Model } from "@/lib/constants";

// Reusable badge for a capability
function CapabilityBadge({ capability }: { capability: string }) {
  const colorClasses =
    capabilityColors[capability as keyof typeof capabilityColors];
  const Icon = capabilityIcons[capability as keyof typeof capabilityIcons];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm text-xs border w-7 h-7 aspect-square",
        colorClasses
      )}
      title={capability}
      aria-label={capability}
    >
      {Icon}
    </span>
  );
}

export function ModelCard({
  model,
  selectedModel,
  isGridView = false,
  handleModelSelect,
}: {
  model: Model;
  selectedModel: Model;
  isGridView?: boolean;
  handleModelSelect: (model: Model) => void;
}) {
  if (isGridView) {
    return (
      <button
        style={{
          opacity: model.status === "limited" ? 0.5 : 1,
        }}
        disabled={model.status == "limited"}
        type="button"
        onClick={() => handleModelSelect(model)}
        className={cn(
          "backdrop-blur-sm border hover:bg-pink-500/10 border-gray-200/50 rounded-xl transition-all duration-200 group text-left w-full h-[160px] flex flex-col items-center justify-between pt-4",
          "dark:border-pink-200/10"
        )}
        aria-pressed={model.id === selectedModel.id}
      >
        <Image
          src={`/${model.icon}`}
          alt={model.name}
          width={42}
          height={42}
          className="mb-2"
        />
        <span
          className={cn(
            "flex items-center gap-1 font-medium text-center text-gray-900 text-sm px-2",
            "dark:text-pink-100"
          )}
        >
          {model.name}
        </span>
        <div className="flex flex-wrap justify-center gap-1 w-full mt-2 py-2">
          {model.capabilities.slice(0, 3).map((capability) => (
            <CapabilityBadge key={capability} capability={capability} />
          ))}
        </div>
      </button>
    );
  }

  // List view
  return (
    <button
      style={{
        opacity: model.status === "limited" ? 0.5 : 1,
      }}
      disabled={model.status == "limited"}
      type="button"
      onClick={() => handleModelSelect(model)}
      className={cn(
        "w-full p-2 transition-colors duration-200 text-left group flex items-center justify-between gap-3 border-b-[1px] border-b-pink-950/10 last:border-0 hover:bg-pink-200/20 rounded-sm"
      )}
      aria-pressed={model.id === selectedModel.id}
    >
      <Image
        src={`/${model.icon}`}
        alt={model.name}
        width={22}
        height={22}
        className="rounded-lg"
      />
      <span className="flex-1 flex justify-between">
        <span
          className={cn(
            "flex items-center font-medium text-gray-900 text-sm",
            "dark:text-pink-100"
          )}
        >
          {model.name}
        </span>
        <span className="flex flex-wrap gap-1 mt-1 sm:mt-0">
          {model.capabilities.map((capability) => (
            <CapabilityBadge key={capability} capability={capability} />
          ))}
        </span>
      </span>
    </button>
  );
}
