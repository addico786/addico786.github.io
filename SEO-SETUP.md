# SEO Setup — What You Need To Do By Hand

Everything in code is done. This file covers the parts that need a real human
logged into a real Google account. Same format as the Urban Tech Buildings
setup doc — follow it top to bottom.

**Do the steps in order. Step 1 has to happen before Step 2 will work.**

---

## Before you start — pick one email address

`adnankhan.tech` says **`hello@adnankhan.tech`**. The old site on `master` says
**`adnandelhi2004@gmail.com`**. Both are live, and both are inside structured
data on their respective sites.

That split is not cosmetic. Your name, address and email are the signals Google
and every AI assistant use to decide that all of these pages describe the *same
person*. Two contact addresses is evidence that they might not.

**Pick one and make it identical everywhere** — site, GitHub, LinkedIn, X,
Instagram, every directory. If you keep `hello@adnankhan.tech`, confirm the
mailbox actually receives mail before you point anything at it. Nothing else in
this document matters as much as this, and it takes ten minutes.

---

## Step 1 — Verify in Google Search Console

Search Console is Google's free dashboard: what people searched to find you,
what is indexed, what is broken. You cannot do SEO without it.

1. Go to **https://search.google.com/search-console** and sign in.
2. Property dropdown (top-left) → **Add property**.
3. Choose the **left-hand box, "Domain"** — not URL prefix.

   For this site the Domain property is the right call, and it is the opposite
   of the advice in the Urban Tech doc. The reason is that your DNS is already
   on Cloudflare, so adding the record takes about a minute, and a Domain
   property covers `www`, non-`www`, `http` and `https` in one property instead
   of four.

4. Type `adnankhan.tech` (no `https://`, no `www`) and continue.
5. Google shows you a **TXT record**. Copy the value.
6. In the Cloudflare dashboard → your domain → **DNS** → **Add record**:
   - Type: `TXT`
   - Name: `@`
   - Content: the value you copied
   - Save.
7. Confirm it is live before clicking Verify:

   ```bash
   dig +short TXT adnankhan.tech | grep google-site-verification
   ```

8. Back in Search Console, click **Verify**.

**If it fails**, DNS has not propagated. Re-run the `dig` above. Do not delete
the record and start over — wait and click Verify again. **Leave the record in
place permanently**; Google re-checks it and removing it un-verifies you.

---

## Step 2 — Submit the sitemap

Already built and live at `https://adnankhan.tech/sitemap.xml`, listing the home
page, `/blog`, and every post. You just have to tell Google.

1. Search Console → left sidebar → **Sitemaps**.
2. In "Add a new sitemap", type just: `sitemap.xml`
3. Submit.

"Couldn't fetch" on day one usually means Google has not gotten to it. Check
again the next day before worrying.

---

## Step 3 — Request indexing for the pages that matter

1. Top search bar, "Inspect any URL".
2. Do these five, one at a time, clicking **Request Indexing** on each:
   - `https://adnankhan.tech/`
   - `https://adnankhan.tech/blog`
   - `https://adnankhan.tech/blog/what-a-website-costs-in-india`
   - `https://adnankhan.tech/blog/invisible-to-ai-search`
   - `https://adnankhan.tech/blog/your-website-has-a-second-audience`

It is rate-limited, so do not do this for everything you ever publish. The
sitemap covers the rest.

---

## Step 4 — Check the structured data actually parses

The site now ships a linked entity graph (Person + ProfessionalService +
WebSite), an FAQPage on the home page, and BlogPosting on every post. Confirm
Google reads it:

1. Go to **https://search.google.com/test/rich-results**
2. Test `https://adnankhan.tech` — you should see **FAQ** detected, with all six
   questions.
3. Test one post URL — you should see **Article**.

If FAQ does not appear, the usual cause is that the visible answers and the
markup have drifted apart. They are generated from the same array in
`src/data/site.ts`, so that should not happen — but if you ever hand-edit one
without the other, this is where it shows up.

---

## Step 5 — Google Business Profile

For local intent — "web developer near me", "freelance developer Delhi" — this
is worth more than everything above combined, and it is now also one of the main
sources AI assistants use when someone asks for a developer in your city.

1. **https://business.google.com** → create a profile.
2. Category: **Website Designer**. Add "Web Developer" and "Internet Marketing
   Service" as secondary.
3. You are a **service-area business**: set service area to **Delhi NCR**, and
   hide the street address. You do not receive visitors.
4. Fill in *every* field. Services (use the same five from the site), hours,
   description, photos.
5. Use the **exact same** name and email as the site. Character for character.

Verification is by postcard, phone or video call and needs a real address, even
a hidden one.

Once it is live, ask past clients for reviews — steadily, not ten in one week.
Review text is a major input to how AI assistants describe you.

---

## Step 6 — Check what the AI assistants say about you

New, and not in the old template, because it did not matter a year ago. Roughly
60% of searches now end without a click, so ranking alone will lie to you.

Once a month, ask **ChatGPT, Gemini and Perplexity** something a client would:

- "freelance web developer in Delhi"
- "who can build a Next.js site for a small business in India"
- "hire a technical SEO consultant Delhi NCR"

Note whether you appear at all, and whether what they say about you is
**correct**. This is the only direct read you have on whether the AEO work is
landing. If they describe you wrongly, the fix is almost always NAP consistency
(see "Before you start") or a missing Business Profile.

---

## Step 7 — What to expect, and when

**SEO is slow.** This is the part people get wrong.

| When | What you should see |
|---|---|
| Same day | Search Console verified, sitemap submitted |
| 2–7 days | Home page and `/blog` indexed. Search `site:adnankhan.tech` |
| 2–4 weeks | All posts indexed. Performance tab shows real queries |
| 2–3 months | Movement on long-tail terms — the pricing post first, it has the least competition |
| 3–6 months | Movement on "freelance web developer delhi" and similar |

An empty Performance tab in week one is normal, not a bug. Do not change
anything because of it.

**Read Performance sorted by impressions, not clicks.** Queries with impressions
and no clicks are the pages you should write next.

---

## Things deliberately NOT done, and why

Do not "fix" these without reading the reason:

- **No Google Analytics.** No GA4 property exists yet. A fake measurement ID
  does nothing except look like it is working. Create the property and say the
  word — the events worth tracking are email click, social click, project row
  expand, and blog post read.
- **No review or star-rating markup.** You have no attributable public reviews
  yet. Star ratings in structured data without real named reviews behind them is
  precisely what Google issues manual penalties for. Collect them on the
  Business Profile first; then this becomes safe and very valuable.
- **No `llms.txt` retainer, and low expectations for the file itself.** It is
  generated at `/llms.txt` because it costs nothing. Ahrefs found 97% of these
  files drew zero traffic in May 2026 and no major assistant documents it as a
  citation signal. It is not where the AI visibility comes from — the entity
  graph and the FAQ are.
- **No service or location pages yet.** `SEO-PLAN.md` Phase 3 still calls for
  `/services/*` and two location pages. The blog is the part of Phase 3 that is
  now done; those are not.
- **No case studies.** Six projects, still nothing written about any of them.
  This is the highest-value writing left, above more blog posts.

---

## Quick reference

| Thing | Where |
|---|---|
| Live site | https://adnankhan.tech |
| Blog | https://adnankhan.tech/blog |
| Sitemap | https://adnankhan.tech/sitemap.xml |
| Robots | https://adnankhan.tech/robots.txt |
| llms.txt | https://adnankhan.tech/llms.txt |
| Search Console | https://search.google.com/search-console |
| Business Profile | https://business.google.com |
| Test structured data | https://search.google.com/test/rich-results |
| Test link previews | https://developers.facebook.com/tools/debug/ (WhatsApp uses this) |
| Test page speed | https://pagespeed.web.dev |
