import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ColumnVisibility } from "./ProductColumnsSelector";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface ProductTableProps {
  products: Product[];
  selectedProducts: number[];
  onSelectProduct: (productId: number) => void;
  onSelectAll: () => void;
  columnVisibility?: ColumnVisibility;
}

export function ProductTable({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll,
  columnVisibility = {
    product: true,
    createAt: true,
    stock: true,
    price: true,
    status: true,
  }
}: ProductTableProps) {
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: "Out of stock", variant: "destructive" as const };
    if (product.stock <= product.reorderThreshold) return { label: "Low stock", variant: "warning" as const };
    return { label: `${product.stock} in stock`, variant: "success" as const };
  };

  const handleView = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product: Product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = () => {
    if (deleteProduct) {
      // Here you would typically make an API call to delete the product
      toast.success(`Product "${deleteProduct.name}" deleted successfully`);
      setDeleteProduct(null);
    }
  };

  return (
    <>
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
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product);
            return (
              <TableRow key={product.id}>
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
                      onClick={() => handleView(product)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View {product.name}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {product.name}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete {product.name}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm initialData={editingProduct} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{deleteProduct?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}