"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portraitConfig, siteConfig } from "@/lib/content";

const STORAGE_KEY = "cta-popup-seen";
const DELAY_MS = 60_000;
const EASE = [0.22, 1, 0.36, 1] as const;

function hasSeenPopup() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markPopupSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Storage unavailable (private mode etc.) — the popup may show again.
  }
}

/**
 * One-time call-to-action popup. Opens once, 60s after the visitor lands,
 * and never again on that browser.
 */
export function CtaPopup() {
  const t = useTranslations("ctaPopup");
  const lenisRef = useLenis();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasSeenPopup()) return;
    const timer = window.setTimeout(() => {
      markPopupSeen();
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Pause smooth scrolling, wire Escape and focus the close button while open.
  useEffect(() => {
    if (!open) return;
    const lenis = lenisRef?.current;
    lenis?.stop();
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, close, lenisRef]);

  const dur = (s: number) => (reducedMotion ? 0 : s);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cta-popup"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur(0.4), ease: EASE }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cta-popup-title"
            className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-background text-foreground shadow-2xl md:grid-cols-[1fr_1.1fr]"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: dur(0.7), ease: EASE }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t("close")}
              data-cursor="true"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-muted backdrop-blur transition-colors duration-300 hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* Portrait — same cutout + circle treatment as the hero */}
            <div className="relative flex h-56 items-end justify-center overflow-hidden bg-surface md:h-auto md:min-h-[420px]">
              <motion.div
                className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900/15 md:h-72 md:w-72"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: dur(0.9), ease: EASE, delay: dur(0.2) }}
              />
              <motion.div
                className="relative z-10 h-full w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur(1), ease: EASE, delay: dur(0.3) }}
              >
                <Image
                  src={portraitConfig.srcCutout}
                  alt={portraitConfig.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-contain object-bottom"
                />
              </motion.div>
            </div>

            {/* Copy + actions */}
            <motion.div
              className="flex flex-col justify-center p-6 text-center md:p-10 md:text-left"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: dur(0.08),
                    delayChildren: dur(0.35),
                  },
                },
              }}
            >
              {[
                <span
                  key="eyebrow"
                  className="inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider text-muted md:justify-start"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {t("eyebrow")}
                </span>,
                <h2
                  key="title"
                  id="cta-popup-title"
                  className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl"
                >
                  {t("title")}
                </h2>,
                <p
                  key="lead"
                  className="mt-4 text-sm leading-relaxed text-muted md:text-base"
                >
                  {t("lead")}
                </p>,
                <div key="actions" className="mt-8 flex w-full flex-col gap-3 md:flex-row">
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    data-cursor="true"
                    className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-medium md:px-4 md:py-2.5 md:text-xs uppercase tracking-wider text-white transition-opacity duration-300 hover:opacity-90"
                  >
                    {t("whatsapp")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    onClick={close}
                    data-cursor="true"
                    className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-6 py-3 text-sm font-medium md:px-4 md:py-2.5 md:text-xs uppercase tracking-wider transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {t("email")}
                  </a>
                </div>,
               
              ].map((child) => (
                <motion.div
                  key={child.key}
                  className="flex flex-col items-center md:items-stretch"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: dur(0.6), ease: EASE },
                    },
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
