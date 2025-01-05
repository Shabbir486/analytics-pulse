import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, MoreVertical } from "lucide-react";
import { UserTable } from "./UserTable";
import { UserTabs } from "./UserTabs";
import { CreateUserDialog } from "./CreateUserDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UsersList() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"all" | "active" | "pending" | "banned" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">List</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          New user
        </Button>
      </div>

      <UserTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />

      <div className="flex items-center gap-4">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="content-creator">Content Creator</SelectItem>
            <SelectItem value="it-admin">IT Administrator</SelectItem>
            <SelectItem value="financial-planner">Financial Planner</SelectItem>
            <SelectItem value="hr-recruiter">HR Recruiter</SelectItem>
            <SelectItem value="graphic-designer">Graphic Designer</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1">
          <Input 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <UserTable 
        selectedTab={selectedTab}
        searchQuery={searchQuery}
        roleFilter={roleFilter}
      />

      <CreateUserDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}