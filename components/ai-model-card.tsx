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
        type="button"
        onClick={() => handleModelSelect(model)}
        className={cn(
          "backdrop-blur-sm border border-gray-200 rounded-xl transition-all duration-200 group text-left w-full h-[160px] flex flex-col items-center justify-between pt-4",
          model.id === selectedModel.id ? "ring-1 ring-pink-900/60" : ""
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
        <span className="flex items-center gap-1 font-medium text-center text-gray-900 text-sm px-2">
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
      type="button"
      onClick={() => handleModelSelect(model)}
      className={cn(
        "w-full p-3 transition-colors duration-200 text-left group border-b border-gray-50 last:border-b-0 flex items-center justify-between gap-3",
        model.id === selectedModel.id ? "bg-purple-50" : ""
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
        <span className="flex items-center font-medium text-gray-900 group-hover:text-purple-700 text-sm">
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
