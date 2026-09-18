import { useTheme } from "@/hooks/useTheme";

export const NeumorphicBackground = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Specular Mesh Ambient Gradient Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          resolvedTheme === "dark" 
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-background to-background" 
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-background to-background"
        }`} 
      />

      {/* Graphic Element 1: Concentric Circular UI Dial (Top Right) */}
      <div className="absolute -top-28 -right-28 w-[560px] h-[560px] rounded-full opacity-40 dark:opacity-25 animate-spin-slow flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full neu-flat flex items-center justify-center">
          <div className="w-[380px] h-[380px] rounded-full neu-pressed flex items-center justify-center">
            <div className="w-[260px] h-[260px] rounded-full neu-flat flex items-center justify-center">
              <div className="w-[140px] h-[140px] rounded-full neu-pressed flex items-center justify-center text-primary font-black text-xs">
                78%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphic Element 2: Equalizer Bar Graph Background Graphic (Top Left) */}
      <div className="absolute top-1/4 -left-20 w-[360px] p-6 rounded-4xl neu-flat opacity-30 dark:opacity-20 flex flex-col gap-3 -rotate-12">
        <div className="flex items-end gap-2 h-24">
          {[40, 75, 55, 90, 65, 80, 45, 95, 60, 70, 85].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 rounded-full neu-pressed bg-primary/40" 
              style={{ height: `${h}%` }} 
            />
          ))}
        </div>
        <div className="h-2 rounded-full neu-pressed overflow-hidden">
          <div className="h-full bg-primary w-[70%]" />
        </div>
      </div>

      {/* Graphic Element 3: Audio Waveform Equalizer Line (Center Background) */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-25 dark:opacity-15 flex items-center gap-2">
        {[20, 45, 80, 35, 90, 60, 100, 40, 75, 50, 85, 30, 95, 65, 40].map((h, i) => (
          <div 
            key={i} 
            className="w-2 rounded-full neu-flat bg-primary animate-audio-wave" 
            style={{ height: `${h * 1.2}px`, animationDelay: `${i * 0.1}s` }} 
          />
        ))}
      </div>

      {/* Graphic Element 4: Concentric Circle Craters (Bottom Left) */}
      <div className="absolute -bottom-36 -left-36 w-[600px] h-[600px] opacity-35 dark:opacity-20 flex items-center justify-center">
        <div className="w-[550px] h-[550px] rounded-full neu-flat flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full neu-pressed flex items-center justify-center">
            <div className="w-[260px] h-[260px] rounded-full neu-flat" />
          </div>
        </div>
      </div>

      {/* Graphic Element 5: Ambient Glow Field Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-cyan-500/10 dark:bg-cyan-400/15 blur-[160px] rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-400/15 blur-[150px] rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }} />
    </div>
  );
};
