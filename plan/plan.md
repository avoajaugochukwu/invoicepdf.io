# invoicepdf.io — SEO Growth Plan

> **For the executing agent:** This plan is prioritized top-to-bottom. Do phases in order — earlier
> phases unblock later ones. Each task has a **Goal**, **Steps**, **Files**, and **Done when** (acceptance
> criteria). Keyword data lives in `scripts/keyword-research/OPPORTUNITIES.csv` (369 rows) and the full
> dump in `scripts/keyword-research/keywords_all.csv` (11,846 rows, US location, live DataForSEO data
> pulled 2026-06-10). Volume/KD/CPC referenced below come from there.

---

## Context & diagnosis (read first)

**The site today:** 1-year-old domain, recently un-parked. 18 blog posts in `content/blog/*.mdx`.
Google Search Console (last 3 months): ~615 impressions, **0 clicks**, avg position ~89–98 (page 9–10).
Impressions are trending **up** (~10/day in March → ~15–25/day in June). Two pages already rank well:
homepage (pos 1, brand) and `invoice-financing-made-simple` (pos 2) — proof the domain *can* rank when
competition is low. Traffic skews UK/NZ/AU/ZA, but this plan targets **US** (per request; US has the volume).

**Three root problems, in priority order:**

1. **Keyword cannibalization (biggest SEO blocker).** ~9 of 18 posts are near-duplicates competing for
   the same queries. Google can't pick a winner, so it ranks none well. This is why the top page sits at
   position 89 despite 506 impressions. → **Phase 1.**

2. **Product gap (biggest *business* blocker).** `app/page.tsx` hero says "Create professional invoices in
   minutes," but **there is no invoice tool** — no generator, no PDF export, no downloadable templates. The
   site is a blog wearing a tool's domain name. The most winnable keywords are transactional ("invoice
   template word", "invoice template google docs") — ranking them without a tool/download to satisfy intent
   = high bounce = rankings won't hold. → **Phase 2.**

3. **Wrong keyword targets.** Existing posts chase the hardest head terms in the niche
   (`how to make an invoice` KD 28 @ 301k vol; `invoice template` KD 32 @ 201k). A 1-yr domain can't win
   these yet. Meanwhile KD 0–9 transactional terms that *match the domain* are wide open. → **Phases 3–4.**

**Verdict:** Not a lost cause. Domain is healthy and trending up. The strategy is broken, not the site.

**Stack facts the agent needs:**
- Next.js **15.3.1** (App Router), React 19. Blog posts = MDX files in `content/blog/`, loaded by
  `lib/blog.ts` via gray-matter. Slug comes from frontmatter `slug:` (falls back to filename). Route:
  `app/blog/[slug]/page.tsx`. Homepage: `app/page.tsx`. Components in `components/`.
- **next.config is a mess:** three files exist (`next.config.js`, `next.config.mjs`, `next.config.ts`).
  Next loads only one; this is ambiguous and must be fixed before adding redirects (Phase 0).
- Sitemap: `app/sitemap.ts`. Metadata: `app/metadata.ts` + per-page exports.

---

## Phase 0 — Infrastructure unblock (do first, ~30 min)

### 0.1 Consolidate next.config (BLOCKS Phase 1 redirects) ✅ DONE
- **Goal:** One canonical config file so `redirects()` actually takes effect.
- **Steps:**
  1. Confirm which config Next 15.3.1 currently loads (`next.config.ts` takes precedence in TS projects;
     verify by adding a `console.log` to each and running `npm run build`/`dev`, or check build output).
  2. Merge needed settings into **`next.config.ts`** (project is TypeScript): keep the image
     `remotePatterns` from `next.config.mjs` only if remote images are still used (the `.js` comment says
     blog images are now local in `/public/blog/*` — verify with a grep for remote `src=` before dropping).
  3. **Delete** the other two config files.
- **Done when:** Only `next.config.ts` exists; `npm run build` succeeds; images still render.

### 0.2 Add a redirects() scaffold ✅ DONE
- **Goal:** A place to register 301s for Phase 1.
- **Steps:** Add `async redirects() { return [ ...REDIRECTS ]; }` to `next.config.ts`, sourcing an array
  defined in the file. Phase 1 will fill it. Use `permanent: true` (301).
- **Done when:** Build passes with an empty/placeholder redirects array wired in.

---

## Phase 1 — Kill cannibalization (highest SEO ROI) 🔴 P0 ✅ DONE

> Consolidate each duplicate cluster into ONE canonical URL, merge the best content into the keeper, and
> 301 the losers to the keeper. This concentrates link equity and tells Google which page to rank.
> **Do NOT just delete losers** — 301 them so their (small) equity and any backlinks transfer.

### 1.1 Cluster A — "how to write / make / create an invoice" (4 → 1) ✅ DONE
- **Keeper:** `how-to-write-an-invoice-for-beginners` (506 impressions, the established winner).
  Retarget/expand it to comprehensively cover write + make + create (they're the same intent).
- **Merge & 301 (delete .mdx after porting unique content + images):**
  - `how-to-write-an-invoice-beginners-guide` → keeper
  - `how-to-make-an-invoice-for-beginners` → keeper
  - `how-to-create-an-invoice` → keeper
- **Steps:** Port any unique sections/examples/images from the 3 losers into the keeper; delete the 3
  loser `.mdx` files; add 3 redirect entries (`/blog/<loser>` → `/blog/how-to-write-an-invoice-for-beginners`).
- **Done when:** 1 post remains; 3 redirects return 301; keeper covers write/make/create.

### 1.2 Cluster B — "what is an invoice" (2 → 1, keep meaning page separate) ✅ DONE
- **Keeper:** `what-is-an-invoice-beginner-guide` — primary target **`what is an invoice`** (KD 6, 14,800/mo).
- **Merge & 301:** `what-is-an-invoice-guide-for-beginners` → keeper.
- **Keep SEPARATE (different intent):** `what-does-invoice-mean` — retarget to **`invoice meaning`**
  (9,900, KD 17) / **`invoice definition`** (8,100, KD 17). Make sure its H1/title/intent is
  definition-focused, not overlapping the keeper's "what is / how it works" angle.
- **Done when:** 2 distinct pages remain (one "what is an invoice", one "invoice meaning"); 1 redirect live.

### 1.3 Cluster C — proforma invoice (2 → 1) ✅ DONE
- **Keeper:** `what-is-a-proforma-invoice` — target **`proforma invoice`** / **`pro forma invoice`**
  (12,100, KD 8–10). Clean slug, transactional-leaning.
- **Merge & 301:** `understanding-pro-forma-invoices-what-they-are-and-how-to-use-them` → keeper.
- **Done when:** 1 proforma page; 1 redirect live.

### 1.4 Audit remaining posts for overlap ✅ DONE
- Check `what-does-an-invoice-look-like` vs the "what is an invoice" keeper — if it substantially overlaps,
  fold it in; if it genuinely targets `what does an invoice look like` (visual/example intent), keep and
  sharpen the distinction. Same check for `how-to-send-an-invoice` vs `how-to-send-an-invoice-on-paypal`
  (the PayPal one is a distinct long-tail — keep both, ensure the generic one doesn't cannibalize PayPal).
- **Done when:** Every surviving post has a single, distinct primary keyword (document it — see Phase 5 map).

**Phase 1 redirect map (fill into `next.config.ts`):**
```
/blog/how-to-write-an-invoice-beginners-guide        -> /blog/how-to-write-an-invoice-for-beginners
/blog/how-to-make-an-invoice-for-beginners           -> /blog/how-to-write-an-invoice-for-beginners
/blog/how-to-create-an-invoice                       -> /blog/how-to-write-an-invoice-for-beginners
/blog/what-is-an-invoice-guide-for-beginners         -> /blog/what-is-an-invoice-beginner-guide
/blog/understanding-pro-forma-invoices-what-they-are-and-how-to-use-them -> /blog/what-is-a-proforma-invoice
```
**Done when:** all 5 return HTTP 301; sitemap (`app/sitemap.ts`) no longer lists removed slugs; internal
links updated (grep `content/blog` + components for the dead slugs and repoint them).

---

## Phase 2 — Close the product gap (biggest business unlock) 🔴 P0 ✅ DONE (Level 1 + Level 2)

> ✅ Shipped: a client-side invoice generator at `/invoice-generator` (live preview, real per-user
> PDF + Word download built in-browser from form data, no backend). Landing pages also offer a generic
> blank template in both formats, generated **on the fly** by the route handler `app/templates/[file]/route.ts`
> (e.g. `/templates/invoice-template-word.docx`) — no binary files committed to the repo, always in sync
> with the layout, hard-cached at the edge. Shared layouts: `lib/invoice/pdf.ts` (jsPDF) and
> `lib/invoice/docx.ts` (`docx` lib), each runs in browser + Node. The .docx opens natively in Microsoft
> Word and imports as a fully editable Google Doc (File → Open → Upload). Homepage hero links to the
> generator + templates. Still future: hosted Google Docs "make a copy" links, native Canva designs, .xlsx/Sheets.

> Transactional template/generator keywords are the prize (Phase 3), but they need something to *land on*.
> Pick ONE level based on effort budget; even Level 1 unblocks Phase 3.

- **Level 1 (minimum — downloadable templates):** Create real, downloadable invoice template files
  (Word `.docx`, Google Docs copy link, PDF, Excel/Sheets) served from `/public/templates/`. Each Phase 3
  landing page offers the matching free download. Satisfies "invoice template word" intent without building
  an app.
- **Level 2 (recommended — client-side generator):** Build an in-browser invoice generator that exports a
  PDF (e.g. `@react-pdf/renderer` or `pdf-lib` — both client-side, no backend). Route: `app/create/page.tsx`
  or `app/invoice-generator/page.tsx`. Form → live preview → "Download PDF". This makes the domain name
  truthful and gives every template page a real CTA.
- **Level 3 (later):** Saved invoices / accounts / send-by-email — out of scope for SEO unlock; defer.

- **Also fix now regardless of level:** the homepage hero promises a tool. Either ship the tool (Level 2)
  or change the hero CTA to point at templates/downloads so the promise matches reality (E-E-A-T / trust).
- **Done when:** There is a working `/create` (or `/templates`) destination that delivers an actual invoice
  artifact (PDF or downloadable file), linked from the homepage hero.

---

## Phase 3 — Build winnable template/tool landing pages 🟠 P1 ✅ DONE (6 pages live)

> ✅ Shipped 6 landing pages via shared `components/invoice/TemplateLanding.tsx` + config in
> `lib/invoice/landings.ts`. Each has H1=keyword, live template preview, "Customize online" CTA into
> `/invoice-generator?style=…`, a downloadable PDF, how-to steps, visible FAQ + FAQPage JSON-LD, and
> internal links to related blog posts. All in the sitemap, all build static, all return 200.
> **Substitution:** row 6 (`invoice pricing`) was swapped for **`blank-invoice-template`** — "invoice
> pricing" intent is ambiguous (the row itself said "verify intent in SERP first") and a template landing
> page would likely misfire. Revert/add it as a blog post if desired.

| # | Page / target keyword | US Vol | KD | Route | Status |
|---|---|---|---|---|---|
| 1 | **invoice template google docs** 🎯 | 12,100 | **0** | `/invoice-template-google-docs` | ✅ |
| 2 | **microsoft invoice template** | 9,900 | 6 | `/microsoft-invoice-template` | ✅ |
| 3 | **invoice template canva** | 18,100 | 7 | `/invoice-template-canva` | ✅ |
| 4 | **invoice template word** | 22,200 | 8 | `/invoice-template-word` | ✅ |
| 5 | **receipt template** | 14,800 / 5,400 | 6 / 9 | `/receipt-template` | ✅ |
| 6 | **blank invoice template** (swapped from `invoice pricing`) | — | — | `/blank-invoice-template` | ✅ |

- **Steps per page:** create route + `page.tsx` with metadata (title/description = keyword-led), H1, the
  download or generator embed, 300–600 words of supporting copy, FAQ (JSON-LD), 2–3 internal links to/from
  relevant blog posts, add to `app/sitemap.ts`.
- **Done when:** page renders, is in the sitemap, offers a real template/tool, and targets exactly one
  keyword from the table.
- **Note:** `invoice template google docs` (KD 0, 12,100/mo) is the single best opportunity in the dataset —
  do it first.

---

## Phase 4 — Optimize existing pages for winnable terms 🟠 P1 ✅ DONE (6 posts)

> ✅ Optimized via the b-review standard: net-30 (pos 28), what-is-an-invoice-beginner-guide,
> what-does-invoice-mean, what-is-a-proforma-invoice, what-is-an-invoice-number, how-to-get-invoice-from-amazon.
> Each: fluff cut, deepened to range, real markdown tables, 2–6 verified authority links (IRS/SBA/CBP/
> trade.gov/ICC + Investopedia/Merriam-Webster canonical), internal links leading with /invoice-generator +
> template pages, and a visible FAQ. Added reusable FAQ support: `faqs:` frontmatter → FAQPage JSON-LD
> (`lib/blog.ts` + `app/blog/[slug]/page.tsx`) — verified rendering on all six. `invoice-financing-made-simple`
> (pos 2) left untouched to protect it; refresh/interlink it in Phase 5.

> Several existing posts target terms they *can* win once cannibalization is fixed. Sharpen on-page SEO.

- `what-is-an-invoice-beginner-guide` → ensure title/H1/slug optimized for **`what is an invoice`** (KD 6,
  14,800). Add FAQ schema, "is/isn't" table, internal links to template pages.
- `what-does-invoice-mean` → target **`invoice meaning`** + **`invoice definition`** (KD 17).
- `what-is-a-proforma-invoice` → **`proforma invoice`** (KD 8). Link to the Word/Docs template pages.
- `what-is-an-invoice-number` → already pos 75; target **`invoice number`** + `invoice number format/example`
  (long-tail, low comp). Add examples + format breakdown.
- `what-does-net-30-mean-on-an-invoice` → already **pos 28** (closest to page 1 — prioritize!). Expand,
  add net-15/net-60 comparisons, FAQ schema; push it onto page 1.
- `how-to-get-invoice-from-amazon` → already **pos 33**. Distinct, low-comp, near-winning. Add step
  screenshots, keep fresh.
- `invoice-financing-made-simple` → already **pos 2**. Protect it: refresh date, add internal links, don't
  cannibalize.
- **Done when:** each page has keyword-led title/H1/meta, FAQ JSON-LD where relevant, and ≥2 internal links.

---

## Phase 5 — Content map & ongoing expansion 🟡 P2 ✅ DONE (map + interlink + 3 new posts)

> ✅ Topic map built: `plan/topic-map.md` (every URL → one primary keyword → vol/KD → cluster, with
> interlinking rules). Interlinked/optimized the previously-untouched posts (keeper how-to-write-an-invoice
> full b-review; invoice-financing pos-2 lightly refreshed to protect it; how-to-send-an-invoice,
> what-does-an-invoice-look-like, how-to-pay all deepened + tool links). Published 3 NEW winnable posts:
> invoice-vs-receipt (KD 3), what-is-a-commercial-invoice (KD 7), invoice-vs-bill (KD 3) — each with FAQ
> JSON-LD, on-brand generated cover (`scripts/make-covers.mjs`), authority + internal links. Blog now 16
> posts, all building static. **Still untouched (low priority):** how-to-send-an-invoice-on-paypal and
> how-to-find-the-invoice-price-of-a-car (cluster E, off-core). Open keyword gaps listed in topic-map.md.

- **Build a topic map** (one row per surviving + planned page → primary keyword → vol/KD → status). Source
  candidates from `scripts/keyword-research/OPPORTUNITIES.csv`. Maintain it so no two pages share a primary
  keyword (prevents future cannibalization).
- **Cluster strategy:** three pillars — (1) Invoice templates/tools [transactional, Phase 3], (2) Invoice
  basics [informational, existing blog], (3) Getting paid / payment terms [net-30, financing, late fees].
  Interlink within clusters; point informational posts at the template/tool pages.
- **Re-run the fanout** (`python3 scripts/keyword-research/fanout.py`) quarterly or when entering a new
  sub-topic; it reads creds from `.env` (DataForSEO + Apify already present). Adjust seeds at the top of the
  script. Output regenerates `keywords_all.csv` + re-run the mining to refresh `OPPORTUNITIES.csv`.
- **Don't** mass-publish near-duplicates again — every new post needs a unique primary keyword from the map.

---

## Phase 6 — Scale to 50 pages (template/receipt expansion + new posts) 🟢 ✅ DONE (2026-06-11)

> Site reached 30 indexable pages after Phases 0–5 — sitemap was complete but the catalog was the
> ceiling. Phase 6 mined `scripts/keyword-research/OPPORTUNITIES.csv` for unclaimed, low-KD (mostly KD 0–8)
> keywords and shipped **20 new pages → 50 total indexable URLs**. All reuse existing infrastructure
> (`components/invoice/TemplateLanding.tsx` + `lib/invoice/landings.ts`; MDX in `content/blog/`), so each
> auto-enters the sitemap, footer, and nav via the `LANDINGS` array. Build passes (60 routes), covers
> generated via `scripts/make-covers.mjs`. Downloads reuse the existing on-the-fly route handler styles
> (no new binary files).

**15 new landing pages** (added to `lib/invoice/landings.ts` + one `app/<slug>/page.tsx` each):

| Cluster | Slug | Primary keyword | US Vol | KD | styleId |
|---|---|---|---|---|---|
| Industry | `/contractor-invoice-template` | contractor invoice template | 2,400 | 0 | word |
| Industry | `/independent-contractor-invoice-template` | independent contractor invoice template | 720 | 0 | microsoft |
| Industry | `/photography-invoice-template` | photography invoice template | 720 | 1 | canva |
| Industry | `/mechanic-invoice-template` | mechanic invoice template | 720 | 0 | word |
| Industry | `/cleaning-invoice-template` | cleaning invoice template | 720 | 0 | google-docs |
| Industry | `/handyman-invoice-template` | handyman invoice template | 590 | 0 | word |
| Receipt | `/rent-receipt-template` | rent receipt template | 6,600 | 0 | receipt |
| Receipt | `/payment-receipt-template` | payment receipt template | 2,400 | 1 | receipt |
| Receipt | `/cash-receipt-template` | cash receipt template | 2,400 | 6 | receipt |
| Receipt | `/donation-receipt-template` | nonprofit donation receipt template | 590 | 0 | receipt |
| Receipt | `/receipt-book-template` | receipt book template | 590 | 0 | receipt |
| Tool-alt | `/freshbooks-invoice-template` | freshbooks invoice template | 9,900 | 0 | google-docs |
| Tool-alt | `/wise-invoice-generator` | wise invoice generator | 3,600 | 0 | microsoft |
| Tool-alt | `/quickbooks-invoice-template` | quickbooks invoice template | 2,400 | 2 | microsoft |
| Tool-alt | `/zoho-invoice-template` | zoho invoice template | 2,400 | 2 | google-docs |

**5 new blog posts** (`content/blog/*.mdx`, FAQ JSON-LD via frontmatter, authority + internal links):

| Slug | Primary keyword | US Vol | KD |
|---|---|---|---|
| `outstanding-invoice` | outstanding invoice | 720 | 0 |
| `what-is-an-invoice-payment` | what is an invoice payment | 590 | 7 |
| `edi-invoice` | edi invoice | 720 | 0 |
| `quote-vs-invoice` | quote vs invoice | 880 | 0 |
| `itemized-invoice` | itemized invoice | 880 | 0 |

**Deliberately excluded (cannibalization):** "canva invoice generator" (→ `/invoice-template-canva`),
"difference between invoice and receipt" (→ `/blog/invoice-vs-receipt`).

**Follow-ups (the "fix at end" pass):**
- The tool-alt pages (FreshBooks/Wise/QuickBooks/Zoho) use trademarked brand names in H1 + offer our free
  template as an alternative — copy is framed honestly as "free alternative / no account needed," but review
  tone/legal comfort before relying on them long-term.
- New blog posts were drafted fast (not full Perplexity-grounded b-write) — run `/b-review` on each to verify
  US accuracy, external link validity, and depth before counting them as final.
- `TemplateLanding` hardcodes "…invoice template" in the "What's included" heading, so receipt pages read
  "this rent receipt invoice template" — minor copy nit to fix in the component if desired.
- Footer/nav now lists all 23 landings via `LANDINGS.map` — may need grouping/trimming for UX.

## Guardrails for the executing agent

- **One primary keyword per URL.** Before creating/editing a page, check the content map (Phase 5) — if the
  target keyword already belongs to another page, consolidate instead of creating.
- **301, never silent-delete** a post that has impressions or backlinks.
- After Phase 1 redirects: update `app/sitemap.ts`, internal links, and any nav before considering it done.
- Verify each redirect actually fires (`curl -I` the old path → expect 301 → new path) after `npm run build`.
- Keep US (`location_code 2840`) as the default for keyword decisions, but retain UK-relevant content
  (current impressions skew UK/Commonwealth) — don't strip it.
- Data provenance: all volume/KD/CPC figures are live DataForSEO, US, pulled 2026-06-10. Treat as ~30–90 day
  fresh; re-pull if acting months later.

## Suggested execution order (TL;DR)
1. Phase 0 (config) → 2. Phase 1 (consolidate + redirect) → 3. Phase 2 Level 1 or 2 (a real tool/download)
→ 4. Phase 3 page #1 `invoice-template-google-docs` (KD 0) → 5. rest of Phase 3 → 6. Phase 4 (optimize,
start with net-30 @ pos 28) → 7. Phase 5 (map + cadence).
