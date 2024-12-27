import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export type ColumnVisibility = {
  product: boolean;
  createAt: boolean;
  stock: boolean;
  price: boolean;
  status: boolean;
};

interface ProductColumnsSelectorProps {
  columns: ColumnVisibility;
  onColumnChange: (column: keyof ColumnVisibility) => void;
  onReset: () => void;
}

export function ProductColumnsSelector({
  columns,
  onColumnChange,
  onReset,
}: ProductColumnsSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="product"
                checked={columns.product}
                onCheckedChange={() => onColumnChange("product")}
              />
              <label htmlFor="product" className="text-sm">
                Product
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="createAt"
                checked={columns.createAt}
                onCheckedChange={() => onColumnChange("createAt")}
              />
              <label htmlFor="createAt" className="text-sm">
                Create at
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="stock"
                checked={columns.stock}
                onCheckedChange={() => onColumnChange("stock")}
              />
              <label htmlFor="stock" className="text-sm">
                Stock
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="price"
                checked={columns.price}
                onCheckedChange={() => onColumnChange("price")}
              />
              <label htmlFor="price" className="text-sm">
                Price
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="status"
                checked={columns.status}
                onCheckedChange={() => onColumnChange("status")}
              />
              <label htmlFor="status" className="text-sm">
                Publish
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" size="sm" onClick={onReset}>
              Reset
            </Button>
            <div className="text-xs text-muted-foreground">
              Show/Hide All
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}