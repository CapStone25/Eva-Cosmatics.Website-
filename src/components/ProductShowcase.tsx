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
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 space-y-24 md:space-y-32 relative z-10">
        {showcases.map((showcase, index) => (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center opacity-0 animate-fade-in`}
            style={{ 
              animationDelay: `${index * 0.3}s`,
              animationFillMode: 'forwards'
            }}
          >
            {showcase.imagePosition === "left" && (
              <div className="relative overflow-hidden rounded-3xl group shadow-card hover:shadow-hover transition-all duration-700">
                <img
                  src={showcase.imageUrl}
                  alt={showcase.title}
                  className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            )}

            <div className={`space-y-6 ${showcase.imagePosition === "left" ? "md:order-last" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {showcase.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {showcase.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {showcase.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 px-4 py-1.5 text-sm cursor-pointer"
                  >
                    # {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary via-primary to-primary/90 hover:via-primary/90 text-primary-foreground shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold px-8 rounded-xl"
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 font-semibold px-8 rounded-xl"
                >
                  Explore More 
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-2 duration-300">→</span>
                </Button>
              </div>
            </div>

            {showcase.imagePosition === "right" && (
              <div className="relative overflow-hidden rounded-3xl group shadow-card hover:shadow-hover transition-all duration-700">
                <img
                  src={showcase.imageUrl}
                  alt={showcase.title}
                  className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
