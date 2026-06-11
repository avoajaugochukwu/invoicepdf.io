---
name: scannable-formatting
description: H1/H2/H3 hierarchy rules, paragraph-length discipline, bullets vs prose, table structure, callout style, blockquote use, and inline emphasis. This is the file that turns prose into a web page Google can index and a freelancer can scan. Heading hierarchy is non-negotiable. Obeys the next-mdx-remote + remark-gfm rendering reality: no custom components, no heading anchors, markdown images only.
---

# Scannable Formatting — the layer between prose and page

> A great paragraph that nobody scrolls to is dead writing. This skill is the discipline of structuring content so the skimming reader, the reading reader, the screen reader, and Google's crawler can all find what they came for.

---

## The rendering reality (read this first)

Every formatting rule below assumes the actual renderer: `next-mdx-remote` with `remark-gfm`, no custom MDX components, no `rehype-slug`. Concretely:

- `title` in frontmatter renders as the page H1. The body starts at H2. **Never write `# ` in the body.**
- No custom JSX. No `<Callout>`, no `<Image>`, no `<TableOfContents>`. Callouts are blockquotes; tables are GFM markdown; images are markdown `![alt](/blog/<slug>/<file>)`.
- No heading anchors. Never `## Heading {#id}`. Plain `## Heading` only. `remark-gfm` does not generate slug IDs, so `{#id}` would render as literal text.
- Internal links `[anchor](/blog/<slug>)`, external `[anchor](https://...)`, both with descriptive anchor text.

If a rule in your head conflicts with this section, this section wins.

---

## The heading hierarchy (non-negotiable)

This is the most important section in this file. Codify it.

### H1 — exactly one per page, from frontmatter

The H1 is the page title. It lives in the frontmatter as `title:` and is rendered by the layout. **Never put an H1 in the MDX body.**

```
[Frontmatter: title: "What Does Net 30 Mean on an Invoice?"]
[Layout renders <h1>What Does Net 30 Mean on an Invoice?</h1>]

[Body starts here — first content is an H2 or a paragraph, never H1]
```

Why: multiple H1s confuse Google's understanding of what the page is about, harm accessibility, and break the semantic outline.

### H2 — major sections, multiple allowed

Every major section of the post is an H2. Rules:

- Start at the top of the body (often after the direct-answer paragraph)
- Use claim or question phrasing: "Why clients pay Net 30 invoices late", "What a payment term actually controls"
- Avoid label phrasing: "Background", "Section 1"
- Plain heading only — never `{#id}`
- H2s often capture featured snippets — write them as if they were searchable themselves

### H3 — sub-sections inside an H2

Use H3 only when an H2 has 2+ genuine sub-sections. A single H3 inside an H2 is an orphan — promote it to H2 or fold it into the parent prose.

Rules:
- Always under an H2 (never directly under H1)
- Plain heading only — never `{#id}`
- Phrase consistently with the parent H2's style
- Never skip from H2 to H4

### H4 — rare

Use only when an H3 has 2+ further sub-sections. Most posts never need H4. If you find yourself reaching for H4, your H2 outline might be wrong — that section is probably its own post.

### H5 / H6 — contraband

If you need this depth, the post structure has failed. Restructure.

---

## Heading rules summary

```
H1 — frontmatter title only, exactly one
H2 — major sections, claim/question phrasing, NO {#id}
H3 — sub-sections, only when 2+ exist under one H2, NO {#id}
H4 — rare, only when 2+ exist under one H3
H5/H6 — never
```

The semantic outline of every post is H1 → H2s → optional H3s, with no skips and no orphans.

---

## No heading anchors

The renderer has no `rehype-slug`, so headings get no `id`. That means:

- Never write `## Why clients pay late {#why-late}` — the `{#why-late}` renders as visible literal text.
- Don't promise jump links or `/blog/<slug>#section` deep links that the renderer can't produce.
- If a reader needs to navigate a long post, use clear H2 phrasing and a tight outline instead of an anchored TOC.

Plain headings, every time:

```
## What Net 30 means in practice
### How to write the term on the invoice
```

---

## Paragraph length

The default paragraph length on the web is shorter than print. Real readers scan first; long paragraphs intimidate.

### Rules

- **2-4 sentences per paragraph** for most prose
- **Single-sentence paragraphs** are allowed for emphasis, transition, or beat. Use sparingly — three in a row is an AI tell.
- **5-6 sentence paragraphs** are allowed in pillar guides or longer analysis, when the reader is committed and the prose earns it.
- **8+ sentence paragraphs** are wallpaper. The skimmer scrolls past.

### Visual rhythm test

Preview the post. Look at the *shape* of the paragraphs on the page. Healthy posts have varied paragraph shapes — some 2 lines, some 5, some 1, some 4. Posts that are all 4-line paragraphs read as templated.

---

## First-sentence discipline

The skimming reader reads the first sentence of every paragraph. So:

- The first sentence carries the paragraph's claim
- Don't bury the point in sentence 3
- "There are several reasons clients pay late. First, ..." — wastes the first sentence. Start with "First, the invoice arrives without a due date" directly.
- Topic sentences that don't say anything ("Let's now turn to the next reason") are contraband

If you delete every sentence except the first in each paragraph, can a reader follow the argument? That's the skim test.

---

## Lists vs prose — when to use each

### Use lists when:
- 3+ items share the same shape (parallel)
- Order doesn't matter much (use bullets) or matters a lot (use numbered)
- The reader needs to *count* or *scan* the items — e.g. the seven fields every invoice must include
- The content is genuinely parallel — not narrative dressed up as a list

### Use prose when:
- The items have varied shape or depth
- The connections between items matter (causation, contradiction, escalation)
- One item flows into the next
- The argument needs sentences

### List anti-patterns

- 2-item lists — write it as prose
- Lists where each item is a paragraph — reformat as H3s or as prose
- Lists of mixed-grammar items — "Add your logo. You should also number the invoice. Late fees help." — three different shapes, this should be prose
- Nested lists deeper than 2 levels — restructure

### List item phrasing

- **Numbered list items:** start with a verb if procedural ("Enter your business name"), with a noun if they're items ("Invoice number")
- **Bulleted list items:** use parallel grammar across all items
- **Short items:** under 12 words ideally
- **Long items:** if an item needs 30+ words, it might want to be an H3 instead

---

## Tables

Tables are scannability dynamite when the content is genuinely 2-dimensional. With `remark-gfm`, GFM markdown tables render natively — use them freely, and prefer a real table over an image of a table.

### Use a table when:
- You're comparing ≥ 2 things on ≥ 2 axes
- The values are short (phrases or numbers)
- The reader benefits from horizontal scanning

### Don't use a table when:
- One column is a paragraph of prose (use prose)
- The "table" has one row (use prose)
- You only have 2 rows and 2 columns (use prose)

### Table rules

- **Always include a header row** — the first row labels the columns
- **Short cells** — phrases or numbers
- **Bold the first column** if it's the comparison axis
- **No nested formatting** inside cells (no lists inside cells, keep links brief)
- **Caption when needed** — a short italic line under the table with the source

### GFM table syntax

```
| Payment term | What it means | Typical use |
|---|---|---|
| **Due on receipt** | Pay immediately | Small one-off jobs |
| **Net 15** | Pay within 15 days | New clients |
| **Net 30** | Pay within 30 days | Established B2B clients |
| **2/10 Net 30** | 2% off if paid within 10 days, else due in 30 | Encouraging early payment |
```

Renders as a clean comparison table. Snippet-eligible.

### Table for snippet capture

For comparison posts, the at-a-glance table near the top is the snippet target. Build it like a billboard:

- 3-5 rows
- 2-4 columns
- Short cells
- Lives under an H2 phrased close to the target query

See `featured-snippet-skill.md` for the full table-snippet pattern.

---

## Callouts (blockquote style)

There is no `<Callout>` component. A callout is a blockquote with a bold label. That's the only callout mechanism the renderer supports.

### The pattern

```
> **Tip:** Set the due date as an explicit calendar date ("Due July 10, 2026"), not just "Net 30." Clients miss relative terms more often than fixed dates.
```

### Callout types (rotate, don't overuse)

| Label | When | Example |
|---|---|---|
| **Tip:** | Practical advice | "Tip: number invoices sequentially so you never reuse an ID." |
| **Warning:** | What to avoid | "Warning: emailing a Word file lets the client edit your totals. Send a PDF." |
| **Key takeaway:** | The load-bearing single sentence | "A payment term sets the deadline; a late fee gives it teeth." |
| **Note:** | Related context, breaks the flow | "Note: in the US, 'Net 30' counts calendar days, not business days." |
| **Definition:** | Inline definition of a term | "Net 30: payment is due 30 days after the invoice date." |

### Frequency

- 1-3 callouts per post is healthy
- 5+ becomes noise
- Match the label to the moment — don't slap **Warning:** on everything because it looks striking

---

## Blockquotes

A plain `>` blockquote (no bold label) is reserved for:

- Direct quotes from named sources, with attribution after the quote
- A real customer or expert quote you're elevating

Don't use blockquotes for:
- Emphasis (use bold)
- General commentary (it's not a quote, don't dress it up as one)

### Attribution rule

Every plain blockquote attributes the source after the quote:

```
> Late payment is the single biggest cash-flow problem small businesses report, and most of it traces back to vague invoice terms.
>
> — Federation of Small Businesses, [2024 late payment report](https://www.fsb.org.uk/)
```

Because the same `>` syntax powers both callouts and quotes, keep them distinguishable: callouts open with a **bold label:**, quotes don't and carry an attribution line.

---

## Inline code

Invoicing posts rarely need code blocks. Use inline code (backticks) only for genuinely literal strings:

- A field value the reader types verbatim, e.g. write `Net 30` in the terms field
- A filename, e.g. `invoice-2026-014.pdf`

Don't use backticks for emphasis — that's what bold is for.

---

## Images in flow

See `media-and-images-skill.md` for the full image discipline. Images are markdown only — `![descriptive alt](/blog/<slug>/<file>)` — never `<Image>`. Quick scannability points:

- The featured image is set via the `featuredImage` frontmatter path and rendered by the layout, not in the body
- Inline supporting images every 600-1,000 words in long posts (e.g. a screenshot of a finished invoice in a how-to)
- Every inline image has descriptive alt text
- No decorative-only images — every image earns its presence
- Prefer a real GFM table over a screenshot of a table

---

## Bold and italic

Bold and italic are emphasis types with different jobs:

- **Bold** for the load-bearing phrase in a paragraph — what the skimmer needs to see
- *Italic* for technical terms on first use, document names, deliberate emphasis tone

### Rules

- Bold one phrase per paragraph maximum (more dilutes)
- Italic 2-3 times per page maximum (more is precious)
- Never both at once (***bold italic*** is shouting)
- Never an entire sentence bolded — break it or rewrite

### What NOT to bold

- Keywords for SEO — Google notices the artificial pattern
- Random words for "visual interest"
- Every sentence in a paragraph
- Headings (they're already styled)

---

## In-post navigation for long guides

There's no `<TableOfContents>` component and no heading anchors, so don't fake a jump-link TOC. For a long pillar guide, help the reader instead with:

- Tight, descriptive H2 phrasing that reads like an outline when skimmed
- A short "what this covers" sentence near the top in plain prose
- A closing "what to read next" with real internal links: `[How to set a late fee](/blog/how-to-charge-late-fees)`

### When a post is long enough to need it

- Pillar guides and long how-tos benefit from the "what this covers" intro line
- Short FAQ or definition posts don't — the H2 list is already the visual map

---

## The visual rhythm budget

For every 250-300 words of body, there should be a visual event. Visual events are:

- A new H2 or H3
- A bulleted or numbered list
- A GFM table
- A blockquote callout (`> **Tip:** …`)
- A plain blockquote
- An image

A 2,000-word post should have 7-9 visual events distributed across the body — not clustered at the top, not absent for a 600-word stretch.

The audit catches: any 300-word run with zero visual events.

---

## Pre-publish formatting checklist

- [ ] Exactly one H1 (from frontmatter `title`, not in body)
- [ ] No heading skips (H2 → H4 forbidden)
- [ ] No heading anchors anywhere (`{#id}` is contraband)
- [ ] H2s use claim/question phrasing, not labels
- [ ] No orphan H3s (a single H3 under an H2)
- [ ] No paragraph > 6 sentences (unless pillar guide)
- [ ] No 3+ short paragraphs in a row
- [ ] First sentence of every paragraph is load-bearing
- [ ] Lists are genuinely parallel (3+ items, parallel grammar)
- [ ] Tables are GFM markdown, header row, short cells, ≤ 4 columns
- [ ] Callouts are blockquotes with bold labels, 1-3 per post, varied
- [ ] Plain blockquotes are real quotes with attribution
- [ ] Images are markdown `![alt](/blog/<slug>/<file>)`, never `<Image>`
- [ ] Bold used for load-bearing phrases, not keywords
- [ ] Visual event every 200-300 words

---

**BlogOS** — structure is content.
