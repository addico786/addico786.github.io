import type { Metadata } from "next";
import Link from "next/link";
import { ID, OG_IMAGE } from "@/app/layout";
import PageBar from "@/components/PageBar";
import { site } from "@/data/site";
import { allPosts, formatDate } from "@/lib/posts";

const title = "Journal";
const description =
  "Plain answers on what websites cost, why search has stopped sending clicks, and what to build now — from a freelance developer in Delhi.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: `${title} — ${site.name}`,
    description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${site.name}`,
    description,
    images: [OG_IMAGE.url],
  },
};

export default function BlogIndex() {
  const posts = allPosts();

  /* Blog is a listing page, so it gets its own Blog + ItemList graph rather
     than inheriting only the site-wide ProfessionalService from the layout. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: `${title} — ${site.name}`,
    description,
    url: `${site.url}/blog`,
    author: { "@id": ID.person },
    publisher: { "@id": ID.person },
    isPartOf: { "@id": ID.website },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
    })),
  };

  return (
    <div className="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="u-shell u-gutter">
        <PageBar />

        <div className="blog__head" data-inview>
          <p className="u-mono ds-fade-up">Journal</p>
          <h1 className="blog__title ds-fade-up" style={{ ["--i" as string]: 1 }}>
            Straight answers about the things clients ask before they hire anyone.
          </h1>
          <p className="blog__standfirst ds-fade-up" style={{ ["--i" as string]: 2 }}>
            What a website really costs, why search stopped sending traffic, and
            what actually needs building now. No hedging, and no numbers I would
            not quote you in an email.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="blog__standfirst">First pieces are being written.</p>
        ) : (
          <ol className="blog__list">
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className="blog__row ds-fade-up"
                data-inview
                style={{ ["--i" as string]: i }}
              >
                <Link href={`/blog/${post.slug}`} className="blog__link">
                  <span className="blog__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <h2 className="blog__rowtitle">{post.title}</h2>
                    <p className="blog__rowdesc">{post.description}</p>
                    <span className="blog__meta u-mono">
                      <span>{post.kicker}</span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span>{post.minutes} min read</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        <footer className="blog__foot u-mono ds-fade-up" data-inview>
          <Link href="/">Back to the site</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </footer>
      </div>
    </div>
  );
}
