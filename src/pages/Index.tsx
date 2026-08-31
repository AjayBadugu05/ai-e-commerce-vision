import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AIRecommendations } from "@/components/ai/AIRecommendations";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS } from "@/data/products";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="space-y-12">
        {/* Cinematic Hero */}
        <HeroSection />

        {/* AI Recommendations Section */}
        <AIRecommendations />

        {/* Featured Flagship Showcase Grid */}
        <section className="py-12 container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Engineering Precision</span>
              <h2 className="font-display text-3xl font-bold tracking-tight">Flagship Luxury Releases</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View Entire Collection ({PRODUCTS.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((item) => (
              <div key={item.id} className="glass-card-hover p-6 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                      {item.brand}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-4">
                  <span className="font-display font-bold text-lg text-foreground">₹{item.price.toLocaleString("en-IN")}</span>
                  <Link to={`/product/${item.id}`}>
                    <button className="btn-apple-glass text-xs py-2 px-4">
                      Explore Spec
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Experience Stories */}
        <section className="py-16 bg-card/40 border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">AETHER Circle</span>
              <h2 className="font-display text-3xl font-bold">Verified Collector Experiences</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Julian Thorne", role: "Acoustic Architect", text: "The AETHER Studio Pro ANC delivers a soundstage that rivals ₹1,50,000 planar magnetic studio monitors. The spatial head tracking is astonishing.", rating: 5 },
                { name: "Elena Rostova", role: "Industrial Designer", text: "The Monolith Watch in Grade 5 Titanium is a masterclass in horology design. The finish and beveling under magnification is flawless.", rating: 5 },
                { name: "Dr. Marcus Vance", role: "Sports Biomechanist", text: "Apex Kinetic Runners gave me a 4% improvement in energy efficiency on my 10k tempo runs. The carbon plate curvature is dialed in.", rating: 5 }
              ].map((story, i) => (
                <div key={i} className="glass-card p-6 space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: story.rating }).map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">"{story.text}"</p>
                  <div className="pt-2 border-t border-border/40">
                    <h5 className="font-semibold text-xs text-foreground">{story.name}</h5>
                    <p className="text-[10px] text-primary font-medium">{story.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Index;

