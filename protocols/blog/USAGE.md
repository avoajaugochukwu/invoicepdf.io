# BlogOS — Usage (invoicepdf.io)

Keyword-driven content writing for invoicepdf.io. No manual briefs, no fictional template engine. One MDX file per post, grounded in real research, gated on accuracy, woven into the internal-link graph.

## The output, every time

One MDX file at `content/blog/<slug>.mdx`:

```mdx
---
title: "What Does Net 30 Mean on an Invoice?"
slug: "what-does-net-30-mean-on-an-invoice"
date: "2026-06-10T00:00:00.000Z"
excerpt: "A plain-English guide to Net 30 for freelancers and small businesses."
description: "Learn what Net 30 means on an invoice, how it affects when you get paid, and when to use it."
author: "InvoicePDF Team"
featuredImage: "/blog/what-does-net-30-mean-on-an-invoice/featured.jpg"
tags: ["invoice", "payment terms"]
---

<40-60 word direct-answer paragraph>

## First H2
...
```

Frontmatter first, body second. Nothing before the frontmatter, nothing after the last paragraph. `title` is the H1, so the body starts at the answer paragraph then H2s. Only the eight frontmatter fields above are read by `lib/blog.ts` — see `blog-os-master.md` for the full contract.

---

## The flow for one post

1. **Pick the target query** and confirm the archetype (`page-structures-skill.md`): definition, how-to, comparison, listicle, pillar, FAQ, template/tool-landing, etc.
2. **Research the SERP** (`keyword-research-skill.md`):
   - WebSearch the query and read the top results + the People Also Ask box.
   - WebFetch 2-3 ranking pages to see their H2s and angle.
   - Identify the gap you can fill that they don't.
   - List the primary sources you'll cite.
3. **Plan internal links** (`topical-authority-skill.md`): find the post's pillar and 2-4 sibling posts in the live cluster map. Every post links up to its pillar and across to siblings. No orphans.
4. **Lock the H2 skeleton** before drafting prose (`blog-os-master.md` Step 3).
5. **Draft** in Pure MDX. Open with the direct-answer paragraph. Scannability event every 200-300 words (`scannable-formatting-skill.md`, `engagement-mechanics-skill.md`).
6. **Run the accuracy gate** (`accuracy-and-claims-skill.md`): verify every money/tax/legal claim against a primary source, state the jurisdiction, patch inline. A claim that can't be verified gets cut or scoped — it does not ship.
7. **Conclude with one CTA** to invoicepdf.io's generator (`conclusion-and-cta-skill.md`). Never a competitor, never "subscribe/comment".
8. **Re-audit** (`blog-os-master.md` Step 8): run the quality checklist, fix every violation, then output.
9. **Write the file** to `content/blog/<slug>.mdx` (slug = filename) and add a rotation entry to `protocols/rotation-log.md`.

---

## The hard rules

1. **Pure MDX, real frontmatter only.** The eight fields in `lib/blog.ts`. No invented fields — they don't render.
2. **Accuracy gate is a publish blocker.** Every payment-term definition, tax/VAT/GST claim, late-fee/interest/collections claim, country-specific rule, statistic, and named-tool fact is verified against a primary source and jurisdiction-stamped. Any unverifiable load-bearing claim → cut or scope, do not ship.
3. **Internal links, minimum 3.** One up to the pillar, two-plus across to siblings, descriptive anchor text matching the target query. Check the live cluster map first.
4. **One CTA, always our generator.** invoicepdf.io's invoice generator is the conversion path on every post. Competitors may appear neutrally only inside genuine comparisons. Kill ghost CTAs ("subscribe", "comment below").
5. **Rendering reality.** Markdown images (`![alt]()`), blockquote callouts, GFM tables, plain `##` headings (no `{#id}`). No `<Image>`/`<Callout>`/any JSX.
6. **No thin content.** Every post must teach something a SERP skim can't: a worked example with real numbers, a table or template, and at least one non-obvious insight.

---

## Path conventions

| Artifact | Location |
|---|---|
| Post MDX | `content/blog/<slug>.mdx` (slug = filename, no nested folders today) |
| Public URL | `/blog/<slug>` |
| Post images | `public/blog/<slug>/…` (hero is `featuredImage`) |
| The pack | `protocols/blog/` |
| Voice profile | `protocols/site-voice-profile.md` (build only when the audience needs a lock) |
| Rotation log | `protocols/rotation-log.md` |
| Parser / frontmatter type | `lib/blog.ts` (`PostFrontmatter`) |
| Renderer | `components/MdxContent.tsx` |

---

## Writing a batch

Write posts one at a time, not in parallel — each needs its own SERP research, accuracy gate, and internal-link planning against the current map. After each post ships, update the live cluster map in `topical-authority-skill.md` so the next post links to it. The corpus gets denser as it grows; that density is the point.

---

## First priorities for the existing corpus

The 18 existing posts have two structural problems to fix before adding more:

1. **They're all orphans** — almost no internal links between them. Work through the live cluster map in `topical-authority-skill.md` and add up/across links to each.
2. **Three duplicate pairs** are cannibalizing each other (two "what is an invoice", two "write an invoice for beginners", two proforma). Merge each to one canonical post and 301 the rest — plan in `update-discipline-skill.md`.

They also share three thin-content sins to scrub on the next edit pass: ghost CTAs ("subscribe to my blog", "comment below"), recommending competitor tools (Wave/FreshBooks/QuickBooks) as the CTA instead of our generator, and zero primary-source citations on money claims. Fix those whenever you touch a post.

---

## What's NOT in this repo

- **No slash commands** (`/blog`, `/b-write`, `/b-review`). There is no `.claude/commands/` here. Run the flow above directly.
- **No `plan/game_plan.md` or `plan/execution_sheet.md`.** Pick queries from research, not a stale sheet.
- **No template wrappers / `content/<type>/` folders.** One flat `content/blog/` directory, one renderer.
- **No mandatory paid pipeline.** WebSearch + WebFetch are the baseline. DataForSEO, Perplexity, and Firecrawl keys exist in `.env` as optional accelerators.
