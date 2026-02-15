import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, translateProductName } from "@/lib/productImages";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("id, name, price, image, skin_type").order("created_at", { ascending: false });
      if (data) setDbProducts(data);
    };
    fetchProducts();
  }, []);

  const categories = [
    { key: "doubleCleanse", label: t("doubleCleanse") },
    { key: "cleansingBalms", label: t("cleansingBalms") },
    { key: "oilCleansers", label: t("oilCleansers") },
    { key: "waterCleansers", label: t("waterCleansers") },
  ];

  const skinTypes = [
    { key: "All", label: t("all") },
    { key: "Combination/Oily", label: t("combinationOily") },
    { key: "Dry", label: t("dry") },
    { key: "Normal", label: t("normal") },
    { key: "Sensitive", label: t("sensitive") },
  ];

  const allProducts = dbProducts.map(p => ({
    id: p.id, image: resolveProductImage(p.image), name: translateProductName(p.name, language), rating: 5, reviews: 0,
    price: `${p.price}$`, skinType: p.skin_type || "All", priceValue: p.price,
  }));

  const handleSkinTypeChange = (type: string) => {
    setSelectedSkinTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) => prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    if (selectedSkinTypes.length > 0 && !selectedSkinTypes.includes("All")) {
      filtered = filtered.filter((p) => selectedSkinTypes.includes(p.skinType) || p.skinType === "All");
    }
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) => selectedPriceRanges.some((range) => {
        if (range === "Under $25") return p.priceValue < 25;
        if (range === "$25 - $50") return p.priceValue >= 25 && p.priceValue <= 50;
        if (range === "$50 - $100") return p.priceValue > 50 && p.priceValue <= 100;
        return true;
      }));
    }
    switch (sortBy) {
      case "price-low": filtered.sort((a, b) => a.priceValue - b.priceValue); break;
      case "price-high": filtered.sort((a, b) => b.priceValue - a.priceValue); break;
      default: break;
    }
    return filtered;
  }, [selectedSkinTypes, selectedPriceRanges, sortBy, dbProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
              <nav className="space-y-3">
                {categories.map((cat) => (
                  <button key={cat.key} className="block w-full text-start text-sm text-foreground/80 hover:text-primary transition-colors">
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border border-border space-y-6">
              <h3 className="font-bold text-lg">{t("filters")}</h3>
              <div><h4 className="font-semibold text-sm mb-3">{t("productType")}</h4></div>
              <div><h4 className="font-semibold text-sm mb-3">{t("ingredientType")}</h4></div>
              <div>
                <h4 className="font-semibold text-sm mb-3">{t("skinType")}</h4>
                <div className="space-y-3">
                  {skinTypes.map((type) => (
                    <div key={type.key} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox id={type.key} checked={selectedSkinTypes.includes(type.key)} onCheckedChange={() => handleSkinTypeChange(type.key)} />
                      <Label htmlFor={type.key} className="text-sm font-normal cursor-pointer">{type.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">{t("priceRange")}</h4>
                <div className="space-y-3">
                  {["Under $25", "$25 - $50", "$50 - $100"].map((range) => (
                    <div key={range} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox id={range} checked={selectedPriceRanges.includes(range)} onCheckedChange={() => handlePriceRangeChange(range)} />
                      <Label htmlFor={range} className="text-sm font-normal cursor-pointer">{range}</Label>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => { setSelectedSkinTypes([]); setSelectedPriceRanges([]); }}>
                  {t("clearFilters")}
                </Button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold">{filteredProducts.length} {filteredProducts.length !== 1 ? t("products") : t("product")}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{t("sortBy")}</span>
                <select className="text-sm border border-border rounded-md px-3 py-1.5 bg-background" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="relevance">{t("relevance")}</option>
                  <option value="price-low">{t("priceLowHigh")}</option>
                  <option value="price-high">{t("priceHighLow")}</option>
                  <option value="newest">{t("newest")}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="opacity-0 animate-scale-in" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}>
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
