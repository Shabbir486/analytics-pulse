import { Star, ThumbsUp, ThumbsDown, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Review {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  rating: number;
  comment: string;
  images?: string[];
  likes: number;
  dislikes: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    user: {
      name: "Sarah Wilson",
      avatar: "/lovable-uploads/0abfa0b3-7f64-4661-a4d4-52cf395f1d90.png"
    },
    date: "25 June 2024",
    rating: 4,
    comment: "Great product! The fit was perfect and the quality exceeded my expectations. I've been wearing them for a month now and they still look brand new.",
    images: [
      "/lovable-uploads/1d7ff204-1f12-485d-807f-06cde4656bfe.png",
      "/lovable-uploads/aefb88e5-9912-4de1-926c-1f4643ecffe5.png"
    ],
    likes: 24,
    dislikes: 2
  },
  // ... Add more mock reviews as needed
];

const ratingDistribution = {
  5: 25.0,
  4: 20.0,
  3: 15.0,
  2: 10.0,
  1: 30.0,
};

export function ProductReviews() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold">3.7</span>
            <span className="text-xl text-muted-foreground">/5</span>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(3.7)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on 10 reviews</p>
        </div>
        
        <div className="space-y-2">
          {Object.entries(ratingDistribution)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([stars, percentage]) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-12 text-sm">{stars} stars</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-16 text-sm text-right">{percentage}%</span>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline">Write your review</Button>
      </div>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <img src={review.avatar} alt={review.user.name} />
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{review.user.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2">{review.comment}</p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <div className="flex gap-4 mt-3">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    {review.likes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <ThumbsDown className="h-4 w-4" />
                    {review.dislikes}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-4 w-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}