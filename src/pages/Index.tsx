import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { PromoSection } from "@/components/home/PromoSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <PromoSection />
        <CategoriesSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Index;
