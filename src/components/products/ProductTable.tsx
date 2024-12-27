import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnVisibility } from "./ProductColumnsSelector";

interface ProductTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelectProduct: (productId: number) => void;
  onSelectAll: () => void;
  onPreviewProduct: (product: Product) => void;
  columnVisibility?: ColumnVisibility;
}

export function ProductTable({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll,
  onPreviewProduct,
  columnVisibility = {
    product: true,
    createAt: true,
    stock: true,
    price: true,
    status: true,
  }
}: ProductTableProps) {
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
          {columnVisibility.product && <TableHead>Product</TableHead>}
          {columnVisibility.createAt && <TableHead>Create at</TableHead>}
          {columnVisibility.stock && <TableHead>Stock</TableHead>}
          {columnVisibility.price && <TableHead>Price</TableHead>}
          {columnVisibility.status && <TableHead>Status</TableHead>}
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
              {columnVisibility.product && (
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
              )}
              {columnVisibility.createAt && (
                <TableCell>
                  <div className="text-sm">
                    {format(new Date(product.createdAt), "dd MMM yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(product.createdAt), "hh:mm a")}
                  </div>
                </TableCell>
              )}
              {columnVisibility.stock && (
                <TableCell>
                  <Badge 
                    variant={stockStatus.variant}
                    className="font-normal"
                  >
                    {stockStatus.label}
                  </Badge>
                </TableCell>
              )}
              {columnVisibility.price && (
                <TableCell>
                  <div className="font-medium">
                    ${product.price.toFixed(2)}
                  </div>
                </TableCell>
              )}
              {columnVisibility.status && (
                <TableCell>
                  <Badge 
                    variant={product.status === "Published" ? "default" : "secondary"}
                    className="font-normal"
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onPreviewProduct(product)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Preview product</span>
                  </Button>
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
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}