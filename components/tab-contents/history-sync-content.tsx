import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function HistorySyncContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Chat History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="save-history" className="text-gray-300">
              Save Chat History
            </Label>
            <Switch id="save-history" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sync-devices" className="text-gray-300">
              Sync Across Devices
            </Label>
            <Switch id="sync-devices" defaultChecked />
          </div>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Export Chat History
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            Manage your stored conversations and data.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Clear All History
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Download Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
