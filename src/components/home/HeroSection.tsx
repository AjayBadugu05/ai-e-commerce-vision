import { ArrowRight, Zap, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Shapes */}
      <div className="floating-shapes">
        <div className="shape w-72 h-72 bg-primary rounded-full -top-20 -left-20 animate-float" />
        <div className="shape w-96 h-96 bg-secondary rounded-full -bottom-40 -right-20 animate-float" style={{ animationDelay: "-2s" }} />
        <div className="shape w-48 h-48 bg-magic rounded-full top-1/3 right-1/4 animate-bounce-slow" />
        <div className="shape w-32 h-32 bg-accent rounded-full bottom-1/4 left-1/3 animate-wiggle" />
        <div className="shape w-24 h-24 bg-success rounded-full top-1/2 left-1/6 animate-float" style={{ animationDelay: "-1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-card border-2 border-primary/20 mb-8 animate-slide-up"
          >
            <Sparkles className="w-5 h-5 text-accent animate-wiggle" />
            <span className="font-semibold text-sm">New Collection Just Dropped! 🚀</span>
          </div>

          {/* Headline */}
          <h1 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Shop{" "}
            <span className="text-gradient-hero">Amazing</span>
            <br />
            <span className="relative inline-block">
              Products
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="hsl(205, 100%, 50%)" />
                    <stop offset="0.5" stopColor="hsl(270, 80%, 60%)" />
                    <stop offset="1" stopColor="hsl(350, 85%, 60%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover the coolest gadgets, fashion, and more! 
            Fast shipping, easy returns, and prices that'll make you smile! 😊
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/shop">
              <button className="btn-bouncy h-16 px-10 text-lg flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/deals">
              <button className="btn-secondary-bouncy h-16 px-10 text-lg">
                🔥 Hot Deals
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 mt-16 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <StatItem value="50K+" label="Products" icon="🛍️" />
            <StatItem value="100K+" label="Happy Customers" icon="😊" />
            <StatItem value="4.9" label="Rating" icon="⭐" />
          </div>
        </div>
      </div>

      {/* Floating Product Images */}
      <div className="absolute bottom-10 left-10 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-hover animate-float hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" 
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-32 right-10 w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-hover animate-bounce-slow hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop" 
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

const StatItem = ({ value, label, icon }: { value: string; label: string; icon: string }) => (
  <div className="text-center fun-card p-4 hover-lift">
    <span className="text-2xl mb-1 block">{icon}</span>
    <div className="font-display text-2xl md:text-3xl font-bold text-gradient-hero">
      {value}
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);
