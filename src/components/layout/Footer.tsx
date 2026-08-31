import { Sparkles, Shield, Truck, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Welcome to AETHER Exclusive VIP Circle! 🌟");
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border/60 relative overflow-hidden pt-16 pb-12">
      {/* Background Mesh Light */}
      <div className="absolute inset-0 bg-gradient-ambient pointer-events-none opacity-40" />

      <div className="container mx-auto px-4 relative">
        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-border/40">
          <div className="flex items-center gap-4 p-6 glass-card">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Complimentary Express Air</h4>
              <p className="text-xs text-muted-foreground">Free 48-hr air delivery on orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 glass-card">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">2-Year AETHER Warranty</h4>
              <p className="text-xs text-muted-foreground">Comprehensive hardware & craftsmanship protection</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 glass-card">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">30-Day Seamless Returns</h4>
              <p className="text-xs text-muted-foreground">No questions asked white-glove pickup</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-border/40">
          {/* Brand Story */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-magic flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">AETHER</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Architecting the pinnacle of AI-driven luxury commerce. Curated high-performance electronics, horology, optical frames, and kinetic performance footwear.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h5 className="font-semibold text-sm mb-4 text-foreground">Collections</h5>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li><Link to="/shop" className="hover:text-primary transition-colors">Hi-Res Audio Tech</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Grade 5 Titanium Watches</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Carbon Kinetic Runners</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Italian Leather Travel</Link></li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h5 className="font-semibold text-sm mb-4 text-foreground">AETHER AI Platform</h5>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li><span className="text-primary font-semibold">AETHER AI Concierge</span></li>
              <li><span>Visual AI Image Indexing</span></li>
              <li><span>Biometric Readiness Sync</span></li>
              <li><span>Neural Style Match Score</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h5 className="font-semibold text-sm text-foreground">AETHER VIP Insider</h5>
            <p className="text-xs text-muted-foreground">Subscribe for private batch drops and exclusive AI style forecasts.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter@email.com"
                className="flex-1 h-11 px-4 rounded-xl bg-muted/60 border border-border/80 text-xs outline-none focus:border-primary"
              />
              <button type="submit" className="p-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 AETHER Inc. All rights reserved. Designed with Apple iOS-26 Spatial UI.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Statement</span>
            <span className="font-semibold text-primary">INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
