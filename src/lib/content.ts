/**
 * Non-translated, structural content. Swap these values without touching
 * any component or animation logic.
 */

export const portraitConfig = {
  srcMobile: "/images/portrait/hero.png",
  srcDesktop: "/images/portrait/heroweb.png",
  // Transparent cutout used by the hero.
  srcCutout: "/images/portrait/hatimaafraoui.png",
  // Monogram mark used as the nav logo (white shape on a transparent
  // background, recolored via CSS mask + currentColor).
  logo: "/images/portrait/logo1.png",
  alt: "Aafraoui Hatim",
  // Below the md breakpoint (768px) srcMobile loads; at or above it,
  // srcDesktop loads. Swap either file in place — nothing else changes.
};

export const siteConfig = {
  name: "Aafraoui Hatim",
  email: "aafraouihatim85@gmail.com",
  whatsappNumber: "0620307291", // Morocco, local format
  whatsappHref: "https://wa.me/212620307291",
  url: "https://aafraouihatim.dev", // TODO: replace with the real production domain
  cvHref: "/cv/aafraoui-hatim-cv.pdf",
  year: new Date().getFullYear(),
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/aafraoui10ha" }, // TODO: replace with real profile
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hatim-aafraoui" }, // TODO: replace with real profile
  { label: "Instagram", href: "https://www.instagram.com/aafraoui_hatim/" }, // TODO: replace with real profile
];

export const skillsList = [
  "Next.js",
  "React",
  "Laravel",
  "PHP",
  "TypeScript",
  "JavaScript",
  "Flutter",
  "MySQL",
  "Prisma",
  "WordPress",
  "GSAP",
  "n8n",
  "SEO",
  "DART",
  "TailwindCSS",
  "Bootstrap",
  "react js",
  "Node js",
  "vue js",
  "java",
  "python",
  "C++",
];
