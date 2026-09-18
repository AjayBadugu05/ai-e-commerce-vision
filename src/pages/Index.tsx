import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoSection } from "@/components/home/PromoSection";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="space-y-16">
        {/* Cinematic Neumorphic Hero */}
        <HeroSection />

        {/* Categories Grid */}
        <CategoriesSection />

        {/* AI Recommendations */}
        <AIRecommendations />

        {/* Featured Flagship Catalog */}
        <FeaturedProducts />

        {/* Priority Flash Drop Banner */}
        <PromoSection />

        {/* Verified Collector Reviews */}
        <TestimonialsSection />
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Index;
