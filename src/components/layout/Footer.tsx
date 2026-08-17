"use client";

import { useTranslations } from "next-intl";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useMagnetic } from "@/hooks/useMagnetic";
import { siteConfig, socialLinks } from "@/lib/content";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  const t = useTranslations("footer");
  const lenisRef = useLenis();
  const topRef = useMagnetic<HTMLButtonElement>(0.3);

  function scrollTop() {
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-border px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-tight">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-sm text-muted">{t("role")}</p>
            <p className="mt-1 text-sm text-muted">{t("location")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-muted">
              {t("socialLabel")}
            </span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="true"
                    data-cursor-label="Open"
                    className="text-sm text-foreground transition-colors duration-300 hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            ref={topRef}
            type="button"
            onClick={scrollTop}
            data-cursor="true"
            className="flex h-12 w-12 items-center justify-center self-start rounded-full border border-border transition-colors duration-300 hover:border-accent md:self-auto"
            aria-label={t("backToTop")}
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-wider text-muted md:flex-row md:items-center">
          <span>
            © {siteConfig.year} {siteConfig.name} — {t("rights")}
          </span>
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
