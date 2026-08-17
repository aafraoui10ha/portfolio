"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        setActive(true);
        setLabel(target.dataset.cursorLabel ?? null);
      }
    }

    function onOut(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        setActive(false);
        setLabel(null);
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  useEffect(() => {
    if (!ringRef.current) return;
    gsap.to(ringRef.current, {
      scale: active ? (label ? 2.8 : 1.8) : 1,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active, label]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-foreground/40 mix-blend-difference will-change-transform"
      >
        <span
          className="font-display text-[9px] font-medium uppercase tracking-[0.15em] text-foreground transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-accent will-change-transform"
      />
    </div>
  );
}
