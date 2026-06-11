---
name: title-meta-slug
description: The three title artifacts every post actually renders (H1/title, meta description, slug) and how each one is different from the others. Plus authoring guidance for the SERP title and social sharing. Lazy writers paste the same string everywhere. Real writers tune each one for its job.
---

# Title, Meta, Slug — the artifacts that ship

> The H1, the meta description, and the URL slug are separate pieces of content with separate jobs. They are related, they overlap, they're not the same. Treat each one with its own rules — and only use the frontmatter fields the renderer actually reads.

---

## What the renderer actually reads

This site runs `next-mdx-remote` + `remark-gfm` with **no custom components and no rehype-slug**. `lib/blog.ts` reads ONLY these frontmatter fields: `title`, `slug`, `date` (ISO string), `excerpt`, `description`, `author` (default "InvoicePDF Team"), `featuredImage`, `tags`. `readingTime` is auto-computed.

There is **no `meta_title`, no `og_title`, no `schema`** field. The SERP title is derived from `title`. The meta description is the `description` field. Anything else (a punchier social title, a different SERP phrasing) is **authoring guidance you apply by hand to `title`/`description`** — not a rendered field. Do not invent frontmatter the renderer ignores.

---

## The artifacts at a glance

| Artifact | Lives in | Target length | Audience | Purpose |
|---|---|---|---|---|
| **H1 / SERP title** | Frontmatter `title:` | ≤ 60 chars (≤ 70 hard max) | On-page reader AND SERP searcher | The heading on the page, and what Google shows in results |
| **Meta description** | Frontmatter `description:` | ~155 chars | SERP searcher | What Google shows under the title |
| **URL slug** | Frontmatter `slug:` (must match filename) | ≤ 60 chars | Address bar, Google's index | The permanent URL |
| **Excerpt** | Frontmatter `excerpt:` | 1-2 sentences | Blog index / card UI | Teaser shown on listing pages |

Because `title` does double duty as both the on-page H1 and the SERP title, keep it tight: front-load the target query, stay readable, and don't bury it in modifiers.

---

## The title (H1 and SERP title in one)

`title` is rendered as the page H1 by the page wrapper. **The MDX body must start at H2** — never put a `# ` heading in the body. The same `title` is also what Google shows in the search result, so it has to satisfy both the searcher (front-loaded keyword) and the reader who already clicked (readable, not stuffed).

### Rules

- **≤ 60 chars preferred, ≤ 70 hard max.** Google truncates the SERP title around 580 pixels (~55-60 chars). Longer also wraps badly on mobile.
- **Front-load the target query** near the start where it reads naturally.
- **One modifier that signals depth, freshness, or specificity:** `(Step by Step)`, `+ Template`, `Explained`, `(2026)`, `With Examples`.
- **Reader-facing and plain.** The audience is freelancers and small-business owners, not accountants — define jargon, don't show off.
- **Brand suffix is optional.** The page already brands itself; a `| InvoicePDF` suffix eats characters. Use it only on short titles where you have room and want the SERP brand signal.

### Title patterns that win click-through

#### Pattern A — Question + Modifier
```
What Does Net 30 Mean on an Invoice? (Plain-English Guide)
```

#### Pattern B — Definition + Modifier
```
What Is a Proforma Invoice? Definition + Example
```

#### Pattern C — How-to + Result
```
How to Send an Invoice and Actually Get Paid Faster
```

#### Pattern D — Comparison + Decision
```
Invoice vs Receipt: What's the Difference (and When to Use Each)
```

#### Pattern E — Number + Topic + Modifier
```
7 Invoice Payment Terms Every Freelancer Should Know
```

### Title anti-patterns

- ❌ Keyword stuffing: "Invoice Net 30 Payment Terms Invoice Due Date Freelancer Invoice"
- ❌ All caps: "READ THIS BEFORE YOU SEND ANOTHER INVOICE!!"
- ❌ Vague: "Everything About Invoicing"
- ❌ Brand-first: "InvoicePDF: What Is a Proforma Invoice" — brand goes LAST, if at all
- ❌ Over the hard max: a title that truncates mid-word in the SERP (over ~70 chars)
- ❌ A `# H1` placed in the MDX body — it double-renders under the wrapper's H1

### Tuning the title when CTR is low

If a post ranks but doesn't get clicks, `title` is the lever. Iterate:

- Add a number where it's honest ("7 Payment Terms…")
- Add a specificity modifier ("+ Template", "Step by Step", "With Examples")
- Flip a question into a claim or vice versa ("What Is Net 30?" → "Net 30 Explained Simply")

Track CTR in Search Console, then rewrite `title`.

---

## The meta description (`description`)

`description` is the snippet under the title in the SERP. It doesn't directly affect ranking, but it drives click-through, which does. (`excerpt` is separate — it feeds the blog index card. They can differ; the description is tuned for search, the excerpt for the on-site browser.)

### Rules

- **~155 chars.** Google truncates ~155 on desktop, ~120 on mobile. Front-load the value.
- **Active verbs in the first half** ("Learn what Net 30 means…").
- **Target query appears once**, naturally.
- **Specific, not abstract** — name what they'll find (a worked example, a template, the exact rule).
- **Plain text only** — no HTML, no markdown.

### Description patterns

#### Pattern A — Direct answer + depth promise
```
"Net 30" means payment is due 30 days after the invoice date. Learn how it affects your cash flow and when to use it as a freelancer or small business.
```

#### Pattern B — What they'll get
```
A proforma invoice is a preliminary bill sent before work is final. See a real example, how it differs from a true invoice, and when to send one.
```

#### Pattern C — How-to result framing
```
Send a professional invoice in minutes and get paid faster. A step-by-step walkthrough with a worked example and the details clients expect.
```

#### Pattern D — Comparison decision
```
Invoice vs receipt: an invoice requests payment, a receipt confirms it. See exactly when to send each, with examples, so your records stay clean.
```

### Description anti-patterns

- ❌ Starts with "In this article, we will…"
- ❌ Duplicates the `title` verbatim
- ❌ Generic: "Learn everything about invoicing"
- ❌ Misleading: promises a template the post doesn't include
- ❌ Much over 155 chars (gets truncated)

### When to update

Same logic as the title — Search Console CTR is the signal. If a post ranks but doesn't click, rewrite `description`.

---

## The URL slug

The slug is **permanent** and **must match the filename** in `content/blog/`. The file lives at `content/blog/<slug>.mdx`; the public URL is `/blog/<slug>`. Changing it after publish requires a 301 redirect and loses some SEO equity. Get it right the first time.

### Rules

- **Kebab-case:** `what-does-net-30-mean-on-an-invoice`, never `What_Does_Net_30` or `whatDoesNet30`.
- **Front-load the keyword:** `how-to-send-an-invoice` not `the-best-way-to-send-an-invoice-online`.
- **Drop stop words unless load-bearing:** `how-to-write-invoice` is leaner, but keep small words when removing them breaks the read — `what-does-net-30-mean-on-an-invoice` keeps "on an invoice" because that's the real query. Match the query, don't over-trim.
- **No dates** unless the post is genuinely time-bound.
- **No numbers** unless the number is core ("7-invoice-payment-terms" only if 7 is the point — and if you later change to 8, the slug lies).
- **No filler:** no `-guide`, `-article`, `-post` suffixes.
- **No leading/trailing hyphens. All lowercase. Under 60 chars** ideally; under 80 max.
- **Slug must equal the filename.** `slug: how-to-send-an-invoice` ⇒ file `content/blog/how-to-send-an-invoice.mdx`.

### Slug patterns by archetype

| Archetype | Slug pattern | Example |
|---|---|---|
| Definition | `what-is-X` / `what-does-X-mean` | `what-is-a-proforma-invoice`, `what-does-invoice-mean` |
| How-to | `how-to-X` | `how-to-send-an-invoice` |
| Comparison | `X-vs-Y` | `invoice-vs-receipt` |
| Listicle | `<N>-<topic>` | `7-invoice-payment-terms` |
| FAQ | `<topic>-questions` | `invoicing-questions` |
| Cluster | `<topic>-<specifier>` | `what-is-an-invoice-number` |
| Pillar | `<topic>` (root term) | `what-is-an-invoice` |
| Template / tool landing | `<thing>-template` / `<tool>` | `invoice-template`, `invoice-generator` |
| Topical landing | `<section>` | `invoicing-basics` |
| News / update | `<event>-<angle>` | `2026-uk-late-payment-rules` |

### Good vs bad slugs

| Target query | ✅ Good slug | ❌ Bad slug |
|---|---|---|
| "what does net 30 mean on an invoice" | `what-does-net-30-mean-on-an-invoice` | `net-30-payment-terms-explained-everything-you-need` |
| "how to send an invoice" | `how-to-send-an-invoice` | `the-complete-guide-to-sending-invoices-online-2026` |
| "invoice vs receipt" | `invoice-vs-receipt` | `the-difference-between-an-invoice-and-a-receipt` |
| "what is a proforma invoice" | `what-is-a-proforma-invoice` | `proforma-invoices-article` |

### When to change a slug

Almost never. If you must:

1. Set up a 301 redirect from old to new in `next.config.js`.
2. Update all internal links from old slug to new (grep the repo).
3. Update the sitemap and rename the file in `content/blog/` to match.
4. Expect 1-3 months of partial ranking dilution. Don't do it casually.

---

## Authoring a punchier social / SERP variant

There's no `og_title` field on this stack — social platforms read the page's Open Graph tags, which the layout derives from `title`/`description`. So you don't set a separate social title in frontmatter. If a punchier phrasing would perform better, **make `title` itself that phrasing** (within the length rules) rather than maintaining a second string the renderer never reads.

Worked example for the Net 30 post:

```yaml
title: "What Does Net 30 Mean on an Invoice? (Plain-English Guide)"
description: "\"Net 30\" means payment is due 30 days after the invoice date. Learn how it affects your cash flow and when to use it as a freelancer."
slug: "what-does-net-30-mean-on-an-invoice"
excerpt: "Confused by \"Net 30\" on an invoice? Here's what it means, why it matters, and how to use it — with a worked example."
```

The `title` reads well on the page and in the SERP. The `description` leads with the answer and the query. The `slug` matches the filename and the query. The `excerpt` is the on-site teaser.

---

## Target query placement

The target query should appear in:

1. **`title`** (verbatim or close, front-loaded — covers both H1 and SERP title)
2. **`description`** (once, naturally)
3. **`slug`** (verbatim, front-loaded)
4. **First body paragraph** (within the first 100 words — and this is also your featured-snippet answer)
5. **At least one H2** (verbatim or close)
6. **`featuredImage` alt text** when you reference the image in the body (`![descriptive alt](/blog/<slug>/<file>)`)

If the query is "what does net 30 mean" and an H2 is "Quick Answer: What Does Net 30 Mean?", that repetition is fine — it's the natural phrasing, not stuffing. If you're forcing the query in awkwardly, readability wins.

---

## Brand placement

- **In `title`:** optional suffix only, and only when there's character room.
- **In the H1:** same field as `title`, so same rule.
- **In `slug`:** never.
- **In `description`:** only if it adds credibility, and rarely worth the characters.

---

## Reuse and consistency

Across the site:

- **Capitalization consistency** — pick title case or sentence case for `title` and stick with it.
- **Slug pattern consistency** — within an archetype, slugs follow the same shape (all definitions use `what-is-X` / `what-does-X-mean`).
- **Brand-suffix consistency** — if you ever add a brand suffix, always the same separator and wording.
- **Voice consistency** — plain, practical, jargon-defined; the title sets the tone for the post.

Inconsistency across pages dilutes brand recognition in the SERP.

---

## The audit

The pre-publish check covers every artifact that actually renders:

- [ ] `title` set, ≤ 60 chars preferred (≤ 70 hard max), includes target query, front-loaded
- [ ] No `# H1` in the MDX body — body starts at H2
- [ ] `description` set, ~155 chars, includes target query, no "in this article" preamble, not a verbatim copy of `title`
- [ ] `slug` kebab-case, ≤ 60 chars, no dates, no filler, **matches the filename**
- [ ] `excerpt` set (teaser for the index card)
- [ ] Target query present in `title`, `description`, `slug`, first paragraph, ≥ 1 H2
- [ ] No invented frontmatter fields (no `meta_title`/`og_title`/`schema`/`intent`/etc.)
- [ ] `title`, `description`, and `slug` all describe the same page (no contradiction)

---

**BlogOS** — the artifacts that actually ship, each tuned for its job.
