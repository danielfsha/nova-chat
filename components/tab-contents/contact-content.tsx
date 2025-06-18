import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Bug } from "lucide-react";

export function ContactContent() {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Subject</Label>
            <Input
              placeholder="How can we help you?"
              className="bg-gray-900 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Message</Label>
            <Textarea
              placeholder="Describe your issue or question..."
              className="bg-gray-900 border-gray-600 text-white min-h-[120px]"
            />
          </div>

          <Button className="bg-pink-600 hover:bg-pink-700">
            Send Message
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Bug className="w-4 h-4 mr-2" />
            Report a Bug
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Feature Request
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Mail className="w-4 h-4 mr-2" />
            General Inquiry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
