"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

const NAV_ITEMS = [
  { key: "home", href: "#top" },
  { key: "about", href: "#about" },
  { key: "work", href: "#work" },
  { key: "services", href: "#services" },
  { key: "contact", href: "#contact" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const lenisRef = useLenis();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useMagnetic<HTMLAnchorElement>(0.2);

  // The hero's portrait art is always dark, so the nav only needs to stay
  // fixed-light while it floats transparently over it — everywhere else
  // (other routes, or once scrolled past the hero) it follows the theme.
  const overHero = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    if (isHome) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(href, { duration: 1.2 });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${href}`);
    }
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            ref={logoRef}
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            data-cursor="true"
            className={cn(
              "font-display text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-500",
              overHero ? "text-white" : "text-foreground"
            )}
          >
            AH
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.slice(1).map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  data-cursor="true"
                  className={cn(
                    "text-xs font-medium uppercase tracking-wider transition-colors duration-300",
                    overHero
                      ? "text-white/70 hover:text-white"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher overHero={overHero} />
            <ThemeToggle overHero={overHero} />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-cursor="true"
            className="flex flex-col items-end gap-1.5 md:hidden"
            aria-label={t("menu")}
          >
            <span
              className={cn(
                "h-px w-6 transition-colors duration-500",
                overHero ? "bg-white" : "bg-foreground"
              )}
            />
            <span
              className={cn(
                "h-px w-4 transition-colors duration-500",
                overHero ? "bg-white" : "bg-foreground"
              )}
            />
          </button>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavClick}
        items={NAV_ITEMS}
      />
    </>
  );
}
