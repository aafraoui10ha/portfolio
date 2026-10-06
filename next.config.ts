import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Dev only: lets phones on the local network load the dev server's JS
  // (e.g. http://192.168.x.x:3000). Without it the page never hydrates and
  // stays stuck on the preloader. Has no effect on production builds.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
