"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered at module load (not inside a component effect) so plugins are
// always available before any component's effects run — effect order across
// a provider tree isn't guaranteed to put this first otherwise.
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Mobile browsers resize the viewport as the address bar shows/hides while
// scrolling, which would otherwise trigger a ScrollTrigger refresh mid-pin
// and throw off scrub progress.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
