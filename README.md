# Adnan — Portfolio

The SALAM build, ported from the Claude Design canvas (`Adnan.dc.html`) onto
Next 16 + React 19. Self-hosted fonts, no CDN, no build-time network calls.

## Run

```bash
npm install
npm run dev      # http://localhost:3001
npm run build && npm run start
```

## Make it yours

Everything you'd want to edit is in **`src/data/site.ts`** — the opener word,
hero lines, about copy, the six projects, footer columns.

## Adding the real images

Seven slots are still placeholders. Drop files into `public/work/` and point
the `images` map at the bottom of `src/data/site.ts` at them:

```ts
export const images = {
  "hero-bg":       "/work/hero.jpg",     // full-bleed hero photograph
  "shot-flint":    "/work/flint.jpg",
  "shot-vibescan": "/work/vibescan.jpg",
  "shot-utb":      "/work/utb.jpg",
  "shot-prd":      "/work/prd.jpg",
  "shot-blog":     "/work/blog.jpg",     // n8n → Gemini → R2 diagram
  "shot-nfc":      "/work/nfc.jpg",
};
```

Any key left `undefined` renders the labelled placeholder instead, so you can
add them one at a time. Work shots are 16:9; the hero wants something warm and
low-chroma that sits with the parchment/espresso palette.

## Layout

```
src/
  app/          layout, page markup, globals
  components/   Motion (all behaviour), ImageSlot
  data/site.ts  every string on the page
  styles/
    tokens.css        design system: colour, type, spacing, motion, @font-face
    motion-engine.css the ds-* stagger/reveal classes, copied verbatim
    site.css          layout, ported from the canvas inline styles
public/fonts/   BDO Grotesk, Marlin Soft SQ, Archivo, Inter (12 woff2)
```

`Motion.tsx` is one client component on purpose: the opener, the scroll loop,
the rotator and the nav all shared a single `boot()` in the source, and
splitting them across components would desynchronise them.

## Motion, as measured off maelanlemeur.com

Timings and sizes below were read frame by frame from a screen recording of the
source, not guessed.

**The opening.** A quiet ~20px word, centred, dark on parchment — not a display
word. It holds ~0.9s, then scrambles into noise and falls away character by
character while the whole panel *fades* (the canvas build slid a curtain
instead). The column rules then draw downward from the top, staggered 0.07s
apart, and the hero words rise out of their masks 0.09s apart.

**Text reveal.** Every heading, kicker, paragraph and work title reveals with
React Bits' `<SplitText>` (`src/components/SplitText.jsx`, vendored verbatim;
types live beside it in `SplitText.d.ts` so the component can be re-pulled
without losing edits). Characters fade and rise 40px on `power3.out`.

Stagger is scaled to string length rather than left at the 50ms default — a
160-character paragraph at 50ms would take eight seconds to become readable:

| Element | delay | duration |
|---|---|---|
| kickers, "I build" | 30ms | 0.8-1.25s |
| about lead | 18ms | 1.25s |
| body paragraphs | 9ms | 0.9s |
| work titles | 25ms | 0.9s |
| hero words | 50ms | 1.25s |

The hero words run the same GSAP `SplitText` from `Motion.tsx` rather than the
component: they sit above the fold, so a ScrollTrigger would fire at mount and
play out of sight behind the opener. Same chars, y, ease and stagger, so it
reads identically. They are held at `opacity: 0` until the tween takes over,
otherwise they show through the fading panel and then snap back to invisible.

The opening word still scrambles as it dissolves — that is the source's own
behaviour, not the paragraph effect that was removed.

**The column grid is static.** Measured at x = 18, 117, 219, 321, 422 in a
440px viewport and identical at t = 0.6s, 2.0s, 3.5s and 5.0s. What reads as
"moving lines" is the words sliding past fixed rules.

**Stacked hero.** Four full-height columns of vertical type. The words pair up —
first two on the top rail, last two dropped to the bottom — rather than
zigzagging. A rotated line box is `font-size x line-height` wide, so the size is
one column (~22.4vw) over the 1.02 leading. Captions are dropped here, as in the
source; they would otherwise start each word at a different height. On scroll
every column travels *up*, the first word leading and each one behind lagging.

## Changed from the source

The canvas build pinned the hero `sticky top:0` for the whole scroller at
`z-index:1`, above a `z-index:0` sticky footer — so the footer could never be
seen. Hero and body now sit in a `[data-stage]` wrapper, which bounds the
hero's sticky range and lets the footer reveal.

## Deploy

Static export works as-is; `npm run build` prerenders `/`. Vercel or Cloudflare
Pages need no config.

## Adding or removing a project

Edit the `projects` array in `src/data/site.ts` — that's the whole job. The
number badge, the "N things shipped" marquee, the row count and the footer's
outbound links are all derived from it, so nothing else needs touching.

```ts
{
  title: "New Thing",
  discipline: "Chrome Extension",
  year: "2026",
  href: "https://example.com",   // an http link also lands in the footer
  linkLabel: "example.com",
  slot: "shot-new",              // unique; used as the image slot id
  placeholder: "New Thing screenshot",
  image: "/work/new.jpg",        // or undefined for the labelled placeholder
  blurb: "One sentence on what it does.",
}
```

Verified by adding a 7th (marquee read "Seven", numbering ran to 07) and by
deleting one (read "Five", numbering to 05).

## Deploying

Cloudflare Pages project `addico786-github-io`, serving `adnankhan.tech`.

| Setting | Value |
| --- | --- |
| Production branch | `next-portfolio` |
| Build command | `npm run build` |
| Output directory | `dist` |

`npm run build` runs `next build` and moves the static export from `out/` to
`dist/`, matching the output directory the Pages project already used — so no
Pages settings needed changing. The site has no server code, so a static
export is the whole build and no Pages adapter is required.

Pushing to `next-portfolio` triggers a production deploy. Any other branch
builds as a preview at `<branch>.addico786-github-io.pages.dev`.
