import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  isNew,
  isSale,
}: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id, name, price, image, category });
    setShowConfetti(true);
    toast.success(`${name} added to cart! 🎉`, {
      description: "Ready for checkout!",
    });
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-pop-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-accent animate-confetti"
              style={{
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-muted">
        <img
          src={image}
          alt={name}
          className="product-image w-full h-full object-cover transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="badge-new animate-wiggle">
              NEW ✨
            </span>
          )}
          {isSale && discount > 0 && (
            <span className="badge-sale animate-bounce-slow">
              -{discount}% 🔥
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div
          className={`quick-actions absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className={`w-10 h-10 rounded-2xl bg-white shadow-card hover:scale-110 transition-transform ${
              isLiked ? "text-secondary" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
              if (!isLiked) toast.success("Added to wishlist! 💖");
            }}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-secondary" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-2xl bg-white shadow-card hover:scale-110 transition-transform"
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>

        {/* Add to Cart */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            className="w-full btn-bouncy h-12 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
          {category}
        </p>
        <h3 className="font-display font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-accent text-accent" : "text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating}.0)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-xl text-gradient-hero">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
