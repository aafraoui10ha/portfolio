"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portraitConfig } from "@/lib/content";
import { PortraitGrid, type PortraitGridHandle } from "./PortraitGrid";
import { HeroText } from "./HeroText";
import { ScrollIndicator } from "./ScrollIndicator";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function Hero() {
  const tAbout = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<PortraitGridHandle>(null);
  const aboutPreviewRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (reducedMotion) {
        gsap.set(aboutPreviewRef.current, { opacity: 1 });
        return;
      }

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.4,
        onUpdate: (self) => {
          gridRef.current?.render(self.progress);

          const heroFade = 1 - clamp01(self.progress / 0.5);
          gsap.set(heroTextRef.current, {
            opacity: heroFade,
            yPercent: -20 * (1 - heroFade),
          });

          const aboutReveal = clamp01((self.progress - 0.45) / 0.45);
          gsap.set(aboutPreviewRef.current, {
            opacity: aboutReveal,
            yPercent: 15 * (1 - aboutReveal),
          });
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden"
    >
      <div className="absolute inset-0">
        {reducedMotion ? (
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={portraitConfig.srcDesktop}
            />
            <img
              src={portraitConfig.srcMobile}
              alt={portraitConfig.alt}
              className="h-full w-full object-cover opacity-80"
            />
          </picture>
        ) : (
          <PortraitGrid ref={gridRef} className="h-full w-full" />
        )}
      </div>

      {/*
        The portrait is deliberately dark/moody art regardless of site theme,
        so the hero name/tagline (HeroText) stay fixed-light rather than
        theme-reactive — this scrim guarantees contrast for that. It's
        strongest at the top/bottom (where that text sits) and lightest in
        the middle, which is why the "about" reveal text below can safely
        use the theme-reactive foreground color instead.
      */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

      <div
        ref={aboutPreviewRef}
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center opacity-0"
      >
        <span className="px-4 text-center font-display text-[16vw] font-semibold uppercase leading-none tracking-tighter text-foreground sm:text-[14vw] md:text-[12vw]">
          {tAbout("heading")}
        </span>
      </div>

      <div
        ref={heroTextRef}
        className="relative z-10 flex h-full flex-col justify-between px-6 py-28 md:px-10 md:py-32"
      >
        <HeroText />
      </div>

      <ScrollIndicator />
    </section>
  );
}
