# Future Tasks — adnankhan.tech

Written 2026-09-05, after finishing the Urban Tech Buildings project.

---

## ⚠️ First: this repo is not what's live

`adnankhan.tech` resolves to **Cloudflare** (`server: cloudflare`), not GitHub Pages,
even though this repo holds a `CNAME` for it.

Evidence: the live site serves `/work/utb.webp` (200, 37 KB) and that file **does not
exist in this repo**. The live markup is a **Next.js static export**
(`/_next/static/chunks/…`), so `index.html` here is build output and cannot usefully
be hand-edited.

**Before doing any of the below, confirm which project actually deploys the site.**
Editing `index.html` here will change nothing that visitors see.

---

## 1. Add a testimonials section

**Where:** between `#work` and `#contact`.

### The copy

Ask Umar Farooq on WhatsApp, a few days after handover, separate from any money talk.
Offer him a draft — he will edit, he will not write from blank:

> "Adnan built our website from scratch and handled everything technical so we didn't
> have to. He explained things clearly, delivered what he said he would, and we now get
> enquiries straight to our email."
> — **Umar Farooq**, Urban Tech Buildings

**Get three things in the same message:**
1. The quote
2. **Explicit permission to use his name and business name** — this is what makes it an
   asset rather than decoration
3. A photo of a completed project, for the work section

If he answers on a call, ask him to send it on WhatsApp so it exists in writing.

### The markup

Matches the existing conventions on the site — `u-shell u-section u-gutter` on the
section, `u-mono` kicker, `ds-fade-up` for the reveal, `split-parent` on headings.

```html
<section id="words" class="u-shell u-section u-gutter" data-inview="true">
  <p class="svc__kicker u-mono ds-fade-up">What clients say</p>

  <ul class="tst__list">
    <li class="tst">
      <blockquote class="tst__quote split-parent">
        Adnan built our website from scratch and handled everything technical so we
        didn't have to. He explained things clearly, delivered what he said he would,
        and we now get enquiries straight to our email.
      </blockquote>
      <figcaption class="tst__by ds-fade-up" style="--i:0">
        <span class="tst__name">Umar Farooq</span>
        <span class="tst__role u-mono">Urban Tech Buildings</span>
        <a class="tst__link u-mono" href="https://urbantechbuildings.com"
           target="_blank" rel="noopener">urbantechbuildings.com</a>
      </figcaption>
    </li>
  </ul>
</section>
```

Add `#words` to the nav and the overlay menu alongside `#about`, `#work`, `#contact`.

### Do NOT add Review schema

Checked and confirmed: since 2019, restated December 2025, Google does **not** show star
rich results for **self-serving reviews** — a review about you, hosted on your own site
— under `LocalBusiness` or `Organization`. This covers written testimonials *and*
embedded third-party review widgets.

There is no penalty. It simply does nothing.

**Stars come from Google Business Profile reviews, not from on-site markup.** See task 2.

### What actually makes a testimonial work

- **Full name + business name.** Anonymous reads as invented.
- **A specific outcome**, not an adjective. *"we now get enquiries straight to our
  email"* beats "great to work with".
- **Link the live site.** The strongest proof is the work itself, one click away.
- One real testimonial is enough. Do not pad with invented ones.

---

## 2. Create a Google Business Profile ⭐ highest value

**You currently have no Business Profile**, which means no client can leave you a
Google review — and Google reviews are the only route to stars in search for a local
service business.

- Name: `Adnan Khan — Web Developer` (or similar)
- **Service-area business** — answer **No** to *"Do you want to add a location customers
  can visit?"* in the signup flow. Your address stays hidden; only the areas show.
- Verification still needs a real address on the back end. **A home address works.**
  No PO box, no virtual office — those get profiles suspended.
- Category: Website Designer / Web Developer
- Service areas: Delhi, Gurugram, Noida, Faridabad, Ghaziabad

**Then ask Farooq to leave a review there.** That one is worth more than the on-site
testimonial, because it appears in search results where prospects actually look.

---

## 3. Repo cleanup

These files are in the repo and **404 on the live site** — stale, unused, ~14 MB:

```
project-5.jpg    9 MB
project-3.jpeg   3 MB
project-2.png    1 MB
logo.png         1 MB
adnan.png        0.7 MB
```

No visitor impact (they aren't served), but they bloat every clone. Delete them, or
confirm this repo is dead entirely and archive it.

The live site's images are correctly optimised — `/work/*.webp`, 37 KB each. That part
is right.

---

## 4. Case study: Urban Tech Buildings

You now have a genuinely good portfolio piece and it is not written up.

**The before/after is the whole value** — "built a website" is not a case study:

| Before | After |
|---|---|
| No sitemap, no robots.txt | Both live, 21 URLs |
| Zero structured data on any page | `GeneralContractor`, `Service`, `BlogPosting`, `BreadcrumbList` |
| No canonical tags | Every page |
| 3 favicon files **404ing on production** | Fixed |
| `www` and non-www both serving 200, no redirect | 301, duplicate content resolved |
| 759 KB logo on every page | 12 KB |
| `.htaccess` forcing `no-store` on everything | Tiered caching + gzip |
| Not in Google at all | **All 13 pages indexed within 2 days** of sitemap submission |

Add the honest part too: 7-day data showed **0 of 9 queries had commercial intent**,
which is why the follow-up work was 5 city pages and 3 buyer-intent articles. That
reads as someone who measures and adjusts, not someone who ships and leaves.

---

## 5. Smaller things

- **Add `hello@adnankhan.tech` to the site** if it isn't there — it's the address on
  your invoices, so the two should match.
- **Check Search Console for `adnankhan.tech`.** If there is no property, add a Domain
  property by DNS TXT. You are selling SEO; your own site should be measured.
- **Ask for a LinkedIn recommendation** as well as the testimonial. Different audience,
  same one ask.
