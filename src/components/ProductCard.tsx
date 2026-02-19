import { Heart, Star, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  id?: string;
  image: string;
  name: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  featured?: boolean;
  price?: string;
}

const ProductCard = ({ 
  id, image, name, rating = 0, reviews = 0, discount, featured = false, price
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const isLiked = id ? isWishlisted(id) : false;

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({ title: t("pleaseSignIn"), description: t("signInToOrder"), variant: "destructive" });
      return;
    }
    if (!id) return;
    await toggleWishlist(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const priceNum = price ? parseFloat(price.replace('$', '')) : 50;
    addToCart({ id: id || name, name, price: priceNum, image });
    toast({ title: t("addedToCart"), description: `${name} ${t("addedToCartDesc")}` });
  };

  const handleCardClick = () => {
    const productId = id || `static-${name.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(`/product/${productId}`);
  };

  return (
    <Card 
      className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-secondary/30 hover:shadow-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {discount && (
          <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white border-0 font-semibold px-3 py-1 shadow-lg animate-fade-in">
            -{discount}%
          </Badge>
        )}
        {featured && (
          <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground border-0 uppercase text-xs font-bold px-3 py-1 shadow-lg animate-fade-in">
            {t("hot")}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleWishlist}
          className={`absolute ${discount || featured ? 'top-14' : 'top-4'} right-4 z-10 bg-white/90 hover:bg-white backdrop-blur-sm transition-all duration-300 rounded-full shadow-lg ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
        >
          <Heart className={`h-4 w-4 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
        </Button>

        <div className="relative aspect-square overflow-hidden bg-white rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
          <img src={image} alt={name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out" />
          <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button size="sm" className="bg-white text-foreground hover:bg-primary hover:text-primary-foreground shadow-lg font-semibold rounded-full px-6 transition-all duration-300">
              {t("quickView")}
            </Button>
          </div>
        </div>

        <div className="p-5 space-y-3 bg-gradient-to-br from-white to-secondary/20">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem] text-sm leading-relaxed">
            {name}
          </h3>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 transition-all duration-300 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} style={{ transitionDelay: `${i * 50}ms` }} />
              ))}
              <span className="text-xs text-muted-foreground ml-1.5">({reviews})</span>
            </div>
          )}
          {price && (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">{price}</span>
              {discount && (
                <span className="text-sm text-muted-foreground line-through">
                  ${(parseFloat(price.replace('$', '')) / (1 - discount / 100)).toFixed(0)}
                </span>
              )}
            </div>
          )}
          <Button 
            className="w-full mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold rounded-xl group/btn"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 ltr:mr-2 rtl:ml-2 group-hover/btn:rotate-12 transition-transform" />
            {t("addToBag")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
