# Context

Why this codebase is shaped the way it is. `README.md` covers how to run and
edit it; this file covers the decisions and the traps — the things that cost
time to learn and are not visible in the code.

Every number here was measured, not estimated. Where something was tried and
rejected, the reason is written down so it does not get retried.

---

## What this site is for

It is a **freelance client-acquisition site**, not a job-hunting portfolio.
That is the reason for the services list, the certifications, the
`ProfessionalService` + `OfferCatalog` JSON-LD, and the "say hello" framing.
The reader to design for is someone deciding whether to hire, not someone
grading engineering.

The older job-seeking portfolio still lives on the `master` branch. **Leave
that branch alone.**

---

## Architecture

**Static export.** `output: "export"`, and `build` is
`next build && rm -rf dist && mv out dist`, because Cloudflare Pages is already
configured to publish `dist`. `sitemap.ts` and `robots.ts` both need
`export const dynamic = "force-static"` or the export fails.

This is Next 16. `params` in a dynamic route is a `Promise` and must be
awaited. `AGENTS.md` is right that the APIs differ from older Next — check
`node_modules/next/dist/docs/` before assuming.

### The client components, and why each exists

There are five, and the split is deliberate:

| file | on | carries | why separate |
|---|---|---|---|
| `Motion.tsx` | home only | GSAP, Lenis, ScrollTrigger | the whole animation engine |
| `SplitText.jsx` | home only | GSAP SplitText | vendored, see below |
| `MenuOverlay.tsx` | every page | nothing heavy | one menu, not two |
| `Reveal.tsx` | non-home pages | nothing heavy | the reveal observer alone |
| `SchemaBuilder.tsx` | `/tools/schema` | nothing heavy | the free tool |

**All page motion is in `Motion.tsx`**, deliberately in one client component.
The source site coordinated its opener, scroll loop and nav from a single
`boot()`, and splitting them here reintroduced races between the opener and
the hero reveal. One `useGSAP` effect, one rAF loop.

**`SplitText.jsx` is vendored verbatim** from React Bits (plus `"use client"`),
with types in a sibling `.d.ts`, so it can be re-pulled upstream without a
merge. Its two empty `catch` blocks are intentional — leave them.

**Content lives in `src/data/site.ts`.** Nothing else holds copy. The hero
lines, services, projects, footer columns, nav and the structured data all
derive from it — add a service and it enters the `OfferCatalog` automatically.
Adding or deleting a project is an edit to one array; the numbering (`01`,
`02`…), the marquee's spelled-out count and the `llms.txt` listing all follow.

---

## Navigation, and the one menu

**There is one mobile menu, not two.** `MenuOverlay.tsx` renders the
`[data-overlay]` panel and owns its open/close on every page; the home page and
`PageBar` both mount it. It used to exist twice — home's GSAP overlay and a
CSS-checkbox sheet on the inner pages — which looked and behaved differently on
the same site, and that is a bug a visitor notices immediately.

- Its `home` prop only picks between `#about` and `/#about`, because
  `Motion.tsx` only intercepts `a[href^="#"]`. A bare hash on an inner page
  would go nowhere; a slashed one on home would reload the page.
- Lenis lives in Motion and only on the home page, so the panel asks for the
  scroll pause with a `menu:open` / `menu:close` event rather than importing
  it. Motion listens; nothing else needs to know Lenis exists.

**Two bars, on purpose.** Home has `[data-menu]`, which hides until you are
past the hero. Inner pages have `.bar` from `PageBar.tsx`, which is sticky and
always present because an inner page has no hero to hide behind. They share
`[data-burger]`'s geometry and the same 820px breakpoint where inline links
give way to the burger. If you change one breakpoint, change both — at 700 vs
820 they disagreed and both showed at once between those widths.

**`.bar` must not carry a `backdrop-filter`.** A filtered element becomes the
containing block for `position: fixed` descendants. With the panel nested
inside a blurred bar, its `inset: 0` resolved to the ~50px bar instead of the
viewport and the panel rendered transparent. It is a solid colour now, which
also buys nothing less visually.

---

## The footer

It earned its own section.

**`[data-footer]` is only sticky when it fits.** It uses
`position: sticky; bottom: 0` so the body scrolls off it rather than pushing it
down. That trick only works while the footer is **shorter than the viewport**:
a sticky element pinned with `bottom: 0` that is taller than the scrollport has
its top pushed above the viewport with no scroll left to reach it.

Stacked into one column on a phone the footer ran ~880px against a 640px
screen, so the entire Contacts block — the email and every social link — was
unreachable at *every* scroll offset. Walking the whole scroll range in 40px
steps on the live site before the fix:

| viewport | contact links ever visible |
|---|---|
| 360×600 | **0 of 5** |
| 360×640 | 1 of 5 |
| 390×667 | 1 of 5 |
| 412×732 | 3 of 5 |

Sticky is now guarded to `min-width: 1000px` **and** `min-height: 760px`.
Below that the footer is an ordinary block in flow, which can always be
scrolled to. **If the footer ever grows, re-check that guard.**

**The columns pair below 1000px.** Contacts and the sign-off span the full
width; Credits and Elsewhere sit side by side. Stacked, all four ran in a
single strip with the right half of the screen empty behind a column rule.
Pairing took the footer from 876px to 686px with nothing removed.
`.foot__credits li` also drops to one column there — its name/role sub-grid
wants 194px and a half column on a 360px phone gives it 150.

---

## Motion: the tuning knobs

All in `Motion.tsx`. These were arrived at by measurement, not taste.

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

**The opener only plays from the top.** Motion skips it when `scrollY > 2` or
there is a hash. A reload halfway down restores the scroll position, and the
intro used to play full-screen for ~2.7s before handing back a page nobody was
looking at; a `/#about` deep link did the same. Scroll restoration lands
*around* hydration rather than before it, so the check runs again two frames in
— that deferral is load-bearing, not defensive padding.

### Marquee — two channels, and a breakpoint

The single most-revised piece of the site. The strip is **8165px wide at 1440,
~2381px at 390** (it scales with the font clamp), and the transform is a
**percentage of that width**, so small numbers go a very long way.

Above 820px it runs on two channels, because "how far it travels" and "how
obviously the scroll drives it" are different problems that one rate cannot
serve — turn it up and it races, down and it reads as drifting on its own:

| | driven by | contributes | value |
|---|---|---|---|
| `MARQUEE_RATE` | scroll **position** | net travel | 0.015 → 1.22 px/px |
| `MARQUEE_KICK` | scroll **velocity**, clamped, springs to 0 | the scroll feel, **zero** distance | 70px |

The phase is keyed to the strip's **entry into the viewport** (`vh * 0.5`), not
absolute `scrollY`. Keyed to `scrollY`, whatever phase the strip happened to be
in when it scrolled into view is where it stayed — which is why the phrase used
to start mid-word.

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

### Reveal

**`Reveal.tsx` is the reveal observer without the rest of the engine.** Same
contract as Motion's copy — `data-inview` on a container, `ds-fade-up` on what
rises, `--i` for order — so the journal and the tool animate like the rest of
the site without the ~130KB animation bundle. Before it existed those pages sat
completely still, because Motion owns the observer and only mounts on home.

It deliberately **drops Motion's `-10%` bottom `rootMargin`**. That margin
shrinks the root, so anything in the last tenth of the page can never reach the
threshold — which left the journal's own footer permanently invisible. Home
does not hit this because nothing `data-inview` sits that low there.

---

## The accessibility floor

Not aspirational; these are checked and currently pass. Re-check after layout
work.

- **Nothing JS-only may hide content by default.** Everything the intro hides
  is gated behind `.js`. The bootstrap timer in `layout.tsx` stamps
  `reveal-failed` on **any** page after 4s, and `intro-failed` only where there
  is an opener to rescue. Those two flags are deliberately separate:
  `intro-failed` tells Motion the intro already ran, and stamping it on
  `/blog` is exactly what made the opener stop playing on the next trip home.
  Motion and Reveal each clear the timer as the first statement in their
  effect. **Test with scripts disabled before touching any of it.**
- **24px minimum on standalone links** (WCAG 2.5.8). The footer and journal
  links were 18–19px. The fix adds `padding-block` and gives the row gap back
  exactly what the padding adds, so the visual rhythm is unchanged; the
  underline `::after` offset is re-based on the padding. Links inline in a
  sentence are exempt and are left alone.
- **Every focusable thing shows a ring.** `[data-work-row]` needs its own
  `:focus-visible` rule: its `all: unset` resets `outline` to none, and that
  block sits later in the file than the root `:focus-visible` at equal
  specificity, so the seven work rows took keyboard focus invisibly.
- **Contrast passes AA in both themes** at every text size on every page.
  Note when re-testing: the tokens resolve to `lab()`, so a script that parses
  `getComputedStyle().color` as sRGB will report nonsense. Rasterise the colour
  to a 1×1 canvas and read `getImageData` instead.
- The hover-swap is accessible: the real text is a `ds-sr-only` span and both
  visual layers are `aria-hidden`. Keep that shape if you touch `[data-swap]`.

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

**Blog routes ship no GSAP.** Measured from the chunks the HTML actually
references, uncompressed: 709KB on home against 564KB on `/blog`, and the
145KB gsap+lenis chunk is referenced only by `index.html`. Over the wire from
production with brotli it is ~236KB on home and ~180KB on `/blog`.

What those pages do carry is `MenuOverlay`, `Reveal` and the React/Next
hydration baseline a static export cannot drop — **do not describe them as
"zero JS", because they are not.** They *are* fully readable with JS disabled,
which is the claim one of the posts makes, so that has to keep holding.

**Tables get wrapped.** `withScrollableTables` in `posts.ts` puts every
`<table>` in a `.prose__scroll` div. The prose column is 40rem and a
four-column price table is not — without this the page body scrolls
horizontally on a phone.

Reading time and post ordering are derived, never written by hand. Dates are
deliberately staggered so the pricing post leads.

**Every page needs its own `openGraph.images`.** Next replaces the parent's
`openGraph` wholesale when a page defines its own, so a page that sets
`openGraph` without images ships none — and a `summary_large_image` card with
no image renders as a blank box. `layout.tsx` exports `OG_IMAGE`; all four page
types pull it in. This is easy to reintroduce when adding a route.

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

**`/llms.txt` is generated, and is not expected to do much.** Ahrefs found 97%
of these files drew zero traffic in May 2026 and no major assistant documents
it as a citation signal. It is a route handler so it cannot rot; that is the
only reason it is cheap enough to keep.

`robots.ts` names the answer-engine crawlers explicitly. `User-agent: *`
already allows them, so this changes no behaviour — it is there so a future
tightening of the wildcard cannot silently lock the assistants out.

---

## The free tool

`/tools/schema` — a local business JSON-LD generator. `SchemaBuilder.tsx`.

It exists to earn links and rank for a real keyword, but the reason to prefer
it over the twenty other schema generators is one checkbox: **"I visit clients
— I do not receive them."** Ticking it drops `streetAddress` and `postalCode`
while keeping `addressLocality` and `addressCountry`. Most generators offer
all-or-nothing, so a service-area business either publishes a home address or
drops the address block entirely and loses the local signal. This was a real
blocker on the Urban Tech Buildings project.

Its warnings are warnings, not validation errors — the output stays valid
JSON-LD from an empty form onwards, and the warnings clear as fields fill.

`"email": "mailto:…"` is **correct and deliberate**: schema.org's own example
for that property uses the `mailto:` form. Community posts claim otherwise;
they are wrong, and this has been checked against the spec twice now.

Everything runs in the browser; nothing is uploaded, and the page says so. Keep
it that way — the moment it posts anywhere it needs a privacy policy and stops
being a five-minute tool.

---

## Copy decisions that look like style but are not

- **The primary CTA leads with the action.** It rests on "Start a project" and
  swaps to "Available for work" on hover — not the other way round. `ds-swap`
  needs `:hover`, which a phone does not have, so with the labels reversed
  every mobile visitor met a status with no verb in it where the page's main
  call to action should be. The accessible name follows the resting text.
- **Work rows name a destination.** Live projects show their domain
  (`readingspace.in`); repos show "Source on GitHub". A raw slug like
  `addico786/signoz_observability_project` is noise to someone buying a
  website, and this page's audience is buying websites.
- **The journal has its own search title**, separate from the on-page kicker.
  "Journal — Adnan" was 15 characters that spent none of the title tag on what
  the journal is about.
- **Project blurbs describe what is actually in the repo.** The Ansible entry
  promised a database tier; `deploy.sh` calls `database.yml` but that playbook
  is not committed, so anyone opening the repo would not find it.

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

**Chunk filenames change between builds.** Do not poll a fixed
`/_next/static/chunks/<name>.js` to detect a deploy — after a rebuild that URL
404s and returns the ~16KB HTML fallback, which passes a naive byte check.
Pull the chunk list out of the live HTML, find the one containing your code,
then compare.

**Grid stacking.** `[data-grid]` must sit above `[data-scroller]` (z-index 4
vs 3) or the column rules only survive on the hero.

**Verify at 390px *and* 360px, not just 1440.** Several rounds of marquee work
were spent tuning on desktop while the actual complaint was about a phone, and
the footer bug above was invisible at 390×844 while being total at 360×600.

**Emulating a small screen is not emulating a phone.** `setDeviceMetricsOverride`
alone leaves `(hover: hover)` matching, so Lenis stays on and hover states
apply — the desktop code path. Add `setTouchEmulationEnabled` and emulate
`hover: none` / `pointer: coarse`, or mobile-only bugs will not reproduce.
This is how the footer bug survived two rounds of "verified".

**`performance.getEntriesByType('resource')` can return stale entries** when
driving navigation over CDP, which reported the blog loading GSAP when it does
not. For bundle questions, read the chunk list out of the built HTML instead.

**Adding a project touches one array and one hardcoded word.** The numbering,
the marquee's spelled-out count and the `llms.txt` listing all derive from
`site.projects`. The nav's hover word does not — `site.nav` has
`{ label: "Work", hover: "Seven" }` written out. **It is the only count on the
site that can silently go stale.** There are currently seven projects.

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

For a layout question, **prove reachability rather than presence**. "The
element is in the DOM at opacity 1" is not "a person can see it": walk the
scroll range in steps and assert the element is fully inside the viewport at
some offset. That distinction is the entire footer bug.

Three things that produced wrong answers here:

- **`--virtual-time-budget` is not reliable for this.** It reported
  `nChars: 0` (as if SplitText never ran) and deduplicated frames that were
  genuinely different. Use real time.
- **Parse the transform carefully.** A regex for the first number in
  `translate3d(...)` matches the **3** in `translate3d`, and the browser
  normalises `calc(X% - 0px)` to `calc(X% + 0px)`, so a sign-blind pattern
  silently reports zero motion.
- **`link[rel=canonical].href` normalises a trailing slash onto a root URL.**
  Read `getAttribute('href')` before concluding it disagrees with the sitemap.

---

## Deploying

Cloudflare Pages project `addico786-github-io`, production branch
**`next-portfolio`**, building `npm run build` → `dist`. `master` is the old
year-old site; leave it alone. `CNAME` and `resume.pdf` live only in the
deploy repo and **must never be overwritten** — that is what the excludes below
are for.

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

## Still open

Ordered by what would move the needle most.

- **Testimonials.** There are none anywhere on the site, and for a freelance
  page this is the largest single conversion gap. Urban Tech Buildings and
  Readingspace are real clients; one quoted line each would do more than any
  further engineering. Needs real quotes — do not write them.
- **A pricing signal.** The blog post covers costs; the site itself gives none.
  "Projects start at ₹X" removes real friction, but it is Adnan's number.
- **A second contact channel.** Email is the only one. In India WhatsApp is
  where business happens; a `wa.me` link is a one-line change once there is a
  number to point it at.
- **The FAQ** — drafted in `src/data/site.ts`, not rendered. Approve the
  wording and wire it up; see the AEO / GEO section.
- **Case studies.** Every project now has a shot and a blurb; none has a
  write-up. Higher value than more blog posts. The three DevOps shots were
  taken by running the repos — InfraPilot's Vite frontend, `agent.py` against a
  local Ollama with the SigNoz compose stack behind it, and the playbooks
  against three throwaway Ubuntu containers over the `community.docker`
  connection — so any of them can be retaken.
- **`database.yml` is missing from the Ansible repo.** `deploy.sh` calls it.
  Push it and the Three-Server Deploy blurb can go back to the fuller claim.
- **NAP inconsistency** — this site says `hello@adnankhan.tech`, the old one
  says `adnandelhi2004@gmail.com`. One needs picking; it is in the JSON-LD.
- **SEO phases 2–4** — see `SEO-PLAN.md`. Search Console and Google Business
  Profile are the two that matter most and are not done.
- **A second free tool.** The better lead magnet is an "audit my site's AI
  visibility" checker, but it needs a Cloudflare Worker for the cross-origin
  fetch.
- **The JS baseline.** ~236KB over the wire on home, ~180KB on the blog. Left
  alone deliberately; cutting it means dropping GSAP or code-splitting
  `Motion`, and that is worth doing against a real device measurement rather
  than a guess.
