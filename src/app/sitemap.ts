import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { allPosts } from "@/lib/posts";

/* required by output: "export" — emit this as a static file at build */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts();

  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/blog`,
      /* The index is only as fresh as its newest post. */
      lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${site.url}/tools/schema`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
