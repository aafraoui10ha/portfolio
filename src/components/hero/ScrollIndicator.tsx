"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function ScrollIndicator() {
  const t = useTranslations("hero");
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.to(lineRef.current, {
      scaleY: 0.3,
      transformOrigin: "top",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 2,
    });
  });

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
        {t("scrollHint")}
      </span>
      <span ref={lineRef} className="h-10 w-px bg-white/40" aria-hidden />
    </div>
  );
}
