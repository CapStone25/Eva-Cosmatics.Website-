import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-[hsl(0,0%,15%)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-primary">Bloom Beauty</h3>
            <p className="text-sm text-white/80 mb-3">
              Discover nature's beauty with our natural care products
            </p>
            <p className="text-sm text-white/70 mb-1">📞 +380 50 123 45 67</p>
            <p className="text-sm text-white/70 mb-1">📧 bloom@email.com</p>
            <p className="text-sm text-white/70">📍 Kyiv, Ukraine</p>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">HELP</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">MY ACCOUNT</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Addresses
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Wishlist
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">CUSTOMER CARE</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">SIGN UP FOR EMAILS</h4>
            <p className="text-sm text-white/70 mb-4">
              Stay informed, subscribe to our newsletter now!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
              />
              <Button size="icon" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <div className="flex gap-6 text-sm text-white/60">
              <span>© 2023 Bloom Beauty</span>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms And Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
