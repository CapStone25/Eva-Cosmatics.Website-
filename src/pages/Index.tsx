import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import BestSellers from "@/components/BestSellers";
import ProductShowcase from "@/components/ProductShowcase";
import BlogSection from "@/components/BlogSection";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <Hero />
        <NewArrivals />
        <BestSellers />
        <ProductShowcase />
        <BlogSection />
        <InstagramGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
