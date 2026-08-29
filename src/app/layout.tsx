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

/** Person + the services offered, so Google can read this as a business. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  image: `${site.url}/work/adnan.webp`,
  description,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressCountry: "IN",
  },
  founder: { "@type": "Person", name: "Adnan Khan", jobTitle: "Web Developer" },
  sameAs: site.socials.map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: site.services.map((sv) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: sv.title, description: sv.line },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
