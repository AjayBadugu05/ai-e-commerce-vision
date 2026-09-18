import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductCard } from "@/components/products/ProductCard";
import { useProductCatalog, SortOption } from "@/hooks/useProductCatalog";
import { CATEGORIES } from "@/data/products";
import { Sparkles, Grid3X3, LayoutGrid, SlidersHorizontal, Search, RotateCcw } from "lucide-react";

const Shop = () => {
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const {
    products,
    totalProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    onlyInStock,
    setOnlyInStock,
    resetFilters,
  } = useProductCatalog({ productsPerPage: 12 });

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

          {/* Search & Filter Control Bar */}
          <div className="neu-flat p-4 rounded-3xl mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, specs..."
                className="w-full neu-input pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === "all" ? "All" : cat.name)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                    (selectedCategory === "All" && cat.id === "all") ||
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "neu-pressed text-primary font-black shadow-neu-inner-glow"
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
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="neu-input h-10 px-3 py-0 text-xs font-bold w-auto cursor-pointer"
                >
                  <option value="featured">Sort by Vector Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated (5.0 ★)</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                title="Reset Filters"
                className="p-2 neu-btn rounded-xl text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Grid Layout Switcher */}
              <div className="hidden sm:flex items-center gap-1.5 p-1 neu-pressed rounded-xl">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-lg transition-all ${
                    gridCols === 3 ? "neu-flat text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-lg transition-all ${
                    gridCols === 4 ? "neu-flat text-primary" : "text-muted-foreground"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary & In-Stock Toggle */}
          <div className="flex items-center justify-between mb-6 text-xs text-muted-foreground">
            <p className="font-mono">
              Showing <span className="font-bold text-foreground">{totalProducts}</span> luxury products
            </p>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>In-Stock Only</span>
            </label>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="neu-flat rounded-3xl p-12 text-center my-12 space-y-4">
              <Sparkles className="w-10 h-10 mx-auto text-amber-500/50" />
              <h3 className="text-xl font-bold font-heading">No matching products found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try adjusting your search query, price filter, or selecting a different category.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 neu-btn rounded-xl text-xs font-bold text-primary"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              } gap-6 md:gap-8`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AIAssistant />
      <CartDrawer />
    </div>
  );
};

export default Shop;
