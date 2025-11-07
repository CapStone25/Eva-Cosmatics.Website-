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
  price?: string;
}

const ProductCard = ({ 
  image, 
  name, 
  rating = 0, 
  reviews = 0, 
  discount,
  featured = false,
  price
}: ProductCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card">
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
          className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
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

          {/* Price */}
          {price && (
            <div className="pt-2">
              <span className="text-lg font-semibold text-foreground">{price}</span>
            </div>
          )}

          {/* Add to Bag Button */}
          <Button 
            variant="outline" 
            className="w-full mt-3 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
          >
            Add To Bag
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
