import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const BestSellers = () => {
  const categories = [
    "Double-Cleanse",
    "Cleansing Balms",
    "Oil Cleansers",
    "Water Cleansers",
  ];

  const products = [
    {
      image: productSerum,
      name: "Dewy Glow Jelly Cream",
      rating: 5,
      reviews: 0,
      price: "32$",
      discount: 25,
    },
    {
      image: productRecipe,
      name: "Fermented Soybean Bio Cellulose Mask",
      rating: 5,
      reviews: 0,
      price: "25$",
    },
    {
      image: productConditioner,
      name: "Soft Finish Sun Milk SPF50+/PA+++",
      rating: 5,
      reviews: 0,
      price: "32$",
    },
    {
      image: product1,
      name: "Matte Priming UV Shield Sunscreen SPF 37",
      rating: 5,
      reviews: 0,
      price: "32$",
    },
    {
      image: product2,
      name: "Clarifying Emulsion",
      rating: 5,
      reviews: 0,
      price: "32$",
      featured: true,
    },
    {
      image: product3,
      name: "Silk-Feel Cotton Puff",
      rating: 5,
      reviews: 0,
      price: "32$",
    },
    {
      image: productLotion,
      name: "All-Around Safe Block Essence Sun SPF45+",
      rating: 5,
      reviews: 0,
      price: "32$",
      discount: 14,
    },
    {
      image: product4,
      name: "Super Aqua Snail Cream",
      rating: 5,
      reviews: 0,
      price: "32$",
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0 space-y-6">
            {/* Categories */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <nav className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="block w-full text-left text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border space-y-6">
              <h3 className="font-bold text-lg">FILTERS</h3>

              {/* Product Type */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Product Type</h4>
              </div>

              {/* Ingredient Type */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Ingredient Type</h4>
              </div>

              {/* Skin Type */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Skin Type</h4>
                <div className="space-y-3">
                  {["All", "Combination/Oily", "Dry", "Normal", "Sensitive"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <Label
                        htmlFor={type}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-sm mb-3">Price Range</h4>
                <div className="space-y-3">
                  {["Under $25", "$25 - $50", "$50 - $100"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox id={range} />
                      <Label
                        htmlFor={range}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {range}
                      </Label>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Apply
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">73 PRODUCT</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">SORT BY:</span>
                <select className="text-sm border border-border rounded-md px-3 py-1.5 bg-background">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="opacity-0 animate-scale-in"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BestSellers;
