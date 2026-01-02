import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PromoSection = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="relative rounded-3xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm" />

        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Limited Time Offer</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Up to <span className="text-gradient-gold">50% OFF</span>
              <br />
              Flash Sale
            </h2>
            <p className="text-muted-foreground mb-8">
              Don't miss out on incredible deals! Shop our exclusive flash sale 
              and save big on premium products. Hurry, offer ends soon!
            </p>
            <Button className="btn-primary h-14 px-8 text-lg">
              Shop Flash Sale
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Timer */}
          <div className="flex gap-4">
            <TimeBox value="02" label="Days" />
            <TimeBox value="14" label="Hours" />
            <TimeBox value="35" label="Mins" />
            <TimeBox value="22" label="Secs" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="glass-card px-4 py-3 text-center min-w-[70px]">
    <div className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
      {value}
    </div>
    <div className="text-xs text-muted-foreground uppercase tracking-wider">
      {label}
    </div>
  </div>
);
