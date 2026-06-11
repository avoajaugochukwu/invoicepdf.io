---
name: analytics-coaching
description: Read GA4 (Google Analytics 4) and Google Search Console to diagnose post problems. This is the skill for post-publish optimization on invoicepdf.io — what does it mean when an invoicing post has high impressions but low CTR, or high CTR but low time-on-page, or a strong opening but low scroll depth? GA is already wired via NEXT_PUBLIC_GA_ID (@next/third-parties GoogleAnalytics in the layout).
---

# Analytics Coaching — diagnose what the post is actually doing

> A post can be perfectly written and still underperform — and the data tells you specifically what's wrong. This skill is how to read GA4 + Google Search Console and translate the numbers into the specific writing / SEO fix to apply on an invoicepdf.io post.

---

## The two data sources

### Google Search Console (GSC)

Tells you what's happening *in the SERP* before the click:

- Impressions (how many times the post showed up in search results)
- Clicks (how many times someone clicked through)
- CTR (Clicks ÷ Impressions)
- Average position (1-100, where the post ranks for each query)
- Top queries the post ranks for

GSC is the "is the post discoverable and clickable" signal.

### Google Analytics 4 (GA4)

GA is already wired on this site (`NEXT_PUBLIC_GA_ID`, the `@next/third-parties` `GoogleAnalytics` component in the layout), so the data is flowing. GA4 tells you what's happening *on the page* after the click:

- Sessions / page views
- Engaged sessions (10+ seconds + scroll OR conversion)
- Average engagement time
- Scroll depth (if configured)
- Exit rate
- Conversions (e.g. clicks through to the invoicepdf.io generator, if configured as an event)

GA4 is the "does the post deliver after the click" signal.

Together: GSC tells you whether the post is *found and clicked*. GA4 tells you whether it *keeps the reader* and sends them to the generator.

---

## The five performance shapes

Every published post falls into one of five shapes. Each shape has a specific diagnosis and fix.

### Shape 1: HIGH IMPRESSIONS, LOW CTR (poor SERP attractiveness)

**What you see:**
- GSC: 1,000+ impressions, < 1% CTR, average position 5-15
- The post is being shown to people, but they're clicking competitors instead

Example: `how-to-send-an-invoice` shows up 4,000 times a month at position 8 but gets 30 clicks. Searchers are picking the QuickBooks and Wave results above it.

**Diagnosis:** the `title` and/or `description` aren't winning the click. Could also be a SERP feature (snippet, PAA) eating the click above the organic results.

**Fix:**
1. Search the target query yourself ("how to send an invoice") and look at the SERP
2. Read your `title` and `description` from a freelancer's perspective
3. Compare to the top 3 organic results — what are they offering that yours isn't?
4. Iterate on:
   - Front-loading the query in the `title`
   - Adding a modifier ("Step by Step", "+ Free Template", "[2026]")
   - Rewriting the `description` with active verbs and a specific promise ("Send a professional invoice by email, link, or PDF in under 2 minutes")
   - Bumping `date` if the post has been stagnant > 6 months
5. Wait 2-4 weeks. Compare CTR.

**Not the fix:** changing the body. The body is fine — Google ranks it — but the SERP listing isn't winning the click.

### Shape 2: LOW IMPRESSIONS, ANY CTR (poor discoverability)

**What you see:**
- GSC: < 100 impressions per month, average position > 20
- The post isn't ranking high enough to be seen

Example: `what-is-a-proforma-invoice` barely surfaces — buried at position 28.

**Diagnosis:** the post lacks topical authority signals or has technical SEO problems.

**Fix:**
1. Check internal linking — does this post receive links from siblings (`what-is-an-invoice-beginner-guide`, a commercial-invoice post)?
2. Check the slug — is the target query in it? (`what-is-a-proforma-invoice` ✓)
3. Check the `title` — is the target query in it?
4. Check the body — does "proforma invoice" appear naturally throughout, or only once?
5. Build internal links from 2-3 sibling posts to this one
6. Verify the post is in the sitemap and indexed (GSC → Pages / Indexing)
7. Wait 4-8 weeks. Re-check.

**Not the fix:** rewriting the body before fixing topical authority and indexing.

### Shape 3: HIGH CTR, LOW ENGAGEMENT TIME (the bounce shape)

**What you see:**
- GSC: 2-5% CTR (above average)
- GA4: average engagement time < 30 seconds, exit rate > 80%
- People click, see the page, and leave fast

Example: `what-does-net-30-mean-on-an-invoice` pulls a strong CTR, but readers bounce in 15 seconds.

**Diagnosis:** the `title` / `description` is over-promising or mis-framing, OR the answer is buried. A searcher Googling "what does net 30 mean" wants the answer in the first sentence; if the intro meanders, they leave.

**Fix:**
1. Read the `title` and `description`
2. Read the first paragraph
3. Do they match the query? If the title promises a plain-English answer and the intro opens with "Invoicing terminology can be confusing for many small businesses…", that's the mismatch.
4. Either:
   - Align the `title`/`description` to what the post delivers
   - Rewrite the opening to deliver the answer immediately
5. The direct-answer paragraph should literally answer the query within 40-60 words ("Net 30 means payment is due 30 calendar days from the invoice date…")

**Not the fix:** assuming the post is "just not what they were looking for" — it is, the framing is just wrong.

### Shape 4: LONG ENGAGEMENT TIME, LOW SCROLL DEPTH (early payoff, no journey)

**What you see:**
- GA4: average engagement time 1-2 minutes
- Scroll depth (if configured): most readers stop at 25-40%
- People read, but only the top

Example: `how-to-write-an-invoice-beginners-guide` — readers get the step list at the top and leave before the examples, FAQ, and the CTA.

**Diagnosis:** the top satisfies (they got the steps) but the rest doesn't pull them forward, and crucially they leave before reaching the generator CTA.

**Fix:**
1. Look at the H2 list
2. Are the H2s phrased to promise specific value? ("A filled-in invoice example", "What to do if a client won't pay", "Common mistakes that delay payment")
3. Does the post escalate — steps, then a worked example, then the edge cases readers actually fear (late payers, tax)?
4. Move the most useful asset (a real filled-in invoice, or the one-click "make this in the generator" link) up to ~30% scroll where attention is still high
5. Add internal links in the body so readers who finish the steps keep engaging (`how-to-send-an-invoice`, `what-is-an-invoice-number`)

**Not the fix:** writing a longer post. Scroll depth is a quality signal, not a length signal.

### Shape 5: HIGH ENGAGEMENT, HIGH SCROLL DEPTH, NO CONVERSIONS (engaged readers don't act)

**What you see:**
- GA4: 3+ minutes engagement time, 75%+ scroll depth
- Conversions: 0 — they read the whole thing but never click through to the generator

Example: `how-to-create-an-invoice` is read end-to-end, but nobody clicks "Create your invoice free."

**Diagnosis:** the reader is engaged but the CTA isn't right. Could be:
- CTA is too generic ("learn more" instead of "Create your invoice free in 60 seconds")
- CTA is buried after a wall of conclusion text
- The reader has no obvious next step at the moment they're ready
- The CTA asks for too much before trust is established

**Fix:**
1. Look at the conclusion — is the synthesis followed by a single specific CTA to the invoicepdf.io generator?
2. Is the CTA descriptive ("Create and download your first invoice as a PDF — free, no signup") rather than generic?
3. Is there a generator link mid-body, right after the worked example, where intent peaks?
4. Does the post end on a forward gesture (make one now) or just trail off?
5. Add or rewrite: one specific primary CTA to the generator, plus an in-body link at the peak-interest moment.

**Not the fix:** adding three competing CTAs, or pointing the CTA at a competitor. The primary CTA is always the invoicepdf.io generator.

---

## The query-level diagnosis (GSC)

Beyond per-post analytics, look at *what queries* each post ranks for.

### Healthy pattern
- Top query matches the post's intended target (e.g. `what-is-an-invoice-number` ranks first for "invoice number")
- 5-10 supporting long-tail queries also rank ("how to number invoices", "invoice number example")
- All queries are topically aligned

### Unhealthy patterns

#### Pattern A: Mismatched top query
- The post ranks for a query you didn't target
- It doesn't rank for the query you did target

Example: `what-does-invoice-mean` ranks mostly for "invoice example" instead of the definition query.

**Diagnosis:** Google has decided the post is about a different topic than intended. The `title`/headings are mis-signaling, or the body drifted.

**Fix:** Either re-align (rewrite `title`/headings/intro to target the declared query) or accept reality and re-aim the post (and its `title`/`excerpt`) at the query it actually wins.

#### Pattern B: Long-tail without head term
- Post ranks for 20+ specific queries ("invoice for graphic designer", "invoice for plumber")
- Doesn't rank for the head term ("how to write an invoice")

**Diagnosis:** the post is a cluster competing with a missing pillar.

**Fix:** Write/strengthen the pillar ("how to write an invoice"). Link the existing cluster posts up to it.

#### Pattern C: Cannibalization
- Two posts on the site rank for the same query, both poorly
- Neither hits position 1-5; both float around 10-30

Example: `what-is-an-invoice-beginner-guide` and `what-is-an-invoice-guide-for-beginners` both float at position 12-20 for "what is an invoice", splitting the signal. Same story for the two "write an invoice for beginners" posts and the two proforma posts.

**Diagnosis:** duplicate intent. The two posts dilute each other.

**Fix:** Merge them (see `update-discipline-skill.md`, which has the worked merge plan for exactly these pairs). Pick the stronger as survivor, 301 the other.

---

## Tracking the right metrics

You don't need 50 metrics. The five that matter:

| Metric | Where | Target |
|---|---|---|
| **Impressions** | GSC, last 28 days | Growing month over month |
| **CTR** | GSC, last 28 days | > 2% on average; > 5% on top posts |
| **Average position** | GSC, last 28 days | < 15 within 6 months of publish; < 10 within 12 |
| **Average engagement time** | GA4 | > 90 seconds on cluster posts; > 3 min on guides/pillars |
| **Generator click-through per session** | GA4 (track the CTA click as an event) | Site-specific — track the trend; this is the post's real job |

Set up GSC alerts for:
- Posts dropping > 50% impressions month-over-month (something broke)
- Posts dropping > 20% CTR month-over-month (SERP competition changed)
- A sudden new high-impression query (an opportunity to update the post to capture it — e.g. a seasonal spike in "invoice for tax return")

---

## When to update vs leave alone

GSC + GA4 tell you which posts deserve attention:

| Signal | Action |
|---|---|
| Ranking #1-3 + good CTR + good engagement + sends readers to generator | Leave alone. Don't touch a winner. |
| Ranking #5-15 + good CTR + good engagement | Update lightly — refresh figures, add an FAQ block, bump `date`. |
| Ranking #15-30 + decent CTR + okay engagement | Substantive update — new sections, better internal linking, stronger generator CTA. |
| Ranking > 30 + low CTR + low engagement | Question whether to rewrite, replace, merge, or sunset. |
| Ranking #1-3 + good CTR + low engagement | Opening is right, body is failing. Rewrite the middle. |
| Ranking #5-15 + low CTR + good engagement | `title` / `description` rewrite. The post itself is fine. |

See `update-discipline-skill.md` for the full update / replace / merge / sunset decision tree.

---

## The monthly analytics rhythm

A reasonable cadence for a site of 18-100 posts:

### Weekly (5 min)
- Glance at GSC top performers and top decliners
- Note any post with a sudden 50%+ change

### Monthly (45 min)
- Review every post's impressions / CTR / engagement + generator click-throughs
- Triage: leave / light update / substantive update / replace / merge / sunset
- For each substantive update, schedule the work

### Quarterly (3 hours)
- Cluster review — are the "what is an invoice", "how to write/send/pay an invoice" clusters healthy and de-duplicated?
- Pillar refresh — are the head-term guides still ranking? Do they need new sections?
- Stale-figure audit — every post touching tax years or rates checked for currency
- Prune candidates — off-core-topic posts (car invoice price, Amazon invoice) reviewed against traffic

### Annually
- Full corpus audit — every post checked against the freshness ladder (and the financial-accuracy cadence)
- Voice / audience signals reviewed
- Topical map redrawn if site direction has shifted

---

## What the data does NOT tell you

Some things analytics can't measure:

- Whether the post is *good* — only whether it's engaged with
- Whether the post is *accurate* — a wrong net-30 or tax explanation can still get clicks; accuracy is checked by `accuracy-and-claims-skill.md`, not GA4
- Whether the post is *helpful* — engagement time is a proxy, not a measure
- Whether the post will rank *next month* — past performance isn't future ranking

So: read the data, but also read the post. The data is a flashlight on what's happening, not the judgment of what to do.

---

## Pre-update analytics checklist

Before deciding to update a post, check:

- [ ] What's the current impression count?
- [ ] What's the current CTR?
- [ ] What's the average position for the target query?
- [ ] What other queries does the post rank for (cannibalization with a sibling)?
- [ ] What's the average engagement time?
- [ ] What's the scroll depth (if available)?
- [ ] Are generator click-throughs tracked, and what's the rate?
- [ ] What changed in the last 28 days?

Then decide which of the five shapes the post is in, and apply the matching fix.

---

**BlogOS** — read the data, then read the post.
