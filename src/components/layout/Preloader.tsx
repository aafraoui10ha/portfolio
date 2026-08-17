"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

// Module-level (not React state): survives the [locale] layout remounting
// on a language switch, so the intro only plays once per browser session
// rather than replaying every time the locale segment changes.
let hasPlayedThisSession = false;

export function Preloader() {
  const t = useTranslations("preloader");
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(hasPlayedThisSession);

  useGSAP(
    () => {
      if (hasPlayedThisSession) {
        setDone(true);
        return;
      }
      hasPlayedThisSession = true;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const counter = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => setDone(true),
      });

      if (reduceMotion) {
        tl.to({}, { duration: 0.15 });
        return;
      }

      tl.to(counter, {
        value: 100,
        duration: 1.2,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.round(counter.value)
            ).padStart(3, "0");
          }
        },
      }).to(
        containerRef.current,
        { yPercent: -100, duration: 0.6, ease: "power4.inOut" },
        "+=0.05"
      );
    },
    { scope: containerRef }
  );

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
      role="status"
      aria-label={t("label")}
    >
      <span className="font-display text-xs uppercase tracking-[0.3em] text-muted">
        01
      </span>
      <div className="mt-4 flex items-baseline gap-3">
        <span
          ref={counterRef}
          className="font-display text-6xl tabular-nums md:text-8xl"
        >
          000
        </span>
        <span className="text-sm uppercase tracking-widest text-muted">
          %
        </span>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
        {t("label")}
      </p>
    </div>
  );
}
