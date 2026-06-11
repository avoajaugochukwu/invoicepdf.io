---
name: featured-snippet
description: Win position-zero. The 40-60 word direct-answer paragraph (the first body paragraph, before the first H2), definition snippets, list snippets, table snippets, and People Also Ask capture. This skill teaches the writer to structure paragraphs that Google's snippet bot can lift and display above the regular search results — using only the markdown this stack actually renders.
---

# Featured Snippet — winning position zero

> Position zero is the box at the top of Google search results that lifts a paragraph, list, or table from a single page and shows it as the direct answer. Pages that win the snippet typically see a ~20-30% lift in click-through, plus voice-assistant inclusion. For invoicing definition and how-to queries, this is the highest-leverage SEO target on the page.

---

## Rendering reality first

This site uses `next-mdx-remote` + `remark-gfm`, **no custom components, no rehype-slug**. That shapes everything below:

- The page H1 comes from frontmatter `title`. **The MDX body starts at H2** — never put a `# ` in the body.
- The direct-answer paragraph is the **first paragraph of the body, before the first H2.**
- Lists and tables are plain **GFM markdown** (numbered/bulleted lists, pipe tables).
- **Never write `## Heading {#id}`** — there are no heading anchors; `{#id}` renders as literal text.
- No JSX. Emphasis is markdown `**bold**`; callouts are blockquotes (`> **Tip:** …`).
- There is **no `featured_snippet` frontmatter field** — the snippet target is just the visible first paragraph. Any FAQ schema is emitted by the Next.js route, not frontmatter (see `seo-and-schema-skill.md`).

The existing post `what-does-net-30-mean-on-an-invoice.mdx` is the house style: a short lead, then a `## Quick Answer: …` H2 with the bolded one-line answer. Match that pattern.

---

## The four snippet shapes Google awards

There are exactly four. Pick which one you're targeting before writing.

| Snippet shape | What it looks like in SERP | Source on page | Trigger queries |
|---|---|---|---|
| **Paragraph** | 1-2 sentence answer in a card | A 40-60 word paragraph | "what is X", "what does X mean", "why does X" |
| **List** | Numbered or bulleted list of 6-8 items | An H2-titled list | "how to X", "steps to Y" |
| **Table** | A small 2-4 column table | An on-page GFM table | "X vs Y", "X cost", "X comparison" |
| **Video** | A YouTube thumbnail | A YouTube video (not your post) | Out of scope for blog SEO |

This skill covers the first three.

---

## The paragraph snippet (most common)

Google lifts a single paragraph and displays it. For invoicing definition queries ("what is a proforma invoice", "what does net 30 mean") this is the shape to target.

### Anatomy of a winning paragraph snippet

- **40-60 words.** Under 40 looks incomplete in the card; over 60 gets truncated.
- **First sentence is the definition.** Pattern: `X is <definition>.`
- **Sentences 2-3 add the non-obvious** — a number, a qualification, or a contrast with a near-relative.
- **No "in this article" preamble.** The paragraph stands alone; Google strips it from context.
- **Plain prose.** No links, no bold, no lists, no images inside the snippet paragraph.
- **Plain financial accuracy.** Any payment-term, tax, or legal figure here is load-bearing — verify it against an authoritative source and state the jurisdiction where relevant (see `accuracy-and-claims-skill.md`).

### Where the paragraph lives on the page

Directly under the H1 (which the wrapper renders from `title`), as the **first body paragraph, before the first H2.** This is the first thing the reader sees.

In MDX (the body — note it starts with the answer paragraph, then an H2):

```mdx
A proforma invoice is a preliminary bill a seller sends before the work or sale is final, so the buyer can see expected costs in advance. It is not a demand for payment and does not count for accounting or tax. Once the details are confirmed, you replace it with a true invoice.

## What a proforma invoice is used for
```

That paragraph is the snippet target. It's 54 words: it defines the term, states the defining feature (not a payment demand, not for tax), and tells the reader what comes next. No `{#id}` on the H2, no JSX, no bold inside the paragraph.

### The house pattern: a "Quick Answer" H2

The Net 30 post leads with one or two short framing lines, then puts the lifted answer under a `## Quick Answer` H2 with the answer bolded on its own line:

```mdx
Ever seen "Net 30" on an invoice and wondered what it actually means? You're not alone — here's the plain-English version.

## Quick Answer: What Does "Net 30" Mean?

**"Net 30" means the full payment is due 30 days after the invoice date.** It's a common payment term: it tells the client they have 30 calendar days from the invoice date to pay the full amount. So an invoice dated June 1 with Net 30 terms is due by July 1.
```

Both patterns work. Use the bare first paragraph when the query is a pure definition; use the "Quick Answer" H2 when a sentence of framing helps the reader settle in first. Either way the **lifted text is 40-60 words of plain prose** (the bolded lead sentence plus the supporting sentences read as one answer).

### Common paragraph-snippet patterns

**"What is X" pattern:**
> `X is <one-sentence definition>. <Specificity 1>. <Specificity 2 or contrast>.`
> Example: "An invoice is a document a seller sends to request payment for goods or services. It lists what was provided, the amount owed, and the due date. Unlike a receipt, which confirms a payment already made, an invoice asks for payment."

**"What does X mean" pattern:**
> `X means <plain definition>. <How it works>. <Worked number>.`
> Example: "'Due on receipt' means payment is expected as soon as the client gets the invoice, with no grace period. It signals you want to be paid immediately. A freelancer billing a $500 logo might use it for a trusted repeat client."

**"How does X work" pattern:**
> `X works by <process in one sentence>. <Step or example>. <Qualification or limit>.`

**"How long does X take" pattern:**
> `X takes about <number> <unit> at <baseline>. <Range>. <What changes it>.`
> Example: "Net 30 invoices are paid in about 30 days, but real-world averages run longer — many small businesses see 35-45 days. Clear terms and early-payment discounts shorten the gap."

---

## The list snippet

Google lifts a numbered or bulleted list. Used for procedural queries ("how to send an invoice") and rankings.

### Anatomy of a winning list snippet

- **6-8 items.** Fewer looks thin; more gets truncated.
- **List title is an H2** phrased as the query (plain `## …`, no `{#id}`).
- **Each item is short** — under 12 words ideally.
- **Items use parallel grammar** — if item 1 is a verb phrase, all items are verb phrases.
- **No deep formatting inside items** — Google's snippet view drops nested lists, bold, and links.

### Example (how-to list snippet target)

```mdx
## How to Send an Invoice in 7 Steps

1. Add your business name and contact details.
2. Add the client's name and contact details.
3. Give the invoice a unique invoice number.
4. List each service or item with its price.
5. Add the subtotal, any tax, and the total due.
6. State the payment terms and due date.
7. Send it as a PDF and confirm the client received it.
```

This list will be lifted to the SERP if the page ranks for "how to send an invoice." Each item is short, parallel, and complete in itself.

### List snippet pitfalls

- **Items too long.** A list where each item is a paragraph won't get pulled.
- **Inconsistent grammar.** Item 1 "Add your details," item 2 "You should also include the client" — Google sees inconsistency and skips.
- **Wrong H2.** If the H2 is "Step 5: Sending," it doesn't match the query.

### Numbered vs bulleted

- **Numbered** for procedures with order (steps, rankings).
- **Bulleted** for parallel items without order (what to include on an invoice, payment-term options).

Google rewards numbered lists slightly more often for how-to and ranking queries.

---

## The table snippet

Google lifts a small GFM table, usually for "X vs Y" or "X cost" queries.

### Anatomy of a winning table snippet

- **2-4 columns.** More gets truncated.
- **3-8 rows.** More gets truncated.
- **Header row required** — the first row is the column labels.
- **Short cells** — phrases or numbers, never paragraphs.
- **Plain text** — no inline links, no bold, no nested anything.
- **Lives under an H2** phrased close to the target query.

### Example (comparison table snippet target)

```mdx
## Invoice vs Receipt at a Glance

| | Invoice | Receipt |
|---|---|---|
| Purpose | Requests payment | Confirms payment made |
| Sent when | Before payment | After payment |
| Contains | Amount owed, due date | Amount paid, date paid |
| Used for | Tracking money owed | Proof of purchase |
| Who needs it | Client, to pay you | Buyer, for their records |
```

Five rows, three columns, header row present, every cell a short phrase. This table can win the "invoice vs receipt" snippet.

### Tables on comparison archetypes

For the `comparison` archetype, put a "Quick comparison at a glance" table near the top, under an H2 close to the query. Build it like a billboard — it's the snippet target.

---

## People Also Ask (PAA) capture

Below or beside the snippet box, Google shows "People Also Ask" — expandable related questions. Each PAA box pulls a paragraph from a (sometimes different) page.

### How to capture PAA boxes

1. **Research the PAA stack with WebSearch.** Search the target query, read the PAA box and the "People also search for" terms, and note the 5-8 questions Google shows. WebFetch the source pages Google pulled to see what a winning answer looks like. (Perplexity/DataForSEO are optional extras if keys are available — keep it tool-agnostic; WebSearch + WebFetch is enough.)
2. **Write each PAA question as an H2 or H3** on your page, phrased exactly as Google shows it (plain heading, no `{#id}`).
3. **Answer each in 40-60 words** directly under the heading.
4. The Next.js route emits the `FAQPage` schema so Google can serve the answers directly — the schema text must match the visible answers (see `seo-and-schema-skill.md`).

### Example

If the target query is "what does net 30 mean on an invoice" and the PAA box shows:

- When is a Net 30 invoice due?
- Is Net 30 from the invoice date or the delivery date?
- Can I charge a late fee on a Net 30 invoice?
- Is Net 30 good for small businesses?

Then the bottom of the page has:

```mdx
## Frequently Asked Questions

### When is a Net 30 invoice due?

A Net 30 invoice is due 30 calendar days after the invoice date, not 30 business days. If the invoice is dated June 1, payment is due by July 1. Some businesses count from the delivery date instead, so always state which date your terms run from.

### Can I charge a late fee on a Net 30 invoice?

Yes, if your invoice or contract stated the late-fee terms in advance. The legal cap on late fees and interest varies by jurisdiction — in the US it differs by state, and in the UK statutory rules apply — so verify the limit where you operate before charging.
```

The H3s capture the PAA boxes; the 40-60 word answers are what Google lifts. Note the jurisdiction is stated on the legal claim and flagged for verification (`accuracy-and-claims-skill.md`).

---

## The featured-snippet decision tree

Before writing, decide which snippet you're targeting:

1. **Is the target query informational?** (Yes for most of these posts.)
2. **What shape is the existing snippet on Google?**
   - WebSearch the target query.
   - If a snippet box already shows → that's the shape Google has decided this query wants.
   - If no snippet → an opportunity, but harder to predict the shape.
3. **Build the matching structure on your page:**
   - Paragraph snippet showing? → 40-60 word direct-answer first paragraph (or "Quick Answer" H2).
   - List snippet showing? → H2 + 6-8 short parallel items.
   - Table snippet showing? → H2 + small 3-5 row, 2-4 col GFM table.
4. **Match the format, beat the content.** If "what does net 30 mean" gets a paragraph snippet, your paragraph wins by being tighter, more accurate, and backed by a worked example the current answer lacks.

---

## Pre-publish snippet checklist

- [ ] Snippet shape decided (paragraph / list / table)
- [ ] Paragraph snippet: lives as the first body paragraph (or under a "Quick Answer" H2), before the first real H2
- [ ] Body starts at H2 — no `# H1` in the MDX
- [ ] Paragraph: 40-60 words, plain prose, no inline links/bold/lists
- [ ] List: 6-8 short parallel items, numbered if procedural
- [ ] Table: 3-5 rows, 2-4 columns, header row, short cells, GFM syntax
- [ ] H2 above the list/table phrased close to the target query — plain `## …`, no `{#id}`
- [ ] PAA questions captured as H3s under a `## Frequently Asked Questions` H2
- [ ] FAQ answers match the route's FAQPage schema word-for-word
- [ ] Every financial/legal figure in a snippet is verified and jurisdiction-stated

---

## What kills snippet eligibility

- The direct answer is hidden under an "in this article we will explore…" preamble
- The H2 above the list/table doesn't match the query
- The first paragraph is more than 80 words
- The paragraph contains inline links, bold, or other formatting
- The list items are full paragraphs
- The table has too many columns
- `## Heading {#id}` anchors written into the body (render literally — no rehype-slug)
- JSX/custom components in the MDX (none exist on this stack)
- The page has zero internal links (Google rewards pages embedded in a topical hub)
- The route's FAQ/HowTo schema doesn't match the visible content
- The page isn't yet ranking on page 1 — snippets only come from page-1 results

**Snippets are a multiplier, not a starter.** A page that doesn't already rank on page 1 won't win the snippet. Write the page well first — a worked example, a table, one non-obvious insight — then optimize for the box.

---

**BlogOS** — own the box.
