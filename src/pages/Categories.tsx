import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CATEGORIES } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-flat text-xs font-black text-primary">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AETHERIA Craft Ecosystems</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Curated <span className="text-gradient-hero">Design Collections</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Explore spatial audio, Grade 5 titanium horology, carbon kinetic shoes, and Italian leathercraft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.filter((c) => c.id !== "All").map((category) => (
              <Link
                key={category.id}
                to={`/shop`}
                className="neu-card p-8 group flex flex-col justify-between min-h-[220px] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-3">
                  <span className="neu-badge text-primary text-[10px] uppercase font-black">
                    {category.id}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">{category.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
                  <span className="text-xs font-extrabold text-primary">Explore Discipline</span>
                  <div className="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Categories;
