import { X, Plus, Minus, Trash2, ShoppingCart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, cartTotal, updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 animate-slide-in-right flex flex-col shadow-hover">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-border bg-gradient-to-r from-primary to-magic text-white">
          <h2 className="font-display text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Your Cart
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-sm">
              {items.length}
            </span>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-white hover:bg-white/20"
            onClick={() => setIsCartOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mb-4 animate-bounce-slow">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Cart is Empty! 🛒</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Let's fill it up with amazing products!
              </p>
              <Button
                className="btn-bouncy"
                onClick={() => setIsCartOpen(false)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-2xl bg-muted/50 border-2 border-border animate-slide-up hover-lift"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-primary font-bold mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-xl bg-card border-2 border-border hover:border-primary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-xl bg-card border-2 border-border hover:border-primary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-xl ml-auto text-secondary hover:bg-secondary/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t-2 border-border space-y-4 bg-muted/30">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="font-display text-2xl font-bold text-gradient-hero">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <button className="w-full btn-bouncy h-14 text-lg">
              Checkout 🚀
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Free shipping on orders over ₹999! 📦
            </p>
          </div>
        )}
      </div>
    </>
  );
};
