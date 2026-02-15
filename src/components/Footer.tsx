import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[hsl(0,0%,15%)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-primary">Eva Cosmetics</h3>
            <p className="text-sm text-white/80 mb-3">{t("footerDesc")}</p>
            <p className="text-sm text-white/70 mb-1">📞 +380 50 123 45 67</p>
            <p className="text-sm text-white/70 mb-1">📧 bloom@email.com</p>
            <p className="text-sm text-white/70">📍 Kyiv, Ukraine</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">{t("help")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("contactUs")}</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("faq")}</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("shippingReturns")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">{t("myAccount")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("addresses")}</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("orderStatus")}</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("wishlist")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">{t("customerCare")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("aboutUs")}</a></li>
              <li><a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">{t("blog")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">{t("signUpEmails")}</h4>
            <p className="text-sm text-white/70 mb-4">{t("newsletterDesc")}</p>
            <div className="flex gap-2">
              <Input type="email" placeholder={t("email")} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary" />
              <Button size="icon" className="flex-shrink-0"><Send className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="flex gap-6 text-sm text-white/60">
              <span>© 2023 Eva Cosmetics</span>
              <a href="#" className="hover:text-primary transition-colors">{t("privacyPolicy")}</a>
              <a href="#" className="hover:text-primary transition-colors">{t("termsConditions")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
