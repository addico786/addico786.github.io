---
title: Your business is invisible to AI search. Here is what actually fixes it.
description: Six in ten searches now end without a click. What that means if you run a small business, where AI assistants really get their answers, and the one fix everyone is about to try selling you that does nothing.
date: 2026-08-27
kicker: Search
---

For about fifteen years the goal was simple: rank on page one, get the click.
That deal is quietly being cancelled.

Roughly **60% of Google searches now end without anyone clicking through to a
website**, and AI Overviews — the generated summary above the results — appear
in around **89% of brand-related searches**. Your customer asks a question,
reads an answer assembled from several sources, compares options inside Google,
and decides. Your site may have been one of those sources and still received
nothing you can see in analytics.

This is not the death of SEO. It is a change in what you are optimising *for*.
You used to compete for a position. You now compete to be **the source the
answer is built from**.

## Where AI assistants actually get local answers

This is the part that surprises business owners, so I will put it plainly:

> For a local business, your Google Business Profile now matters more than your
> website does.

Google Business Profile signals carry roughly **32% of local ranking weight**,
and it is not just Google. When someone asks ChatGPT, Gemini or Perplexity for
a plumber in Lajpat Nagar or a dentist in Noida, the model is drawing on your
Business Profile, your reviews, directory listings, local press and community
sites like Reddit — then reconciling all of it into one description of you.

Which means the thing that sinks most small businesses is not bad content. It
is **inconsistency**. Three different phone numbers across four directories, a
business name with “Pvt Ltd” on some listings and not others, an old address
still live on JustDial. A human visitor shrugs at that. A model treats it as
evidence that it is not sure who you are, and describes you vaguely or not at
all.

## The fix list, in the order that matters

**1. Claim and fill the Google Business Profile completely.** Every field.
Categories, service area, hours, services, photos. This is free, it takes an
afternoon, and for most local businesses it will do more than anything else on
this list.

**2. Make your name, address and phone number identical everywhere.** Character
for character. Pick one canonical form and force it across your site, your
Business Profile, and every directory you appear in. If you have an old site
still live with an old email on it, that is actively working against you.

**3. Ask for reviews, steadily.** Review velocity — a consistent trickle — is
read differently from thirty reviews in one week two years ago. And AI
summaries lean heavily on review text, which means the *words* your customers
use become the words the model uses about you.

**4. Answer the question in the first two sentences.** Models extract; they do
not read your build-up. If a page takes four paragraphs to get to the point,
the point is what gets left behind. Put the answer first, then justify it.

**5. Add structured data.** `LocalBusiness` or `ProfessionalService` schema,
with your address, service area and offerings marked up in JSON-LD. This is how
you state facts about yourself in a form that does not depend on a model
correctly interpreting your page layout. It is the highest-leverage technical
change on this list and most small business sites still do not have it.

**6. Be citable.** Publish the specific, checkable things nobody else in your
category will: real prices, real timelines, real constraints. Vague marketing
copy is unusable as a source. A page with a number on it is a page an answer
can be built from.

## The thing you are about to be sold

`llms.txt` — a file you put at the root of your site to tell AI models what
matters on it. Expect to hear about it from every agency in the next six
months.

Here is what the evidence says. Ahrefs studied **137,000 sites and found that
97% of `llms.txt` files received zero traffic** in May 2026. No major AI
platform documents it as a citation signal, and Google's John Mueller has been
publicly unenthusiastic. Anthropic has adopted it; most have not.

It costs about ten minutes to add and it will not hurt you. But if someone
quotes you a monthly retainer for “LLM optimisation” and the deliverable is
this file, you are paying for a text file. Pay for the six things above
instead.

## What to actually measure

Rankings alone will now lie to you, because you can hold position three and
watch clicks fall as the summary above answers the question.

- In **Search Console**, sort by impressions rather than clicks. Queries with
  impressions and no clicks tell you where you are being read but not visited —
  and where you should write the page that gets cited instead.
- Every month or so, ask ChatGPT, Gemini and Perplexity a question a customer
  would ask, in your city. See whether you appear, and whether what they say
  about you is correct. This takes five minutes and it is the only direct read
  you have on whether any of this is working.
- Track **conversions, not sessions**. In a zero-click world, less traffic that
  converts better is the normal shape of a good month.

## The uncomfortable summary

Doing all of this well means fewer visitors who are more likely to buy, and a
dashboard that looks worse than it did in 2021. That is not a failure state.
That is what winning looks like now.

## Sources

Zero-click and AI Overview figures from
[GoodFirms' 2026 AI SEO statistics roundup](https://www.goodfirms.co/resources/seo-statistics-ai-search-rankings-zero-click-trends)
and [HubSpot on answer engine optimisation](https://blog.hubspot.com/marketing/answer-engine-optimization-trends).
Local ranking weight and AI sourcing behaviour from
[Kodetimize's 2026 India local SEO checklist](https://kodetimize.com/local-seo-checklist-india-2026/)
and [ShoutNHike on AI Overviews for Indian businesses](https://www.shoutnhike.com/blog/google-ai-overviews-seo-indian-businesses/).
The `llms.txt` study is Ahrefs', reported in
[LLM Pulse's guide](https://llmpulse.ai/blog/llms-txt-guide/); Mueller's comments are covered
[here](https://www.webyes.com/blogs/does-llms-txt-improve-rankings/).
