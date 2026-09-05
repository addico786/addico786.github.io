# Future Tasks — adnankhan.tech

Written 2026-09-05, after finishing the Urban Tech Buildings project.

Live source is **this branch** (`next-portfolio`), built by Cloudflare.
`master` is the old static site — stale, and ~14 MB of images there 404 on live.

---

## 1. Testimonials section

### Get the testimonial first

Ask Umar Farooq on WhatsApp, a few days after handover, separate from any money talk.
**Offer him a draft** — he will edit, he will not write from blank:

> "Adnan built our website from scratch and handled everything technical so we didn't
> have to. He explained things clearly, delivered what he said he would, and we now get
> enquiries straight to our email."

**Ask for three things in the same message:**
1. The quote
2. **Explicit permission to use his name and business name** — this is what turns it
   from decoration into an asset
3. A photo of a completed project

If he answers on a call, ask him to send it on WhatsApp so it exists in writing.

### `src/data/site.ts` — add after `projects`

Follows the existing data-driven pattern, same shape conventions as `projects[]`:

```ts
  /** Client words. Real, attributed, with permission. Never invent one. */
  testimonials: [
    {
      quote:
        "Adnan built our website from scratch and handled everything technical so we didn't have to. He explained things clearly, delivered what he said he would, and we now get enquiries straight to our email.",
      name: "Umar Farooq",
      role: "Urban Tech Buildings",
      href: "https://urbantechbuildings.com",
      linkLabel: "urbantechbuildings.com",
    },
  ],
```

### `nav` — insert before "Say hello"

Indices are sequential, so renumber:

```ts
  nav: [
    { label: "About",     hover: "Delhi",   href: "#about",   index: "01" },
    { label: "Work",      hover: "Seven",   href: "#work",    index: "02" },
    { label: "Words",     hover: "Clients", href: "#words",   index: "03" },
    { label: "Journal",   hover: "Writing", href: "/blog",    index: "04" },
    { label: "Say hello", hover: "Email",   href: "#contact", index: "05" },
  ],
```

### Section markup

Place between `#work` and `#contact`. Uses the conventions already on the page —
`u-shell u-section u-gutter`, `u-mono` kicker, `Reveal`/`SplitText` for motion:

```tsx
<section id="words" className="u-shell u-section u-gutter" data-inview="true">
  <p className="svc__kicker u-mono ds-fade-up">What clients say</p>

  <ul className="tst__list">
    {site.testimonials.map((t, i) => (
      <li className="tst" key={t.name}>
        <blockquote className="tst__quote">{t.quote}</blockquote>
        <figcaption className="tst__by ds-fade-up" style={{ "--i": i } as React.CSSProperties}>
          <span className="tst__name">{t.name}</span>
          <span className="tst__role u-mono">{t.role}</span>
          {t.href && (
            <a className="tst__link u-mono" href={t.href} target="_blank" rel="noopener">
              {t.linkLabel}
            </a>
          )}
        </figcaption>
      </li>
    ))}
  </ul>
</section>
```

### ⚠️ Do NOT add Review schema

Verified: since 2019, restated December 2025, Google does **not** show star rich results
for **self-serving reviews** — a review about you, hosted on your own site — under
`LocalBusiness` or `Organization`. This covers written testimonials *and* embedded
third-party review widgets.

No penalty. It simply does nothing. Do not waste time on it in `SchemaBuilder.tsx`.

**Stars come from Google Business Profile reviews.** See task 2.

### What makes a testimonial work

- **Full name + business name.** Anonymous reads as invented.
- **A specific outcome**, not an adjective. *"we now get enquiries straight to our
  email"* beats "great to work with".
- **Link the live site.** Strongest proof is the work itself, one click away.
- One real testimonial is enough. Never pad with invented ones.

---

## 2. Google Business Profile ⭐ highest value

**You have no Business Profile**, so no client can leave you a Google review — and
Google reviews are the only route to stars in search for a local service business.

- Name: `Adnan Khan — Web Developer`
- **Service-area business.** In signup, answer **No** to *"Do you want to add a
  location customers can visit?"*. Address stays hidden; only areas show.
- Verification still needs a real address on the back end. **Home address works.**
  No PO box, no virtual office — those get profiles suspended.
- Category: Web Designer / Web Developer
- Areas: Delhi, Gurugram, Noida, Faridabad, Ghaziabad

**Then ask Farooq to review you there.** Worth more than the on-site testimonial,
because it shows where prospects actually look.

---

## 3. Case study: Urban Tech Buildings

A real portfolio piece, currently unwritten. **The before/after is the value** —
"built a website" is not a case study:

| Before | After |
|---|---|
| No sitemap, no robots.txt | Both live, 21 URLs |
| Zero structured data | `GeneralContractor`, `Service`, `BlogPosting`, `BreadcrumbList` |
| No canonical tags | Every page |
| 3 favicons **404ing on production** | Fixed |
| `www` and non-www both 200, no redirect | 301, duplicate content resolved |
| 759 KB logo on every page | 12 KB |
| `.htaccess` forcing `no-store` | Tiered caching + gzip |
| Not in Google at all | **All 13 pages indexed within 2 days** |

Include the honest part: 7-day data showed **0 of 9 queries had commercial intent**,
which is why the follow-up was 5 city pages and 3 buyer-intent articles. That reads as
someone who measures and adjusts, not someone who ships and leaves.

The project already has a `utb.webp` shot in `public/work/`, so the image exists.

---

## 4. Smaller things

- **Search Console for `adnankhan.tech`** — add a Domain property via DNS TXT if there
  isn't one. You sell SEO; your own site should be measured.
- **LinkedIn recommendation** from Farooq as well. Different audience, same one ask.
- **Clean up `master`** — it holds ~14 MB of stale images (`project-5.jpg` alone is
  9 MB) that 404 on live. Delete them or archive the branch.
