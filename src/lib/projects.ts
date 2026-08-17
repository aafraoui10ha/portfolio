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
