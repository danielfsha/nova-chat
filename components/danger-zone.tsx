import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function DangerZone() {
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#501854] dark:text-white">
          Danger Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          Permanently delete your account and all associated data.
        </p>
        <Button>Delete Account</Button>
      </CardContent>
    </Card>
  );
}
