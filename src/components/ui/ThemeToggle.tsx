import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-11 h-11 rounded-2xl neu-btn flex items-center justify-center text-primary transition-all duration-300"
          title="Toggle Neumorphic Theme"
        >
          {resolvedTheme === "dark" ? (
            <Moon className="w-5 h-5 text-amber-400 fill-amber-400/20 animate-pulse" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500 fill-amber-500/20 animate-spin-slow" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="neu-flat-lg rounded-2xl p-2 border-0 min-w-[140px] space-y-1">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`gap-3 cursor-pointer rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            theme === "light" ? "neu-pressed text-primary font-black" : "hover:text-primary"
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" />
          Light Neumorphic
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`gap-3 cursor-pointer rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            theme === "dark" ? "neu-pressed text-primary font-black" : "hover:text-primary"
          }`}
        >
          <Moon className="w-4 h-4 text-amber-400" />
          Dark Neumorphic
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`gap-3 cursor-pointer rounded-xl px-3 py-2 text-xs font-bold transition-all ${
            theme === "system" ? "neu-pressed text-primary font-black" : "hover:text-primary"
          }`}
        >
          <Monitor className="w-4 h-4 text-primary" />
          System Match
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
