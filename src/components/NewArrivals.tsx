import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const NewArrivals = () => {
  const products = [
    {
      image: product1,
      name: "All-Around Safe Block Essence Sun SPF45+",
      rating: 5,
      reviews: 0,
    },
    {
      image: product2,
      name: "Super Aqua Snail Cream",
      rating: 4,
      reviews: 0,
      discount: 20,
    },
    {
      image: product3,
      name: "Clarifying Emulsion",
      rating: 5,
      reviews: 0,
      featured: true,
    },
    {
      image: product4,
      name: "Dewy Glow Jelly Cream",
      rating: 5,
      reviews: 0,
      featured: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-12 bg-primary"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            NEW ARRIVALS
          </h2>
          <div className="h-px w-12 bg-primary"></div>
        </div>

        <div className="flex items-center justify-end mb-8">
          <button className="text-sm text-primary hover:underline font-medium">
            See All
          </button>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
