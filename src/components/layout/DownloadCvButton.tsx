"use client";

import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

interface DownloadCvButtonProps {
  /** True when rendered transparently over the hero portrait — see
   * ThemeToggle's overHero doc for why this needs fixed-light styling. */
  overHero?: boolean;
  /** Full-width filled style for the mobile menu panel instead of the
   * compact outline pill used in the desktop nav. */
  variant?: "pill" | "block";
  className?: string;
}

export function DownloadCvButton({
  overHero = false,
  variant = "pill",
  className,
}: DownloadCvButtonProps) {
  const t = useTranslations("nav");

  return (
    <a
      href={siteConfig.cvHref}
      download
      data-cursor="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-medium uppercase tracking-wider transition-colors duration-300",
        variant === "pill"
          ? cn(
              "h-9 border px-4",
              overHero
                ? "border-white/40 text-white hover:border-white"
                : "border-border text-foreground hover:border-accent"
            )
          : "h-12 w-full bg-accent text-base normal-case tracking-normal text-white hover:bg-accent/90",
        className
      )}
    >
      <Download className="h-4 w-4" aria-hidden />
      {t("downloadCv")}
    </a>
  );
}
