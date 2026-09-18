import { useState } from "react";
import { Sparkles, Heart, ShoppingBag, Star } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";

export const AIRecommendations = () => {
  const [activeTab, setActiveTab] = useState<"personalized" | "trending" | "complete">("personalized");
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const getFilteredProducts = (): Product[] => {
    switch (activeTab) {
      case "trending":
        return PRODUCTS.filter((p) => p.isTrending);
      case "complete":
        return [PRODUCTS[0], PRODUCTS[4], PRODUCTS[3], PRODUCTS[1]];
      default:
        return PRODUCTS.slice(0, 4);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-flat text-xs font-black text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Neural Visual Match Engine</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
              Curated <span className="text-gradient-hero">Personal Recommendations</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Real-time vector alignment & complimentary pairings</p>
          </div>

          {/* Neumorphic Filter Chips */}
          <div className="flex items-center gap-2 p-1.5 neu-pressed rounded-2xl overflow-x-auto">
            <button
              onClick={() => setActiveTab("personalized")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeTab === "personalized" ? "neu-flat text-primary font-black" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recommended (98% Match)
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeTab === "trending" ? "neu-flat text-primary font-black" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Trending Flagships
            </button>
            <button
              onClick={() => setActiveTab("complete")}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeTab === "complete" ? "neu-flat text-primary font-black" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Complete the Aesthetic
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getFilteredProducts().map((product) => {
            const isLiked = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="neu-card p-4 group flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
              >
                <div>
                  {/* Recessed Image Viewport */}
                  <div className="neu-image-frame relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Neumorphic AI Match Badge */}
                    <div className="absolute top-3 left-3 neu-badge text-[10px] text-primary font-black flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                      <span>{product.aiMatchScore}% Match</span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-xl neu-btn flex items-center justify-center transition-all ${
                        isLiked ? "text-rose-500" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="pt-4 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground font-extrabold">
                      <span className="uppercase tracking-wider text-primary">{product.brand}</span>
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {product.rating}
                      </span>
                    </div>

                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1 font-medium">{product.tagline}</p>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-display font-black text-base text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-muted-foreground line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="neu-btn-primary p-2.5 rounded-xl flex items-center justify-center"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
