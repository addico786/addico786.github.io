import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ID } from "@/app/layout";
import PageBar from "@/components/PageBar";
import { site } from "@/data/site";
import { allPosts, getPost, formatDate } from "@/lib/posts";

/* Static export needs every path enumerated at build time. */
export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.url],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  /* BlogPosting is what earns the article treatment in search, and it is the
     structured form an AI crawler reads instead of guessing at the layout —
     which is the argument one of these posts makes, so it holds here first. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en-IN",
    /* By @id, not by repeating the name — the author of every post is the
       same entity the site-wide graph already describes. */
    author: { "@id": ID.person },
    publisher: { "@id": ID.person },
    isPartOf: { "@id": `${site.url}/blog#blog` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
    url: `${site.url}/blog/${post.slug}`,
  };

  return (
    <div className="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="u-shell u-gutter">
        <PageBar />

        <article className="post">
          <div className="post__head">
            <p className="u-mono">{post.kicker}</p>
            <h1 className="post__title">{post.title}</h1>
            <p className="post__standfirst">{post.description}</p>
            <div className="post__dateline u-mono">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{post.minutes} min read</span>
              <span>Adnan Khan, Delhi</span>
            </div>
          </div>

          {/* Markdown is authored in this repo and compiled at build time —
              there is no user-submitted content path into this string. */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <aside className="post__cta">
          <p className="u-mono">Working on this yourself?</p>
          <p className="post__ctaline">
            Tell me what you are building and what is in the way. I reply within
            a day, and I will tell you straight if I am not the right fit.
          </p>
          <a className="post__ctamail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </aside>

        <footer className="blog__foot u-mono">
          <Link href="/blog">All writing</Link>
          <Link href="/">Back to the site</Link>
        </footer>
      </div>
    </div>
  );
}
