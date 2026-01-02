import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Aurora Background */}
      <div className="aurora-bg" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Shopping Experience</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Discover{" "}
            <span className="text-gradient-gold">Premium</span>
            <br />
            Products
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Elevate your lifestyle with our curated collection of luxury items. 
            Smart recommendations powered by AI to match your unique taste.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/shop">
              <Button className="btn-primary h-14 px-8 text-lg">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="btn-glass h-14 px-8 text-lg">
              Explore Collections
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <StatItem value="50K+" label="Products" />
            <StatItem value="100K+" label="Customers" />
            <StatItem value="4.9★" label="Rating" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="font-display text-3xl md:text-4xl font-bold text-gradient-gold">
      {value}
    </div>
    <div className="text-sm text-muted-foreground mt-1">{label}</div>
  </div>
);
