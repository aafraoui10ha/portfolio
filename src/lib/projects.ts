import { slugify } from "./utils";

export interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  featured?: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Anazeen E-commerce Platform",
    category: "E-commerce",
    type: "E-commerce",
    description:
      "A scalable online store with a user-friendly interface, secure payment processing, and personalized shopping experiences.",
    image: "/imgproject/anazeen.png",
    link: "https://www.anazeen.com",
    tags: ["woocommerce", "wordpress", "bootstrap"],
    featured: false,
    year: "2025",
  },
  {
    id: "project-2",
    title: "Ecouteurs Running E-commerce",
    category: "E-commerce",
    type: "website E-commerce",
    description:
      "A specialized online store for running enthusiasts, offering a curated selection of high-quality earphones and accessories for optimal performance.",
    image: "/imgproject/couteur.png",
    link: "https://www.ecouteurs-running.fr/",
    tags: ["wordpress", "aos", "GSAP"],
    featured: false,
    year: "2024",
  },
  {
    id: "project-3",
    title: "GYNÉCOLOGIE · OBSTÉTRIQUE · CHIRURGIE · SEXOLOGUE",
    category: "vitrine",
    type: "website vitrine",
    description:
      "A professional website for a gynecologist and obstetrician, providing information about services, patient resources, and appointment scheduling.",
    image: "/imgproject/drhajji.png",
    link: "https://drhajjigyneco.com/",
    tags: ["wordpress", "GSAP", "aos", "tailwind"],
    featured: false,
    year: "2026",
  },
  {
    id: "project-4",
    title: "France Immigration Conseil",
    category: "vitrine",
    type: "website vitrine",
    description:
      "A professional website for an immigration consulting firm, providing information about services, client testimonials, and appointment scheduling.",
    image: "/imgproject/franceimmigration.png",
    link: "https://franceimmigrationconseil.com/",
    tags: ["wordpress", "aos", "bootstrap"],
    year: "2024",
  },
  {
    id: "project-5",
    title: "glow-look E-commerce Platform",
    category: "E-commerce",
    type: "website E-commerce",
    description:
      "A modern online store for beauty and skincare products, featuring a sleek design, secure checkout, and personalized product recommendations.",
    image: "/imgproject/glow-look.png",
    link: "https://glow-look.com/",
    tags: ["wordpress", "e-commerce", "bootstrap", "aos"],
    year: "2025",
  },
  {
    id: "project-6",
    title: "E-Learning Platform",
    category: "Education",
    type: "Web App",
    description:
      "Interactive online education platform, quizzes, progress tracking.",
    image: "/imgproject/LearnEnglish&Arabic.jpg",
    link: "http://storylingo.nexoraat.com/",
    tags: ["laravel", "flutter", "react", "Tailwind", "mysql"],
    year: "2026",
  },
  {
    id: "project-7",
    title: "njoyit E-commerce Platform",
    category: "E-commerce",
    type: "website E-commerce",
    description:
      "A modern online store for food delivery services, featuring a user-friendly interface, secure payment processing, and real-time order tracking.",
    image: "/imgproject/njoyit.png",
    link: "https://njoyitcosmetics.com/",
    tags: ["wordpress", "woocommerce", "aos", "GSAP"],
    year: "2025",
  },
  {
    id: "project-8",
    title: "Riad & Spa for Restoration",
    category: "booking & restoration",
    type: "website booking & restoration",
    description:
      "A modern online platform for booking and managing reservations at a luxury riad and spa, featuring a user-friendly interface, secure payment processing, and real-time availability updates.",
    image: "/imgproject/riad.png",
    link: "https://www.riad-melhoun-marrakech.com/",
    tags: ["swiper", "Tailwind", "wordpress", "aos"],
    year: "2024",
  },
  {
    id: "project-9",
    title: "Agency Immobilier",
    category: "booking & restoration",
    type: "website booking & restoration",
    description:
      "A modern online platform for booking and managing reservations at a luxury riad and villa, featuring a user-friendly interface, secure payment processing, and real-time availability updates.",
    image: "/imgproject/SBHtravelling.png",
    link: "https://sbhtravelling.com/",
    tags: ["wordpress", "GSAP", "aos", "Tailwind"],
    year: "2026",
  },
   {
    id: "project-10",
    title: "Agency Photographe immobilier",
    category: "Photographe immobilier",
    type: "website Photographe immobilier",
    description:
      "Photographe immobilier à Marrakech : l'art de capturer des moments uniques et de créer des souvenirs inoubliables à travers l'objectif.",
    image: "/imgproject/marrakechphotovideo.png",
    link: "https://www.marrakechphotovideo.com/",
    tags: ["wordpress", "GSAP", "aos", "bootstrap"],
    year: "2024",
  },
  {
    id: "project-11",
    title: "Agency marketing digital",
    category: "Marketing Digital",
    type: "website Marketing Digital",
    description:
      "Agence de marketing digital à Marrakech : l'art de promouvoir les entreprises et de créer des campagnes efficaces.",
    image: "/imgproject/nexoraat.png",
    link: "https://www.nexoraat.com/",
    tags: ["next.js", "GSAP", "aos", "tailwindcss" , "i18n"],
    year: "2026",
  },
    {
    id: "project-12",
    title: "news portal mondial maroc 2030",
    category: "news",
    type: "website news",
    description:
      "Mondial Maroc 2030 : l'actualité en direct, les analyses et les opinions sur les événements mondiaux et locaux.",
    image: "/imgproject/mondial2030.png",
    link: "https://www.mondial-maroc-2030.com/",
    tags: ["next.js", "GSAP", "aos", "tailwindcss" , "i18n"],
    year: "2026",
  },
    {
    id: "project-13",
    title: "riad assala",
    category: "booking & restoration",
    type: "website booking & restoration",
    description:
      "Riad Assala : l'art de vivre à la marocaine, un lieu de détente et de confort pour les voyageurs en quête d'authenticité.",
    image: "/imgproject/riadassala.png",
    link: "https://www.riad-assala.com/",
    tags: ["next.js", "GSAP", "aos", "tailwindcss" , "i18n"],
    year: "2026",
  },
];

export function getProjectSlug(project: Project): string {
  return slugify(project.title);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => getProjectSlug(project) === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex(
    (project) => getProjectSlug(project) === slug
  );
  if (index === -1) return { previous: null, next: null };

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}
