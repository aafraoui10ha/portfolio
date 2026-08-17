import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Full Stack Web & Mobile Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
  email: siteConfig.email,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // This root layout sits above the [locale] segment, so it doesn't
  // re-mount when the locale changes — unlike [locale]/layout.tsx, which
  // does. beforeInteractive <Script> tags (theme detection, JSON-LD) must
  // live here, not there: Next only allows that strategy for the very
  // first page load, and a remount re-inserts them via client-side
  // rendering instead, which React 19 warns about.
  //
  // Root layouts above a dynamic segment don't receive that segment's
  // params, so `lang` starts at the default locale and is corrected
  // client-side by HtmlLangSync (rendered from the locale layout, which
  // does know the locale) without re-rendering <html> itself.
  return (
    <html
      lang={routing.defaultLocale}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeScript />
        <Script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
