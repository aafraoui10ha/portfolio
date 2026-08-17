import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  getAdjacentProjects,
  getAllProjects,
  getProjectBySlug,
  getProjectSlug,
} from "@/lib/projects";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const projects = getAllProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: getProjectSlug(project) }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: {
      languages: {
        fr: `/fr/work/${slug}`,
        en: `/en/work/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      locale,
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(slug);

  return <ProjectDetail project={project} previous={previous} next={next} />;
}
