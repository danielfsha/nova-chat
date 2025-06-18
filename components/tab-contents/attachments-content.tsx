import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { File, ImageIcon, FileText } from "lucide-react";

export function AttachmentsContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">File Upload Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-upload" className="text-gray-300">
              Auto-upload files
            </Label>
            <Switch id="auto-upload" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="compress-images" className="text-gray-300">
              Compress images
            </Label>
            <Switch id="compress-images" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Attachments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "document.pdf", type: "pdf", size: "2.4 MB" },
            { name: "image.png", type: "image", size: "1.2 MB" },
            { name: "data.csv", type: "csv", size: "856 KB" },
          ].map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg"
            >
              {file.type === "pdf" && (
                <FileText className="w-5 h-5 text-red-400" />
              )}
              {file.type === "image" && (
                <ImageIcon className="w-5 h-5 text-blue-400" />
              )}
              {file.type === "csv" && (
                <File className="w-5 h-5 text-green-400" />
              )}
              <div className="flex-1">
                <p className="text-white text-sm">{file.name}</p>
                <p className="text-gray-400 text-xs">{file.size}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300"
              >
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
