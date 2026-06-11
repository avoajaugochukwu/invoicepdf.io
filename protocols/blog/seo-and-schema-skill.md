---
name: seo-and-schema
description: On-page SEO and Schema.org JSON-LD discipline for invoicepdf.io. Covers URL slug rules, canonical tags, breadcrumbs, and JSON-LD blocks per archetype — and, critically, WHERE schema actually lives on this stack (the Next.js route, not the MDX frontmatter). This is the file that turns a well-written post into a snippet-eligible, indexable, internal-link-discoverable web page.
---

# SEO & Schema — the page Google can rank

> A post can be perfectly written and never rank if Google can't parse it, can't crawl it, or can't trust it. This skill is the layer between the prose and the search index.

---

## The artifacts every page has

A blog post is not one artifact. Each has its own rules, and only some live in frontmatter:

| Artifact | Lives in | Target length | Purpose |
|---|---|---|---|
| **H1 / SERP title** | Frontmatter `title:`, rendered as the page H1 by the wrapper | ≤ 60 chars (≤ 70 max) | The heading the human sees AND what Google shows in results |
| **Meta description** | Frontmatter `description:`, rendered to `<meta name="description">` | ~155 chars | What Google shows under the title in the SERP |
| **URL slug** | Frontmatter `slug:` (matches the filename) → path `/blog/<slug>` | ≤ 60 chars | Permanent, indexable URL |
| **JSON-LD schema** | **The Next.js route / layout component — NOT frontmatter** | n/a | Machine-readable type info for rich results |

**Key rule:** these are *related but different*. Lazy writers paste the same string into the title and description. Real writers tune each. And schema is **not** a frontmatter field on this site — see below.

`lib/blog.ts` reads only: `title`, `slug`, `date`, `excerpt`, `description`, `author`, `featuredImage`, `tags` (plus auto `readingTime`). See `title-meta-slug-skill.md` for the full title/description/slug rules. This skill assumes those are set and focuses on schema and crawlability.

---

## URL slug discipline

The slug is permanent and must match the filename in `content/blog/`. Changing it later breaks every inbound link and shuffles your SEO equity. Get it right the first time.

### Rules

- **Kebab-case.** `what-is-an-invoice` not `What_Is_An_Invoice` or `whatIsAnInvoice`.
- **Front-load the keyword.** `how-to-send-an-invoice` beats `the-best-way-to-send-an-invoice-online`.
- **Drop stop words unless load-bearing.** `how-to-write-invoice` is leaner, but keep small words when removing them breaks the real query (`what-does-net-30-mean-on-an-invoice`).
- **No dates in the slug.** "2024-best-invoice-terms" ages out and forces a yearly redirect. Use the `date` field instead.
- **No numbers unless they're the point.** `7-invoice-payment-terms` is fine only if 7 is genuinely the count; change it to 8 later and the slug lies.
- **No filler.** No `-guide`, `-article`, `-post` suffixes.
- **No special characters.** Hyphens only — no underscores, en-dashes, or emoji.
- **Match the target query.** Query "invoice vs receipt" → slug `invoice-vs-receipt`.
- **Slug = filename.** `slug: what-is-a-proforma-invoice` ⇒ `content/blog/what-is-a-proforma-invoice.mdx` ⇒ `/blog/what-is-a-proforma-invoice`.

### Slug examples

| Target query | ✅ Good slug | ❌ Bad slug |
|---|---|---|
| "what is a proforma invoice" | `what-is-a-proforma-invoice` | `proforma-invoices-explained-everything-you-need` |
| "invoice vs receipt" | `invoice-vs-receipt` | `the-difference-between-an-invoice-and-a-receipt` |
| "how to send an invoice" | `how-to-send-an-invoice` | `invoice-sending-guide-for-beginners-2024` |
| "what does net 30 mean on an invoice" | `what-does-net-30-mean-on-an-invoice` | `net-30-terms-from-an-invoice` |

---

## Title and meta description (recap)

Full rules in `title-meta-slug-skill.md`. The two that matter for SEO:

- **`title`** — ≤ 60 chars preferred, target query front-loaded, readable. It is both the on-page H1 and the SERP title (there is no separate `meta_title` field on this stack). The MDX body must start at H2; never put a `# ` H1 in the body.
- **`description`** — ~155 chars, active verb in the first half, target query once, ends on the value the reader gets, no "in this article" preamble, never a verbatim copy of `title`.

Example `description` for "what does net 30 mean on an invoice" (≈150 chars):

> "Net 30" means payment is due 30 days after the invoice date. Learn how it affects your cash flow and when to use it as a freelancer.

---

## Canonical tag

Every post sets its own canonical URL to itself. This prevents duplicate-content issues from URL parameters, tracking codes, or syndicated copies.

In Next.js this is set via `metadata.alternates.canonical` in the route's `generateMetadata` (or the layout). The frontmatter `slug` determines the path; the route adds the domain:

```
slug: what-is-a-proforma-invoice
# file: content/blog/what-is-a-proforma-invoice.mdx
# canonical resolves to: https://invoicepdf.io/blog/what-is-a-proforma-invoice
```

If you ever syndicate a post elsewhere (Medium, a partner site), the canonical stays pointed at your version, and the syndicated copy points back too.

---

## Where schema actually lives on this stack

**Schema is NOT injected via frontmatter on this site, and it cannot be embedded in the MDX body.** The renderer is `next-mdx-remote` + `remark-gfm` with no custom components — so a `<script type="application/ld+json">` written inside an `.mdx` file will not work (raw `<script>` in MDX is unreliable and there's no component to render it safely).

Schema belongs in the **Next.js route or layout component** that renders the blog post — the same place that sets `generateMetadata`. The component reads the post's frontmatter (`title`, `description`, `date`, `author`, `featuredImage`, `slug`) via `lib/blog.ts`, builds the JSON-LD object, and renders it as a `<script type="application/ld+json">` inside the route's JSX (e.g. in `app/blog/[slug]/page.tsx`).

Because schema is generated in the route, not authored per-post, your job as a writer is to:

1. Make sure the frontmatter the schema reads is correct (accurate `date`, real `author`, valid `featuredImage`).
2. For HowTo / FAQPage schema, make the **visible on-page content** (the steps, the Q&A) match what the schema will claim — Google compares them.
3. Note the intended archetype so the route picks the right schema type.

The blocks below are **reference shapes** for the route to emit — not things you paste into MDX.

### Universal BlogPosting / Article (pillar, cluster, comparison, definition, news/update)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<frontmatter title>",
  "description": "<frontmatter description>",
  "image": "https://invoicepdf.io<frontmatter featuredImage>",
  "datePublished": "<frontmatter date, ISO>",
  "dateModified": "<frontmatter date or last-edit ISO>",
  "author": {
    "@type": "Person",
    "name": "<frontmatter author, default 'InvoicePDF Team'>"
  },
  "publisher": {
    "@type": "Organization",
    "name": "InvoicePDF",
    "logo": {
      "@type": "ImageObject",
      "url": "https://invoicepdf.io/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://invoicepdf.io/blog/<slug>"
  }
}
```

Use `"@type": "NewsArticle"` for news/update posts. `BlogPosting` is the safe default for editorial posts; `Article` is equivalent for these purposes.

### HowTo schema (how-to archetype — e.g. "how to send an invoice")

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "<frontmatter title>",
  "description": "<frontmatter description>",
  "totalTime": "PT10M",
  "image": "https://invoicepdf.io<frontmatter featuredImage>",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Add your business and client details",
      "text": "Enter your name, the client's name, and contact info at the top of the invoice."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "List the work and amounts",
      "text": "Add a line for each service or item with a description, quantity, and price."
    }
  ]
}
```

**Note on step `url` anchors:** the old site pointed each step at `#step-1` anchors. This site has **no rehype-slug**, so headings have no auto IDs and `## Heading {#id}` renders literally. Omit per-step `url` anchors unless the route adds heading IDs itself. The step `name`/`text` must match the visible steps on the page.

### FAQPage schema (faq archetype, or a FAQ block on any post)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When is a Net 30 invoice due?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Net 30 invoice is due 30 calendar days after the invoice date. If the invoice is dated June 1, payment is due by July 1."
      }
    },
    {
      "@type": "Question",
      "name": "Can I charge a late fee on an unpaid invoice?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if your invoice or contract stated the late-fee terms in advance. Allowed amounts vary by jurisdiction — verify the rule where you operate."
      }
    }
  ]
}
```

The answer text must match the visible answer on the page word-for-word. Google checks; mismatches lead to rich-result suspension. (Any legal/payment claim in these answers is load-bearing — see `accuracy-and-claims-skill.md`.)

### ItemList schema (listicle archetype — e.g. "7 invoice payment terms")

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "numberOfItems": 7,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Net 30" },
    { "@type": "ListItem", "position": 2, "name": "Net 15" },
    { "@type": "ListItem", "position": 3, "name": "Due on receipt" }
  ]
}
```

(Per-item `url` anchors are omitted for the same no-rehype-slug reason as HowTo.)

### CollectionPage schema (topical-landing archetype)

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Invoicing Basics",
  "description": "<frontmatter description>",
  "url": "https://invoicepdf.io/blog/invoicing-basics",
  "hasPart": [
    {
      "@type": "BlogPosting",
      "headline": "What Is an Invoice?",
      "url": "https://invoicepdf.io/blog/what-is-an-invoice"
    }
  ]
}
```

### DefinedTerm schema (definition archetype, alongside BlogPosting)

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Proforma invoice",
  "description": "<the 40-60 word definition from the top of the post>",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "InvoicePDF Invoicing Glossary"
  }
}
```

### BreadcrumbList schema (every page)

Render breadcrumbs in the route's JSON-LD. (The blog is currently a single flat section, so the trail is shallow: Home → Blog → Post.)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://invoicepdf.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://invoicepdf.io/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "<frontmatter title>",
      "item": "https://invoicepdf.io/blog/<slug>"
    }
  ]
}
```

Breadcrumbs are the single most underrated schema. They show up in the SERP under your title and meaningfully lift CTR.

---

## Multiple schemas per page

A route can emit multiple schema types. Common combinations:

- **Pillar:** `BlogPosting` + `BreadcrumbList` (+ `FAQPage` if there's a FAQ block)
- **How-to:** `HowTo` + `BreadcrumbList` + `BlogPosting`
- **Definition:** `BlogPosting` + `DefinedTerm` + `BreadcrumbList`
- **Listicle:** `BlogPosting` + `ItemList` + `BreadcrumbList`
- **FAQ:** `FAQPage` + `BreadcrumbList`

Render each as its own `<script type="application/ld+json">` in the route. Do not merge them into one object — validators get confused.

---

## Open Graph + Twitter Card

Set these once in the layout/route metadata, not per-post. The route derives them from frontmatter:

```html
<meta property="og:type" content="article">
<meta property="og:title" content="<frontmatter title>">
<meta property="og:description" content="<frontmatter description>">
<meta property="og:image" content="https://invoicepdf.io<frontmatter featuredImage>, 1200x630">
<meta property="og:url" content="https://invoicepdf.io/blog/<slug>">
<meta property="og:site_name" content="InvoicePDF">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<frontmatter title>">
<meta name="twitter:description" content="<frontmatter description>">
<meta name="twitter:image" content="https://invoicepdf.io<frontmatter featuredImage>">
```

There's no separate social-title field — these read `title`/`description` directly. **Featured image for OG: 1200 × 630.** Other ratios get cropped weirdly by social platforms.

---

## The conversion path (CTA)

SEO brings the reader; the CTA converts them. Every post's primary call-to-action points to **invoicepdf.io's own invoice generator** — e.g. "create a professional invoice free, no signup." Never make a competitor tool (Wave, FreshBooks, QuickBooks, PayPal invoicing, Zoho) the CTA. Competitors may be named neutrally inside genuine comparison/listicle posts, but the conversion path is always our tool. This matters for SEO too: a clear, relevant on-page CTA improves engagement signals.

---

## Robots, sitemap, indexing

Outside the per-post scope but worth knowing:

- `robots.ts` and `sitemap.ts` in `app/` handle site-level discoverability.
- New posts should appear in the sitemap automatically if it reads `content/blog/` at build time; confirm new slugs show up.
- To keep a draft out of the index, gate it in the route (e.g. don't publish the file, or have the route emit `<meta name="robots" content="noindex">`). There is no `draft` frontmatter field wired into `lib/blog.ts`, so a file in `content/blog/` is effectively live — keep drafts out of that directory.

---

## Internal linking architecture

Quick SEO points (the blog is a single flat section today):

- Every post links to ≥ 3 sibling posts in its body, using `[descriptive anchor](/blog/<slug>)` (internal links open in the same tab).
- Internal anchor text should *be* the target query of the linked post — the most powerful internal-link signal Google has.
- External links use `[descriptive anchor](https://...)` (these auto-open in a new tab) and should point at authoritative primary sources for any load-bearing claim.
- Never use "click here"; always descriptive anchor text.

---

## Common SEO mistakes to catch

- A `# H1` placed in the MDX body (the H1 comes from `title` via the wrapper — body starts at H2)
- Missing or over-length `description` (much over 155 chars)
- `title` over ~70 chars (truncates in the SERP)
- Slug with stop words, dates, or that doesn't match the filename
- `## Heading {#id}` anchors written in the body (render literally — no rehype-slug)
- JSX or custom components in MDX (`<Image>`, `<Callout>`, etc. don't exist)
- No internal links to siblings; no outbound primary-source citations
- Schema missing in the route, or schema claims that don't match the visible page
- A load-bearing financial/legal claim with no authoritative source (blocks publish — see `accuracy-and-claims-skill.md`)
- Open Graph image missing or not 1200 × 630
- No author byline (defaults to "InvoicePDF Team", but set a real one when there is one)

---

## Pre-publish SEO checklist

- [ ] `title` ≤ 60 chars preferred (≤ 70 max), target query front-loaded
- [ ] No `# H1` in the MDX body — body starts at H2
- [ ] `description` ~155 chars, target query present, no preamble
- [ ] `slug` kebab-case, no stop words, no dates, matches the filename
- [ ] Target query in: `title`, `description`, `slug`, first paragraph, ≥ 1 H2, image alt
- [ ] Canonical URL resolves correctly from the slug
- [ ] `featuredImage` exists and is 1200 × 630 with descriptive alt when referenced in the body
- [ ] Schema JSON-LD emitted in the route matches the archetype
- [ ] HowTo steps / FAQ answers in schema match the visible on-page content word-for-word
- [ ] BreadcrumbList schema present (Home → Blog → Post)
- [ ] ≥ 3 internal links to sibling posts, descriptive anchors
- [ ] Outbound links to authoritative primary sources for every load-bearing claim
- [ ] `date` and `author` set correctly
- [ ] Primary CTA points to invoicepdf.io's invoice generator, not a competitor

---

**BlogOS** — the page Google can rank.
