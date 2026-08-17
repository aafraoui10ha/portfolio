"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const instance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    function onFrame(time: number) {
      instance.raf(time * 1000);
    }
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onFrame);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

/** Returns a ref — read `.current` at call time, since Lenis initializes after mount. */
export function useLenis() {
  return useContext(LenisContext);
}
