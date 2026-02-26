import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const showcase1 = "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop";
const showcase2 = "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop";

const ProductShowcase = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const showcases = [
    {
      title: t("showcaseTitle1"),
      description: t("showcaseDesc1"),
      tags: ["GreatGift", "AntiAging", "GreatGift", "Ingredients", "Ingredients"],
      imageUrl: showcase1,
      imagePosition: "right" as const,
    },
    {
      title: t("showcaseTitle2"),
      description: t("showcaseDesc2"),
      tags: ["GreatGift", "AntiAging", "GreatGift", "Ingredients", "Ingredients"],
      imageUrl: showcase2,
      imagePosition: "left" as const,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 space-y-24 md:space-y-32 relative z-10">
        {showcases.map((showcase, index) => (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center opacity-0 animate-fade-in`}
            style={{ animationDelay: `${index * 0.3}s`, animationFillMode: 'forwards' }}
          >
            {showcase.imagePosition === "left" && (
              <div className="relative overflow-hidden rounded-3xl group shadow-card hover:shadow-hover transition-all duration-700">
                <img src={showcase.imageUrl} alt={showcase.title} className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
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
                  <Badge key={tagIndex} variant="outline" className="border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 px-4 py-1.5 text-sm cursor-pointer">
                    # {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/best-sellers")}
                  className="bg-gradient-to-r from-primary via-primary to-primary/90 hover:via-primary/90 text-primary-foreground shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold px-8 rounded-xl"
                >
                  {t("shopNow")}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate("/best-sellers")}
                  className="group border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 font-semibold px-8 rounded-xl"
                >
                  {t("exploreMore")} 
                  <span className="ltr:ml-2 rtl:mr-2 inline-block transition-transform group-hover:ltr:translate-x-2 group-hover:rtl:-translate-x-2 duration-300">→</span>
                </Button>
              </div>
            </div>

            {showcase.imagePosition === "right" && (
              <div className="relative overflow-hidden rounded-3xl group shadow-card hover:shadow-hover transition-all duration-700">
                <img src={showcase.imageUrl} alt={showcase.title} className="w-full h-[400px] md:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
