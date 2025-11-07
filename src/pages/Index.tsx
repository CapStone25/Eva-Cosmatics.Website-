import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import BestSellers from "@/components/BestSellers";
import ProductShowcase from "@/components/ProductShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <Hero />
        <NewArrivals />
        <BestSellers />
        <ProductShowcase />
      </main>
    </div>
  );
};

export default Index;
