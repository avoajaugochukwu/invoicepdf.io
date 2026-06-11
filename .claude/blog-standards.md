# invoicepdf.io — Blog standards (shared by /b-write and /b-review)

The single source of truth for how a post on this site must look, read, and be sourced.
Both `/b-write` (new posts) and `/b-review` (audit existing) load this file and enforce it.

---

## 1. Format & frontmatter contract

Posts are **MDX** files in `content/blog/<slug>.mdx`, parsed by `lib/blog.ts` (gray-matter)
and rendered by `components/MdxContent.tsx`. Frontmatter must include exactly these keys:

```yaml
---
title: "Sentence-case title, leads with the primary keyword"
slug: "kebab-case-slug"          # the URL; must match the filename intent. NEVER change a live slug.
date: "2026-06-10T00:00:00.000Z" # ISO 8601. New post = today; review = refresh to today.
excerpt: "1–2 sentence teaser shown on the blog index."
description: "Meta description, <=160 chars, keyword-led."
author: "Charles Ugo"            # keep the existing author on a review; default new posts to "Charles Ugo".
featuredImage: "/blog/<slug>/featured.png"
tags: ["invoice"]
---
```

Rendering facts that constrain the body:
- The frontmatter `title` is the page's only `<h1>`. In-body `#`/`##` both render as `<h2>` —
  so use `##` for sections and **bold lead-ins** instead of deep `###` nesting.
- GFM tables, ordered/unordered lists, blockquotes, and fenced code blocks all render. Use
  ```` ```text ```` (no space) for plain code/sample blocks — `plain text` with a space can render unstyled.
- Images live under `/public/blog/<slug>/`. Every `![alt](…)` needs real, descriptive alt text.

## 2. Voice

Clear, friendly, concrete, fluff cut. Write for a beginner (freelancer / side-hustler /
small-business owner). Cutting fluff means deleting filler — humor tips, fake reflective
questions, "Here's the thing", restating the intro — **never** under-covering the topic.
Bold lead-ins over `###` soup. Short paragraphs. Specific examples over abstraction.

## 3. Depth bar (earn the length, don't pad)

- Fully satisfy intent: definition → mechanics → worked example(s) → interpretation →
  common mistakes/pitfalls → adjacent concepts → FAQ that answers the real People-Also-Ask set.
- Comprehensive guides ("what is / how to") aim **~2,000–2,600 words by coverage**; tight
  definition/term pages aim **~900–1,300**. Length comes from covering more, never padding.
- Every `##` must teach something a reader couldn't guess. ≥2 worked examples in a how-to.
- Include a `## Frequently Asked Questions` section answering the harvested PAA set.

## 4. One primary keyword per URL (anti-cannibalization)

Before writing or expanding, confirm the post's single primary keyword and that no other
post already owns it (see the topic map in `plan/` once it exists). If two posts would
compete, consolidate or sharpen — do not ship a second page for the same intent. Cross-link
within the topic cluster (templates/tools ↔ basics ↔ getting-paid).

## 5. External links — REQUIRED, where relevant (make the determination)

Outbound links to high-authority sources are an E-E-A-T / trust signal and are expected on
every substantive post. Use plain markdown — the renderer auto-adds `target="_blank"` +
`rel="noopener noreferrer"` to any `http(s)` link, so **do not** hand-write anchor attributes
or add `nofollow` (these are editorial citations, keep them followed).

**WHEN to add one (link the FIRST relevant mention):**
- a statistic, study, or survey figure → link (and attribute) the original source;
- a tax / legal / regulatory fact → link the governing authority;
- a formal definition, term, or etymology → link a recognized reference;
- a named external tool's specific feature/flow → link that tool's official help/docs;
- a standard or spec (e.g. Incoterms) → link the body that defines it.
Do **not** link generic common-knowledge statements, and don't link the same source twice.

**WHAT to link to (prefer primary / canonical / high-authority):**
| Topic on this site | Authority to cite |
|---|---|
| Taxes, self-employment, 1099, Schedule C, EIN vs SSN, sales tax | IRS — `irs.gov` |
| International trade, proforma use, customs | trade.gov (ITA), `cbp.gov` |
| Incoterms / international delivery terms | ICC — `iccwbo.org` |
| Financial term definitions (invoice, Net 30, proforma, accounts receivable) | Investopedia — `investopedia.com` |
| Word meaning / etymology | Merriam-Webster — `merriam-webster.com` |
| A cited stat (e.g. unpaid-invoice totals) | the original publisher of the figure |
| A genuinely instructional step on a non-competing platform (e.g. "get your Amazon invoice") | that platform's official help page |

**HOW MANY:** ~3–6 quality external links in a long guide, ~1–3 in a short page. Quality over
quantity; never link-stuff. Descriptive anchor text (not "click here" / not a bare URL).

**VERIFY before embedding:** every external URL must resolve. Check it:
`curl -sIL -o /dev/null -w "%{http_code}\n" "<URL>"` → expect 200 (3xx that lands on 200 is fine).
Never ship a guessed or dead link. If you can't verify a specific deep page, link the
authority's stable top-level resource instead.

**Known-authority exception (bot-blocked sites).** A few high-authority references return
`402`/`403` to `curl`/automated fetches as anti-scraping — they are NOT dead, and they work
for real users. For these domains, link the **documented canonical URL pattern** instead of
requiring a 200, but only if you are confident the slug is correct:
- Merriam-Webster: `https://www.merriam-webster.com/dictionary/<word>` (e.g. `/invoice`)
- Investopedia: `https://www.investopedia.com/terms/<first-letter>/<term>.asp` (e.g. `/terms/i/invoice.asp`)
Use these for definition/etymology citations. If you are unsure the exact slug exists, prefer a
`.gov`/`.org` authority that DOES verify (IRS, trade.gov, ICC, Cornell LII) — those are
higher-trust anyway and should be the first choice when available.

**Linking tools & competitors — be helpful first, funnel-aware second.** Helpfulness wins:
don't hide useful tools from readers or pretend rivals don't exist (that erodes trust). The
guardrail is about *not actively funneling a ready-to-act reader to a competitor on a page
where our own product is the answer* — not about censoring information. Apply judgment:

- **Lead with our own** generator/templates as the primary solution wherever it fits the
  reader's need (internal link). Our product should never sit buried under a wall of rivals.
- **You MAY link a third-party / competing tool when it is genuinely the most helpful thing:**
  - on comparison / "best X" / "alternatives" posts, where linking the options is honest and
    expected (withholding there looks evasive);
  - when the reader's need is one we *don't* serve (full accounting, payroll, recurring
    subscription billing) — sending them to the right fit builds trust and costs us nothing.
- **Curate, don't dump.** A focused how-to shouldn't become a link farm of eight rivals. Name
  a few in plain text, link only the genuinely useful one or two, and keep ours first.
- **When you DO link a commercial competitor or affiliate, add `rel="nofollow"`** so we don't
  pass ranking equity or imply endorsement. Neutral authorities and source citations (IRS,
  trade.gov, dictionaries, the stat's publisher) stay normal *followed* links — those are the
  trust signal. (Mechanism: the renderer adds `nofollow` automatically for known
  competitor/affiliate domains; see `components/MdxContent.tsx`. If linking a competitor not on
  that list, write the link as raw `<a href="…" rel="nofollow">…</a>`.)

**Internal links** stay relative (`/blog/<slug>`, `/`) so they render same-tab. Never link a
page to its own URL (no self-referential links).

## 6. Accuracy gate — US invoicing (hard fails)

Ground load-bearing facts via Perplexity (`PERPLEXITY_API_KEY` in `.env`; model `sonar`,
fallback `sonar-pro`) and/or the authorities in §5. Then enforce:

- **No VAT** as a US-applicable concept (mention only to note it's non-US; default framing = "sales tax").
- **No claim** the US legally mandates a single invoice format — required fields are practical, not a federal mandate.
- **Never** tell readers to put their SSN on an invoice, and don't imply an EIN is required on one.
- **Don't** say "you must charge sales tax" — it's state- and transaction-dependent; many services aren't taxed.
- **Don't** say you need an LLC / registered business to invoice — a sole proprietor can invoice under their legal name.
- **Net N = N days after the invoice date** (not "by the Nth of the month").
- If numbering is discussed, **warn against reusing invoice numbers** (even voided ones).
- **Attribute** vendor/marketing stats ("according to …"), don't state them as universal fact.
- Frame all tax/legal statements as **general information, not advice**.

## 7. MDX validity (must pass)

- No raw unescaped `<` that MDX would read as a JSX tag.
- Balanced code fences; well-formed tables (consistent column counts).
- No stray `---` that looks like a second frontmatter block (body `---` between blank lines = `<hr>`, fine).
- Frontmatter `description` ≤ ~160 chars.

## 8. Perplexity grounding snippet

```bash
KEY=$(grep '^PERPLEXITY_API_KEY=' .env | cut -d= -f2-)
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"model":"sonar","messages":[{"role":"user","content":"YOUR QUESTION"}]}' \
  | python3 -c "import json,sys;print(json.load(sys.stdin)['choices'][0]['message']['content'])"
```
