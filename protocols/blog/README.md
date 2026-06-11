# BlogOS — Human-Quality Invoicing Content at Scale

A content-writing skill pack for **invoicepdf.io**: the writing craft, SEO discipline, financial-accuracy gate, and internal-linking architecture that turn an invoicing question into a page Google rates as helpful, original, and trustworthy — and that a freelancer actually finds useful.

The job: win search traffic from people with an invoicing, getting-paid, or small-business-money question, genuinely help them, and show them invoicepdf.io can do the boring part. Grounded content, real worked examples, no thin filler, and a growing web of internal links.

## How the system maps to this repo

- **Content lives at** `content/blog/<slug>.mdx` — one MDX file per post.
- **Parsed by** `lib/blog.ts` (gray-matter frontmatter → `PostFrontmatter`).
- **Rendered by** `components/MdxContent.tsx` (`next-mdx-remote` + `remark-gfm`).
- **Served at** `/blog/<slug>` (`app/blog/[slug]/page.tsx`).
- **This pack** at `protocols/blog/` — the writing craft + SEO + accuracy + linking discipline that produces MDX which fits that renderer.

The pack documents the craft applied within the real renderer. It does **not** invent a template engine, a `plan/` folder, an execution sheet, or slash commands — none of those exist in this repo. If you see those referenced anywhere, they're stale.

## The rendering contract (read this first)

The renderer is plain `next-mdx-remote` with `remark-gfm` and **no custom components**. That constrains everything:

- **Frontmatter** — only these fields are read: `title`, `slug`, `date`, `excerpt`, `description`, `author`, `featuredImage`, `tags`. Nothing else renders. Do not invent `meta_title`, `archetype`, `schema`, `internal_links`, etc.
- **`title` is the H1.** The body starts at the direct-answer paragraph, then H2s. No `# ` in the body.
- **No heading anchors.** `## Heading {#id}` renders the `{#id}` as literal text. Use plain `## Heading`.
- **Images** are markdown `![alt](/blog/<slug>/<file>)` (files under `public/blog/<slug>/`). There is no `<Image>` component.
- **Callouts** are blockquotes (`> **Tip:** …`). There is no `<Callout>` component.
- **Tables** are GFM markdown tables.
- **Links** are markdown; external `http` links auto-open in a new tab.

## The accuracy gate (what makes this site different)

Invoicing content is YMYL-adjacent — money, tax, payment law, contracts. Every load-bearing money/tax/legal claim is verified against an authoritative primary source and stamped with its jurisdiction before publish. A wrong or unsourced claim blocks the post. This replaces the source pack's scripture-verification gate. See `accuracy-and-claims-skill.md`.

## Files in this pack (21)

| File | Purpose |
|---|---|
| `blog-os-master.md` | Core philosophy, the real MDX output contract, anti-AI-slop checklist, mandatory re-audit |
| `page-structures-skill.md` | The 10 invoicing archetypes — frontmatter, body skeleton, word band, schema, worked example each |
| `accuracy-and-claims-skill.md` | **Hard gate.** Every money/tax/legal claim verified + jurisdiction-stamped before publish |
| `keyword-research-skill.md` | The research method: WebSearch (SERP + PAA) + WebFetch primary sources; optional accelerators |
| `topical-authority-skill.md` | Pillar-cluster architecture + the live cluster map of existing posts + internal-linking discipline |
| `engagement-mechanics-skill.md` | Scroll-depth psychology, scannability cadence, dwell-time mechanics |
| `BLOG-INTRO-SWIPE.md` | Opening-paragraph patterns by intent |
| `variety-rotation-skill.md` | Slot-rotation system to prevent same-y posts across the corpus |
| `narrative-arc-skill.md` | Narrative arc for longform pillar essays (optional) |
| `conclusion-and-cta-skill.md` | Conclusion shapes, single-CTA-to-our-generator discipline, FAQ block |
| `title-meta-slug-skill.md` | `title` / `description` / `slug` rules |
| `seo-and-schema-skill.md` | Schema.org JSON-LD per archetype (wired in the route), canonical, breadcrumbs |
| `research-and-citation-skill.md` | Primary-source rules, the invoicing/finance source whitelist, attribution |
| `eeat-signals-skill.md` | Author byline, bio, "reviewed by" for financial YMYL, last-updated discipline |
| `featured-snippet-skill.md` | 40-60 word answer paragraph, PAA capture, list/table snippets |
| `media-and-images-skill.md` | Markdown images, alt text, hero/`featuredImage`, real tables over screenshots |
| `scannable-formatting-skill.md` | H2/H3 cadence, paragraph length, lists vs prose, blockquote callouts |
| `update-discipline-skill.md` | Update vs replace vs merge vs sunset + the dedup plan for the existing corpus |
| `google-trust-audit-skill.md` | HCU + E-E-A-T + spam-policy + financial-accuracy pre-publish audit |
| `analytics-coaching-skill.md` | Read GA4 + Google Search Console, diagnose post problems |
| `README.md` | This file |

Plus the operator guide `USAGE.md`, and two files one level up:

- `protocols/site-voice-profile.md` — how to build a per-site voice lock.
- `protocols/rotation-log.md` — the running log of which rotation slots each published post used.

## How to use it

There are no slash commands in this repo (yet). The workflow is direct:

1. **Load the pack.** Read `blog-os-master.md` first, then the skill files relevant to the archetype you're writing.
2. **Pick a target query and archetype** (`page-structures-skill.md`).
3. **Research** (`keyword-research-skill.md`): WebSearch the query + People Also Ask, WebFetch the top 2-3 results, find the gap.
4. **Plan internal links** against the live cluster map (`topical-authority-skill.md`).
5. **Draft** in Pure MDX per `blog-os-master.md`.
6. **Run the accuracy gate** (`accuracy-and-claims-skill.md`) and the re-audit (`blog-os-master.md` Step 8).
7. **Write the file** to `content/blog/<slug>.mdx` and append a rotation entry to `protocols/rotation-log.md`.

See `USAGE.md` for the day-to-day flow.

## The non-negotiable defaults

1. **Pure MDX, real frontmatter only.** Frontmatter first, body second, no preamble, no closer.
2. **`title` is the H1.** Body starts at H2.
3. **Anti-AI-slop checklist.** No em dashes, no "Here's the thing:", no fake percentages.
4. **Accuracy gate.** Wrong/unsourced money/tax/legal claim = post does not ship; jurisdiction always stated.
5. **Internal links.** 3+ per post (up to pillar + across to siblings); no orphans.
6. **One CTA, always our generator.** Never a competitor, never "subscribe/comment".
7. **Rendering reality.** Markdown images, blockquote callouts, GFM tables, plain headings — no JSX components, no `{#id}` anchors.

## Provenance

Adapted from a generic content pack (originally tuned for a Bible site) and re-grounded for invoicepdf.io: invoicing topic, the real MDX renderer, the financial-accuracy gate, and a heavy internal-linking emphasis. The Bible-specific templates, scripture gate, and fictional pipeline were removed.
