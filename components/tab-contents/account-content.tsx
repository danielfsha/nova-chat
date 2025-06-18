import { UpgradeSection } from "@/components/upgrade-section";
import { DangerZone } from "@/components/danger-zone";

export function AccountContent() {
  return (
    <div className="space-y-8">
      <UpgradeSection />
      <DangerZone />
    </div>
  );
}
