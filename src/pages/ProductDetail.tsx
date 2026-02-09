import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Heart, Star, Droplets } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import productSerum from "@/assets/product-serum.png";
import productRecipe from "@/assets/product-recipe.png";
import productConditioner from "@/assets/product-conditioner.png";
import productLotion from "@/assets/product-lotion.png";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  reviewer_name: string;
  is_verified: boolean;
  created_at: string;
}

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

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();

      if (data) {
        const imageSrc = data.image && productImages[data.image] ? productImages[data.image] : productSerum;
        setProduct({ ...data, image: imageSrc });
      }
      setLoading(false);
    };

    const fetchReviews = async () => {
      if (!productId) return;
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });
      if (data) setReviews(data);
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: typeof product.image === 'string' ? product.image : productSerum,
    });
    toast({ title: "Added to cart", description: `${product.name} has been added to your bag` });
  };

  const handleSubmitReview = async () => {
    if (!user) {
      toast({ title: "Please login", description: "You need to be logged in to write a review", variant: "destructive" });
      return;
    }
    if (!reviewForm.content.trim()) {
      toast({ title: "Review required", description: "Please write your review", variant: "destructive" });
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user.id)
      .maybeSingle();

    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      user_id: user.id,
      rating: reviewForm.rating,
      title: reviewForm.title,
      content: reviewForm.content,
      reviewer_name: profile?.full_name || user.email?.split("@")[0] || "Anonymous",
      is_verified: true,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to submit review", variant: "destructive" });
      return;
    }

    toast({ title: "Review submitted", description: "Thank you for your review!" });
    setIsReviewDialogOpen(false);
    setReviewForm({ rating: 5, title: "", content: "" });

    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Button onClick={() => navigate("/bestsellers")} className="mt-4">Back to Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const productImagesArray = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary/30 rounded-2xl overflow-hidden flex items-center justify-center p-8">
              <button 
                onClick={() => setSelectedImageIndex(prev => Math.max(0, prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <img src={productImagesArray[selectedImageIndex]} alt={product.name} className="max-h-full max-w-full object-contain animate-fade-in" />
              <button 
                onClick={() => setSelectedImageIndex(prev => Math.min(productImagesArray.length - 1, prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3 justify-center">
              {productImagesArray.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? "border-primary" : "border-transparent"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="text-sm text-muted-foreground">Size: 50 ml</div>

            <div>
              <p className="text-sm font-semibold mb-2">RECOMMENDED FOR</p>
              <div className="flex flex-wrap gap-2">
                {(product.skin_type || "All Skin Types").split(",").map((type: string, idx: number) => (
                  <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />{type.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddToCart} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full">Add To Cart</Button>
              <Button variant="outline" size="icon" className="h-14 w-14 rounded-full"><Heart className="h-5 w-5" /></Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-makes-good">
                <AccordionTrigger className="text-sm font-semibold">WHAT MAKES IT GOOD</AccordionTrigger>
                <AccordionContent><p className="text-muted-foreground">{product.description}</p></AccordionContent>
              </AccordionItem>
              <AccordionItem value="ingredients">
                <AccordionTrigger className="text-sm font-semibold">INGREDIENTS</AccordionTrigger>
                <AccordionContent><p className="text-sm text-muted-foreground">Water, Glycerin, Niacinamide, Butylene Glycol, Cherry Blossom Extract, Betaine, Sodium Hyaluronate, Panthenol, Allantoin...</p></AccordionContent>
              </AccordionItem>
              <AccordionItem value="how-to-use">
                <AccordionTrigger className="text-sm font-semibold">HOW TO USE</AccordionTrigger>
                <AccordionContent><p className="text-sm text-muted-foreground">Apply an appropriate amount to clean face and neck. Gently pat until fully absorbed. Use morning and evening.</p></AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="border-t border-border pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Customer Reviews ({reviews.length})</h2>
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
              <DialogTrigger asChild><Button>Write a Review</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Write a Review</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setReviewForm({ ...reviewForm, rating: star })}>
                          <Star className={`h-6 w-6 ${star <= reviewForm.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div><Label>Title</Label><Input value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Review title" /></div>
                  <div><Label>Review</Label><Textarea value={reviewForm.content} onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })} placeholder="Write your review..." rows={4} /></div>
                  <Button onClick={handleSubmitReview} className="w-full">Submit Review</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{[1, 2, 3, 4, 5].map((star) => (<Star key={star} className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />))}</div>
                    {review.is_verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                  </div>
                  {review.title && <h4 className="font-semibold mb-1">{review.title}</h4>}
                  <p className="text-muted-foreground text-sm mb-2">{review.content}</p>
                  <p className="text-xs text-muted-foreground">By {review.reviewer_name} • {new Date(review.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
