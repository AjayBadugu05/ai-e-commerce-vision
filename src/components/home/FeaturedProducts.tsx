import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";

export const FeaturedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-flat text-xs font-black text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Curated Releases</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
            Flagship <span className="text-gradient-hero">Luxury Catalog</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">
            Handcrafted with precision grade materials and acoustic spatial sound.
          </p>
        </div>
        <Link to="/shop">
          <button className="neu-btn px-5 py-2.5 text-xs font-extrabold text-primary flex items-center gap-2">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.slice(0, 8).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};
