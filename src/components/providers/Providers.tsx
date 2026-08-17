"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
