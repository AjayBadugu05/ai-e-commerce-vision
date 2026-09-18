import { useState } from "react";
import { X, CreditCard, CheckCircle2, ShieldCheck, MapPin, Truck, Sparkles, ArrowRight, QrCode, Banknote } from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");

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
      toast.success(`Coupon ${couponInput.toUpperCase()} applied! 🎉`);
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
      estimatedDelivery: "2 Days Express Priority",
      shippingAddress: `${address}, ${city} - ${pincode}`,
      paymentMethod: paymentMethod === "upi" ? "Instant UPI (BHIM/GPay)" : paymentMethod === "card" ? "Credit Card (•••• 9012)" : "Cash on Delivery (Zero Extra Fee)",
    });

    setConfirmedOrder(newOrder);
    setStep(4);
    clearCart();
    toast.success("Order Placed Successfully! 🚀");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-slide-up">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="w-full max-w-2xl neu-flat-lg rounded-4xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
          <div>
            <h3 className="font-display text-2xl font-extrabold text-foreground">AETHERIA Express Checkout</h3>
            <p className="text-xs text-muted-foreground font-medium">Zero-Cost Instant Transaction & Priority Shipping</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps Nodes */}
        {step < 4 && (
          <div className="flex items-center justify-between p-2 neu-pressed rounded-2xl text-xs font-extrabold">
            <div className={`px-3 py-1.5 rounded-xl transition-all ${step >= 1 ? "neu-flat text-primary font-black" : "text-muted-foreground"}`}>
              1. Address
            </div>
            <div className={`px-3 py-1.5 rounded-xl transition-all ${step >= 2 ? "neu-flat text-primary font-black" : "text-muted-foreground"}`}>
              2. Delivery
            </div>
            <div className={`px-3 py-1.5 rounded-xl transition-all ${step >= 3 ? "neu-flat text-primary font-black" : "text-muted-foreground"}`}>
              3. Payment
            </div>
          </div>
        )}

        {/* STEP 1: Shipping Address */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-up">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Delivery Address
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="neu-input text-xs font-bold mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground">Street Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="neu-input text-xs font-bold mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-muted-foreground">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="neu-input text-xs font-bold mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground">PIN Code</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="neu-input text-xs font-bold mt-1"
                  />
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="w-full neu-btn-primary py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 mt-4">
              <span>Continue to Shipping</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* STEP 2: Delivery Speed */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-up">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> Delivery Method
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-3xl neu-flat flex items-center justify-between">
                <div>
                  <h5 className="font-extrabold text-sm text-primary">AETHERIA Priority Air Delivery</h5>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">Complimentary 48-Hour door-to-door delivery</p>
                </div>
                <span className="neu-badge text-emerald-500 font-black">FREE</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="neu-btn-secondary flex-1 py-3 text-xs">
                Back
              </button>
              <button onClick={() => setStep(3)} className="neu-btn-primary flex-1 py-3 text-xs">
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment */}
        {step === 3 && (
          <div className="space-y-5 animate-slide-up">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" /> Zero-Cost Payment Options
            </h4>

            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="PROMO CODE (e.g. AETHER20)"
                className="neu-input flex-1 text-xs font-mono uppercase"
              />
              <button onClick={handleApplyCoupon} className="neu-btn px-4 text-xs font-extrabold text-primary">
                Apply
              </button>
            </div>
            {activeCoupon && (
              <p className="text-xs text-emerald-500 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Coupon Active: {activeCoupon}
              </p>
            )}

            {/* Payment Options */}
            <div className="space-y-2.5">
              <div
                onClick={() => setPaymentMethod("upi")}
                className={`p-4 rounded-3xl cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === "upi" ? "neu-pressed text-primary font-bold" : "neu-flat text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-primary" />
                  <div>
                    <h5 className="font-extrabold text-sm">Instant UPI (GPay / PhonePe / Paytm)</h5>
                    <p className="text-xs text-muted-foreground">0% Transaction Fee Instant Payment</p>
                  </div>
                </div>
                {paymentMethod === "upi" && <CheckCircle2 className="w-5 h-5 text-primary" />}
              </div>

              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-3xl cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === "card" ? "neu-pressed text-primary font-bold" : "neu-flat text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <h5 className="font-extrabold text-sm">Credit / Debit Card</h5>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard, RuPay, Amex</p>
                  </div>
                </div>
                {paymentMethod === "card" && <CheckCircle2 className="w-5 h-5 text-primary" />}
              </div>

              <div
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 rounded-3xl cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === "cod" ? "neu-pressed text-primary font-bold" : "neu-flat text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-primary" />
                  <div>
                    <h5 className="font-extrabold text-sm">Cash on Delivery</h5>
                    <p className="text-xs text-muted-foreground">Pay on arrival with zero extra charges</p>
                  </div>
                </div>
                {paymentMethod === "cod" && <CheckCircle2 className="w-5 h-5 text-primary" />}
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-4 rounded-3xl neu-pressed space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-500 font-black">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-bold text-emerald-500">{shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border/40">
                <span>Total Amount</span>
                <span className="text-primary">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="neu-btn-secondary flex-1 py-3.5 text-xs">
                Back
              </button>
              <button onClick={handleCompleteOrder} className="neu-btn-primary flex-1 py-3.5 text-xs">
                Confirm Order ({formatPrice(finalTotal)})
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Order Receipt */}
        {step === 4 && confirmedOrder && (
          <div className="py-8 text-center space-y-5 animate-slide-up">
            <div className="w-16 h-16 rounded-3xl neu-flat text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-black text-foreground">Order Confirmed!</h3>
              <p className="text-xs text-muted-foreground mt-1 font-mono">Receipt ID: {confirmedOrder.id}</p>
            </div>

            <div className="p-5 rounded-3xl neu-pressed text-left space-y-2.5 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-black text-primary">{confirmedOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tracking Number:</span>
                <span className="font-mono text-foreground font-bold">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-bold text-foreground">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid:</span>
                <span className="font-black text-primary">{formatPrice(confirmedOrder.totalAmount)}</span>
              </div>
            </div>

            <button onClick={onClose} className="w-full neu-btn-primary py-3.5 text-xs font-extrabold">
              Return to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
