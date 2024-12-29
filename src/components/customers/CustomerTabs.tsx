import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CustomerTabsProps {
  selectedTab: "all" | "active" | "pending" | "banned" | "rejected";
  onTabChange: (tab: "all" | "active" | "pending" | "banned" | "rejected") => void;
}

export function CustomerTabs({ selectedTab, onTabChange }: CustomerTabsProps) {
  const tabs = [
    { id: "all" as const, label: "All", count: 20 },
    { id: "active" as const, label: "Active", count: 2 },
    { id: "pending" as const, label: "Pending", count: 10 },
    { id: "banned" as const, label: "Banned", count: 6 },
    { id: "rejected" as const, label: "Rejected", count: 2 },
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