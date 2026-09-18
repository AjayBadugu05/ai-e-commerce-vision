import { useTheme } from "@/hooks/useTheme";

export const NeumorphicBackground = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Specular Mesh Ambient Gradient Layer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          resolvedTheme === "dark" 
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-background to-background" 
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/30 via-background to-background"
        }`} 
      />

      {/* Clean Subtle Neumorphic Ring Halos (Fixed Ambient Subsurface) */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-15 flex items-center justify-center pointer-events-none">
        <div className="w-[520px] h-[520px] rounded-full neu-flat flex items-center justify-center">
          <div className="w-[380px] h-[380px] rounded-full neu-pressed flex items-center justify-center">
            <div className="w-[240px] h-[240px] rounded-full neu-flat" />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-20 dark:opacity-15 flex items-center justify-center pointer-events-none">
        <div className="w-[540px] h-[540px] rounded-full neu-flat flex items-center justify-center">
          <div className="w-[380px] h-[380px] rounded-full neu-pressed" />
        </div>
      </div>

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-amber-500/5 dark:bg-amber-400/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px] bg-purple-500/5 dark:bg-purple-400/10 blur-[180px] rounded-full" />
    </div>
  );
};
