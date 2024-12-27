import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { ProductRating } from "./ProductRating";
import { ProductPrice } from "./ProductPrice";
import { Badge } from "@/components/ui/badge";

interface ProductImagePreviewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductImagePreview({ product, open, onOpenChange }: ProductImagePreviewProps) {
  if (!product) return null;

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: "Out of stock", variant: "destructive" as const };
    if (product.stock <= product.reorderThreshold) return { label: "Low stock", variant: "warning" as const };
    return { label: `${product.stock} in stock`, variant: "success" as const };
  };

  const stockStatus = getStockStatus(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <ProductImageCarousel product={product} />
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <div className="mt-2">
                <ProductRating rating={4.5} reviews={1950} />
              </div>
            </div>
            <ProductPrice 
              price={product.price}
              discountPrice={product.discountPrice}
              currency={product.currency}
            />
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <p className="text-muted-foreground">{product.category}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Stock Status</h3>
              <Badge variant={stockStatus.variant}>
                {stockStatus.label}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium mb-2">SKU</h3>
              <p className="text-muted-foreground">{product.sku}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}