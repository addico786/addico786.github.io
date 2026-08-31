import { site } from "@/data/site";
import { allPosts } from "@/lib/posts";

/* required by output: "export" — emit this as a static file at build */
export const dynamic = "force-static";

/**
 * llms.txt — a map of the site for language models.
 *
 * Worth being straight about the value here: Ahrefs found 97% of llms.txt
 * files drew zero traffic in May 2026, and no major assistant documents it as
 * a citation signal. It is included because it costs nothing and is generated
 * rather than maintained — not because it is expected to do much. The work
 * that actually moves AI visibility is the entity graph in `layout.tsx` and
 * the FAQ answers on the home page.
 */
export function GET() {
  const posts = allPosts();

  const body = `# ${site.name} — ${site.tagline}

> ${site.about.lead} Based in Delhi, India, working remotely across India and abroad. Available for freelance work.

## Services

${site.services.map((s) => `- **${s.title}**: ${s.line}`).join("\n")}

## Free tools

- [Local business schema generator](${site.url}/tools/schema): Generate valid LocalBusiness JSON-LD, including the service-area case most generators get wrong. Runs in the browser, nothing uploaded.

## Writing

${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`).join("\n")}

## Selected work

${site.projects
  .filter((p) => p.href !== "#")
  .map((p) => `- [${p.title}](${p.href}) — ${p.discipline}. ${p.blurb}`)
  .join("\n")}

## Contact

${site.email}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
