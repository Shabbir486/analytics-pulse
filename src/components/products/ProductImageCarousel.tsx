import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types/product";
import { useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  product: Product;
}

export function ProductImageCarousel({ product }: ProductImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const productImages = [...product.images];

  // Update the current slide when selection changes
  const onSelect = () => {
    if (api) {
      setCurrentSlide(api.selectedScrollSnap() + 1);
    }
  };

  // Handle thumbnail clicks
  const handleThumbnailClick = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setCurrentSlide(index + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Carousel className="w-full" setApi={setApi} onSelect={onSelect}>
          <CarouselContent>
            {productImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-black p-2 rounded-full shadow-md hover:bg-white" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-black p-2 rounded-full shadow-md hover:bg-white" />
        </Carousel>
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
          {currentSlide} / {productImages.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`aspect-square overflow-hidden rounded-lg border-2 ${
              currentSlide === index + 1 ? "border-primary" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${product.name} - Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
