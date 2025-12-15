import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const productImages: Record<string, string> = {
  "product-serum.png": productSerum,
  "product-recipe.png": productRecipe,
  "product-conditioner.png": productConditioner,
  "product-lotion.png": productLotion,
  "product-1.jpg": product1,
  "product-2.jpg": product2,
  "product-3.jpg": product3,
  "product-4.jpg": product4,
};

interface DBProduct {
  id: string;
  name: string;
  price: number;
  image: string | null;
  skin_type: string | null;
}

const BestSellers = () => {
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image, skin_type")
        .order("created_at", { ascending: false });
      
      if (data) {
        setDbProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    "Double-Cleanse",
    "Cleansing Balms",
    "Oil Cleansers",
    "Water Cleansers",
  ];

  const staticProducts = [
    {
      id: "static-1",
      image: productSerum,
      name: "All-Around Safe Block Essence Sun SPF45+",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "All",
      priceValue: 50,
    },
    {
      id: "static-2",
      image: productRecipe,
      name: "Super Aqua Snail Cream",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "Combination/Oily",
      priceValue: 50,
    },
    {
      id: "static-3",
      image: productConditioner,
      name: "Clarifying Emulsion",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "Sensitive",
      priceValue: 50,
    },
    {
      id: "static-4",
      image: product1,
      name: "Dewy Glow Jelly Cream",
      rating: 5,
      reviews: 0,
      price: "26$",
      skinType: "Combination/Oily",
      priceValue: 26,
    },
    {
      id: "static-5",
      image: product2,
      name: "Fermented Soybean Bio Cellulose Mask",
      rating: 5,
      reviews: 0,
      price: "50$",
      featured: true,
      skinType: "Normal",
      priceValue: 50,
    },
    {
      id: "static-6",
      image: product3,
      name: "Pore Clearing Clay Mask 2X",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "All",
      priceValue: 50,
    },
    {
      id: "static-7",
      image: productLotion,
      name: "Matte Priming UV Shield Sunscreen SPF 37",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "Dry",
      priceValue: 50,
    },
    {
      id: "static-8",
      image: product4,
      name: "Soft Finish Sun Milk SPF50+/PA+++",
      rating: 5,
      reviews: 0,
      price: "50$",
      featured: true,
      skinType: "Dry",
      priceValue: 50,
    },
    {
      id: "static-9",
      image: productSerum,
      name: "Skin Reinforcement Get Type Cream",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "Normal",
      priceValue: 50,
    },
    {
      id: "static-10",
      image: product1,
      name: "Lychee Soda Bubble Cleanser",
      rating: 5,
      reviews: 0,
      price: "50$",
      discount: 25,
      skinType: "All",
      priceValue: 50,
    },
    {
      id: "static-11",
      image: product2,
      name: "Rice Sheet Mask",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "Sensitive",
      priceValue: 50,
    },
    {
      id: "static-12",
      image: productConditioner,
      name: "Gentle Exfoliating Toner",
      rating: 5,
      reviews: 0,
      price: "50$",
      skinType: "Combination/Oily",
      priceValue: 50,
    },
  ];

  const handleSkinTypeChange = (type: string) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // Combine database products with static products
  const allProducts = [
    ...dbProducts.map(p => ({
      id: p.id,
      image: p.image && productImages[p.image] ? productImages[p.image] : productSerum,
      name: p.name,
      rating: 5,
      reviews: 0,
      price: `${p.price}$`,
      skinType: p.skin_type || "All",
      priceValue: p.price,
    })),
    ...staticProducts,
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by skin type
    if (selectedSkinTypes.length > 0 && !selectedSkinTypes.includes("All")) {
      filtered = filtered.filter(
        (product) =>
          selectedSkinTypes.includes(product.skinType) ||
          product.skinType === "All"
      );
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPriceRanges.some((range) => {
          if (range === "Under $25") return product.priceValue < 25;
          if (range === "$25 - $50")
            return product.priceValue >= 25 && product.priceValue <= 50;
          if (range === "$50 - $100")
            return product.priceValue > 50 && product.priceValue <= 100;
          return true;
        });
      });
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "newest":
        // Keep original order for newest
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [selectedSkinTypes, selectedPriceRanges, sortBy, dbProducts]);

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
                      <Checkbox
                        id={type}
                        checked={selectedSkinTypes.includes(type)}
                        onCheckedChange={() => handleSkinTypeChange(type)}
                      />
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
                      <Checkbox
                        id={range}
                        checked={selectedPriceRanges.includes(range)}
                        onCheckedChange={() => handlePriceRangeChange(range)}
                      />
                      <Label
                        htmlFor={range}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {range}
                      </Label>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => {
                    setSelectedSkinTypes([]);
                    setSelectedPriceRanges([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{filteredProducts.length} PRODUCT{filteredProducts.length !== 1 ? 'S' : ''}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">SORT BY:</span>
                <select
                  className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-scale-in"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <ProductCard id={product.id} {...product} />
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
