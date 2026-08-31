import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/* required by output: "export" — emit this as a static file at build */
export const dynamic = "force-static";

/**
 * The AI crawlers, named explicitly.
 *
 * `User-agent: *` already allows all of these, so this block changes no
 * behaviour today. It is here to state the intent: being quoted by an
 * assistant is the point, not a leak to be plugged, and a future tightening
 * of the wildcard rule must not silently take the answer engines with it.
 *
 * Google-Extended is the separate opt-out token for Gemini grounding — it does
 * NOT affect Googlebot or normal search indexing. OAI-SearchBot serves
 * ChatGPT's search citations and is distinct from GPTBot, which is training.
 */
const ANSWER_ENGINES = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ANSWER_ENGINES, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
