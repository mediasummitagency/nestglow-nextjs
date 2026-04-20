import type { MetadataRoute } from "next";
import { towns } from "@/lib/towns";
import { BASE_URL } from "@/lib/config";

const D = (iso: string) => new Date(iso);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: D("2026-04-16"), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/book`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/reviews`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/services`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/residential-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/commercial-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/deep-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/move-in-move-out`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/general-vs-deep-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services/monmouth-county`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services/ocean-county`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cleaning-services/middlesex-county`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified: D("2026-04-16"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/guides/how-much-does-house-cleaning-cost-nj`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/what-to-expect-move-out-cleaning`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides/how-to-prepare-home-for-cleaner`, lastModified: D("2026-04-16"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: D("2026-04-16"), changeFrequency: "yearly", priority: 0.2 },
    ...towns.map((town) => ({
      url: `${BASE_URL}/cleaning-services/${town.slug}`,
      lastModified: D("2026-04-16"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
