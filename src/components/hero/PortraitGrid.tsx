"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { portraitConfig } from "@/lib/content";

export interface PortraitGridHandle {
  render: (progress: number) => void;
}

interface Tile {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  delay: number;
  duration: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  scaleTo: number;
}

/** Deterministic PRNG so tile properties are stable across re-renders/resizes. */
function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t: number) {
  return t * t * t;
}
function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export const PortraitGrid = forwardRef<
  PortraitGridHandle,
  { className?: string }
>(function PortraitGrid({ className }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesRef = useRef<Tile[]>([]);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const readyRef = useRef(false);
  const lastProgressRef = useRef(0);
  const drawRef = useRef<(progress: number) => void>(() => {});
  const breakpointRef = useRef<"mobile" | "desktop" | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function buildGrid() {
      const img = imgRef.current;
      if (!img || !img.naturalWidth) return;

      const isMobile = window.innerWidth < 768;
      const cols = isMobile ? 14 : 26;
      const rows = isMobile ? 18 : 34;
      const rng = mulberry32(42);
      const sw = img.naturalWidth / cols;
      const sh = img.naturalHeight / rows;
      const tiles: Tile[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = r / (rows - 1);
          tiles.push({
            sx: c * sw,
            sy: r * sh,
            sw,
            sh,
            delay: rng() * 0.5,
            duration: 0.35 + rng() * 0.35,
            offsetX: (rng() - 0.5) * 2,
            offsetY: 0.3 + rng() * 0.9 + v * 0.4,
            rotation: (rng() - 0.5) * 100,
            scaleTo: 0.35 + rng() * 0.5,
          });
        }
      }
      tilesRef.current = tiles;
    }

    function draw(progress: number) {
      const img = imgRef.current;
      const { width, height, dpr } = sizeRef.current;
      if (!canvas || !img || !width || !height) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = width / height;
      let renderW: number;
      let renderH: number;
      let baseOffsetX: number;
      let baseOffsetY: number;

      if (imgRatio > boxRatio) {
        renderH = height;
        renderW = height * imgRatio;
        baseOffsetX = (width - renderW) / 2;
        baseOffsetY = 0;
      } else {
        renderW = width;
        renderH = width / imgRatio;
        baseOffsetX = 0;
        baseOffsetY = (height - renderH) / 2;
      }

      const scaleX = renderW / img.naturalWidth;
      const scaleY = renderH / img.naturalHeight;
      const spread = Math.max(width, height) * 0.55;

      for (const tile of tilesRef.current) {
        const dw = tile.sw * scaleX;
        const dh = tile.sh * scaleY;
        const dx = baseOffsetX + tile.sx * scaleX;
        const dy = baseOffsetY + tile.sy * scaleY;

        const lp = clamp01((progress - tile.delay) / tile.duration);
        const moveT = easeOutCubic(lp);
        const fadeT = easeInCubic(lp);
        const alpha = 1 - fadeT;
        if (alpha <= 0.01) continue;

        const cx = dx + dw / 2 + tile.offsetX * spread * moveT;
        const cy = dy + dh / 2 + tile.offsetY * spread * moveT;
        const scale = lerp(1, tile.scaleTo, moveT);
        const rotation = (tile.rotation * moveT * Math.PI) / 180;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.drawImage(img, tile.sx, tile.sy, tile.sw, tile.sh, -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      }
    }
    drawRef.current = draw;

    function loadImage(breakpoint: "mobile" | "desktop") {
      const src =
        breakpoint === "mobile"
          ? portraitConfig.srcMobile
          : portraitConfig.srcDesktop;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        imgRef.current = img;
        readyRef.current = true;
        buildGrid();
        draw(lastProgressRef.current);
      };
    }

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      sizeRef.current = { width: rect.width, height: rect.height, dpr };

      const breakpoint = window.innerWidth < 768 ? "mobile" : "desktop";
      if (breakpointRef.current !== breakpoint) {
        breakpointRef.current = breakpoint;
        readyRef.current = false;
        loadImage(breakpoint);
        return;
      }

      if (readyRef.current) {
        buildGrid();
        draw(lastProgressRef.current);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useImperativeHandle(ref, () => ({
    render(progress: number) {
      lastProgressRef.current = progress;
      if (readyRef.current) drawRef.current(progress);
    },
  }));

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});
