import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

// Legal pages are deliberately absent: they render noindex, and listing a
// noindexed URL here just produces "Submitted URL marked noindex" errors in
// Search Console. Town and county pages are parked for phase 2 — see
// projects/summit-media/clients/nestglow/website/parked-for-phase-2/.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-22");
  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
