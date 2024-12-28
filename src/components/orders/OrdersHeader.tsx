import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrderStatus } from "@/types/order";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface OrdersHeaderProps {
  selectedStatus: OrderStatus | 'all';
  onStatusChange: (status: OrderStatus | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

const statuses: { value: OrderStatus | 'all'; label: string; count: number }[] = [
  { value: 'all', label: 'All', count: 20 },
  { value: 'pending', label: 'Pending', count: 6 },
  { value: 'completed', label: 'Completed', count: 10 },
  { value: 'cancelled', label: 'Cancelled', count: 2 },
  { value: 'refunded', label: 'Refunded', count: 2 },
];

export function OrdersHeader({
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
}: OrdersHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b">
        {statuses.map((status) => (
          <Button
            key={status.value}
            variant={selectedStatus === status.value ? "default" : "ghost"}
            className="relative"
            onClick={() => onStatusChange(status.value)}
          >
            {status.label}
            <span className="ml-2 text-xs">{status.count}</span>
          </Button>
        ))}
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search customer or order number..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range) => {
                onDateRangeChange({
                  from: range?.from,
                  to: range?.to,
                });
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}