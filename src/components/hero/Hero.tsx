"use client";

import { useTranslations } from "next-intl";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { portraitConfig, socialLinks } from "@/lib/content";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";

// lucide-react v1 dropped brand icons, so these are local SVGs.
const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <MinimalistHero
      id="hero"
      // The site Navbar is fixed on top, so the hero's own header is omitted
      // and the content is pushed down to clear it.
      className="pt-28 md:pt-28"
      introDelay={1.5}
      headingLines={t.raw("roleLines") as string[]}
      details={{
        name: t("name"),
        tagline: t("tagline"),
        location: t("location"),
      }}
      imageSrc={portraitConfig.srcCutout}
      imageAlt={portraitConfig.alt}
      socialLinks={socialLinks
        .filter((s) => icons[s.label])
        .map((s) => ({ ...s, icon: icons[s.label] }))}
    />
  );
}
