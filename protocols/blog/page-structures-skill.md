---
name: page-structures-skill
description: The page archetypes for invoicepdf.io — frontmatter shape, body skeleton, word-count band, schema, and a worked invoicing example for each. Replaces the old Bible-site "Templates A-F". Every archetype renders from a single MDX file at content/blog/<slug>.mdx through next-mdx-remote.
---

# Page Structures — invoicepdf.io archetypes

There is one output format: an MDX file at `content/blog/<slug>.mdx`. What changes from post to post is the **archetype** — the shape that matches the searcher's intent. Pick the archetype first; it determines the skeleton, length, schema, and snippet eligibility.

This file replaces any reference to "Templates A-F". Those were Bible-site page types. We use intent-named archetypes instead.

## The frontmatter every archetype shares

Only these fields are read by `lib/blog.ts`. Do not add others.

```mdx
---
title: "<H1 / SERP title, ≤ 70 chars, includes target query>"
slug: "<kebab-case, matches filename>"
date: "<YYYY-MM-DDTHH:MM:SS.000Z>"
excerpt: "<card blurb, 1-2 sentences>"
description: "<meta description, ≤ 155 chars, includes target query>"
author: "InvoicePDF Team"
featuredImage: "/blog/<slug>/featured.jpg"
tags: ["invoice", "<topic>"]
---
```

`title` becomes the H1. The body starts at the direct-answer paragraph, then H2s. No `# ` in the body, no `{#id}` anchors, images as markdown, callouts as blockquotes, tables as GFM. (Full rendering rules in `blog-os-master.md`.)

Schema (JSON-LD) is **not** set in frontmatter on this site — it belongs in the Next.js route/layout. The archetype table below names the schema type to wire there. See `seo-and-schema-skill.md`.

---

## The archetype matrix

| Archetype | Search intent | Word band | Schema type | Featured-snippet shape |
|---|---|---|---|---|
| Definition | "what is / what does X mean" | 900-1,400 | Article | 40-60 word paragraph |
| How-to | "how to do X" | 1,000-1,800 | HowTo | Numbered steps |
| Cluster | A specific long-tail question | 1,000-1,600 | Article | Paragraph or list |
| Comparison | "X vs Y" decision | 1,200-1,800 | Article | Comparison table |
| Listicle | "N things / best / types of" | 1,300-2,200 | Article (ItemList optional) | List |
| FAQ | People Also Ask cluster | 800-1,400 | FAQPage | Q/A pairs |
| Pillar | A broad head term | 2,500-4,000 | Article | Paragraph + jump links |
| Template / tool landing | "free X invoice template" | 700-1,200 | Article | Visual + CTA |
| Topical landing | Hub for a cluster | 600-1,000 | CollectionPage | List of links |
| News / update | A dated change (tax year, rate) | 800-1,500 | Article / NewsArticle | Paragraph |

Word bands are targets, not laws. Match the depth the query actually needs. A "what is an invoice number" definition does not need 2,000 words of padding — that is thin content wearing a long coat.

---

## Archetype 1 — Definition ("what is X" / "what does X mean")

The reader wants a clear answer fast, then enough depth to feel confident. Win the featured snippet.

**Body skeleton:**

1. **Direct-answer paragraph** (40-60 words) right under the H1. This is the snippet target.
2. `## Quick answer: what does <X> mean?` — restate plainly, bold the one-sentence definition, add a tiny worked example.
3. `## Why <X> matters` — the stakes for a freelancer / small business.
4. `## <X> in a real example` — a named, numbered worked example.
5. `## How to use <X> on your own invoices` — make it actionable, link to the generator.
6. `## Related terms` — short table or list, each row linking to a sibling definition post (internal links).
7. `## FAQ` — 3-5 PAA pairs.
8. Conclusion + single CTA.

**Worked example — `what-does-net-30-mean-on-an-invoice`:** direct answer ("Net 30 means full payment is due 30 days after the invoice date"), a June 1 → July 1 example, a Net 10/15/60 comparison table, "what happens if they miss it", and a CTA to create an invoice with the terms pre-filled. Links up to a payment-terms pillar and across to `what-is-an-invoice-number`, `how-to-send-an-invoice`.

---

## Archetype 2 — How-to ("how to do X")

Procedural intent. The reader has a job to finish. Steps must be real and ordered.

**Body skeleton:**

1. **Direct-answer paragraph** — the one-sentence "here's the gist" + how long it takes.
2. `## What you'll need` — short list (details, a template, the generator).
3. `## Step 1: …` through `## Step N: …` — each step is an H2 or numbered list item with one clear action. Screenshot or example per major step.
4. `## Common mistakes` — the friction that separates this from a thin how-to.
5. `## Do it in 2 minutes with invoicepdf.io` — the tool shortcut. This is the CTA, integrated, not bolted on.
6. `## FAQ`.
7. Conclusion.

Wire **HowTo** schema in the route. Keep steps genuinely sequential — if order doesn't matter, it's a listicle, not a how-to.

**Worked example — `how-to-send-an-invoice`:** what to include, choose a delivery method (email/portal/PayPal), write the message, set terms, follow up. Links to `how-to-create-an-invoice` (pillar), `what-does-net-30-mean-on-an-invoice`, `how-to-send-an-invoice-on-paypal`.

---

## Archetype 3 — Cluster (a specific long-tail question)

A focused answer to one narrow query that links **up** to its pillar and **sideways** to siblings. Most posts are clusters. Skeleton mirrors Definition or How-to depending on whether the query is "what" or "how", but the word band is tighter and the internal-link discipline is the point: every cluster names its pillar in the intro and links to it.

---

## Archetype 4 — Comparison ("X vs Y")

Decision intent. The reader is choosing. Be useful and honest; do not strawman the option you don't sell.

**Body skeleton:**

1. **Direct-answer paragraph** — the one-line verdict ("Use an invoice for completed work, a receipt to confirm payment").
2. `## <X> vs <Y> at a glance` — a GFM comparison table (the snippet target).
3. `## What <X> is` / `## What <Y> is` — one H2 each.
4. `## When to use which` — the decision framework.
5. `## FAQ`.
6. Conclusion + CTA.

**Worked example — "Invoice vs Receipt":** table comparing purpose, timing, what each proves; decision rule; links to `what-does-invoice-mean`, `what-does-an-invoice-look-like`. Competitors may be named neutrally here if the comparison is tool-vs-tool, but the CTA is still our generator.

---

## Archetype 5 — Listicle ("N things / types of / best")

Parallel items. Each item earns its place; no filler entries to hit a number.

**Body skeleton:**

1. **Direct-answer paragraph** — what the list covers and who it's for.
2. `## 1. <Item>` … `## N. <Item>` — each item gets a consistent shape: what it is, when to use it, a one-line example.
3. Optional summary table of all items.
4. `## FAQ`.
5. Conclusion + CTA.

**Worked example — "8 Invoice Payment Terms Every Freelancer Should Know":** Net 30, Net 15, Due on Receipt, 2/10 Net 30, CIA, 50% upfront, milestone, end-of-month — each with a "what it means / best for" line, plus a summary table. Links to `what-does-net-30-mean-on-an-invoice` and the payment-terms pillar.

---

## Archetype 6 — FAQ (People Also Ask cluster)

For a query that is really a bundle of small questions. Each H2 is a question; each answer is snippet-sized (40-60 words) then a short expansion.

Wire **FAQPage** schema in the route, matching the on-page Q/A exactly. Do not put questions in schema that aren't visible on the page.

---

## Archetype 7 — Pillar (broad head term)

The authority hub for a topic cluster. Ranks for the head term and links **out** to every cluster post. This is where internal-link architecture is built. See `topical-authority-skill.md`.

**Body skeleton:**

1. **Direct-answer paragraph** — define the topic in 40-60 words.
2. A short "what this guide covers" list with descriptive section names the reader can scan (no `{#id}` anchors).
3. 6-10 H2 sections, each a sub-topic that **also** has (or will have) its own cluster post linked inline with descriptive anchor text.
4. A worked example or template.
5. `## FAQ`.
6. Conclusion + CTA.

**Worked example — "How to Create an Invoice: The Complete Guide":** what an invoice is, what it must legally include (jurisdiction-stamped), how to number it, payment terms, how to send it, how to follow up, how to get paid faster. Each section links down to its cluster (`what-is-an-invoice-number`, `what-does-net-30-mean-on-an-invoice`, `how-to-send-an-invoice`, etc.).

---

## Archetype 8 — Template / tool landing

Conversion-led. Someone searching "free consultant invoice template" wants a template now. We give a genuinely useful one and route them to the generator that fills it in.

**Body skeleton:**

1. **Direct-answer paragraph** — what the template includes and that it's free.
2. `## What a <industry> invoice should include` — the real checklist.
3. `## The template` — a visible GFM table or labelled example invoice (image under `/blog/<slug>/`).
4. `## Fill it out in 2 minutes` — the generator CTA, primary.
5. `## <Industry>-specific tips` — the depth that beats a bare template download.
6. `## FAQ`.

These pages carry strong commercial intent. The CTA is the point, but the page must still be genuinely helpful or it reads as thin.

---

## Archetype 9 — Topical landing (cluster hub)

An index page that introduces a cluster and links to every post in it. Short prose, then a curated, descriptive list of links. Wire **CollectionPage** schema. Useful once a cluster has 5+ posts; until then, the pillar does this job.

---

## Archetype 10 — News / update

Ties an evergreen topic to a dated change: a new tax year, a VAT threshold change, a late-payment rate update. State the jurisdiction and the effective date prominently, cite the primary source, and set `date` accurately. Revisit on a schedule (see `update-discipline-skill.md`). The accuracy gate is strict here — dated rules go stale and a stale rate is a wrong claim.

---

## Picking the archetype — quick decision

- Query starts with "what is / what does … mean" → **Definition**
- Query starts with "how to / how do I" → **How-to**
- Query contains "vs / versus / or" → **Comparison**
- Query is "best / top / types of / N …" → **Listicle**
- Query is a broad noun a whole cluster hangs off ("invoice", "payment terms") → **Pillar**
- Query is "free … template" → **Template / tool landing**
- Query is a single narrow question off a pillar → **Cluster**
- A bundle of small related questions → **FAQ**

When ambiguous, look at what actually ranks for the query (WebSearch) and match the dominant format. Google has already told you the intent through the current SERP.
