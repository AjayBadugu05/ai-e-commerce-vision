import { ArrowRight, Sparkles, Shield, Cpu, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Ambient Mesh Background Illumination */}
      <div className="absolute inset-0 bg-gradient-ambient pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-glass text-xs font-semibold text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>AETHER iOS 26 Spatial Vision Engine</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary font-bold">2026 Edition</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]">
              The Future of <br />
              <span className="text-gradient-hero">AI-Driven Commerce</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience spatial glassmorphism, instant neural AI recommendations, visual camera search, and hand-curated Grade 5 titanium luxury collections.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto btn-apple flex items-center justify-center gap-2 text-base px-8 py-4">
                  Explore Catalog <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/deals" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto btn-apple-glass flex items-center justify-center gap-2 text-base px-8 py-4">
                  <Sparkles className="w-5 h-5 text-primary" /> Flash Drops
                </button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-border/40 max-w-lg mx-auto lg:mx-0">
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground">99.8%</h4>
                <p className="text-xs text-muted-foreground">Neural Style Accuracy</p>
              </div>
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground">48-Hr</h4>
                <p className="text-xs text-muted-foreground">Express Air Delivery</p>
              </div>
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-foreground">5.0 ★</h4>
                <p className="text-xs text-muted-foreground">Curated Craft Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative glass-panel p-4 overflow-hidden group shadow-2xl transition-all duration-700 hover:rotate-1">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1200&fit=crop"
                  alt="AETHER Studio Headphones"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Card Glass Overlay Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-xs font-bold text-primary">
                      Flagship Feature
                    </span>
                    <span className="text-xs font-mono text-white/80">98% AI Match</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">AETHER Studio Pro ANC</h3>
                  <p className="text-xs text-white/70 line-clamp-2">Spatial Audio with 45mm Titanium Drivers & 55-Hour Battery</p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-display text-2xl font-bold text-white">₹34,999</span>
                    <Link to="/product/aether-headphones-pro">
                      <button className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all flex items-center gap-1.5">
                        Inspect Spec <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

