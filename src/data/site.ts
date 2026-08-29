/**
 * All copy lives here. Edit this file and the page follows.
 * Ported from the PROJECTS array + markup of Adnan.dc.html.
 */

export const site = {
  name: "Adnan",
  openerWord: "Salam,",
  email: "hello@adnankhan.tech",
  /** Canonical origin. Everything SEO derives from this — change it once. */
  url: "https://adnankhan.tech",
  tagline: "Freelance web developer and SEO in Delhi, India",
  strapline: "Indie developer · Delhi, India",

  nav: [
    { label: "About", hover: "Delhi", href: "#about", index: "01" },
    { label: "Work", hover: "Six", href: "#work", index: "02" },
    { label: "Say hello", hover: "Email", href: "#contact", index: "03" },
  ],

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/adnan_khan42004" },
    { label: "X", href: "https://x.com/adnan_ka4" },
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],

  /** Four hero bands. `drift` sets which way the word slides on scroll. */
  heroLines: [
    { word: "Adnan", cap: "Websites", drift: -1, align: "left" },
    { word: "Indie", cap: "SEO", drift: 1, align: "right" },
    { word: "Developer", cap: "Automation", drift: -1, align: "left" },
    { word: "Delhi", cap: "Cloud & DevOps", drift: 1, align: "right" },
  ],

  /* Plain strings: SplitText splits and wraps these itself, so the hard line
     breaks the canvas build baked in are no longer needed. */
  about: {
    lead: "I build websites that load fast and rank, and the automation and cloud work that sits behind them.",
    paras: [
      "Most of what I ship starts as a problem someone actually has: a site nobody can find, a task done twice a week by hand, a deploy that breaks every time.",
      "I work end to end — idea, interface, backend, deploy — and I lean on AI tooling hard, because shipping matters more than showing off.",
      "Oracle and Google Cloud certified, seven times over. Available for freelance work.",
    ],
  },

  rotator: ["websites that rank", "technical SEO", "automation", "cloud & DevOps"],

  /** Repeated across the work seam. {n} is filled with the project count. */
  /** What someone can hire me for. Rendered as the Services section. */
  services: [
    {
      title: "Websites",
      line: "Marketing sites and landing pages, built to load fast on a phone and rank once they ship.",
      tags: ["Next.js", "React", "Cloudflare"],
    },
    {
      title: "SEO",
      line: "Technical SEO — Core Web Vitals, structured data, crawlability. The part that moves rankings.",
      tags: ["Core Web Vitals", "Schema", "Audits"],
    },
    {
      title: "Automation",
      line: "The task you do twice a week, turned into a pipeline that runs without you.",
      tags: ["n8n", "Python", "APIs"],
    },
    {
      title: "Cloud & DevOps",
      line: "Infrastructure as code, CI/CD and containers — provisioned, deployed and monitored.",
      tags: ["AWS", "GCP", "Terraform", "Docker"],
    },
    {
      title: "Chrome Extensions",
      line: "Browser tools built end to end and shipped to the Web Store.",
      tags: ["Manifest V3", "Workers", "D1"],
    },
  ],

  /** Verified credentials. Same list as adnankhan.tech. */
  certifications: [
    ["Oracle Cloud Infrastructure 2025", "Certified Foundations Associate"],
    ["Oracle Cloud Infrastructure 2025", "Multicloud Architect Professional"],
    ["Google Cloud", "Build Infrastructure with Terraform"],
    ["Google Cloud", "Deploy Kubernetes Applications"],
    ["Google Cloud", "Implement DevOps Workflows"],
    ["Google Cloud", "Monitoring in Google Cloud"],
    ["Google Cloud", "Networking Fundamentals"],
  ] as [string, string][],

  marqueeTemplate: "Selected work — {n} things shipped — ",

  projects: [
    {
      title: "Flint",
      discipline: "Chrome Extension",
      year: "2026",
      href: "https://appflint.online",
      linkLabel: "appflint.online",
      slot: "shot-flint",
      placeholder: "Flint screenshot",
      alt: "Flint, a Chrome extension that strips tracking parameters from links, built by Adnan Khan",
      image: "/work/flint.png" as string | undefined,
      blurb:
        "A URL cleaner that strips tracking parameters before a link ever leaves your hands.",
    },
    {
      title: "VibeScan",
      discipline: "Extension + Web",
      year: "2026",
      href: "https://vibescan.online",
      linkLabel: "vibescan.online",
      slot: "shot-vibescan",
      placeholder: "VibeScan screenshot",
      alt: "VibeScan, a browser security scanner reporting page risks in plain language",
      image: "/work/vibescan.png" as string | undefined,
      blurb:
        "A security scanner for the pages you actually visit, reported in plain language.",
    },
    {
      title: "Urban Tech Buildings",
      discipline: "Marketing Site",
      year: "2026",
      href: "https://urbantechbuildings.com",
      linkLabel: "urbantechbuildings.com",
      slot: "shot-utb",
      placeholder: "Urban Tech Buildings screenshot",
      alt: "Urban Tech Buildings, a construction company marketing site built for fast mobile loading",
      image: "/work/utb.png" as string | undefined,
      blurb:
        "A construction company site built to load fast on a phone at a site visit.",
    },
    {
      title: "PRD Decomposer",
      discipline: "React, TypeScript, Vite",
      year: "2026",
      href: "#",
      linkLabel: "Case study soon",
      slot: "shot-prd",
      placeholder: "PRD Decomposer screenshot",
      alt: "PRD Decomposer, a React app turning requirements documents into a task graph",
      image: undefined as string | undefined,
      blurb:
        "Turns a product requirements document into a dependency-ordered task graph.",
    },
    {
      title: "Blog Engine",
      discipline: "n8n, Gemini, R2",
      year: "2026",
      href: "#",
      linkLabel: "Case study soon",
      slot: "shot-blog",
      placeholder: "Blog engine diagram",
      alt: "Blog engine automation pipeline using n8n, Gemini and Cloudflare R2",
      image: undefined as string | undefined,
      blurb:
        "An automation pipeline that drafts, illustrates and publishes without a dashboard.",
    },
    {
      title: "NFC Cards",
      discipline: "Hardware, Web",
      year: "2026",
      href: "#",
      linkLabel: "Case study soon",
      slot: "shot-nfc",
      placeholder: "NFC card photograph",
      alt: "Programmable NFC contact cards with a hosted profile page",
      image: undefined as string | undefined,
      blurb:
        "Programmable contact cards with a hosted profile behind a single tap.",
    },
  ],

  /** Contact section, aimed at someone deciding whether to hire. */
  contact: {
    lead: "Say hello",
    line: "Tell me what you are building and what is in the way. I reply within a day, and I will tell you straight if I am not the right fit.",
  },

  /** Footer, in the source's shape: stacked groups, then a colophon line. */
  footer: {
    /** name / role pairs, rendered as two columns */
    credits: [
      ["Adnan", "Design & build"],
      ["BDO Grotesk", "Typography"],
      ["Cloudflare", "Hosting"],
    ] as [string, string][],
    signoff: "Thanks for scrolling.",
    colophon: "Site built in 2026 with Next.js and GSAP — Delhi, India.",
  },
};

/** 01, 02, 03 … derived, so the numbering can never drift from the array. */
export const projectNumber = (i: number) => String(i + 1).padStart(2, "0");

const COUNT_WORDS = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
/** Marquee text with the live project count spelled in. */
export const marqueeText = () => {
  const n = site.projects.length;
  return site.marqueeTemplate.replace("{n}", COUNT_WORDS[n] ?? String(n));
};



/** The hero shot. Projects carry their own `image` field. */
export const images: Record<string, string | undefined> = {
  "hero-bg": "/work/adnan.png",
};
