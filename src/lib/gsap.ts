"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered at module load (not inside a component effect) so plugins are
// always available before any component's effects run — effect order across
// a provider tree isn't guaranteed to put this first otherwise.
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger };
