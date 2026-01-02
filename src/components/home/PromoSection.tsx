import { ArrowRight, Zap, Timer, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const PromoSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="relative rounded-4xl overflow-hidden fun-card border-4 border-secondary/30">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-secondary animate-rainbow" style={{ backgroundSize: "200% auto" }} />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative px-8 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="max-w-xl text-center md:text-left text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 animate-wiggle">
              <Zap className="w-5 h-5" />
              <span className="font-bold">Flash Sale!</span>
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Up to <span className="bg-white text-secondary px-3 rounded-xl">50%</span> OFF
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Don't miss out on incredible deals! Hurry, offer ends soon! ⏰
            </p>
            <Link to="/deals">
              <button className="bg-white text-secondary font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto md:mx-0">
                Shop Flash Sale
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Timer */}
          <div className="flex gap-3">
            <TimeBox value={String(timeLeft.days).padStart(2, '0')} label="Days" />
            <TimeBox value={String(timeLeft.hours).padStart(2, '0')} label="Hours" />
            <TimeBox value={String(timeLeft.minutes).padStart(2, '0')} label="Mins" />
            <TimeBox value={String(timeLeft.seconds).padStart(2, '0')} label="Secs" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white rounded-2xl px-4 py-3 text-center min-w-[70px] shadow-lg">
    <div className="font-display text-3xl md:text-4xl font-bold text-gradient-hero">
      {value}
    </div>
    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {label}
    </div>
  </div>
);
