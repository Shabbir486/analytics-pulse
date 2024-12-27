import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";

interface ProductImagePreviewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductImagePreview({ product, open, onOpenChange }: ProductImagePreviewProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-medium text-sm">Product Details</h4>
            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm">Category</h4>
            <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}