"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { Link } from "@/i18n/navigation";
import { getAllProjects, getProjectSlug } from "@/lib/projects";

const allProjects = getAllProjects();

interface ProjectsProps {
  /** Max number of projects to show; shows a "view all" link when set. */
  limit?: number;
  /** "page" renders the standalone /work page header (h1) instead of the home section. */
  variant?: "home" | "page";
}

export function Projects({ limit, variant = "home" }: ProjectsProps) {
  const t = useTranslations("projects");
  const isPage = variant === "page";
  const projects = limit ? allProjects.slice(0, limit) : allProjects;
  const hasMore = projects.length < allProjects.length;
  const scopeRef = useScrollReveal<HTMLDivElement>();
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(
        ".project-image",
        scopeRef.current ?? undefined
      );
      rows.forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.15, clipPath: "inset(8% round 4px)" },
          {
            scale: 1,
            clipPath: "inset(0% round 4px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      });

      if (!window.matchMedia("(pointer: fine)").matches || !previewRef.current) {
        return;
      }

      const xTo = gsap.quickTo(previewRef.current, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(previewRef.current, "y", {
        duration: 0.5,
        ease: "power3.out",
      });

      function onMove(e: MouseEvent) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: scopeRef }
  );

  useGSAP(
    () => {
      if (!previewRef.current) return;
      gsap.to(previewRef.current, {
        opacity: hovered ? 1 : 0,
        scale: hovered ? 1 : 0.85,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { dependencies: [hovered] }
  );

  const hoveredProject = projects.find((p) => getProjectSlug(p) === hovered);

  return (
    <section
      id={isPage ? undefined : "work"}
      ref={scopeRef}
      className={
        isPage
          ? "relative px-6 pb-28 pt-36 md:px-10 md:pb-40 md:pt-48"
          : "relative border-t border-border px-6 py-28 md:px-10 md:py-40"
      }
    >
      <div className="mx-auto max-w-6xl">
        {isPage ? (
          <>
            <SectionMarker label={t("allMarker")} />
            <h1 className="reveal mt-6 font-display text-4xl font-medium md:text-6xl">
              {t("allHeading")}
            </h1>
            <p className="reveal mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              {t("allLead", { count: allProjects.length })}
            </p>
          </>
        ) : (
          <>
            <SectionMarker label={t("marker")} />
            <h2 className="reveal mt-6 font-display text-3xl font-medium md:text-5xl">
              {t("heading")}
            </h2>
          </>
        )}

        <ul className="mt-16 flex flex-col">
          {projects.map((project, i) => {
            const slug = getProjectSlug(project);
            const reversed = i % 2 === 1;

            return (
              <li
                key={project.id}
                className="reveal group grid grid-cols-1 gap-8 border-t border-border py-14 last:border-b md:grid-cols-2 md:items-center md:gap-16"
                onMouseEnter={() => setHovered(slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={`/work/${slug}`}
                  data-cursor="true"
                  data-cursor-label={t("viewLabel")}
                  className={reversed ? "md:order-2" : ""}
                >
                  <div className="project-image relative aspect-[4/3] w-full overflow-hidden rounded-md bg-surface">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div>
                  <span className="font-display text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link href={`/work/${slug}`}>
                    <h3 className="mt-2 font-display text-3xl font-medium tracking-tight transition-colors duration-300 hover:text-accent md:text-5xl">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm uppercase tracking-wider text-muted">
                    {project.category} — {project.year}
                  </p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
                    {project.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-6">
                    <Link
                      href={`/work/${slug}`}
                      data-cursor="true"
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:text-accent"
                    >
                      {t("viewLabel")}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="true"
                      className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted transition-colors duration-300 hover:text-foreground"
                    >
                      {t("visitLabel")}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {hasMore && (
          <div className="reveal mt-16 flex justify-center">
            <Link
              href="/work"
              data-cursor="true"
              className="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 text-sm font-medium uppercase tracking-wider transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t("viewAllLabel", { count: allProjects.length })}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        )}
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden -ml-[140px] -mt-[100px] h-[200px] w-[280px] overflow-hidden rounded-lg opacity-0 md:block"
      >
        {hoveredProject && (
          <Image
            src={hoveredProject.image}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}
