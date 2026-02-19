import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface WishlistItem {
  id: string;
  product_id: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!user) { setWishlist([]); return; }
    const { data } = await supabase
      .from("wishlist")
      .select("id, product_id")
      .eq("user_id", user.id);
    if (data) setWishlist(data);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const isWishlisted = (productId: string) =>
    wishlist.some((item) => item.product_id === productId);

  const toggleWishlist = async (productId: string) => {
    if (!user) return;
    setLoading(true);
    const existing = wishlist.find((item) => item.product_id === productId);
    if (existing) {
      await supabase.from("wishlist").delete().eq("id", existing.id);
      setWishlist((prev) => prev.filter((item) => item.id !== existing.id));
    } else {
      const { data } = await supabase
        .from("wishlist")
        .insert({ user_id: user.id, product_id: productId })
        .select("id, product_id")
        .single();
      if (data) setWishlist((prev) => [...prev, data]);
    }
    setLoading(false);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
