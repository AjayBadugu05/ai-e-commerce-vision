import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones Pro",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 5,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Premium Leather Watch - Rose Gold Edition",
    price: 459.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Accessories",
    rating: 5,
    isNew: true,
  },
  {
    id: "3",
    name: "Designer Sunglasses - Titanium Frame",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    category: "Eyewear",
    rating: 4,
    isSale: true,
  },
  {
    id: "4",
    name: "Smart Fitness Tracker - Limited Edition",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop",
    category: "Fitness",
    rating: 4,
    isNew: true,
  },
  {
    id: "5",
    name: "Artisan Coffee Maker - Matte Black",
    price: 349.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
    category: "Home",
    rating: 5,
    isSale: true,
  },
  {
    id: "6",
    name: "Premium Leather Backpack",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Bags",
    rating: 5,
    isNew: true,
  },
  {
    id: "7",
    name: "Wireless Mechanical Keyboard",
    price: 159.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4,
    isSale: true,
  },
  {
    id: "8",
    name: "Minimalist Desk Lamp - LED",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    category: "Home",
    rating: 4,
  },
  {
    id: "9",
    name: "Premium Wireless Earbuds",
    price: 179.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 5,
    isSale: true,
  },
  {
    id: "10",
    name: "Designer Sneakers - White Edition",
    price: 289.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    category: "Fashion",
    rating: 5,
    isNew: true,
  },
  {
    id: "11",
    name: "Smart Home Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4,
  },
  {
    id: "12",
    name: "Luxury Scented Candle Set",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&h=500&fit=crop",
    category: "Home",
    rating: 5,
    isSale: true,
  },
];

const categories = ["All", "Electronics", "Fashion", "Home", "Accessories", "Eyewear", "Fitness", "Bags"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const filteredProducts = allProducts.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              Shop <span className="text-gradient-gold">All Products</span>
            </h1>
            <p className="text-muted-foreground">
              Discover our complete collection of premium products
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 glass rounded-2xl">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>

              {/* Category Pills */}
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center gap-1 p-1 bg-secondary rounded-xl">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2 rounded-lg transition-colors ${
                    gridCols === 3 ? "bg-background" : ""
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2 rounded-lg transition-colors ${
                    gridCols === 4 ? "bg-background" : ""
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mb-6 p-4 glass rounded-2xl animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Categories</span>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {sortedProducts.length} products
          </p>

          {/* Products Grid */}
          <div
            className={`grid gap-6 ${
              gridCols === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="btn-glass h-12 px-8">
              Load More Products
            </Button>
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
