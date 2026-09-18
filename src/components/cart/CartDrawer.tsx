import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, rawSubtotal, updateQuantity, removeItem } = useCart();
  const { promoDiscount, activeCoupon } = useUser();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isCartOpen) return null;

  const discountAmount = rawSubtotal * promoDiscount;
  const finalSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-slide-up"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md neu-flat-lg z-50 animate-slide-in-right flex flex-col border-l border-border/40">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-border/40 neu-flat">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl neu-pressed flex items-center justify-center text-primary">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-extrabold text-foreground">Shopping Bag</h3>
              <p className="text-xs text-muted-foreground font-semibold">
                {items.reduce((s, i) => s + i.quantity, 0)} Items Selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 neu-pressed border-b border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-muted-foreground">Complimentary Express Shipping</span>
            <span className="text-primary font-black">
              {rawSubtotal >= freeShippingThreshold ? "Unlocked! 🚚" : `Add ${formatPrice(freeShippingThreshold - rawSubtotal)}`}
            </span>
          </div>
          <div className="h-2 w-full neu-pressed rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl neu-pressed flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-display text-lg font-extrabold text-foreground">Your Bag is Empty</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs font-medium">
                  Explore curated luxury pieces in our catalog and build your custom collection.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="neu-btn-primary px-6 py-3 text-xs font-extrabold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" /> Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-4 p-4 rounded-3xl neu-flat hover:shadow-neu-flat-lg transition-all"
              >
                <div className="w-20 h-20 rounded-2xl neu-image-frame overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h5 className="font-extrabold text-xs text-foreground truncate">{item.product.name}</h5>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mt-0.5">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                    <p className="text-xs font-black text-primary mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2 neu-pressed p-1 rounded-xl">
                      <button
                        className="w-6 h-6 rounded-lg neu-btn flex items-center justify-center text-xs text-foreground"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-foreground">{item.quantity}</span>
                      <button
                        className="w-6 h-6 rounded-lg neu-btn flex items-center justify-center text-xs text-foreground"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      className="w-7 h-7 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-colors"
                      onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border/40 neu-flat space-y-4">
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-bold">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-500 font-extrabold">
                  <span>Discount ({activeCoupon})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm text-foreground pt-2 border-t border-border/40">
                <span>Estimated Total</span>
                <span className="text-primary text-base font-black">{formatPrice(finalSubtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full neu-btn-primary py-3.5 text-sm font-extrabold flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero-Cost Secure Encryption & Doorstep Delivery</span>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};
