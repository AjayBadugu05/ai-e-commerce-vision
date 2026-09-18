import { ArrowRight, Sparkles, Camera, Zap, Volume2, Sliders } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VisualSearchModal } from "@/components/ai/VisualSearchModal";

export const HeroSection = () => {
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: High-Fashion Editorial Typography & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Neumorphic Pill Badge with Luminous Dot */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full neu-flat text-xs font-black text-foreground">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              <span className="uppercase tracking-widest text-[11px]">AETHERIA Tactile Studio</span>
              <span className="neu-badge text-primary text-[10px] font-black">2026 Edition</span>
            </div>

            {/* High-Fashion Headline (Syne Typography) */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground">
              Tactile Luxury & <br />
              <span className="text-gradient-hero">Visual Intelligence</span>
            </h1>

            {/* Editorial Copy */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Architected for connoisseurs of spatial design. Explore high-precision acoustic monitors, Swiss grade 5 titanium timepieces, and carbon kinetic footwear styled with real-time neural matching.
            </p>

            {/* Tactile Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <button className="neu-btn-primary w-full sm:w-auto px-8 py-4 text-sm font-black flex items-center justify-center gap-3">
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4 text-slate-900" />
                </button>
              </Link>

              <button
                onClick={() => setIsVisualSearchOpen(true)}
                className="neu-btn w-full sm:w-auto px-8 py-4 text-sm font-extrabold flex items-center justify-center gap-3 text-foreground"
              >
                <Camera className="w-4.5 h-4.5 text-primary" />
                <span>AI Lens Search</span>
              </button>
            </div>

            {/* Trust Metrics - Tactile Extruded Cards */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="p-4 rounded-3xl neu-flat text-center">
                <h4 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">99.8%</h4>
                <p className="text-[11px] font-bold text-muted-foreground mt-0.5 uppercase tracking-wider">Style Vector</p>
              </div>
              <div className="p-4 rounded-3xl neu-flat text-center">
                <h4 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">48-Hr</h4>
                <p className="text-[11px] font-bold text-muted-foreground mt-0.5 uppercase tracking-wider">Express Air</p>
              </div>
              <div className="p-4 rounded-3xl neu-flat text-center">
                <h4 className="font-heading text-xl sm:text-2xl font-extrabold font-black text-foreground">5.0 ★</h4>
                <p className="text-[11px] font-bold text-muted-foreground mt-0.5 uppercase tracking-wider">Collector Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Showcase Card with Equalizer UI Elements */}
          <div className="lg:col-span-5 relative">
            <div className="neu-flat-lg p-5 rounded-4xl group transition-all duration-700 hover:rotate-1 animate-float-slow relative">
              
              {/* Floating Neumorphic Equalizer Dial Widget (Top Right Overlay) */}
              <div className="absolute -top-6 -right-6 z-20 neu-flat p-3 rounded-2xl flex items-center gap-3 shadow-neu-flat">
                <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center text-primary">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-muted-foreground block">Spatial EQ</span>
                  <span className="text-xs font-black text-primary">Active (24-bit)</span>
                </div>
              </div>

              {/* Inset Image Viewport */}
              <div className="neu-image-frame relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&h=1200&fit=crop"
                  alt="AETHERIA Studio ANC"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Card Banner Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="neu-badge text-[10px] text-primary font-black uppercase">
                      FLAGSHIP RELEASE
                    </span>
                    <span className="text-[11px] font-black text-white/90 font-mono">98% Match</span>
                  </div>

                  <h3 className="font-heading text-2xl font-extrabold text-white">AETHERIA Studio Pro ANC</h3>
                  <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-medium">
                    Custom 45mm Titanium Drivers with 55-hour battery life & real-time acoustic spatial head tracking.
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-heading text-2xl font-black text-white">₹34,999</span>
                    <Link to="/product/aether-headphones-pro">
                      <button className="neu-btn px-4 py-2 text-xs font-extrabold text-foreground hover:text-primary flex items-center gap-1.5">
                        Inspect <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </section>
  );
};
