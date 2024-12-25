import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ProductTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelectProduct: (productId: number) => void;
  onSelectAll: () => void;
}

export function ProductTable({ products, selectedProducts, onSelectProduct, onSelectAll }: ProductTableProps) {
  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: "Out of stock", variant: "destructive" as const };
    if (product.stock <= product.reorderThreshold) return { label: "Low stock", variant: "warning" as const };
    return { label: `${product.stock} in stock`, variant: "success" as const };
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="w-12">
            <Checkbox
              checked={products.length > 0 && selectedProducts.length === products.length}
              onCheckedChange={onSelectAll}
              aria-label="Select all products"
            />
          </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Create at</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => {
          const stockStatus = getStockStatus(product);
          return (
            <TableRow key={product.id} className="group">
              <TableCell>
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => onSelectProduct(product.id)}
                  aria-label={`Select ${product.name}`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {format(new Date(product.createdAt), "dd MMM yyyy")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(product.createdAt), "hh:mm a")}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={stockStatus.variant}
                  className="font-normal"
                >
                  {stockStatus.label}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  ${product.price.toFixed(2)}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={product.status === "Published" ? "default" : "secondary"}
                  className="font-normal"
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}