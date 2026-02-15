import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage } from "@/lib/productImages";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, image")
        .order("created_at", { ascending: false });
      if (data) setResults(data);
    };
    if (open) fetchProducts();
  }, [open]);

  const filteredResults = searchQuery.trim() === ""
    ? results
    : results.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleProductClick = (productId: string) => {
    onOpenChange(false);
    navigate(`/product/${productId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("searchProducts")}</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ps-10"
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t("noProductsFound")}</p>
            </div>
          ) : (
            filteredResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors text-start"
              >
                <img src={resolveProductImage(product.image)} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-primary">${product.price}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
