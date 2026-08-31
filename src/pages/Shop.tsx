import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";
import { Sparkles, Filter, Grid3X3, LayoutGrid, Star, Heart, ShoppingBag, SlidersHorizontal, Check } from "lucide-react";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("ai-score");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesStock = !inStockOnly || product.stock > 0;
    return matchesCategory && matchesPrice && matchesStock;
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AETHER Curated Index</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Master <span className="text-gradient-hero">Catalog</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Filter through aerospace titanium horology, high-res audio tech, and carbon plate kinetics.
            </p>
          </div>

          {/* Category Bar & Controls */}
          <div className="glass-panel p-4 mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/60 hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-border/40">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-muted/80 border border-border/60 outline-none text-xs font-semibold"
                >
                  <option value="ai-score">Sort by AI Match Vector</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated (5.0 ★)</option>
                </select>
              </div>

              {/* Grid Switchers */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-muted/80 rounded-xl">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-lg transition-all ${gridCols === 3 ? "bg-card shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-lg transition-all ${gridCols === 4 ? "bg-card shadow-sm text-primary" : "text-muted-foreground"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
            <span>Showing <strong className="text-foreground">{sortedProducts.length}</strong> items in index</span>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-border"
                />
                In Stock Only
              </label>
            </div>
          </div>

          {/* Grid Layout */}
          <div className={`grid gap-6 ${gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
            {sortedProducts.map((product) => {
              const isLiked = isInWishlist(product.id);
              return (
                <div key={product.id} className="glass-card-hover overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-black/5">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white">
                        {product.aiMatchScore}% AI Match
                      </div>

                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-xl border transition-all ${
                          isLiked ? "bg-rose-500 text-white border-rose-400" : "bg-black/40 border-white/20 text-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                      </button>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{product.brand}</span>
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" /> {product.rating}
                        </span>
                      </div>

                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1">{product.tagline}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-border/40 mt-2">
                    <div>
                      <span className="font-display font-bold text-lg text-foreground">{formatPrice(product.price)}</span>
                      {product.originalPrice && <span className="text-xs text-muted-foreground line-through ml-2">{formatPrice(product.originalPrice)}</span>}
                    </div>

                    <button
                      onClick={() => addItem(product)}
                      className="p-3 rounded-2xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
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


