import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 refuses any `quality` not listed here and falls back to the
     * default, so the three `quality={85}` images (both heroes and the
     * signature-process shot) were silently being served at 75 while logging a
     * warning on every render. Listing 85 makes the value they ask for real.
     */
    qualities: [75, 85],
  },

  /**
   * Dev only — lets a phone on the LAN load /_next/webpack-hmr, which Next
   * blocks by default for any origin that is not localhost. Without it a device
   * testing against `next dev` never receives hot updates and can sit on a
   * stale page indefinitely, which is exactly how a fixed bug looks unfixed.
   * Has no effect on a production build.
   */
  allowedDevOrigins: ["10.0.0.144"],
};

export default nextConfig;
