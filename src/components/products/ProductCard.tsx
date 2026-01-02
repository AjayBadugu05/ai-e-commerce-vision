import { useState } from "react";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
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
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id, name, price, image, category });
    toast.success(`${name} added to cart!`, {
      description: "Check your cart to complete the purchase",
    });
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
              NEW
            </span>
          )}
          {isSale && discount > 0 && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full glass"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-primary text-primary" : ""
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full glass"
          >
            <Eye className="w-5 h-5" />
          </Button>
        </div>

        {/* Add to Cart */}
        <div
          className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            className="w-full btn-primary h-12"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {category}
        </p>
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < rating ? "fill-primary text-primary" : "text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-gradient-gold">
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
