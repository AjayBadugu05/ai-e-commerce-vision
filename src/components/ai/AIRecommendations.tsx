import { useState } from "react";
import { Sparkles, Heart, ShoppingBag, Eye, Star } from "lucide-react";
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
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AETHER Intelligence Engine</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Curated <span className="text-gradient-hero">For Your Taste</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Real-time neural style vector alignment & complementary pairings</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-card/60 backdrop-blur-xl border border-border/80 rounded-2xl">
            <button
              onClick={() => setActiveTab("personalized")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "personalized" ? "bg-primary text-primary-foreground shadow-lg" : "hover:text-primary"
              }`}
            >
              Recommended (98% Match)
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "trending" ? "bg-primary text-primary-foreground shadow-lg" : "hover:text-primary"
              }`}
            >
              Trending Luxury
            </button>
            <button
              onClick={() => setActiveTab("complete")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "complete" ? "bg-primary text-primary-foreground shadow-lg" : "hover:text-primary"
              }`}
            >
              Complete the Look
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
                className="group glass-card-hover overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-muted/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* AI Match Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span>{product.aiMatchScore}% Match</span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-xl border transition-all ${
                        isLiked
                          ? "bg-rose-500 text-white border-rose-400 shadow-lg scale-110"
                          : "bg-black/40 border-white/20 text-white hover:bg-black/70"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{product.brand}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {product.rating}
                      </span>
                    </div>

                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{product.tagline}</p>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-border/40 mt-2">
                  <div>
                    <span className="font-display font-bold text-lg text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="p-3 rounded-2xl bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-md shadow-primary/30 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
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
