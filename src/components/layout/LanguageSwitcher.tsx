"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** True when rendered transparently over the hero portrait — see
   * ThemeToggle's overHero doc for why this needs fixed-light styling. */
  overHero?: boolean;
}

export function LanguageSwitcher({ overHero = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  function switchTo(next: "fr" | "en") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const activeClass = overHero ? "text-white" : "text-foreground";
  const inactiveClass = overHero
    ? "text-white/50 hover:text-white"
    : "text-muted hover:text-foreground";

  return (
    <div
      className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
      aria-label={t("toggle")}
    >
      <button
        type="button"
        onClick={() => switchTo("fr")}
        data-cursor="true"
        aria-current={locale === "fr"}
        className={cn(
          "transition-colors duration-300",
          locale === "fr" ? activeClass : inactiveClass
        )}
      >
        FR
      </button>
      <span className={overHero ? "text-white/30" : "text-border"}>/</span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        data-cursor="true"
        aria-current={locale === "en"}
        className={cn(
          "transition-colors duration-300",
          locale === "en" ? activeClass : inactiveClass
        )}
      >
        EN
      </button>
    </div>
  );
}
