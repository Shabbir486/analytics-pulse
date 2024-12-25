import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
  return (
    <header className="border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-[300px] bg-muted/30"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Admin"
              className="h-8 w-8 rounded-full"
            />
          </Button>
        </div>
      </div>
    </header>
  );
}