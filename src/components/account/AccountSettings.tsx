import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountGeneral } from "./AccountGeneral";
import { AccountNotifications } from "./AccountNotifications";
import { AccountSecurity } from "./AccountSecurity";
import { AccountSocialLinks } from "./AccountSocialLinks";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
            <BreadcrumbLink>Account</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mt-2">Account Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="social-links">Social Links</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <AccountGeneral />
        </TabsContent>
        <TabsContent value="notifications">
          <AccountNotifications />
        </TabsContent>
        <TabsContent value="security">
          <AccountSecurity />
        </TabsContent>
        <TabsContent value="social-links">
          <AccountSocialLinks />
        </TabsContent>
      </Tabs>
    </div>
  );
}