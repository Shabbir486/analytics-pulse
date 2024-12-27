import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export function ProductFilters() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          {/* Filter content will be implemented in future iterations */}
          <div className="text-sm">Filter options coming soon...</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}