import { ArrowRight, Zap, Gift } from "lucide-react";
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
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="neu-flat-lg rounded-4xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Copy */}
        <div className="max-w-xl text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neu-pressed text-xs font-black text-rose-500">
            <Zap className="w-4 h-4 text-rose-500 animate-bounce" />
            <span>Limited Batch Release</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Up to <span className="text-primary">40% OFF</span> Priority Drops
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            Exclusive tactile editions crafted with titanium hardware & spatial audio drivers.
          </p>
          <div className="pt-2">
            <Link to="/deals">
              <button className="neu-btn-primary px-8 py-3.5 text-xs font-extrabold inline-flex items-center gap-2">
                <span>Inspect Flash Drop</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Countdown Neumorphic Nodes */}
        <div className="flex gap-3 sm:gap-4">
          <TimeBox value={String(timeLeft.days).padStart(2, '0')} label="Days" />
          <TimeBox value={String(timeLeft.hours).padStart(2, '0')} label="Hours" />
          <TimeBox value={String(timeLeft.minutes).padStart(2, '0')} label="Mins" />
          <TimeBox value={String(timeLeft.seconds).padStart(2, '0')} label="Secs" />
        </div>
      </div>
    </section>
  );
};

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="neu-pressed rounded-3xl p-3 sm:p-4 text-center min-w-[70px] sm:min-w-[80px]">
    <div className="font-display text-2xl sm:text-3xl font-black text-primary">
      {value}
    </div>
    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">
      {label}
    </div>
  </div>
);
