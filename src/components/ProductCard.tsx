import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  image: string;
  name: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  featured?: boolean;
}

const ProductCard = ({ 
  image, 
  name, 
  rating = 0, 
  reviews = 0, 
  discount,
  featured = false 
}: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_8px_32px_hsl(340_82%_67%/0.25)] hover:-translate-y-2 animate-fade-in-up">
      <CardContent className="p-0">
        {/* Discount Badge */}
        {discount && (
          <Badge 
            className="absolute top-4 left-4 z-10 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0"
          >
            -{discount}%
          </Badge>
        )}

        {/* Featured Badge */}
        {featured && (
          <Badge 
            className="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground border-0 uppercase text-xs px-3 py-1"
          >
            Hot
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-background/90 hover:bg-primary hover:text-primary-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
            {name}
          </h3>
          
          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({reviews})
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
