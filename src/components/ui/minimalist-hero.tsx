"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ className?: string }>;

interface MinimalistHeroProps {
  /** Header is optional — omit both when the page already has a navbar. */
  logoText?: string;
  navLinks?: { label: string; href: string }[];
  /** Big text on the right, one entry per line. */
  headingLines: string[];
  /** Name (big, left) and location (bottom center). Tagline is currently unused. */
  details: { name: string; tagline: string; location: string };
  imageSrc: string;
  imageAlt: string;
  socialLinks: { icon: IconComponent; href: string; label: string }[];
  /** Seconds added to every intro animation (e.g. to wait for a preloader). */
  introDelay?: number;
  id?: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: IconComponent;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-foreground/60 transition-colors hover:text-foreground"
  >
    <Icon className="h-5 w-5" />
  </a>
);

const EASE = [0.22, 1, 0.36, 1] as const;

// Shared by the left heading and the right details so both read as one size.
const BIG_TEXT =
  "flex flex-col gap-3 text-center font-display text-4xl font-extrabold leading-[1] tracking-tight text-foreground sm:text-5xl md:text-left lg:text-6xl";

// Each line slides up out of its own mask, staggered.
const RevealLines = ({ lines, delay }: { lines: string[]; delay: number }) => (
  <>
    {lines.map((line, i) => (
      <span key={line} className="block overflow-hidden pb-1">
        <motion.span
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.08 }}
          className="inline-block"
        >
          {line}
        </motion.span>
      </span>
    ))}
  </>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  headingLines,
  details,
  imageSrc,
  imageAlt,
  socialLinks,
  introDelay = 0,
  id,
  className,
}: MinimalistHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const d = (s: number) => introDelay + s;

  // Scroll-linked exit: progress goes 0 → 1 as the hero scrolls out of view.
  // The spring smooths it so the motion trails the scroll softly.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const imageScale = useTransform(progress, [0, 1], [1, 0.75]);
  const imageY = useTransform(progress, [0, 1], ["0%", "-15%"]);
  const textY = useTransform(progress, [0, 1], ["0%", "-60%"]);
  const fade = useTransform(progress, [0, 0.7], [1, 0]);

  const imageScroll = reducedMotion ? undefined : { scale: imageScale, y: imageY };
  const textScroll = reducedMotion ? undefined : { y: textY, opacity: fade };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative flex min-h-[100svh] w-full flex-col items-center justify-between gap-10 overflow-hidden bg-background p-8 font-sans md:h-screen md:p-12",
        className
      )}
    >
      {/* Header */}
      {(logoText || navLinks) && (
        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          {logoText && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: d(0) }}
              className="text-xl font-bold tracking-wider"
            >
              {logoText}
            </motion.div>
          )}
          {navLinks && (
            <div className="hidden items-center space-x-8 md:flex">
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center justify-between gap-10 md:grid-cols-3 md:gap-0">
        {/* Left Text Content */}
        <motion.div style={textScroll} className="z-20 order-2 md:order-1 md:justify-self-start">
          <h1 className={BIG_TEXT}>
            {/* One word per line, e.g. "Aafraoui / Hatim". */}
            <RevealLines lines={details.name.split(" ")} delay={d(1)} />
          </h1>
        </motion.div>

        {/* Center Image with Circle */}
        <motion.div
          style={imageScroll}
          className="relative order-1 flex h-[60svh] items-center justify-center md:order-2 md:h-full"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: d(0.2) }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-gray-400/10 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          />
          {/* Transparent cutout, drawn larger than its column so the figure
              spills past the circle. */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d(0.4) }}
            className="relative z-10"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1254}
              height={1254}
              preload
              sizes="(min-width: 768px) 75vh, 60vh"
              className="h-[60svh] w-auto max-w-none object-contain md:h-[85vh]"
            />
          </motion.div>
        </motion.div>

        {/* Right Text */}
        <motion.div style={textScroll} className="z-20 order-3 md:justify-self-end">
          <p className={cn(BIG_TEXT, "md:text-right")}>
            <RevealLines lines={headingLines} delay={d(1.2)} />
          </p>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <motion.footer
  style={reducedMotion ? undefined : { opacity: fade }}
  className="z-30 flex w-full max-w-7xl items-center justify-center gap-8"
>
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: d(1.2) }}
    className="flex items-center space-x-4"
  >
    {socialLinks.map((link) => (
      <SocialIcon key={link.label} {...link} />
    ))}
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: d(1.3) }}
    className="flex items-center gap-2 text-sm font-medium text-foreground/80"
  >
    <span
      className="h-2 w-2 rounded-full bg-accent"
      aria-hidden
    />
    {details.location}
  </motion.div>
</motion.footer>
    </section>
  );
};
