import { Sparkles, Shield, Truck, RotateCcw, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Step 1: Try database insert or fallback to local persistent zero-cost storage
      try {
        const { error: dbError } = await supabase.from("email_subscribers").insert([
          {
            email: cleanEmail,
            status: "subscribed",
            source: "website",
            consent: true,
          },
        ]);

        if (dbError) {
          if (dbError.code === "23505" || dbError.message.toLowerCase().includes("unique")) {
            toast.info("You're already subscribed to our VIP circle! 🌟");
            setIsSubmitting(false);
            return;
          }
        }
      } catch (e) {
        // Fallback silently to local zero-cost storage if DB is unconfigured
        const existing = JSON.parse(localStorage.getItem("email_subscribers") || "[]");
        if (!existing.includes(cleanEmail)) {
          existing.push(cleanEmail);
          localStorage.setItem("email_subscribers", JSON.stringify(existing));
        }
      }

      toast.success("Welcome to AETHERIA Exclusive VIP Circle! 🌟");
      setEmail("");
    } catch (err: any) {
      console.error("Subscription exception:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative pt-20 pb-12 mt-20 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Value Pillars - Neumorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          <div className="p-6 rounded-3xl neu-flat flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className="w-14 h-14 rounded-2xl neu-pressed text-primary flex items-center justify-center font-extrabold flex-shrink-0">
              <Truck className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-foreground">Express Priority Delivery</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Complimentary 48-hr insured shipping on all orders</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl neu-flat flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className="w-14 h-14 rounded-2xl neu-pressed text-primary flex items-center justify-center font-extrabold flex-shrink-0">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-foreground">2-Year Craftsmanship Guarantee</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Full hardware protection & serial verification</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl neu-flat flex items-center gap-4 hover:scale-[1.02] transition-transform">
            <div className="w-14 h-14 rounded-2xl neu-pressed text-primary flex items-center justify-center font-extrabold flex-shrink-0">
              <RotateCcw className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-foreground">30-Day Tactile Return</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Hassle-free doorstep collection with instant refund</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-t border-border/40">
          {/* Brand Story */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center text-primary">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-foreground">AETHERIA</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bespoke luxury studio crafting high-precision tactile electronics, Grade 5 titanium horology, carbon kinetic performance footwear, and visual intelligence.
            </p>
          </div>

          {/* Catalog Collections */}
          <div>
            <h5 className="font-extrabold text-sm mb-4 text-foreground tracking-wide uppercase">Curated Catalog</h5>
            <ul className="space-y-3 text-xs font-semibold text-muted-foreground">
              <li><Link to="/shop" className="hover:text-primary transition-colors">Acoustic Pro Audio</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Titanium Automatic Timepieces</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Carbon Kinetic Footwear</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Luxury Italian Leatherwear</Link></li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h5 className="font-extrabold text-sm mb-4 text-foreground tracking-wide uppercase">Tactile Ecosystem</h5>
            <ul className="space-y-3 text-xs font-semibold text-muted-foreground">
              <li><span className="text-primary font-bold">Visual Intelligence Lens</span></li>
              <li><span>Zero-Cost Local Backend</span></li>
              <li><span>Real-time Neural Match</span></li>
              <li><span>3D Neumorphism UI</span></li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-4">
            <h5 className="font-extrabold text-sm text-foreground tracking-wide uppercase">AETHERIA VIP Insider</h5>
            <p className="text-xs text-muted-foreground">Receive private batch drop notifications and tactile design updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter@email.com"
                disabled={isSubmitting}
                className="neu-input flex-1 text-xs"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="neu-btn-primary p-3 rounded-2xl flex items-center justify-center min-w-[48px]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-white" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-muted-foreground gap-4">
          <p>© 2026 AETHERIA Tactile Commerce. All rights reserved. Handcrafted Neumorphism Design.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer">Privacy</span>
            <span className="hover:text-foreground cursor-pointer">Terms</span>
            <span className="hover:text-foreground cursor-pointer">Security</span>
            <span className="font-bold text-primary neu-badge">INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
