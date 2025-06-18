import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function CustomizationContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Theme Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-gray-300">
              Dark Mode
            </Label>
            <Switch id="dark-mode" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode" className="text-gray-300">
              Compact Mode
            </Label>
            <Switch id="compact-mode" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Chat Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Font Size</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300"
              >
                Small
              </Button>
              <Button variant="secondary" size="sm" className="bg-gray-700">
                Medium
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300"
              >
                Large
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
