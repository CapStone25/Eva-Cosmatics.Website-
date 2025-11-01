import { Button } from "@/components/ui/button";
import heroProducts from "@/assets/hero-products.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              DISCOVER YOUR INNER BEAUTY
              <br />
              <span className="text-foreground/90">WITH BLOSSOM GLOW KIT</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Great gift for yourself and loved ones
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-12 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Shop Now
            </Button>
          </div>

          {/* Right image */}
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
