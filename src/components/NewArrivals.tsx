import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";

const NewArrivals = () => {
  const products = [
    {
      id: "static-1",
      image: productSerum,
      name: "Anti-Ageing Hyaluronic Acid Face Serum",
      rating: 5,
      reviews: 0,
      price: "50$",
    },
    {
      id: "static-2",
      image: productRecipe,
      name: "Aromatica Recipe Shampoo",
      rating: 5,
      reviews: 0,
      price: "50$",
      discount: 15,
    },
    {
      id: "static-3",
      image: productConditioner,
      name: "Advanced Care Clinic Conditioner",
      rating: 5,
      reviews: 0,
      price: "50$",
      featured: true,
    },
    {
      id: "static-4",
      image: productLotion,
      name: "Aromatica Recipe Body Lotion",
      rating: 5,
      reviews: 0,
      price: "50$",
      featured: true,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            NEW ARRIVALS
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        <div className="flex items-center justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <button className="text-sm text-primary hover:text-primary/80 font-semibold transition-all hover:scale-105 relative group">
            See All
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="opacity-0 animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <ProductCard id={product.id} {...product} />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-primary/40 bg-white hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-primary/40 bg-white hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl"
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
