import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/content";
import { getAllProjects, getProjectSlug } from "@/lib/projects";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  const homeEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      projects.map((project) => ({
        url: `${baseUrl}/${locale}/work/${getProjectSlug(project)}`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      }))
  );

  return [...homeEntries, ...projectEntries];
}
