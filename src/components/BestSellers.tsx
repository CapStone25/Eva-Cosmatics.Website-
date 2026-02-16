import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, translateProductName } from "@/lib/productImages";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";

interface DBProduct {
  id: string;
  name: string;
  price: number;
  image: string | null;
}

const BestSellers = () => {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image")
        .order("created_at", { ascending: true })
        .limit(12);
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const allProducts = products.map(p => ({
    id: p.id,
    image: resolveProductImage(p.image),
    name: translateProductName(p.name, language),
    rating: 5,
    reviews: 0,
    price: `${p.price}$`,
  }));

  const useCarousel = allProducts.length > 4;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute top-10 right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {t("bestSellersTitle")}
          </h2>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        <div className="flex items-center justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <button 
            onClick={() => navigate("/best-sellers")}
            className="text-sm text-primary hover:text-primary/80 font-semibold transition-all hover:scale-105 relative group"
          >
            {t("seeAll")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        <div className="relative">
          {useCarousel ? (
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {allProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/4 pl-4"
                  >
                    <div className="opacity-0 animate-scale-in" style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}>
                      <ProductCard id={product.id} {...product} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="opacity-0 animate-scale-in"
                  style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
                >
                  <ProductCard id={product.id} {...product} />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              variant="outline"
              size="icon"
              disabled={!useCarousel || !canScrollPrev}
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full border-2 border-primary/40 bg-white hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {useCarousel && (
              <div className="flex gap-2">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all hover:scale-125 cursor-pointer ${
                      i === selectedIndex ? "bg-primary shadow-lg" : "bg-border hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            )}
            <Button
              variant="outline"
              size="icon"
              disabled={!useCarousel || !canScrollNext}
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full border-2 border-primary/40 bg-white hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-40"
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
