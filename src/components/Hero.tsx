import { Button } from "@/components/ui/button";
import heroProducts from "@/assets/hero-products.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 to-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up [animation-delay:100ms]">
              DISCOVER YOUR INNER BEAUTY
              <br />
              <span className="text-foreground/90 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">WITH BLOSSOM GLOW KIT</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up [animation-delay:200ms]">
              Great gift for yourself and loved ones
            </p>
            <div className="animate-fade-in-up [animation-delay:300ms]">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-12 py-6 text-base rounded-full shadow-lg hover:shadow-[0_8px_32px_hsl(340_82%_67%/0.4)] transition-all duration-300 hover:scale-105"
              >
                Shop Now
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative animate-float">
            <div className="animate-scale-in [animation-delay:400ms]">
              <img
                src={heroProducts}
                alt="Blossom Glow Kit Products"
                className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-[0_20px_60px_hsl(340_82%_67%/0.3)] transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
