import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import { ProductReviews } from "./ProductReviews";

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  return (
    <div className="mt-12 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">100% original</h3>
          <p className="text-sm text-muted-foreground">
            Checked before selling and ensures no counterfeits.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">10 days replacement</h3>
          <p className="text-sm text-muted-foreground">
            Manufacturers defect covered under replacement.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">1-year warranty</h3>
          <p className="text-sm text-muted-foreground">
            Covers warranty against manufacturer issues.
          </p>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (10)</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-sm">Category</div>
              <div className="text-sm font-medium">{product.category}</div>
              <div className="text-sm">Brand</div>
              <div className="text-sm font-medium">Apple</div>
              <div className="text-sm">Model Name</div>
              <div className="text-sm font-medium">iPhone</div>
              <div className="text-sm">SKU</div>
              <div className="text-sm font-medium">{product.sku}</div>
              <div className="text-sm">Ships From</div>
              <div className="text-sm font-medium">United States</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>This item is available from our trusted sellers</li>
              <li>Each product has been thoroughly inspected and certified</li>
              <li>Comes in original packaging with all accessories</li>
              <li>Meets all regulatory standards and requirements</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Benefits</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Easy returns within 10 days of delivery</li>
              <li>Comprehensive warranty coverage</li>
              <li>Best in class build quality and battery efficiency</li>
              <li>24/7 customer support available</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Delivery and Returns</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Standard delivery: 3-5 business days</li>
              <li>Express delivery available for select locations</li>
              <li>Free returns within 10 days of delivery</li>
              <li>Items must be unused and in original packaging</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReviews />
        </TabsContent>
      </Tabs>
    </div>
  );
}