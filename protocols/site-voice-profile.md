# Site Voice Profile — Per-Site Voice Lock for BlogOS

## What it is

A `voice_profile.md` is a per-site (or per-section) artifact that captures **audience-specific voice rules the BlogOS writer must preserve verbatim**. It lives at:

- Single-site setup: `research/voice_profile.md`
- Multi-section setup: `research/voice_profile-<section>.md` (e.g. `voice_profile-guides.md`)
- Multi-site monorepo: `sites/<site-slug>/research/voice_profile.md`

The writing flow picks it up as a CHANNEL VOICE LOCK block injected into the writer's context.

It exists because **BlogOS is generic by design** — anti-AI-slop, scannability cadence, E-E-A-T patterns, conclusion shapes — and the writer subagent runs with zero memory. Without a voice profile, the writer will happily apply generic patterns even when the site has earned a specific voice that the pack would otherwise flatten.

A voice profile is the site's answer to: *"BlogOS, here's what's load-bearing about how this audience hears us. Touch the rest, but not this."*

---

## When to build one

Build a voice profile **only when the site has a non-obvious voice signal** that generic BlogOS would damage. Trigger conditions:

### 1. Demographic outlier
The site's reader base skews materially different from typical web audiences — by occupation, life stage, region, or relationship to the topic. For invoicepdf.io that's the self-employed: people who are experts at their craft but anxious, self-taught, or out of their depth the moment money and admin enter the picture. Generic punch-ups assume a generic audience.

### 2. Comment / email / forum scrape reveals a load-bearing identity frame
Pull the top reader comments, forum posts, support emails, or reply emails. Look for:

- First-person witness statements ("I just went full-time freelance...", "I sent my first invoice last week...")
- Repeated situation references (specific recurring pain points: late payers, chargebacks, tax season, a first big client)
- Vocabulary patterns from a specific occupation or business stage (sole trader, contractor, agency-of-one)
- Explicit gratitude for a value the site provides ("finally a tool that doesn't make me sign up", "this is the first invoice guide that didn't assume I had an accountant")
- Frustration arcs the audience shares ("everyone says 'just send an invoice' like it's obvious")

### 3. Existing post performance reveals voice patterns that win
If certain phrasings, framings, or worked examples produce significantly higher engagement than others, codify them. If the re-audit keeps trimming a phrase you keep wanting back, that phrase is voice-locked.

### 4. The site has an explicit editorial stance
If the site takes a recognizable position (methodological, ideological, a "we're on your side, not your accountant's" stance), that position needs to be load-bearing in the voice.

**Skip if:** the site is generic / broad-audience with no signature voice. Most general-information sites don't need a voice profile. Sites with a non-obvious demographic skew or a strong editorial voice almost always do.

---

## The canonical structure (6 sections, in order)

A voice profile is short — under 400 lines, often closer to 250. Long enough to be load-bearing, short enough that an orchestrator can inject the whole thing into a subagent prompt without bloat.

### Section 1 — The audience identity sentence

Open with one sentence — the most important sentence in the document — that names the audience as a specific *kind of person*, not a content cohort. Lead with what they are/do/fear/wonder/struggle, not what they read.

**Generic / wrong:**
> "The audience is people interested in invoicing."

**Specific / right:**
> "The audience is people who started freelancing for the freedom, are good at their actual craft, and feel out of their depth the moment money, invoices, and tax enter the picture."

Follow with 3-5 lines quantifying the signal (demographic stats, comment-scrape hit rates, search data) so the claim has receipts.

### Section 2 — The N voice rules

Numbered list. 5-8 rules typically. Each rule:

- **Rule name** in bold (one short phrase)
- 1-2 sentences explaining the mechanic
- One ❌ counter-example and one ✅ exemplar

The rules should cover:

- How to address the reader (a capable peer who simply hasn't done the admin side — not a beginner who needs hand-holding, not an expert who needs none)
- Vocabulary expectations (finance fluency is **not** assumed; define jargon — Net 30, proforma, VAT, remittance — on first use, inline)
- Tonal register (warm, practical, encouraging; validate the overwhelm, challenge the avoidance)
- What to validate vs what to challenge ("yes, this is genuinely confusing" → "and here is the exact next step, you can do this today")
- Any explicit "value prop" line the writer should say out loud (e.g. "you can make and download a professional invoice in two minutes, free, no signup")
- Friction points the writer should NOT smooth away (the real anxiety of chasing a late client, the fear of looking unprofessional)

### Section 3 — Canonical reader quotes

8-15 verbatim quotes from comments, emails, reviews, or search queries that show the audience speaking in their own words. With source if available.

These are the receipts: if a future writer or auditor questions whether a voice rule is real, the canonical quote proves it. They also double as in-context examples for the subagent. Examples for invoicepdf.io:

> "I sent my first invoice and had no idea if it was even legal."
> "A client ghosted me for 60 days and I didn't know what I was allowed to do."
> "Do I charge tax? On what? I genuinely don't know who to ask."
> "I feel stupid asking but what does Net 30 actually mean."

### Section 4 — Touchstone library (when applicable)

If the audience anchors against specific shared reference points, list them with the specific data the writer can drop in.

For an invoicing site: common payment-terms shorthand (Net 30, Net 15, due-on-receipt), late-fee conventions, proforma vs final invoice, VAT / sales tax basics, processor fees (PayPal ~2.9% + fixed, Stripe similar, Square), and recognizable pain milestones (first invoice, first late payer, first tax season as self-employed).

This makes the touchstone-cadence rule actionable rather than abstract. Not every voice profile needs this section — only when there's a "anchor to a familiar reference every N sections" rule.

### Section 5 — Anti-patterns

Two-column table: **Don't / Why**. The phrasings, framings, and patterns that specifically kill *this site's* audience. Generic anti-patterns (em dashes, fake stats) belong in BlogOS, not here. This section lists the site-specific failures.

| Don't | Why |
|---|---|
| Give jurisdiction-blind tax or legal advice ("you must charge 20% VAT") | The reader could be in any country. State the principle, name the authority (IRS, HMRC, ATO, CRA), and tell them to confirm for their jurisdiction. |
| Recommend a competitor invoicing tool as the CTA | The CTA is invoicepdf.io's own free generator. Sending the reader to FreshBooks/QuickBooks defeats the page. |
| Shame the reader for not knowing ("any professional should already know this") | Half the readership is freelancing for the first time. The whole brand is "we don't assume you have an accountant." |
| Use corporate-accounting jargon without defining it (accrual basis, remittance advice, aging report) | The reader is a craftsperson, not a bookkeeper. Define on first use, in plain words, with a worked example. |

### Section 6 — Whitelist (recommended)

The list of preferred outbound sources for this site. Saves the writer guessing.

For an invoicing / small-business-finance site:

- IRS.gov (US tax)
- GOV.UK / HMRC (UK tax and the UK Late Payment of Commercial Debts rules)
- ATO.gov.au (Australian tax)
- Canada Revenue Agency — canada.ca (Canadian tax/GST/HST)
- europa.eu (EU VAT and the EU Late Payment Directive)
- Stripe, PayPal, Square official docs and pricing pages (processor fees, payouts)
- Reputable small-business finance outlets (established, sourced, named-author business press)

Plus a blacklist — sources to NOT cite even if they rank on page one of Google:

- Content-farm "invoice template" SEO spam (no author, no sources, exists to harvest the keyword)
- Unsourced "tax hacks" / "write-off secrets" posts that give jurisdiction-blind or legally dubious advice

---

## How it's consumed

The writing flow picks up the voice profile per post and:

1. Reads the brief
2. Looks for `research/voice_profile.md` (or section-specific variant if multi-section)
3. If found, injects the full file as a `===SITE VOICE LOCK===` block in the writer subagent prompt
4. The subagent treats the lock with the same protection as the factual entity lock — do not paraphrase, do not strip voice-locked language, even when generic BlogOS rules would flag it

Sites without a `voice_profile.md` behave with pack-only writing — no lock, generic voice. The system is opt-in.

---

## How to bootstrap one

Reproducible procedure:

### 1. Reader data first

If you have analytics, pull:
- GA4 audience demographics
- GSC top search queries hitting the site
- Support / email replies (top 50 from the last 6 months)
- Comments (if the site has them)
- Customer / reader surveys (if any)

For a new site without data: build the profile from the *intended* audience, mark it provisional, and refine after the first 90 days of real reader data.

### 2. Quantify signals

Run pattern passes for:

- Repeated phrasings the audience uses (when describing themselves, their work, their money worries)
- Situation references (specific recurring events: first invoice, late payer, tax season, a chargeback)
- Demographic markers (job titles, business stage, geographic patterns)
- Frustration markers ("I'm tired of..." "Why does everyone assume..." "I feel stupid asking...")
- Gratitude markers ("Finally a tool that..." "Thank you for not assuming..." "It's so refreshing to...")

Record hit rates so the profile has receipts.

### 3. Draft the 6 sections

Identity sentence first. Then voice rules. Then quotes. Then touchstones. Then anti-patterns. Then whitelist.

### 4. File at `research/voice_profile.md`

Done. The writing flow picks it up on the next post.

### 5. Re-scrape quarterly

Audiences drift. The profile should evolve. Re-pull data quarterly and update the profile if signals have shifted.

---

## Multi-section voice profiles

A single site can have different voices in different sections. Example for invoicepdf.io:

- `/research/voice_profile.md` — the site-wide default (used by `/blog`)
- `/research/voice_profile-guides.md` — voice for longer how-to guides (more step-by-step, more worked examples)
- `/research/voice_profile-templates.md` — voice for template pages (more direct, more "grab this and go")

When a post is in a section with its own voice profile, that profile *overrides* the site-wide one for the relevant rules. The site-wide profile still applies for anything the section profile doesn't address.

The orchestrator looks for the section profile first, then falls back to the site profile. (Sections beyond `/blog` are optional and may not exist yet — `/blog` is the default.)

---

## What NOT to put in a voice profile

- **Factual constraints** about specific topics — those go in the per-post brief
- **Structural rules** (heading skeleton, length, hook formula) — those are BlogOS pack territory
- **Title / meta / slug rules** — those are in `title-meta-slug-skill.md`
- **Generic SEO best practices** — those are in `seo-and-schema-skill.md`
- **One-off editorial decisions** — those go in the relevant skill file if they're load-bearing, or in the per-post brief

A voice profile is exclusively about **phrasings and identity frames the writer would otherwise damage**. If a rule would apply to three different sites' voice profiles, it doesn't belong in a voice profile — it belongs in BlogOS.

---

## Existing voice profiles

- `research/voice_profile.md` — InvoicePDF.io, site-wide. (To be created.)

Add new ones here as they're built.

---

## When to skip voice profiles

For brand-new sites with no audience data yet, the voice profile is provisional. The writer subagent will still inject something useful — it just won't have receipts.

Better to ship 5-10 posts with the pack-only voice, observe what resonates with readers, then build the profile from real signals. Premature voice locking can lock in the writer's idea of the audience rather than the actual audience.

---

**InvoicePDF.io** — voice that survives the writer.
