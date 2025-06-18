import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const models = [
  { name: "GPT-4", status: "Available", isPro: false },
  { name: "Claude 3", status: "Available", isPro: true },
  { name: "Grok 3", status: "Available", isPro: true },
  { name: "GPT-3.5", status: "Available", isPro: false },
  { name: "Claude Sonnet", status: "Available", isPro: true },
];

export function ModelsContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Available Models</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {models.map((model) => (
            <div
              key={model.name}
              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-white font-medium">{model.name}</span>
                {model.isPro && (
                  <Badge className="bg-pink-600 text-white">Pro</Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className="border-green-600 text-green-400"
                >
                  {model.status}
                </Badge>
                <Switch defaultChecked={!model.isPro} disabled={model.isPro} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
