import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Sparkles, Grid3X3, LayoutGrid, SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("ai-score");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category.toLowerCase() === selectedCategory.toLowerCase() || (selectedCategory === "Electronics" && product.category === "Electronics");
    const matchesStock = !inStockOnly || product.stock > 0;
    return matchesCategory && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "ai-score": return b.aiMatchScore - a.aiMatchScore;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-flat text-xs font-black text-primary">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AETHERIA Master Catalog</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Curated <span className="text-gradient-hero">Collections</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Aerospace Grade 5 titanium horology, high-res spatial audio, and carbon kinetic footwear.
            </p>
          </div>

          {/* Filter Bar & Controls Panel */}
          <div className="neu-flat p-4 rounded-3xl mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                    selectedCategory.toLowerCase() === cat.id.toLowerCase()
                      ? "neu-pressed text-primary font-black"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort & Grid Controls */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-border/40">
              <div className="flex items-center gap-2 text-xs font-extrabold">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="neu-input h-10 px-3 py-0 text-xs font-bold w-auto"
                >
                  <option value="ai-score">Sort by Vector Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated (5.0 ★)</option>
                </select>
              </div>

              {/* Grid Layout Switcher */}
              <div className="hidden sm:flex items-center gap-1.5 p-1 neu-pressed rounded-xl">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-lg transition-all ${gridCols === 3 ? "neu-flat text-primary" : "text-muted-foreground"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-lg transition-all ${gridCols === 4 ? "neu-flat text-primary" : "text-muted-foreground"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary & Filter Toggle */}
          <div className="flex items-center justify-between mb-6 text-xs font-bold text-muted-foreground">
            <span>Showing <strong className="text-foreground">{sortedProducts.length}</strong> items in index</span>
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded neu-pressed accent-primary"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Product Grid */}
          <div className={`grid gap-6 ${gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
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

export default Shop;
