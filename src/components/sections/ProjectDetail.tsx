"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import { useMagnetic } from "@/hooks/useMagnetic";
import { getProjectSlug, type Project } from "@/lib/projects";

interface ProjectDetailProps {
  project: Project;
  previous: Project | null;
  next: Project | null;
}

export function ProjectDetail({ project, previous, next }: ProjectDetailProps) {
  const t = useTranslations("projects");
  const containerRef = useRef<HTMLDivElement>(null);
  const visitRef = useMagnetic<HTMLAnchorElement>(0.25);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".detail-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
        .from(".detail-title", { opacity: 0, y: 24, duration: 0.7 }, "-=0.3")
        .from(
          ".detail-meta > *",
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        )
        .from(".detail-image", { opacity: 0, scale: 1.04, duration: 0.9 }, "-=0.3")
        .from(
          ".detail-body > *",
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <article
      ref={containerRef}
      className="px-6 pb-28 pt-32 md:px-10 md:pb-40 md:pt-40"
    >
      <div className="mx-auto max-w-5xl">
        <Link
          href={{ pathname: "/", hash: "work" }}
          data-cursor="true"
          className="detail-eyebrow inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted transition-colors duration-300 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          {t("backLabel")}
        </Link>

        <h1 className="detail-title mt-8 font-display text-4xl font-semibold tracking-tight md:text-7xl">
          {project.title}
        </h1>

        <div className="detail-meta mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 border-y border-border py-6 text-sm">
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted">
              {t("categoryLabel")}
            </span>
            <span className="mt-1 block font-medium">{project.category}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted">
              {t("yearLabel")}
            </span>
            <span className="mt-1 block font-medium">{project.year}</span>
          </div>
          <div className="min-w-0">
            <span className="block text-xs uppercase tracking-wider text-muted">
              {t("tagsLabel")}
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a
            ref={visitRef}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="true"
            data-cursor-label="Open"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-wider text-background transition-colors duration-300 hover:bg-accent md:ml-auto"
          >
            {t("visitLabel")}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <div className="detail-image relative mt-12 aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="detail-body mt-12 max-w-2xl">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {project.description}
          </p>
        </div>

        {(previous || next) && (
          <nav className="mt-24 grid grid-cols-1 gap-6 border-t border-border pt-10 md:grid-cols-2">
            {previous ? (
              <Link
                href={`/work/${getProjectSlug(previous)}`}
                data-cursor="true"
                className="group flex flex-col gap-2"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                  {t("previousLabel")}
                </span>
                <span className="font-display text-xl font-medium transition-transform duration-300 group-hover:-translate-x-1 md:text-2xl">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={`/work/${getProjectSlug(next)}`}
                data-cursor="true"
                className="group flex flex-col gap-2 md:items-end md:text-right"
              >
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                  {t("nextLabel")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="font-display text-xl font-medium transition-transform duration-300 group-hover:translate-x-1 md:text-2xl">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
