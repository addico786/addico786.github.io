/**
 * Build-time blog content. Posts are markdown files in src/content/blog,
 * read on the server during `next build` and rendered to HTML strings — so
 * nothing about the markdown pipeline reaches the browser.
 */
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "src/content/blog");

export type Post = {
  slug: string;
  title: string;
  /** Shown on the index and used as the meta description. Keep under 160. */
  description: string;
  /** ISO date. Drives ordering and the dateline. */
  date: string;
  /** Last meaningful edit, for `dateModified`. Falls back to `date`. */
  updated?: string;
  /** One-word section label, rendered as the eyebrow. */
  kicker: string;
  /** Reading time in minutes, derived — never written by hand. */
  minutes: number;
  html: string;
};

/**
 * Frontmatter is a fixed `key: value` block between `---` fences. These files
 * are authored in-repo, so a full YAML parser would be a dependency bought for
 * a format we control. Values may be quoted; nothing nests.
 */
function parse(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim();
    meta[key] = value.replace(/^["'](.*)["']$/, "$1");
  }
  return { meta, body: raw.slice(m[0].length) };
}

/** 200 wpm, rounded up, floored at 1 — the convention readers expect. */
const readingTime = (body: string) =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

/* The prose column is 40rem; a four-column price table is not. Give every
   table its own horizontal scroll container so the page body never does. */
const withScrollableTables = (html: string) =>
  html
    .replace(/<table>/g, '<div class="prose__scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");

function read(file: string): Post {
  const { meta, body } = parse(fs.readFileSync(path.join(DIR, file), "utf8"));
  const slug = file.replace(/\.md$/, "");

  /* A post missing its title or date would otherwise render as "undefined"
     on a live page. Fail the build instead — this is a build-time author
     error, and there is no sensible default for either field. */
  for (const key of ["title", "description", "date"] as const) {
    if (!meta[key]) throw new Error(`Post "${slug}" is missing \`${key}\` in its frontmatter.`);
  }

  return {
    slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    updated: meta.updated || undefined,
    kicker: meta.kicker || "Notes",
    minutes: readingTime(body),
    html: withScrollableTables(marked.parse(body, { async: false })),
  };
}

/** Newest first. Called by the index, the sitemap and generateStaticParams. */
export function allPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(read)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

/** "12 March 2026" — matches the site's spelled-out, unabbreviated register. */
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
