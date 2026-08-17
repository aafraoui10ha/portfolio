"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/**
 * <html> lives in the true root layout (app/layout.tsx), which sits above
 * the [locale] segment and therefore doesn't receive the locale param —
 * so `lang` can't be set there directly. This syncs it imperatively from
 * the locale layout instead, without re-rendering <html> itself (which
 * would risk the same remount issues ThemeScript had to move to avoid).
 */
export function HtmlLangSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
