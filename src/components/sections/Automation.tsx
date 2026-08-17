"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionMarker } from "@/components/ui/SectionMarker";

export function Automation() {
  const t = useTranslations("automation");
  const nodes = t.raw("nodes") as string[];
  const scopeRef = useScrollReveal<HTMLDivElement>();
  const nodesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".automation-node",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: nodesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: nodesRef }
  );

  return (
    <section
      ref={scopeRef}
      className="border-t border-border px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <SectionMarker label={t("marker")} />
        <h2 className="reveal mt-6 font-display text-3xl font-medium md:text-5xl">
          {t("heading")}
        </h2>
        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {t("lead")}
        </p>

        <div
          ref={nodesRef}
          className="mt-16 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0"
        >
          {nodes.map((node, i) => (
            <div key={node} className="flex items-center gap-3 md:flex-1">
              <div
                data-cursor="true"
                className="automation-node flex h-16 flex-1 items-center justify-center rounded-full border border-border px-4 text-center text-xs font-medium uppercase tracking-wider transition-colors duration-300 hover:border-accent hover:text-accent md:h-20 md:text-sm"
              >
                {node}
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 text-muted md:block"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
