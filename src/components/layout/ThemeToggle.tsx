"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /** True when rendered transparently over the hero portrait, which is
   * always dark art regardless of site theme — needs fixed-light styling
   * instead of theme-reactive tokens for contrast. */
  overHero?: boolean;
}

export function ThemeToggle({ overHero = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("theme");
  const ref = useMagnetic<HTMLButtonElement>(0.3);

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
      aria-label={t("toggle")}
      aria-pressed={theme === "dark"}
      data-cursor="true"
      suppressHydrationWarning
      className={cn(
        "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
        overHero
          ? "border-white/40 text-white hover:border-white"
          : "border-border text-foreground hover:border-accent"
      )}
    >
      <Sun
        className="absolute h-4 w-4 transition-all duration-300"
        style={{
          opacity: theme === "dark" ? 0 : 1,
          transform: theme === "dark" ? "rotate(-90deg) scale(0)" : "rotate(0) scale(1)",
        }}
        suppressHydrationWarning
        aria-hidden
      />
      <Moon
        className="absolute h-4 w-4 transition-all duration-300"
        style={{
          opacity: theme === "dark" ? 1 : 0,
          transform: theme === "dark" ? "rotate(0) scale(1)" : "rotate(90deg) scale(0)",
        }}
        suppressHydrationWarning
        aria-hidden
      />
    </button>
  );
}
