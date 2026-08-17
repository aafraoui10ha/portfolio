"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function HeroText() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const roleLines = t.raw("roleLines") as string[];

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 1.6 })
        .from(".hero-eyebrow", { opacity: 0, y: 10, duration: 0.5 })
        .from(
          ".hero-role-line",
          { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.08 },
          "-=0.2"
        )
        .from(
          ".hero-meta > *",
          { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex h-full flex-col justify-between">
      <span className="hero-eyebrow font-display text-xs uppercase tracking-[0.3em] text-white/60">
        {t("eyebrow")}
      </span>

      <div>
        <h1 className="flex flex-col font-display text-[11vw] font-semibold uppercase leading-[0.92] tracking-tighter text-white sm:text-[9vw] md:text-[6.5vw]">
          {roleLines.map((line) => (
            <span key={line} className="overflow-hidden">
              <span className="hero-role-line inline-block">{line}</span>
            </span>
          ))}
        </h1>

        <div className="hero-meta mt-6 flex flex-col gap-1.5 md:flex-row md:items-center md:gap-6">
          <span className="text-sm uppercase tracking-wider text-white/70">
            {t("name")}
          </span>
          <span className="hidden h-px w-8 bg-white/30 md:block" aria-hidden />
          <span className="text-sm uppercase tracking-wider text-white/70">
            {t("tagline")}
          </span>
          <span className="hidden h-px w-8 bg-white/30 md:block" aria-hidden />
          <span className="text-sm uppercase tracking-wider text-white/70">
            {t("location")}
          </span>
        </div>
      </div>
    </div>
  );
}
