"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * Scopes a container and fades/slides in any descendant with the
 * `.reveal` class as it enters the viewport.
 */
export function useScrollReveal<T extends HTMLElement>(selector = ".reveal") {
  const scopeRef = useRef<T | null>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(
        selector,
        scopeRef.current ?? undefined
      );

      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: scopeRef }
  );

  return scopeRef;
}
