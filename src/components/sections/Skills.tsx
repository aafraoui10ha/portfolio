"use client";

import { useTranslations } from "next-intl";
import { skillsList } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Skills() {
  const t = useTranslations("skills");
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      ref={scopeRef}
      className="border-t border-border px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <span className="reveal text-xs uppercase tracking-[0.3em] text-muted">
          {t("marker")}
        </span>
        <h2 className="reveal mt-3 font-display text-2xl font-medium md:text-3xl">
          {t("heading")}
        </h2>

        <ul className="reveal mt-10 flex flex-wrap gap-x-4 gap-y-4 md:gap-x-6">
          {skillsList.map((skill) => (
            <li key={skill}>
              <span
                data-cursor="true"
                className="inline-block cursor-default font-display text-3xl font-medium uppercase text-muted transition-all duration-300 hover:scale-110 hover:text-foreground md:text-5xl"
              >
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
