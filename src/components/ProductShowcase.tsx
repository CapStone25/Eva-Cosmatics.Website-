import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ShowcaseItem {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imagePosition: "left" | "right";
}

const ProductShowcase = () => {
  const showcases: ShowcaseItem[] = [
    {
      title: "Blossom Glow Kit",
      description: "Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing body and face creams with lotus extract provide deep hydration and rejuvenation. Suitable for all skin types. Vegan, cruelty-free, eco-friendly.",
      tags: ["GreatGift", "AntiAging", "GreatGift", "Ingredients", "Ingredients"],
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      imagePosition: "right",
    },
    {
      title: "Floral Essence Masks Sets",
      description: "Indulge in the beauty of nature with our Floral Essence Masks set. Each mask features a unique blend of flower extracts to hydrate and nourish your skin. Experience the essence of flowers in your skincare routine.",
      tags: ["GreatGift", "AntiAging", "GreatGift", "Ingredients", "Ingredients"],
      imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
      imagePosition: "left",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4 space-y-16 md:space-y-24">
        {showcases.map((showcase, index) => (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center animate-fade-in`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {showcase.imagePosition === "left" && (
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={showcase.imageUrl}
                  alt={showcase.title}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )}

            <div className={`space-y-6 ${showcase.imagePosition === "left" ? "md:order-last" : ""}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {showcase.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {showcase.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {showcase.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="border-primary/30 text-foreground hover:bg-primary/10 transition-colors"
                  >
                    # {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Shop Now
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="group hover:text-primary transition-colors"
                >
                  Explore More 
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </div>
            </div>

            {showcase.imagePosition === "right" && (
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={showcase.imageUrl}
                  alt={showcase.title}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
