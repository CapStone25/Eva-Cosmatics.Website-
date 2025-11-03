import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { ShopifyProducts } from "@/components/ShopifyProducts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <Hero />
        <ShopifyProducts />
      </main>
    </div>
  );
};

export default Index;
