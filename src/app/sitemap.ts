import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/* required by output: "export" — emit this as a static file at build */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
