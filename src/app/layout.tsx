import type { Metadata } from "next";
import { site } from "@/data/site";
import "./globals.css";

const description =
  "Freelance web developer in Delhi, India. Websites that load fast and rank, technical SEO, automation, and cloud & DevOps. Available for freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "freelance web developer",
    "web developer Delhi",
    "technical SEO",
    "Next.js developer",
    "automation",
    "Cloud and DevOps",
    "Chrome extension developer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description,
    locale: "en_IN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description,
    creator: "@adnan_ka4",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * One entity graph for the whole site, not three loose objects.
 *
 * Every node carries a stable `@id` and references the others by it, so a
 * crawler — or a model assembling an answer — resolves "Adnan Khan", the
 * practice, the site and every blog post to the SAME entity instead of
 * guessing that they are related. This is the part of GEO/AEO that is real
 * engineering rather than vocabulary: entity consolidation. The `@id` values
 * are permanent URLs. Changing one silently splits the entity in two.
 */
export const ID = {
  person: `${site.url}/#person`,
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": ID.person,
      name: "Adnan Khan",
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}/work/adnan.webp`,
      jobTitle: "Freelance Web Developer",
      description,
      address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
      /* Declares topical expertise explicitly rather than leaving a model to
         infer it from prose. Cheap, and it is what AI assistants match a
         question against when deciding who to cite. */
      knowsAbout: [
        "Web development",
        "Next.js",
        "React",
        "Technical SEO",
        "Core Web Vitals",
        "Structured data",
        "Answer engine optimisation",
        "Workflow automation",
        "n8n",
        "Cloud infrastructure",
        "DevOps",
        "Terraform",
        "Chrome extension development",
      ],
      sameAs: site.socials.map((s) => s.href),
      worksFor: { "@id": ID.business },
    },
    {
      "@type": "ProfessionalService",
      "@id": ID.business,
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      image: `${site.url}/work/adnan.webp`,
      description,
      priceRange: "₹₹",
      /* Named places, not "Worldwide". Local answer engines need the city
         stated to include you in a "near me" answer at all; the country and
         the remote note keep the non-local work in scope. */
      areaServed: [
        { "@type": "City", name: "Delhi" },
        { "@type": "AdministrativeArea", name: "Delhi NCR" },
        { "@type": "Country", name: "India" },
      ],
      address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
      founder: { "@id": ID.person },
      employee: { "@id": ID.person },
      sameAs: site.socials.map((s) => s.href),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: site.services.map((sv) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: sv.title,
            description: sv.line,
            provider: { "@id": ID.business },
            areaServed: { "@type": "Country", name: "India" },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": ID.website,
      url: site.url,
      name: `${site.name} — ${site.tagline}`,
      description,
      inLanguage: "en-IN",
      publisher: { "@id": ID.person },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The bootstrap below and Lenis both add classes to <html> before React
       hydrates, so the server markup and the client disagree by design. This
       is the documented escape hatch for exactly that pattern. */
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Progressive enhancement + failsafe. The opener panel and the hero
            words are hidden by CSS and revealed by Motion.tsx. If the bundle
            never runs — chunk 404, CSP block, a throw in an effect — the
            visitor would otherwise be stuck on a blank panel forever.
            `js` gates the hidden states; the timer un-gates them if the intro
            has not finished, and Motion clears it on success. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "window.__introFailsafe=setTimeout(function(){" +
              "document.documentElement.classList.add('intro-failed')},4000)",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
