import { useState } from "react";
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  rating?: number;
  isNew?: boolean;
  isSale?: boolean;
  product?: Product;
}

export const ProductCard = (props: ProductCardProps) => {
  // Support both spread props ({...product}) and nested prop ({product})
  const item = props.product || props;

  const id = item.id || "product-item";
  const name = item.name || "AETHERIA Luxury Product";
  const price = typeof item.price === "number" ? item.price : 0;
  const originalPrice = item.originalPrice;
  const image = item.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1000&fit=crop";
  const category = item.category || "Electronics";
  const rating = typeof item.rating === "number" && !isNaN(item.rating) ? item.rating : 5.0;
  const isNew = Boolean(item.isNew);
  const isSale = Boolean(item.isSale);

  const [showSparkles, setShowSparkles] = useState(false);
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isLiked = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, image, category, rating } as any);
    setShowSparkles(true);
    toast.success(`${name} added to Bag! 🛍️`, {
      description: "Tactile order recorded successfully.",
    });
    setTimeout(() => setShowSparkles(false), 800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(id);
      toast.info("Removed from saved collection");
    } else {
      addToWishlist({ id, name, price, image, category, rating } as any);
      toast.success("Saved to your wishlist! 💖");
    }
  };

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const formatPrice = (amount: number) => {
    if (typeof amount !== "number" || isNaN(amount)) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="neu-card p-4 group relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-neu-flat-lg">
        {/* Sparkle Micro VFX */}
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-primary animate-ping"
                style={{
                  top: `${30 + Math.random() * 40}%`,
                  left: `${20 + Math.random() * 60}%`,
                  animationDuration: "0.8s",
                }}
              />
            ))}
          </div>
        )}

        <div className="space-y-4">
          {/* Inset Recessed Image Viewport */}
          <div className="neu-image-frame relative aspect-square w-full overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {isNew && (
                <span className="neu-badge text-[10px] text-primary font-black tracking-wider uppercase">
                  NEW BATCH
                </span>
              )}
              {isSale && discount > 0 && (
                <span className="neu-badge text-[10px] text-rose-500 font-black tracking-wider uppercase">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Tactile Button */}
            <button
              onClick={handleToggleWishlist}
              className={`absolute top-3 right-3 w-9 h-9 rounded-xl neu-btn flex items-center justify-center z-10 transition-all ${
                isLiked ? "text-rose-500 font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500" : ""}`} />
            </button>
          </div>

          {/* Product Meta */}
          <div className="space-y-1.5 px-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
              {category}
            </span>
            <h3 className="font-display font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {name}
            </h3>

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rating) ? "fill-amber-500 text-amber-500" : "text-muted/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-bold text-muted-foreground">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between gap-2 px-1">
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base text-foreground">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-[11px] font-medium text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="neu-btn-primary px-3.5 py-2 text-xs font-bold flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-white" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
