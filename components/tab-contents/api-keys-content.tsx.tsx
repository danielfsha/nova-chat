import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Copy } from "lucide-react";

export function ApiKeysContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">API Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">OpenAI API Key</Label>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="sk-..."
                className="bg-gray-900 border-gray-600 text-white"
              />
              <Button variant="outline" size="icon" className="border-gray-600">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Anthropic API Key</Label>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="sk-ant-..."
                className="bg-gray-900 border-gray-600 text-white"
              />
              <Button variant="outline" size="icon" className="border-gray-600">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-600">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button className="bg-pink-600 hover:bg-pink-700">
            Save API Keys
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
