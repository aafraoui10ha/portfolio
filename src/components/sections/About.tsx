"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionMarker } from "@/components/ui/SectionMarker";

export function About() {
  const t = useTranslations("about");
  const areas = t.raw("areas") as string[];
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      ref={scopeRef}
      className="border-t border-border px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <SectionMarker label={t("marker")} />

        <p className="reveal mt-8 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
          {t("lead")}
        </p>

        <p className="reveal mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {t("paragraph")}
        </p>

        <div className="reveal mt-16">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {t("areasLabel")}
          </span>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
            {areas.map((area, i) => (
              <li
                key={area}
                className="group flex items-center gap-4 border-b border-border py-3"
              >
                <span className="font-display text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg transition-transform duration-300 group-hover:translate-x-2 md:text-xl">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="reveal mt-16 max-w-xl border-l-2 border-accent pl-6 text-sm italic text-muted md:text-base">
          {t("openTo")}
        </p>
      </div>
    </section>
  );
}
