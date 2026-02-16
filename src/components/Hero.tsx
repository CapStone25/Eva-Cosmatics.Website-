import { Button } from "@/components/ui/button";
import heroProducts from "@/assets/hero-products.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 text-center ${dir === "rtl" ? "lg:text-right" : "lg:text-left"}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("heroTitle")}
              <br />
              <span className="text-foreground/90">{t("heroSubtitle")}</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("heroDesc")}
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/best-sellers")}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-12 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("shopNow")}
            </Button>
          </div>
          <div className="relative">
            <img
              src={heroProducts}
              alt="Blossom Glow Kit Products"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
