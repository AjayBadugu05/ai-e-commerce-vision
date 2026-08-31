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
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card/95 backdrop-blur-3xl z-50 animate-slide-in-right flex flex-col shadow-2xl border-l border-white/20 dark:border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/60 bg-gradient-to-r from-primary/10 via-magic/10 to-accent/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Shopping Bag</h3>
              <p className="text-xs text-muted-foreground">{items.reduce((s, i) => s + i.quantity, 0)} Items Selected</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-muted/40 border-b border-border/40 space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">Complimentary Express Shipping</span>
            <span className="text-primary font-bold">
              {rawSubtotal >= freeShippingThreshold ? "Unlocked! 🚚" : `Add ${formatPrice(freeShippingThreshold - rawSubtotal)}`}
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-muted/60 flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold">Your Bag is Empty</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Discover curated luxury items in our catalog and build your custom collection.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-apple text-xs"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Start Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-sm hover:border-primary/40 transition-all"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl border border-border/40"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h5 className="font-semibold text-xs text-foreground truncate">{item.product.name}</h5>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                    <p className="text-xs font-bold text-primary mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                    <div className="flex items-center gap-2 bg-muted/60 p-1 rounded-xl">
                      <button
                        className="w-6 h-6 rounded-lg bg-card flex items-center justify-center text-xs hover:bg-primary/10"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        className="w-6 h-6 rounded-lg bg-card flex items-center justify-center text-xs hover:bg-primary/10"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      className="p-1.5 text-muted-foreground hover:text-rose-500 transition-colors"
                      onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border/60 bg-card space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success font-semibold">
                  <span>Coupon Discount ({activeCoupon})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-foreground pt-2 border-t border-border/40">
                <span>Estimated Total</span>
                <span className="text-primary text-base">{formatPrice(finalSubtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full btn-apple h-12 text-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Encrypted Apple Pay / SSL Transaction</span>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal Overlay */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};

