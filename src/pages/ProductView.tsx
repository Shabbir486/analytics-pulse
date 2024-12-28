import { useParams, useNavigate } from "react-router-dom";
import { ProductRating } from "@/components/products/ProductRating";
import { ProductPrice } from "@/components/products/ProductPrice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share, Scale, ChevronDown, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { ProductImageCarousel } from "@/components/products/ProductImageCarousel";
import { Product } from "@/types/product";

// Mock function to fetch product - replace with actual data fetching
const getProduct = (id: string): Product | null => {
  // For demo, return mock data
  return {
    id: parseInt(id),
    name: "Urban Explorer Sneakers",
    sku: "UES-001",
    description: "Modern urban sneakers with comfort technology",
    price: 83.74,
    discountPrice: 79.99,
    currency: "USD",
    tax: 10,
    stock: 0,
    reorderThreshold: 10,
    category: "Accessories",
    status: "Draft",
    metaTitle: "Urban Explorer Sneakers",
    metaDescription: "Comfortable urban sneakers for daily wear",
    customUrl: "urban-explorer-sneakers",
    image: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png",
    createdAt: "2024-11-29T01:05:00",
  };
};

export function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState<'red' | 'blue'>('red');
  const [quantity, setQuantity] = useState(1);

  const product = getProduct(id || "");

  if (!product) {
    return <div>Product not found</div>;
  }

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { label: "OUT OF STOCK", variant: "destructive" as const };
    if (product.stock <= product.reorderThreshold) return { label: "LOW STOCK", variant: "warning" as const };
    return { label: `IN STOCK`, variant: "success" as const };
  };

  const stockStatus = getStockStatus(product);
  const isOutOfStock = product.stock === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        ← Back to Products
      </Button>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <ProductImageCarousel product={product} />
        
        <div className="space-y-6">
          <div>
            <Badge 
              variant={stockStatus.variant}
              className="mb-4 font-semibold"
            >
              {stockStatus.label}
            </Badge>
            <h2 className="text-2xl font-bold">{product.name}</h2>
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
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Color</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedColor('red')}
                  className={`w-8 h-8 rounded-full bg-red-500 flex items-center justify-center ${
                    selectedColor === 'red' ? 'ring-2 ring-offset-2 ring-red-500' : ''
                  }`}
                >
                  {selectedColor === 'red' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setSelectedColor('blue')}
                  className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ${
                    selectedColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                >
                  {selectedColor === 'blue' && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Size</label>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="w-24">
                  9
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                <button className="text-sm text-blue-600 hover:underline">
                  Size chart
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isOutOfStock}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isOutOfStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Available: {product.stock}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" disabled={isOutOfStock}>
              Add to cart
            </Button>
            <Button className="flex-1" disabled={isOutOfStock}>
              Buy now
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-4 border-t">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Scale className="h-4 w-4" />
              Compare
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Heart className="h-4 w-4" />
              Favorite
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Share className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}