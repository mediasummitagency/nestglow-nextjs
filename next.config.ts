import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * A verification `next build` rewrites this directory — which is the same one
   * `next dev` is serving from, so the running dev server sees its output wiped
   * and exits cleanly (code 0, no error). That killed Lucas's review server
   * twice on 2026-08-23 and looked like the site going down.
   *
   * Setting NEXT_DIST_DIR sends a build somewhere else and leaves the dev
   * server alone:
   *
   *   NEXT_DIST_DIR=.next-verify npx next build
   *
   * Unset, it is the normal `.next`, so deploys and `next build` in CI are
   * unaffected.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

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
