# adnankhan.tech — Immersive Scroll-Video Portfolio

Personal portfolio for **Adnan Khan**, DevOps Engineer. A full-screen, scroll-driven
experience: AI-generated videos scrub frame-by-frame as you scroll, with the portfolio
content overlaid on top.

Built with **Vite + React + TypeScript + Tailwind CSS**, **Lenis** smooth scroll,
**GSAP ScrollTrigger**, and **Framer Motion**.

---

## Features

- **Scroll-scrub video backdrop** — each section's background video advances/reverses in
  sync with scroll (Apple-style), cross-fading between sections.
- **DevOps boot-splash preloader** — terminal-style boot log + progress bar on first load.
- **Scroll-linked hero** — title shrinks/fades as you scroll into the data-center flythrough.
- **Folder / page-slide Projects** — a portfolio that "opens" then flips through projects
  horizontally (GSAP pinned), fully data-driven so new projects auto-slot in.
- **Dark / light theme** with `localStorage` persistence and anti-FOUC.
- **Accessibility** — respects `prefers-reduced-motion` (disables scrubbing, falls back to
  static backdrops + a plain project grid).
- **SEO preserved** — meta tags + JSON-LD `Person` schema live in `index.html`.
- **Working contact form** via Formspree.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Requires Node 20+.

---

## Project structure

```
public/
  videos/           # scroll-scrub videos (mp4) + PROMPTS.md (Veo 3 prompts + encode)
  logo.png, adnan.png, resume.pdf, robots.txt, sitemap.xml, _headers
src/
  components/
    scroll/         # SmoothScroll (Lenis), VideoBackdrop (the scrub engine)
    intro/          # Preloader (boot splash)
    layout/         # Navbar, Footer
    sections/       # Hero, About, Skills, Projects, Certifications, Contact
    ui/             # Section, SectionHeading, Tag
  data/             # typed content — EDIT THESE to update the site
  hooks/            # useTheme, usePrefersReducedMotion
  lib/              # motion variants, lenis singleton
  types/            # shared interfaces
index.html          # Vite entry — all SEO meta + JSON-LD
```

---

## Editing content

All content is typed data — no JSX changes needed:

| What | File |
|------|------|
| Name, role, email, location, Formspree id | `src/data/site.ts` |
| Skills | `src/data/skills.ts` |
| Projects | `src/data/projects.ts` |
| Certifications | `src/data/certifications.ts` |
| Social links | `src/data/socials.ts` |
| Which video backs each section | `src/data/scenes.ts` |

Add a project = append one object to `projects.ts`; the folder/page-slide animation and
scroll length adjust automatically.

---

## Videos

Background clips live in `public/videos/`. They **must be re-encoded with a keyframe on
every frame**, otherwise scroll-scrubbing snaps/sticks (the browser can only seek to
keyframes).

Generate clips from the prompts in [`public/videos/PROMPTS.md`](public/videos/PROMPTS.md),
then encode each:

```bash
# ffmpeg comes from the ffmpeg-static dev dependency:
FF=$(node -e "process.stdout.write(require('ffmpeg-static'))")
"$FF" -y -i raw.mp4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 \
  -g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart -an out.mp4
```

Then point the section at the file in `src/data/scenes.ts`. A section with `video: null`
shows an animated gradient fallback.

Currently shipped: hero, about, skills. Projects / certifications / contact use the gradient
fallback until their clips are added.

---

## Deployment (Cloudflare Pages)

1. Cloudflare → **Pages → Connect to Git** → `addico786/addico786.github.io`.
2. Framework **Vite**, build command `npm run build`, output dir `dist`, env `NODE_VERSION=20`.
3. Set the production branch, verify the `*.pages.dev` URL.
4. **Pages → Custom domains** → add `adnankhan.tech` (managed HTTPS).

`public/_headers` sets long cache for hashed assets and videos.
