import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Link } from "react-router-dom";
import { Sparkles, Timer, ShoppingBag, Heart, Star, Flame } from "lucide-react";
import { useState, useEffect } from "react";

const Deals = () => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealItems = PRODUCTS.filter((p) => p.isSale || p.originalPrice);

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
        <div className="container mx-auto px-4 space-y-12">
          {/* Hero Banner */}
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold">
              <Flame className="w-4 h-4 text-primary animate-pulse" /> AETHER Batch 04 Flash Drop
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              Exclusive <span className="text-gradient-hero">Privilege Pricing</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Private batch drops with complimentary 48-hr air courier dispatches.
            </p>

            {/* Countdown Box */}
            <div className="flex justify-center gap-3 pt-2">
              <TimeBox value={String(timeLeft.hours).padStart(2, "0")} label="Hours" />
              <TimeBox value={String(timeLeft.minutes).padStart(2, "0")} label="Mins" />
              <TimeBox value={String(timeLeft.seconds).padStart(2, "0")} label="Secs" />
            </div>
          </div>

          {/* Flash Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealItems.map((product) => {
              const isLiked = isInWishlist(product.id);
              const discountPercent = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 20;

              return (
                <div key={product.id} className="glass-card-hover overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-black/5">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg">
                        -{discountPercent}% PRIVILEGE
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

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="p-4 rounded-2xl bg-card/80 border border-border/60 text-center min-w-[75px] shadow-sm">
    <div className="font-display text-2xl font-bold text-primary">{value}</div>
    <div className="text-[10px] font-semibold text-muted-foreground uppercase">{label}</div>
  </div>
);

export default Deals;

