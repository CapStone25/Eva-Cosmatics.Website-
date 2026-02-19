import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, translateProductName } from "@/lib/productImages";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
}

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (wishlist.length === 0) { setProducts([]); return; }
    const ids = wishlist.map((w) => w.product_id);
    supabase.from("products").select("id, name, price, image").in("id", ids).then(({ data }) => {
      if (data) setProducts(data);
    });
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            {t("wishlist") || "My Wishlist"}
          </h1>
          {!user ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">{t("pleaseSignIn")}</p>
              <Button onClick={() => navigate("/")}>{t("signIn")}</Button>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Your wishlist is empty. Start adding products you love!</p>
              <Button onClick={() => navigate("/best-sellers")}>{t("startShopping")}</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={resolveProductImage(product.image)}
                  name={translateProductName(product.name, language)}
                  price={`${product.price}$`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
