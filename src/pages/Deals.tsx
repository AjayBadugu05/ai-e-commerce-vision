import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Zap, Timer, Gift, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const dealProducts = [
  {
    id: "d1",
    name: "Ultra HD 4K Smart TV - 55 inch",
    price: 499.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 5,
    isSale: true,
  },
  {
    id: "d2",
    name: "Premium Gaming Console Bundle",
    price: 399.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
    category: "Gaming",
    rating: 5,
    isSale: true,
  },
  {
    id: "d3",
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 5,
    isSale: true,
  },
  {
    id: "d4",
    name: "Designer Winter Jacket",
    price: 129.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    category: "Fashion",
    rating: 4,
    isSale: true,
  },
  {
    id: "d5",
    name: "Smart Home Security Camera Set",
    price: 149.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4,
    isSale: true,
  },
  {
    id: "d6",
    name: "Premium Coffee Machine",
    price: 249.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop",
    category: "Home",
    rating: 5,
    isSale: true,
  },
  {
    id: "d7",
    name: "Running Shoes Pro Edition",
    price: 89.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Sports",
    rating: 5,
    isSale: true,
  },
  {
    id: "d8",
    name: "Luxury Skincare Gift Set",
    price: 79.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop",
    category: "Beauty",
    rating: 5,
    isSale: true,
  },
];

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="relative rounded-4xl overflow-hidden mb-12 fun-card border-4 border-secondary/30 animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-secondary animate-rainbow" style={{ backgroundSize: "200% auto" }} />
            
            <div className="relative px-8 py-12 md:py-16 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-wiggle">
                <Zap className="w-5 h-5" />
                <span className="font-bold">Flash Sale!</span>
                <Gift className="w-5 h-5" />
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                Up to <span className="bg-white text-secondary px-4 rounded-2xl">70%</span> OFF
              </h1>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Don't miss out on these incredible deals! Limited time only! ⏰
              </p>

              {/* Timer */}
              <div className="flex justify-center gap-3">
                <TimeBox value={String(timeLeft.hours).padStart(2, '0')} label="Hours" />
                <TimeBox value={String(timeLeft.minutes).padStart(2, '0')} label="Mins" />
                <TimeBox value={String(timeLeft.seconds).padStart(2, '0')} label="Secs" />
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <Sparkles className="w-6 h-6 text-accent animate-wiggle" />
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Today's <span className="text-gradient-hero">Hot Deals</span> 🔥
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
              >
                <ProductCard {...product} />
              </div>
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
  <div className="bg-white rounded-2xl px-5 py-3 text-center min-w-[80px] shadow-lg">
    <div className="font-display text-3xl md:text-4xl font-bold text-gradient-hero">
      {value}
    </div>
    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {label}
    </div>
  </div>
);

export default Deals;
