"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { useMagnetic } from "@/hooks/useMagnetic";
import { siteConfig, socialLinks } from "@/lib/content";

export function Contact() {
  const t = useTranslations("contact");
  const headingLines = t.raw("headingLines") as string[];
  const scopeRef = useScrollReveal<HTMLDivElement>();
  const startRef = useMagnetic<HTMLAnchorElement>(0.25);
  const emailRef = useMagnetic<HTMLAnchorElement>(0.25);
  const whatsappRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section
      id="contact"
      ref={scopeRef}
      className="border-t border-border px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <SectionMarker label={t("marker")} />

        <h2 className="reveal mt-8 font-display text-[11vw] font-semibold uppercase leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">
          {headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="reveal mt-8 max-w-md text-base text-muted md:text-lg">
          {t("lead")}
        </p>

        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-6 md:justify-start">
          <a
            ref={startRef}
            href={`mailto:${siteConfig.email}`}
            data-cursor="true"
            data-cursor-label="Open"
            className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-wider text-background transition-colors duration-300 hover:bg-accent"
          >
            {t("startProject")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            ref={emailRef}
            href={`mailto:${siteConfig.email}`}
            data-cursor="true"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted transition-colors duration-300 hover:text-foreground"
          >
            {t("emailMe")}
          </a>
          <a
            ref={whatsappRef}
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="true"
            data-cursor-label="Open"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted transition-colors duration-300 hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
        </div>

        <ul className="reveal mt-20 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t md:justify-start border-border pt-8">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="true"
                className="text-sm uppercase tracking-wider text-muted transition-colors duration-300 hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
