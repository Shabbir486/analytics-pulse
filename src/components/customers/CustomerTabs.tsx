import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "./mockData";

interface CustomerTabsProps {
  selectedTab: "all" | "active" | "pending" | "banned" | "rejected";
  onTabChange: (tab: "all" | "active" | "pending" | "banned" | "rejected") => void;
}

export function CustomerTabs({ selectedTab, onTabChange }: CustomerTabsProps) {
  const getStatusCount = (status: string) => {
    return mockCustomers.filter(customer => 
      status === "all" ? true : customer.status.toLowerCase() === status.toLowerCase()
    ).length;
  };

  const tabs = [
    { id: "all" as const, label: "All", count: getStatusCount("all") },
    { id: "active" as const, label: "Active", count: getStatusCount("active") },
    { id: "pending" as const, label: "Pending", count: getStatusCount("pending") },
    { id: "banned" as const, label: "Banned", count: getStatusCount("banned") },
    { id: "rejected" as const, label: "Rejected", count: getStatusCount("rejected") },
  ];

  return (
    <div className="flex gap-2 border-b">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          className={`relative rounded-none border-b-2 ${
            selectedTab === tab.id
              ? "border-primary"
              : "border-transparent"
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          <Badge
            variant="secondary"
            className="ml-2 rounded-full"
          >
            {tab.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}