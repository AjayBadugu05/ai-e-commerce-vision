import { useState } from "react";
import { X, CreditCard, CheckCircle2, ShieldCheck, MapPin, Truck, Sparkles, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { items, rawSubtotal, clearCart } = useCart();
  const { addOrder, promoDiscount, activeCoupon, applyPromoCode } = useUser();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [couponInput, setCouponInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"apple" | "card" | "upi">("apple");

  // Form Fields
  const [fullName, setFullName] = useState("Alex Vance");
  const [address, setAddress] = useState("Penthouse 42, Sky View Towers, Cyber City");
  const [city, setCity] = useState("Mumbai");
  const [pincode, setPincode] = useState("400001");
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  if (!isOpen) return null;

  const discountAmount = rawSubtotal * promoDiscount;
  const shippingFee = rawSubtotal > 999 ? 0 : 250;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleApplyCoupon = () => {
    if (applyPromoCode(couponInput)) {
      toast.success(`Coupon ${couponInput.toUpperCase()} applied successfully! 🎉`);
    } else {
      toast.error("Invalid coupon. Try 'AETHER20' for 20% off!");
    }
  };

  const handleCompleteOrder = () => {
    const newOrder = addOrder({
      items: items.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        selectedColor: i.selectedColor,
        selectedSize: i.selectedSize,
      })),
      totalAmount: finalTotal,
      status: "Placed",
      trackingNumber: `ATH-IND-${Math.floor(10000 + Math.random() * 90000)}-X`,
      estimatedDelivery: "2 Days Express Air",
      shippingAddress: `${address}, ${city} - ${pincode}`,
      paymentMethod: paymentMethod === "apple" ? "Apple Pay" : paymentMethod === "card" ? "Credit Card (•••• 9012)" : "UPI Direct",
    });

    setConfirmedOrder(newOrder);
    setStep(4);
    clearCart();
    toast.success("Order Placed Successfully! 🚀");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-slide-up">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl bg-card/95 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div>
            <h3 className="font-display text-2xl font-bold">AETHER Express Checkout</h3>
            <p className="text-xs text-muted-foreground">Encrypted 256-Bit SSL Luxury Transaction</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        {step < 4 && (
          <div className="flex items-center justify-between px-4 py-2 bg-muted/40 rounded-2xl text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? "text-primary font-bold" : "text-muted-foreground"}`}>
              <MapPin className="w-4 h-4" /> 1. Shipping
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? "text-primary font-bold" : "text-muted-foreground"}`}>
              <Truck className="w-4 h-4" /> 2. Delivery
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? "text-primary font-bold" : "text-muted-foreground"}`}>
              <CreditCard className="w-4 h-4" /> 3. Payment
            </div>
          </div>
        )}

        {/* STEP 1: Shipping Address */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-up">
            <h4 className="font-semibold text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Shipping Destination
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-muted/60 border border-border/80 outline-none focus:border-primary text-sm font-medium mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-muted/60 border border-border/80 outline-none focus:border-primary text-sm font-medium mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-muted/60 border border-border/80 outline-none focus:border-primary text-sm font-medium mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-muted/60 border border-border/80 outline-none focus:border-primary text-sm font-medium mt-1"
                  />
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="w-full btn-apple mt-4">
              Continue to Shipping Method <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

        {/* STEP 2: Delivery Speed */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-up">
            <h4 className="font-semibold text-base flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> Delivery Method
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/40 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm text-primary">AETHER Priority Air Express</h5>
                  <p className="text-xs text-muted-foreground">Delivery within 48 Hours with live GPS tracking</p>
                </div>
                <span className="font-bold text-xs text-primary">FREE</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="btn-apple-secondary flex-1">
                Back
              </button>
              <button onClick={() => setStep(3)} className="btn-apple flex-1">
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment */}
        {step === 3 && (
          <div className="space-y-5 animate-slide-up">
            <h4 className="font-semibold text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" /> Select Payment Option
            </h4>

            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Enter Promo Code (e.g. AETHER20)"
                className="flex-1 h-11 px-4 rounded-xl bg-muted/60 border border-border/80 text-xs font-mono outline-none uppercase"
              />
              <button onClick={handleApplyCoupon} className="px-4 bg-muted hover:bg-muted/80 rounded-xl text-xs font-semibold border border-border">
                Apply
              </button>
            </div>
            {activeCoupon && (
              <p className="text-xs text-success font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Coupon Active: {activeCoupon}
              </p>
            )}

            {/* Payment Radios */}
            <div className="space-y-2">
              <div
                onClick={() => setPaymentMethod("apple")}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === "apple" ? "bg-primary/10 border-primary shadow-md" : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl"> Pay</span>
                  <div>
                    <h5 className="font-semibold text-sm">Apple Pay</h5>
                    <p className="text-xs text-muted-foreground">Instant TouchID / FaceID Authorization</p>
                  </div>
                </div>
                {paymentMethod === "apple" && <CheckCircle2 className="w-5 h-5 text-primary" />}
              </div>

              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === "card" ? "bg-primary/10 border-primary shadow-md" : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <h5 className="font-semibold text-sm">Credit / Debit Card</h5>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                {paymentMethod === "card" && <CheckCircle2 className="w-5 h-5 text-primary" />}
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-4 rounded-2xl bg-muted/40 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border/60">
                <span>Total Amount</span>
                <span className="text-primary">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-apple-secondary flex-1">
                Back
              </button>
              <button onClick={handleCompleteOrder} className="btn-apple flex-1">
                Authorize & Pay {formatPrice(finalTotal)}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success Receipt */}
        {step === 4 && confirmedOrder && (
          <div className="py-8 text-center space-y-5 animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">Order Confirmed!</h3>
              <p className="text-xs text-muted-foreground mt-1">Receipt ID: {confirmedOrder.id}</p>
            </div>

            <div className="p-5 rounded-2xl bg-muted/40 text-left space-y-2 text-xs border border-border/40">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-bold text-primary">{confirmedOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Number:</span>
                <span className="font-mono">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Air Delivery:</span>
                <span className="font-semibold">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid Amount:</span>
                <span className="font-bold text-foreground">{formatPrice(confirmedOrder.totalAmount)}</span>
              </div>
            </div>

            <button onClick={onClose} className="w-full btn-apple">
              Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
