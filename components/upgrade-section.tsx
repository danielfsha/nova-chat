import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Zap, Headphones } from "lucide-react";

const features = [
  {
    icon: Crown,
    title: "Access to All Models",
    description:
      "Get access to our full suite of models including Claude, o3-mini-high, and more!",
  },
  {
    icon: Zap,
    title: "Generous Limits",
    description:
      "Receive 1500 standard credits per month, plus 100 Premium credits* per month.",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description:
      "Get faster responses and dedicated assistance from the T3 team whenever you need help!",
  },
];

export function UpgradeSection() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Upgrade to Pro</h2>
        <div className="text-right">
          <span className="text-2xl font-bold">$8</span>
          <span className="text-gray-400">/month</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.title} className="shadow-none border-none">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <feature.icon className="w-5 h-5 text-pink-400" />
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-pink-500 text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="px-12 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3">
        Upgrade Now
      </Button>

      <p className="text-gray-400 text-xs">
        * Premium credits are used for GPT Image Gen, o3, Claude Sonnet, and
        Grok 3. Additional Premium credits can be purchased separately.
      </p>
    </div>
  );
}
