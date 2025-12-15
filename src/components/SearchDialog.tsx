import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Static products for search
const allProducts = [
  { id: "1", name: "Eva Vitamin C Serum", price: 50, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop" },
  { id: "2", name: "Eva Hyaluronic Acid Moisturizer", price: 50, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop" },
  { id: "3", name: "Eva Retinol Night Cream", price: 50, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&auto=format&fit=crop" },
  { id: "4", name: "Eva Niacinamide Toner", price: 50, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop" },
  { id: "5", name: "Eva Rose Hip Oil", price: 50, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop" },
  { id: "6", name: "Eva Gentle Cleanser", price: 50, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop" },
  { id: "7", name: "Eva Eye Cream", price: 50, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop" },
  { id: "8", name: "Eva Sunscreen SPF 50", price: 50, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&auto=format&fit=crop" },
  { id: "9", name: "Eva Clay Mask", price: 50, image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&auto=format&fit=crop" },
  { id: "10", name: "Eva Lip Balm", price: 50, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&auto=format&fit=crop" },
  { id: "11", name: "Eva Body Lotion", price: 50, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&auto=format&fit=crop" },
  { id: "12", name: "Eva Exfoliating Scrub", price: 50, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&auto=format&fit=crop" },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(allProducts);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    }
  }, [searchQuery]);

  const handleProductClick = (productId: string) => {
    onOpenChange(false);
    navigate("/best-sellers");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : (
            results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors text-left"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
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
