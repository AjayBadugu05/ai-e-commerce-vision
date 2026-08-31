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
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AETHER Collections</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Curated <span className="text-gradient-hero">Ecosystems</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Explore high-performance electronics, grade 5 titanium horology, carbon kinetic shoes, and Tuscan full-grain leather carry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.filter((c) => c.id !== "All").map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="glass-card-hover p-8 group flex flex-col justify-between h-64 relative overflow-hidden"
              >
                <div className="space-y-2 relative z-10">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 inline-block">
                    {category.id}
                  </span>
                  <h3 className="font-display font-bold text-2xl group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-xs text-muted-foreground max-w-xs">{category.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40 relative z-10">
                  <span className="text-xs font-semibold text-primary">Explore Category</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
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



