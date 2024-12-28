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
  const [api, setApi] = useState<CarouselApi>();
  
  // Mock multiple images for demonstration
  const productImages = [
    product.image,
    "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png",
    "/lovable-uploads/1d7ff204-1f12-485d-807f-06cde4656bfe.png",
    "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png",
  ];

  // Handle carousel selection
  const onSelect = () => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap() + 1);
  };

  const handleThumbnailClick = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Carousel 
          className="w-full" 
          setApi={setApi}
          onSelect={onSelect}
        >
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
          <CarouselPrevious />
          <CarouselNext />
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
              currentSlide === index + 1 ? 'border-primary' : 'border-transparent'
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