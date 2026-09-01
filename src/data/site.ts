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
    { label: "Work", hover: "Seven", href: "#work", index: "02" },
    { label: "Journal", hover: "Writing", href: "/blog", index: "03" },
    { label: "Say hello", hover: "Email", href: "#contact", index: "04" },
  ],

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/adnan_khan42004" },
    { label: "X", href: "https://x.com/adnan_ka4" },
    { label: "GitHub", href: "https://github.com/addico786" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adnan-khan-afridi-46595129a/" },
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


  /**
   * DRAFT — NOT RENDERED ANYWHERE. Do not wire this up until Adnan has
   * approved the wording.
   *
   * These answers commit to pricing, timelines and ownership terms in his
   * voice, and an FAQPage would republish them as his stated terms to Google
   * and every AI assistant. They were drafted by Claude, not by him.
   *
   * To enable once approved: render the array on the home page AND emit it as
   * FAQPage schema from the same array — never one without the other, since
   * Google requires the markup to match visible page text. The `.faq__*`
   * styles in site.css are still in place. See CONTEXT.md → AEO / GEO.
   *
   * Format rules that make an answer extractable: under ~55 words, and a real
   * number in the first sentence.
   */
  faqs: [
    {
      q: "How much does a website cost?",
      a: "A five-page business site runs \u20B915,000 to \u20B980,000 with a freelancer, against \u20B980,000 to \u20B93,00,000 at an agency for the same scope. The gap is process and redundancy, not code quality. I quote a fixed price per project after one call, not an hourly rate.",
    },
    {
      q: "How long does it take to build?",
      a: "Two to four weeks for a marketing site once the content exists. Writing the content is usually what takes longer than the build. Stores and custom integrations run six to ten weeks.",
    },
    {
      q: "Do I own the website and the code?",
      a: "Yes, all of it, from day one. The domain and hosting go in your name on your accounts, and the code is yours. If you ever want to work with someone else, you can leave without asking me for anything.",
    },
    {
      q: "Do you do the design as well as the build?",
      a: "Both. Portfolios often mix the two \u2014 a designer showing work someone else built, or a developer showing someone else's design. Everything in my work section is mine end to end, interface and backend.",
    },
    {
      q: "Will the site actually rank on Google?",
      a: "The technical side is handled at build: Core Web Vitals, structured data, crawlability, and now the markup that makes a site legible to AI search. Ranking also needs content and time \u2014 typically three to six months. Anyone promising page one in a month is selling you something.",
    },
    {
      q: "Where are you based, and do you work remotely?",
      a: "Delhi, India. Most of my work is remote, for clients across India and abroad. I reply to email within a day, and I will tell you straight if I am not the right fit for what you need.",
    },
  ] as { q: string; a: string }[],

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
      image: "/work/flint.webp" as string | undefined,
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
      image: "/work/vibescan.webp" as string | undefined,
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
      image: "/work/utb.webp" as string | undefined,
      blurb:
        "A construction company site built to load fast on a phone at a site visit.",
    },
    {
      title: "Readingspace",
      discipline: "Astro, Local SEO",
      year: "2026",
      href: "https://readingspace.in",
      linkLabel: "readingspace.in",
      slot: "shot-readingspace",
      placeholder: "Readingspace screenshot",
      alt: "Readingspace, a 24/7 study library in Batla House, New Delhi, with membership plans and reserved seats",
      image: "/work/readingspace.webp" as string | undefined,
      blurb:
        "A 24/7 study library in Batla House, built to be found by a student searching at midnight.",
    },
    {
      title: "InfraPilot",
      discipline: "Terraform, Kubernetes, FastAPI",
      year: "2026",
      href: "https://github.com/addico786/infra-pilot",
      linkLabel: "addico786/infra-pilot",
      slot: "shot-infrapilot",
      placeholder: "InfraPilot dashboard",
      alt: "InfraPilot, a drift detection dashboard for Terraform and Kubernetes manifests",
      image: "/work/infrapilot.webp" as string | undefined,
      blurb:
        "Reads Terraform and Kubernetes manifests and scores how far the running infrastructure has drifted from them.",
    },
    {
      title: "Agent Observability",
      discipline: "OpenTelemetry, SigNoz, Docker",
      year: "2026",
      href: "https://github.com/addico786/signoz_observability_project",
      linkLabel: "addico786/signoz_observability_project",
      slot: "shot-signoz",
      placeholder: "SigNoz trace waterfall",
      alt: "A SigNoz trace waterfall of one agent request, with the tool call and the LLM call as child spans",
      image: "/work/signoz.webp" as string | undefined,
      blurb:
        "A self-hosted SigNoz stack that traces a local AI agent end to end, so a slow call has a waterfall behind it.",
    },
    {
      title: "Three-Server Deploy",
      discipline: "Ansible, Nginx, MySQL",
      year: "2025",
      href: "https://github.com/addico786/2_tier_app_deployed_remotly",
      linkLabel: "addico786/2_tier_app_deployed_remotly",
      slot: "shot-ansible",
      placeholder: "Ansible playbook run",
      alt: "An ansible-playbook run installing Apache, PHP and Nginx across the app servers, both plays green",
      image: "/work/ansible.webp" as string | undefined,
      blurb:
        "Frontend, backend and database stood up across three remote servers from Ansible playbooks — no manual SSH.",
    },
  ],


  /** Secondary nav, used by the footer and by the bar on the inner pages. */
  pages: [
    { label: "About", href: "/#about" },
    { label: "Work", href: "/#work" },
    { label: "Journal", href: "/blog" },
    { label: "Schema generator", href: "/tools/schema", short: "Tools" },
  ] as { label: string; href: string; short?: string }[],

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
  "hero-bg": "/work/adnan.webp",
};
