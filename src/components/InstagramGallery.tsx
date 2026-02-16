import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const InstagramGallery = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const instagramPosts = [
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop",
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-foreground/30"></div>
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-foreground">{t("instagramTitle")} </span>
              <span className="text-primary">{t("instagramHashtag")}</span>
            </h2>
            <div className="h-px w-12 bg-foreground/30"></div>
          </div>
          <button onClick={() => navigate("/best-sellers")} className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">{t("seeAll")}</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {instagramPosts.map((image, index) => (
            <a 
              key={index} 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden rounded-xl shadow-card hover:shadow-hover transition-all duration-500 animate-scale-in block" 
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              <img src={image} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <Instagram className="w-8 h-8 text-white" />
                  <span className="text-white text-sm font-medium">{t("viewOnInstagram")}</span>
                </div>
              </div>
              {index === 1 && (
                <Button size="sm" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <Instagram className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                  {t("seeInAt")}
                </Button>
              )}
              {index === 0 && (
                <Button variant="secondary" size="sm" className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10" onClick={(e) => { e.preventDefault(); navigate("/best-sellers"); }}>
                  {t("buyNow")}
                </Button>
              )}
            </a>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="px-12">
              <Instagram className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
              {t("followUs")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
