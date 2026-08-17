"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionMarker } from "@/components/ui/SectionMarker";

interface ServiceItem {
  index: string;
  title: string;
  description: string;
}

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="services"
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
              key={item.index}
              className="reveal group grid grid-cols-1 items-center gap-4 border-t border-border py-8 last:border-b md:grid-cols-[80px_1fr_auto] md:gap-8"
            >
              <span className="font-display text-sm text-muted">
                {item.index}
              </span>
              <div>
                <h3 className="font-display text-2xl font-medium transition-transform duration-300 group-hover:translate-x-3 md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>
              <ArrowUpRight
                className="hidden h-6 w-6 -translate-x-2 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100 md:block"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
