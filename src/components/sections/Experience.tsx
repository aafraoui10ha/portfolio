"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionMarker } from "@/components/ui/SectionMarker";

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];
  const scopeRef = useScrollReveal<HTMLDivElement>();

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

        <ul className="mt-16 flex flex-col">
          {items.map((item) => (
            <li
              key={item.period}
              className="reveal group grid grid-cols-1 gap-4 border-t border-border py-10 last:border-b md:grid-cols-[1fr_2fr] md:gap-10"
            >
              <span className="font-display text-2xl text-muted transition-colors duration-300 group-hover:text-foreground md:text-4xl">
                {item.period}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-medium md:text-2xl">
                    {item.role}
                  </h3>
                  <span className="text-sm text-muted">— {item.company}</span>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-accent group-hover:text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
