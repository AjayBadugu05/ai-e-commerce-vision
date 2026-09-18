import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Flame, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const Deals = () => {
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Neumorphic Banner */}
          <div className="neu-flat-lg rounded-4xl p-8 md:p-12 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-pressed text-xs font-black text-rose-500">
              <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
              <span>AETHERIA Batch 04 Flash Drop</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight">
              Exclusive <span className="text-gradient-hero">Privilege Pricing</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto font-medium">
              Private batch drops with complimentary 48-hr air courier dispatches.
            </p>

            {/* Countdown Nodes */}
            <div className="flex justify-center gap-3 pt-2">
              <TimeBox value={String(timeLeft.hours).padStart(2, "0")} label="Hours" />
              <TimeBox value={String(timeLeft.minutes).padStart(2, "0")} label="Mins" />
              <TimeBox value={String(timeLeft.seconds).padStart(2, "0")} label="Secs" />
            </div>
          </div>

          {/* Flash Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
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
  <div className="neu-pressed rounded-3xl p-4 text-center min-w-[75px]">
    <div className="font-display text-2xl font-black text-primary">{value}</div>
    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{label}</div>
  </div>
);

export default Deals;
