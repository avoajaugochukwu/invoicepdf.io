---
name: research-and-citation
description: The discipline of sourcing and citing primary research for invoicing and small-business finance content. Defines what counts as a primary source (tax authorities, late-payment law, accounting bodies, payment-processor docs), how to quote experts with full attribution, how to handle fair-use quoting, how to format outbound links, and what to do when sources contradict each other. This is the skill that prevents the writer from producing a Wikipedia paraphrase with extra steps.
---

# Research & Citation — the discipline of primary sources

> "Studies show" is contraband. "Most countries require..." is contraband. Every load-bearing claim cites a named source the reader can click through to verify, and every money/tax/legal claim names its jurisdiction.

The fastest way to fail Google's Helpful Content classifier — and to lose credibility with any reader who knows the topic — is to write paragraphs full of factual claims with no traceable origin. For invoicing, that risk is sharper: a wrong VAT rate, tax threshold, or late-payment rule is not just unhelpful, it can cost the reader money. This skill is the discipline of doing it the other way. It works alongside `accuracy-and-claims-skill.md`, which is the gate that money/tax/legal claims must clear.

---

## What counts as a primary source

**Primary sources** are the original location where a fact was established. The hierarchy for invoicing/finance content:

### Tier 1 — Always cite when available

- **Government tax authorities** — IRS.gov (US), GOV.UK / HMRC (UK), ATO.gov.au (Australia), Canada Revenue Agency (CRA), and EU VAT guidance on europa.eu
- **Payment-practice and late-payment law** — UK late-payment legislation (e.g. the Late Payment of Commercial Debts legislation), the EU Late Payment Directive, and equivalent national statutes
- **Accounting and standards bodies** — recognized professional and standards organizations, and their published guidance
- Official government reports and statistics offices (e.g. national statistics bodies, small-business administrations)
- Original interviews you conducted (audio + transcript hosted on your domain)
- **Official documentation of named tools / payment processors** — Stripe, PayPal, and Square docs and pricing pages, when discussing *their* features, fees, or supported countries

### Tier 2 — Acceptable for general-knowledge claims

- Major outlets reporting their own investigation (NYT, WSJ, AP, Reuters, BBC, FT)
- Reputable small-business / finance publications and specialist trade press
- Primary corporate URLs (a payment processor's own about page, annual report, or blog post by a named executive)
- Recognized research non-profits and surveys (Pew, established small-business lenders' or accounting platforms' original research reports)
- Professional-body press releases — but follow the link to the underlying guidance

### Tier 3 — Acceptable only when Tiers 1-2 are unavailable

- Wikipedia, **only** as a starting point — then follow Wikipedia's citations to the primary source and cite that instead
- Industry blogs run by recognized experts (named accountants, bookkeepers, small-business advisors)
- Encyclopedias (Britannica, Oxford Reference)
- Aggregator wire services for syndicated content

### Tier 4 — Contraband

Never cite these as load-bearing sources:

- AI-generated content (chatbot summaries of tax rules, etc.) — especially dangerous for figures
- "10 best invoicing tools" listicles on competitor blogs
- Reddit, Quora, Medium (unless the author IS a recognized primary source and the post is the original publication)
- Forum posts
- A competitor's marketing page quoted as if it were neutral fact
- Old archives of dead sites unless preserved by Wayback Machine
- Press releases pretending to be guidance ("the new rules mean..." without linking to the authority)

---

## The attribution format

Every external claim takes one of two attribution shapes:

### Inline attribution (preferred for most claims)

> According to [HMRC's guidance on invoice records](https://www.gov.uk/...), VAT-registered businesses in the UK must show the VAT number and a unique invoice number on every invoice.

The link goes on the source identifier, not on the fact. The reader can verify by clicking the underlined text. Note the jurisdiction ("in the UK") sits right in the sentence — that is the accuracy-and-claims gate in action.

### Quoted attribution (for direct quotes from named experts)

> "Freelancers who add clear payment terms get paid an average of two weeks faster," said Priya Nair, a chartered accountant, in a 2025 [small-business cash-flow report](https://example.com).

Quote, attribution, role/affiliation, outlet, date, link. Anything less is contraband.

### What an attribution must contain

| Element | Required? | Example |
|---|---|---|
| Source identifier | Yes | "HMRC's invoicing guidance" |
| Date | Yes | "2025" or "March 12, 2025" |
| Outlet / publisher | Yes (for non-government) | "Stripe documentation" |
| Author / speaker name | Yes if quoting a person | "Priya Nair" |
| Role / affiliation | Yes if quoting a person | "chartered accountant" |
| Jurisdiction | Yes for any tax/legal/compliance claim | "in the UK", "for US sole proprietors" |
| Link to the source | Yes | `[anchor](URL)` |

---

## Fair-use quoting

Quoting from copyrighted source material is allowed under fair use, but the rules matter:

### Length limits

- **Up to ~90 words** for most cases — a short quote from a longer work, used for commentary or analysis
- **A single rule or definition from a tax authority** — fine to quote verbatim, but cite the authority and the jurisdiction, and prefer paraphrase plus a link for anything longer
- **Long statutory or guidance passages** — don't paste them; quote the key sentence and link out to the official page
- Government guidance text (IRS, GOV.UK, etc.) is generally freely reproducible, but still cite it so the reader can confirm it is current

### Always include
- Quotation marks (or blockquote formatting — a `>` blockquote, since this site has no callout component)
- Attribution
- A link to the source
- The jurisdiction and, where relevant, the effective date for any rule or figure

### How quotes render on this site

This site renders plain Markdown through `next-mdx-remote` + `remark-gfm` with **no custom components**. Quote sources with a standard Markdown blockquote:

```md
> "Late payment interest on commercial debts is set at 8% above the Bank of England
> base rate," per [GOV.UK guidance](https://www.gov.uk/...) (UK, as of 2025).
```

There is no `<Quote>` or callout component — a blockquote *is* the callout. Tables use GFM pipe syntax. Keep the reference and jurisdiction on-page in the prose, not hidden in a tooltip.

### When in doubt, paraphrase

If a passage is genuinely needed and you're unsure if you're within fair use, paraphrase and link out. Paraphrase still requires attribution — and a paraphrased tax rule still needs its jurisdiction and a link to the authority.

---

## Outbound link discipline

Links are how trust is paid forward and inherited. Rules:

### Always link
- Every named source on first mention
- Every numeric claim — every rate, threshold, fee, percentage, dollar/pound figure
- Every expert quote
- Every legal or tax claim (statute, directive, authority guidance)
- Every named tool or payment processor on first mention (to its official site/docs)

### The primary-CTA exception

The post's **primary call to action always points to invoicepdf.io's own invoice generator** — never to a competitor (Wave, FreshBooks, QuickBooks, PayPal, Zoho) as the CTA. You may *cite* and *link* competitors and processors as sources or for feature comparison, but the "go do this now" button/link is always our generator. Outbound links are for evidence, not for handing off the reader.

### Anchor text rules
- ✅ **Descriptive:** "the [EU Late Payment Directive](URL)"
- ❌ **"Click here":** "...as found [here](URL)"
- ✅ **The quoted name:** "[HMRC](URL) requires..."
- ❌ **The URL itself:** "as discussed at https://..."

Use descriptive anchor text on every link — internal links `[anchor](/blog/<slug>)`, external links `[anchor](https://...)`.

### Where to link
- Inline within the prose, not in a footnote stack at the bottom (modern web readers don't scan footnotes)
- The first time a source appears, with attribution
- On the relevant phrase, not on a generic word

### How to handle the link
- Linking behavior (same-tab vs new-tab) is a UX preference the layout decides; don't hand-author `target` attributes in Markdown
- Don't `nofollow` legitimate primary sources — that signals you don't trust them, and you shouldn't be citing untrusted sources anyway
- Reserve `rel="sponsored"` for affiliate or paid links and `rel="ugc"` for user-generated content links, if and where the layout supports adding them

### No citation frontmatter

There is **no `outbound_citations` frontmatter field** on this site. The frontmatter reads only: `title`, `slug`, `date` (ISO), `excerpt`, `description`, `author` (default "InvoicePDF Team"), `featuredImage`, `tags`. Every source lives **inline in the prose** as a Markdown link. If you want a "Sources" recap, write it as a plain H2 section at the end of the body with a Markdown list of links — don't try to drive it from frontmatter. Keep a running list of accessed URLs in your own scratch notes (see the research log below) so a later audit can re-check them, but that list is not part of the published frontmatter.

---

## When sources contradict

Real research turns up disagreement — and tax/payment rules genuinely differ by country and change over time. Don't paper over it. Handle it explicitly:

### Pattern 1 — The rule differs by jurisdiction
> "Whether you must charge sales tax or VAT on an invoice depends on where you and your client are. In the [UK, VAT registration is required above a turnover threshold](URL); in the [US, sales-tax rules are set state by state](URL)."

State the jurisdiction every time. A rule with no jurisdiction is a defect.

### Pattern 2 — One source is clearly more authoritative
> "Some older blog posts still cite a £83,000 UK VAT threshold, but [HMRC's current guidance](URL) gives the up-to-date figure as of 2025."

Cite both, but note which is current/authoritative — and date it.

### Pattern 3 — Sources contradict on a load-bearing claim
Don't pick a side without justification. If the claim is load-bearing and the sources genuinely disagree, write the disagreement *into* the post:

> "Advisors disagree on whether freelancers should charge a flat late fee or statutory interest. [One accounting body](URL) recommends statutory interest because it's enforceable by default; [a small-business finance guide](URL) argues a flat fee is simpler for clients to understand."

This is a strong E-E-A-T signal — it shows you read enough to know the field is contested.

---

## Quoting people who are not "experts"

Sometimes the best quote comes from a non-expert: a fellow freelancer, a small-business owner, a community member who lived the situation. These quotes are legitimate but follow different rules:

- Don't promote them to authority. "A freelancer told us..." not "An expert noted..."
- Get their consent before using their name. If they want anonymity, give them a descriptive identifier ("a contractor in Texas who asked not to be named")
- Don't fabricate composite testimonials — Google's HCU treats this as scaled content abuse

If you're writing about something the *author personally experienced* (chasing a late invoice, switching processors), that's a first-person experience marker, not a "quote." See `eeat-signals-skill.md`.

---

## The research log

Before drafting any post, the writer keeps a research log (in scratch space, not in the final output):

```
Topic: <target query>

Sources collected:
- [URL] — <outlet / authority> — <jurisdiction if applicable> — <relevance>
- [URL] — <outlet / authority> — <relevance>
...

Expert quotes collected:
- [Name, role] — "<quote>" — [URL] — <date>
...

Stats / figures / rates collected:
- [Number / rate / threshold] — [URL] — <jurisdiction> — <date / effective period>
...

Open questions / contradictions:
- <question> — sources disagree: [URL1] vs [URL2]
```

The log keeps every claim in the post traceable to something verifiable. Note that it stays in scratch — there is no frontmatter field to dump it into; the live citations are the inline Markdown links.

---

## The research grounding pass (writer instruction)

Research is **WebSearch + WebFetch on primary sources first.** Before writing the draft, the writer runs WebSearch on:

1. The exact target query
2. The 2-3 most important named entities in the brief (the tax authority, the processor, the rule)
3. "<target query> + rate" / "+ threshold" / "+ rules <country>" for numeric and jurisdiction-specific claims
4. "<target query> + late payment" / "+ requirements" for compliance specifics
5. "<author or expert name>" if any are named in the brief

Then WebFetch the actual authority pages (IRS.gov, GOV.UK, processor docs) to confirm the figures and capture exact wording. Collect ≥ 10 grounding bullets; each must include the URL.

Optional accelerators: Perplexity and DataForSEO are available (keys exist) and may be used to find or sanity-check sources, but they are **not** primary sources — anything they surface must be confirmed against the actual authority page before it goes in the post. Keep the workflow tool-agnostic; WebSearch + WebFetch is the floor everyone has.

If research can only find:
- Wikipedia, competitor "best invoicing app" listicles, and marketing pages → the topic is too thin for a real post, or you're looking in the wrong place; go to the tax authority / processor docs directly
- AI-generated SERP entries on the first page → the topic is contaminated; pivot to primary sources
- No authoritative source for a load-bearing money/tax/legal claim → mark the brief NEEDS MORE RESEARCH and stop. Never guess a rate or rule.

---

## Fact-checking the load-bearing claims (writer instruction)

After drafting, re-verify every load-bearing claim — named person/org, date, statistic, rate, threshold, fee, quoted line, and every tax/legal rule. The reliable method is WebFetch back to the primary source and confirm the exact figure and its effective date and jurisdiction.

Optionally, Perplexity (key available) can be used to flag claims that look stale or wrong, firing one-sentence queries per claim. But Perplexity is a *flagging* tool, not the source of truth: when it disagrees with your draft, resolve the disagreement by going back to the authority page, not by trusting the model.

Patch the draft inline if a primary source contradicts or refines what you wrote. Patches are **literal swaps only** — never reorganize sections during this pass.

This fact-check pass feeds directly into the accuracy-and-claims gate (`accuracy-and-claims-skill.md`): no money/tax/legal claim ships without a jurisdiction and a primary-source link.

---

## Citation density by archetype

How many primary-source citations should appear in a post:

| Archetype | Minimum primary citations |
|---|---|
| Pillar | 6-10 |
| Cluster | 4-6 |
| Listicle | 5-8 (one per item if items reference outside facts) |
| How-to | 3-5 |
| Comparison | 5-8 (split across both sides; processor/tool docs count) |
| Definition | 3-5 |
| FAQ | 3-5 |
| News / update | 4-8 |
| Template / tool-landing | 0-2 (links are mostly internal; CTA is our generator) |
| Topical-landing | 0-2 (links are internal) |

Any post that makes a tax/legal claim is held to a stricter bar regardless of archetype: every such claim needs its own primary-source link. A post below the minimum should be flagged in the audit.

---

## Citation pitfalls the audit catches

- **Wikipedia as the only source for a load-bearing claim** → fix by following Wikipedia's citations to the tax authority / statute
- **Tax or rate claim with no jurisdiction** → fix by naming the country/state and linking the authority
- **Attribution without a link** → fix by linking
- **Dead links** → fix by replacing with archive.org or a fresh authority page
- **Quote without attribution** → fix by naming the source
- **Figure without a date / effective period** → fix by adding it (rates and thresholds change)
- **Composite quotes** (two sources merged into one quote) → never acceptable, rewrite
- **AI-summarized figures** (a rate from a chatbot with no source) → rewrite from the verified authority page
- **Competitor marketing page cited as neutral fact** → replace with the processor's own docs or an independent source

---

**BlogOS** — sources are not decoration.
