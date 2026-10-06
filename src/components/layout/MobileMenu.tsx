"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { portraitConfig, siteConfig } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DownloadCvButton } from "./DownloadCvButton";

interface NavItem {
  key: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
  items: readonly NavItem[];
}

export function MobileMenu({ open, onClose, onNavigate, items }: MobileMenuProps) {
  const t = useTranslations("nav");
  const lenisRef = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      if (open) {
        lenisRef?.current?.stop();
        document.body.style.overflow = "hidden";
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(
          panel,
          { clipPath: "circle(0% at 100% 0%)" },
          {
            clipPath: "circle(150% at 100% 0%)",
            duration: 0.7,
            ease: "power4.inOut",
          }
        );
        gsap.fromTo(
          listRef.current?.children ?? [],
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      } else {
        lenisRef?.current?.start();
        document.body.style.overflow = "";
        gsap.to(panel, {
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    },
    { dependencies: [open], scope: panelRef }
  );

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[90] flex-col justify-between bg-background px-6 py-6 md:hidden"
      style={{ display: "none", clipPath: "circle(0% at 100% 0%)" }}
    >
      <div className="flex items-center justify-between">
        <span
          aria-label={siteConfig.name}
          className="block h-7 w-7 bg-current text-foreground [mask-image:var(--logo-mask)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-image:var(--logo-mask)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          style={
            {
              "--logo-mask": `url('${portraitConfig.logo}')`,
            } as CSSProperties
          }
        />
        <button type="button" onClick={onClose} aria-label={t("close")}>
          <X className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <ul ref={listRef} className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.key} className="overflow-hidden">
            <a
              href={item.href}
              onClick={(e) => onNavigate(e, item.href)}
              className="inline-block font-display text-4xl font-medium uppercase tracking-tight"
            >
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-6">
        <DownloadCvButton variant="block" />
        <div className="flex items-center justify-between">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
