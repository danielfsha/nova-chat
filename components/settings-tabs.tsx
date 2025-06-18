"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AccountContent } from "@/components/tab-contents/account-content";
import { CustomizationContent } from "@/components/tab-contents/customization-content";
import { HistorySyncContent } from "@/components/tab-contents/history-sync-content";
import { ModelsContent } from "@/components/tab-contents/models-content";
import { ApiKeysContent } from "@/components/tab-contents/api-keys-content";
import { AttachmentsContent } from "@/components/tab-contents/attachments-content";
import { ContactContent } from "@/components/tab-contents/contact-content";
import { cn } from "@/lib/utils";

const navigationItems = [
  { value: "Account", component: AccountContent },
  { value: "Customization", component: CustomizationContent },
  { value: "History & Sync", component: HistorySyncContent },
  { value: "Models", component: ModelsContent },
  { value: "API Keys", component: ApiKeysContent },
  { value: "Attachments", component: AttachmentsContent },
  { value: "Contact Us", component: ContactContent },
];

export function SettingTabs() {
  return (
    <Tabs defaultValue="Account" className="w-full">
      <TabsList
        className={cn(
          "w-full overflow-scroll bg-pink-200",
          "dark:bg-pink-50/80"
        )}
      >
        {navigationItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              "whitespace-nowrap text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-pink-950 text-pink-800",
              "dark:data-[state=active]:bg-pink-900"
            )}
          >
            {item.value}
          </TabsTrigger>
        ))}
      </TabsList>

      {navigationItems.map((item, index) => (
        <TabsContent key={item.value} value={item.value} className="mt-0">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content - changes based on active tab */}
            <div className="flex-1 p-6">
              <item.component />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
