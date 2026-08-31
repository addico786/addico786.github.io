# Context

Why this codebase is shaped the way it is. `README.md` covers how to run and
edit it; this file covers the decisions and the traps — the things that cost
time to learn and are not visible in the code.

---

## What this site is for

It is a **freelance client-acquisition site**, not a job-hunting portfolio.
That is the reason for the services list, the certifications, the
`ProfessionalService` + `OfferCatalog` JSON-LD, and the "say hello" framing.
The older job-seeking portfolio still lives on the `master` branch.

---

## Architecture

**All content is in `src/data/site.ts`.** Nothing else holds copy. The hero
lines, services, projects, footer columns, and the structured data all derive
from it — add a service and it enters the `OfferCatalog` automatically. Adding
or deleting a project is an edit to one array; the numbering (`01`, `02`…) and
the marquee's word count follow.

**All page motion is in `src/components/Motion.tsx`**, deliberately in one
client component. The source site coordinated its opener, scroll loop and nav
from a single `boot()`, and splitting them here reintroduced races between the
opener and the hero reveal. One `useGSAP` effect, one rAF loop.

**`src/components/SplitText.jsx` is vendored verbatim** from React Bits (plus
`"use client"`), with types in a sibling `.d.ts`, so it can be re-pulled
upstream without a merge. Its two empty `catch` blocks are intentional — leave
them.

**Static export.** `output: "export"`, and `build` is
`next build && rm -rf dist && mv out dist` because Cloudflare Pages is already
configured to publish `dist`. `sitemap.ts` and `robots.ts` both need
`export const dynamic = "force-static"` or the export fails.

---

## Motion: the tuning knobs

All in `Motion.tsx`. These were arrived at by measurement, not taste — the
numbers in the comments are real.

### Opener

| constant | value | what it does |
|---|---|---|
| `HOLD` | 1300ms | how long "Salam," sits before it leaves |
| `EXIT` / `EXIT_STAGGER` | 0.45s / 0.025s | the per-character exit |

**The settle is scheduled from inside the exit callback**, with its delay
derived from `EXIT` and `EXIT_STAGGER`. Do not turn it back into a standalone
`setTimeout` — that was the bug where the ground faded out from under the last
letters and the page read as vanishing mid-animation. Deriving it also means a
longer `openerWord` automatically gets a longer wait.

### Marquee — two channels, and a breakpoint

The single most-revised piece of the site. The strip is **8165px wide at
1440, ~2381px at 390** (it scales with the font clamp), and the transform is a
**percentage of that width**, so small numbers go a very long way.

Above 820px it runs on two channels, because "how far it travels" and "how
obviously the scroll drives it" are different problems that one rate cannot
serve — turn it up and it races, down and it reads as drifting on its own:

| | driven by | contributes | value |
|---|---|---|---|
| `MARQUEE_RATE` | scroll **position** | net travel | 0.015 → 1.22 px/px |
| `MARQUEE_KICK` | scroll **velocity**, clamped, springs to 0 | the scroll feel, **zero** distance | 70px |

The phase is keyed to the strip's **entry into the viewport** (`vh * 0.5`),
not absolute `scrollY`. Keyed to `scrollY`, whatever phase the strip happened
to be in when it scrolled into view is where it stayed — which is why the
phrase used to start mid-word.

**Below 820px there is no scroll coupling at all.** A CSS keyframe loop
(`marquee-run`, 24s, in `site.css`) runs it at ~49.6 px/s, and `Motion.tsx`
leaves the inline transform empty so the animation owns the element. At 390px
only about five characters fit on screen, so a scroll-driven offset can only
ever show a fragment — a continuous pass is what makes it readable. An
IntersectionObserver pauses it off-screen so it isn't holding a compositor
layer awake for the whole page.

`-50%` is exactly one copy of the strip. That only works because
`[data-marquee]` has `width: max-content` and `gap: 0` — as a block-level flex
container its box would be the viewport, and `-50%` would move half a *screen*
instead of half the *content*, jumping every cycle.

---

## The blog

`/blog` and `/blog/[slug]`, added August 2026. Posts are markdown files in
`src/content/blog`, read at build time by `src/lib/posts.ts`.

**Markdown, not MDX, and one dependency.** `marked` runs during `next build`
and emits an HTML string, so nothing about the markdown pipeline reaches the
browser. Frontmatter is parsed by ~15 lines in `posts.ts` rather than a YAML
dependency, because these files are authored in this repo and the format is
fixed. A post missing `title`, `description` or `date` **fails the build** —
there is no sensible default for any of them, and the alternative is the word
`undefined` on a live page.

**Blog routes ship no motion bundle.** 562KB against the home page's 698KB,
all of the difference being GSAP + Lenis + `Motion.tsx`. Nothing under
`/blog` is a client component. What remains is the React/Next hydration
baseline, which a static export cannot drop — do not describe these pages as
"zero JS", because they are not. They *are* fully readable with JS disabled,
which is the claim one of the posts makes, so it has to keep holding.

**Do not add the site nav to blog pages.** The overlay nav needs the motion
bundle, and its links are `#about`-style anchors that go nowhere from
`/blog/*`. The thin sticky `.blog__bar` exists for exactly this reason.
`Motion.tsx` only intercepts `a[href^="#"]`, so the `/blog` entry in
`site.nav` passes through untouched.

**Tables get wrapped.** `withScrollableTables` in `posts.ts` puts every
`<table>` in a `.prose__scroll` div. The prose column is 40rem and a
four-column price table is not — without this the page body scrolls
horizontally on a phone.

Reading time and post ordering are derived, never written by hand. Dates are
deliberately staggered so the pricing post leads.

---

## AEO / GEO

Two acronyms that arrived in 2026. AEO is winning the answer box; GEO is being
cited inside a generated answer. Concretely, both come down to being one
unambiguous entity that states checkable facts.

**The entity graph is the whole trick.** `layout.tsx` exports `ID` and emits a
single `@graph` — `Person`, `ProfessionalService`, `WebSite` — where every node
carries a stable `@id` and references the others by it. Blog posts join the
same graph: `author` and `publisher` are `{ "@id": ID.person }`, not a repeated
name. **The `@id` values are permanent URLs.** Change one and you silently
split yourself into two entities, which is the exact failure this is built to
prevent.

**The FAQ is drafted but deliberately NOT live.** `site.faqs` exists and the
`.faq__*` styles are in place, but nothing renders it and no `FAQPage` is
emitted. The answers commit to pricing, timelines and ownership terms in
Adnan's voice, and were drafted by Claude — publishing them as `FAQPage` would
republish them to Google and every assistant as his stated terms. **They need
his approval first.**

When enabling: render the array on the home page **and** emit `FAQPage` from
the same array — never one without the other. Markup claiming answers a visitor
cannot read is a manual action, not a ranking boost. This is the single biggest
AEO win still on the table.

**`.ds-fade-up` is `.js`-gated, and must stay that way.** It used to set
`opacity: 0` unconditionally, which meant the FAQ kicker and the contact line
were invisible to anything that did not run JS. That contradicted the rule
below about JS-only hiding, and it was found by screenshotting with script
execution disabled — not by reading the CSS.

**`/llms.txt` is generated, and is not expected to do much.** Ahrefs found 97%
of these files drew zero traffic in May 2026 and no major assistant documents
it as a citation signal. It is a route handler so it cannot rot; that is the
only reason it is cheap enough to keep.

`robots.ts` names the answer-engine crawlers explicitly. `User-agent: *`
already allows them, so this changes no behaviour — it is there so a future
tightening of the wildcard cannot silently lock the assistants out.

---

## The free tool

`/tools/schema` — a local business JSON-LD generator. `SchemaBuilder.tsx` is
the only client component outside the home page's motion.

It exists to earn links and rank for a real keyword, but the reason to prefer
it over the twenty other schema generators is one checkbox: **"I visit clients
— I do not receive them."** Ticking it drops `streetAddress` and `postalCode`
while keeping `addressLocality` and `addressCountry`. Most generators offer
all-or-nothing, so a service-area business either publishes a home address or
drops the address block entirely and loses the local signal. This was a real
blocker on the Urban Tech Buildings project.

Everything runs in the browser; nothing is uploaded, and the page says so. Keep
it that way — the moment it posts anywhere it needs a privacy policy and stops
being a five-minute tool.

---

## Traps

**`will-change` on split text.** SplitText stamps it on every fragment; that
was **603 promoted compositor layers**. `site.css` forces
`will-change: auto !important` on `.split-char/.split-word/.split-line`,
bringing it to 53. Don't "optimise" that back.

**Split text flashes its finished state.** It renders server-side at full
opacity and GSAP only applies the `from` state after mount, so on a slow phone
the finished words sit on screen for the whole hydration window then snap and
animate. The `.js .split-parent { visibility: hidden }` + `:has(.split-char)`
rules hold them until the split exists. Invisible on desktop, seconds on a
phone — do not test this on a warm desktop cache and conclude it's fine.

**Nothing JS-only may hide content by default.** Everything the intro hides is
gated behind `.js`, with a 4s `intro-failed` failsafe set in `layout.tsx`.
Motion clears that failsafe as the *first* statement in its effect — the
failsafe counts from page start, the intro from hydration, and on a slow
device those clocks diverge enough that it used to fire mid-intro. Test with
scripts disabled before touching any of it.

**Chunk filenames change between builds.** Do not poll a fixed
`/_next/static/chunks/<name>.js` to detect a deploy — after a rebuild that URL
404s and returns the ~16KB HTML fallback, which passes a naive byte check.
Pull the chunk list out of the live HTML, find the one containing your code,
then compare.

**Grid stacking.** `[data-grid]` must sit above `[data-scroller]` (z-index 4
vs 3) or the column rules only survive on the hero.

**Verify at 390px, not just 1440.** Several rounds of marquee work were spent
tuning on desktop while the actual complaint was about a phone.

---

## Deploying

Cloudflare Pages project `addico786-github-io`, production branch
**`next-portfolio`**, building `npm run build` → `dist`. `master` is the old
year-old site; leave it alone. `CNAME` and `resume.pdf` live only in the
deploy repo and must never be overwritten.

```bash
D=/home/adnan/projects/portfolio/deploy-repo
rsync -a --delete --exclude .git --exclude node_modules --exclude .next \
  --exclude dist --exclude .gstack --exclude tsconfig.tsbuildinfo \
  --exclude next-env.d.ts --exclude CNAME --exclude resume.pdf ./ "$D"/
cd "$D" && git show HEAD:.gitignore > .gitignore && git add -A
git commit && git push origin next-portfolio
```

Deploys land in 40–60s. HTML is `max-age=0, must-revalidate`, so a normal
reload always gets the current build — a stale page is almost never the cause.

---

## Measuring

Screenshots lie about motion; timings need sampling. `tools/cdp.py` is a
dependency-free CDP client (raw WebSocket, no `ws`/`websockets` needed) for
driving the Playwright Chromium at
`~/.cache/ms-playwright/chromium-1208/chrome-linux64/chrome`:

```bash
chrome --headless=new --no-sandbox --remote-debugging-port=9222 about:blank &
python3 -c "import sys; sys.path.insert(0,'tools'); from cdp import connect; \
  ws=connect(9222); ws.call('Page.navigate',{'url':'https://adnankhan.tech'})"
```

Then `Runtime.evaluate` a rAF loop that pushes samples onto `window.__P` and
read it back — that is how every timing number in this file was produced.

Two things that produced wrong answers here:

- **`--virtual-time-budget` is not reliable for this.** It reported
  `nChars: 0` (as if SplitText never ran) and deduplicated frames that were
  genuinely different. Use real time.
- **Parse the transform carefully.** A regex for the first number in
  `translate3d(...)` matches the **3** in `translate3d`, and the browser
  normalises `calc(X% - 0px)` to `calc(X% + 0px)`, so a sign-blind pattern
  silently reports zero motion.

---

## Still open

- **GIFs/screenshots** for PRD Decomposer, Blog Engine and NFC Cards. Drop in
  `public/work/`, set `image:` on the project in `src/data/site.ts`.
- **The FAQ** — drafted in `src/data/site.ts`, not rendered. Approve the
  wording and wire it up; see the AEO / GEO section.
- **A second free tool.** The schema generator is live at `/tools/schema`. The
  better lead magnet is an "audit my site's AI visibility" checker, but it
  needs a Cloudflare Worker for the cross-origin fetch.
- **Case studies** — still the highest-value writing left, above more blog
  posts. Six projects, nothing written about any of them.
- **NAP inconsistency** — this site says `hello@adnankhan.tech`, the old one
  says `adnandelhi2004@gmail.com`. One needs picking; it is in the JSON-LD.
- **SEO phases 2–4** — see `SEO-PLAN.md`. Search Console + Google Business
  Profile are the two that matter most and are not done.
- **588KB of JS** across 8 chunks. Left alone deliberately; cutting it means
  dropping GSAP or code-splitting `Motion`, and that is worth doing against a
  real device measurement rather than a guess.
