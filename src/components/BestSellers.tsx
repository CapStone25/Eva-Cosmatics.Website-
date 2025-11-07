import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";

const BestSellers = () => {
  const products = [
    {
      image: productSerum,
      name: "All-Around Safe Block Essence Sun SPF45+",
      rating: 5,
      reviews: 0,
      price: "32$",
      discount: 14,
    },
    {
      image: productRecipe,
      name: "Super Aqua Snail Cream",
      rating: 5,
      reviews: 0,
      price: "32$",
      featured: true,
    },
    {
      image: productConditioner,
      name: "Clarifying Emulsion",
      rating: 5,
      reviews: 0,
      price: "32$",
      featured: true,
    },
    {
      image: productLotion,
      name: "Dewy Glow Jelly Cream",
      rating: 5,
      reviews: 0,
      price: "32$",
      discount: 14,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            BEST SELLERS
          </h2>
          <div className="h-px w-12 bg-primary"></div>
        </div>

        <div className="flex items-center justify-center mb-12">
          <button className="text-sm text-primary hover:underline font-medium transition-all">
            See All
          </button>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-2 w-2 rounded-full bg-border"></div>
              <div className="h-2 w-2 rounded-full bg-border"></div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
