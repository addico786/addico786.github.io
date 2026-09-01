import type { Metadata } from "next";
import Link from "next/link";
import { ID } from "@/app/layout";
import PageBar from "@/components/PageBar";
import { site } from "@/data/site";
import SchemaBuilder from "@/components/SchemaBuilder";

const title = "Local business schema generator";
const description =
  "Generate valid LocalBusiness JSON-LD for your website — including the service-area case most generators get wrong. Free, runs in your browser, nothing uploaded.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/schema" },
  openGraph: {
    type: "website",
    url: `${site.url}/tools/schema`,
    title: `${title} — ${site.name}`,
    description,
  },
};

export default function SchemaToolPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url: `${site.url}/tools/schema`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    /* Free means free. An Offer with price 0 is how that is stated, and
       leaving it out is how tools get described as "pricing unclear". */
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    author: { "@id": ID.person },
    publisher: { "@id": ID.person },
    isPartOf: { "@id": ID.website },
  };

  return (
    <div className="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="u-shell u-gutter">
        <PageBar />

        <div className="blog__head">
          <p className="u-mono">Free tool</p>
          <h1 className="blog__title">Local business schema generator</h1>
          <p className="blog__standfirst">
            Structured data is how you state facts about your business in a form
            search engines and AI assistants read directly, instead of inferring
            them from your page layout. Fill this in, paste the result into your
            site&rsquo;s <code>&lt;head&gt;</code>, and you are done. It runs
            entirely in your browser — nothing you type is sent anywhere.
          </p>
        </div>

        <SchemaBuilder />

        <aside className="post__cta">
          <p className="u-mono">Rather not do it yourself?</p>
          <p className="post__ctaline">
            Structured data, Core Web Vitals and the rest of the technical SEO
            work is something I do for a living. Tell me what you are working on.
          </p>
          <a className="post__ctamail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </aside>

        <footer className="blog__foot u-mono">
          <Link href="/blog/invisible-to-ai-search">Why this matters</Link>
          <Link href="/">Back to the site</Link>
        </footer>
      </div>
    </div>
  );
}
