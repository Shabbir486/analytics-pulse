import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export type FilterOperator = 
  | "equals"
  | "contains"
  | "does not contain"
  | "does not equal"
  | "starts with"
  | "ends with"
  | "is empty"
  | "is not empty"
  | "is any of";

export interface ProductFilter {
  column: string;
  operator: FilterOperator;
  value: string;
}

interface ProductFiltersProps {
  onFilterChange: (filter: ProductFilter | null) => void;
  activeFilter: ProductFilter | null;
}

export function ProductFilters({ onFilterChange, activeFilter }: ProductFiltersProps) {
  const [column, setColumn] = useState<string>(activeFilter?.column || "");
  const [operator, setOperator] = useState<FilterOperator>(activeFilter?.operator || "equals");
  const [value, setValue] = useState<string>(activeFilter?.value || "");

  const columns = [
    { label: "Product", value: "name" },
    { label: "Category", value: "category" },
    { label: "Status", value: "status" },
    { label: "Stock", value: "stock" },
    { label: "Price", value: "price" },
  ];

  const operators: { label: string; value: FilterOperator }[] = [
    { label: "Equals", value: "equals" },
    { label: "Contains", value: "contains" },
    { label: "Does not contain", value: "does not contain" },
    { label: "Does not equal", value: "does not equal" },
    { label: "Starts with", value: "starts with" },
    { label: "Ends with", value: "ends with" },
    { label: "Is empty", value: "is empty" },
    { label: "Is not empty", value: "is not empty" },
    { label: "Is any of", value: "is any of" },
  ];

  const handleApplyFilter = () => {
    if (column && operator) {
      onFilterChange({ column, operator, value });
    }
  };

  const handleClearFilter = () => {
    setColumn("");
    setOperator("equals");
    setValue("");
    onFilterChange(null);
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className={activeFilter ? "text-primary" : "h-4 w-4"} />
            Filters
            {activeFilter && (
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                1
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <Select
                value={column}
                onValueChange={setColumn}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((col) => (
                    <SelectItem key={col.value} value={col.value}>
                      {col.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select
                value={operator}
                onValueChange={(value) => setOperator(value as FilterOperator)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {operator !== "is empty" && operator !== "is not empty" && (
              <div className="space-y-2">
                <Input
                  placeholder="Filter value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button onClick={handleApplyFilter} className="flex-1">
                Apply Filter
              </Button>
              {activeFilter && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleClearFilter}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}