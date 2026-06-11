---
name: google-trust-audit
description: Pre-publish audit for Google's Helpful Content system, E-E-A-T framework, and spam policies (including scaled content abuse, site reputation abuse, and expired-domain abuse) for invoicepdf.io. Invoicing, tax, and payment content is financial-YMYL, so the trust bar is high. This skill is the gate between a finished draft and "ready to ship." If the post fails any check here, do not publish.
---

# Google Trust Audit — the gate before publish

> Google does not ban AI-generated content. It bans content that does not help people. For financial-YMYL content — invoicing, tax, getting paid — the bar is higher, because wrong money/tax advice causes real harm. This audit is the difference. Run it on every post.

---

## What the audit covers

Three policy frameworks plus the accuracy gate:

1. **Helpful Content system** — Google's site-wide signal that judges whether content is people-first or search-engine-first. A single bad post can drag the whole site.
2. **E-E-A-T framework** — Experience, Expertise, Authoritativeness, Trustworthiness. Heavier weight on YMYL topics — and invoicing/tax/payments is squarely financial-YMYL.
3. **Spam policies** — Scaled content abuse, site reputation abuse, expired-domain abuse, cloaking, sneaky redirects.
4. **Accuracy-and-claims gate** — every money/tax/legal claim states its jurisdiction and traces to a primary source (`accuracy-and-claims-skill.md`). This is folded into the audit below because for this site it is not optional.

If a post passes all of these, it's eligible to rank. If a post fails any, it should be revised or killed before publish.

---

## Section 1 — Helpful Content audit

The HCU classifier asks (loosely paraphrased from Google's own documentation): *would someone reading this content feel they got what they were looking for, that they trust who wrote it, and that the writer knows the topic well enough to teach it?*

### Helpful Content checks (must pass 8 of 9)

#### Check 1: People-first framing
- [ ] The post is written for someone with a specific problem (a freelancer who hasn't been paid, a contractor unsure what to put on an invoice), not for a keyword
- [ ] The `title` (H1) and `description` describe what the reader will *get*, not what the post *covers*
- [ ] The intent (informational, commercial, etc.) matches what someone typing the target query actually wants

#### Check 2: Unique angle
- [ ] The angle is not the same as the top 3 results on Google for this query
- [ ] The post takes a position, makes a judgment, or synthesizes information in a way the top 3 do not
- [ ] If the angle is "more comprehensive than competitors," there is genuinely 30%+ more useful information, not just more words

#### Check 3: First-hand experience
- [ ] At least one first-person experience marker present (sent the invoice, chased the late payer, switched processors), OR
- [ ] At least one named third-party experience explicitly cited (named accountant, case study, interviewee)
- [ ] The post does not read as if it could have been written by someone who has never sent or chased an invoice

#### Check 4: Demonstrated expertise
- [ ] Author has credentials, practitioner experience, or named qualification displayed
- [ ] If the post makes tax/legal/compliance claims and the author lacks formal credentials, a visible "Reviewed by" line points to a qualified reviewer (CPA, chartered accountant, tax advisor) — surfaced in the body or layout, since there is no `reviewed_by` frontmatter field
- [ ] Specific, non-obvious knowledge present — things you'd only know from really running invoices and chasing payment

#### Check 5: Satisfying depth
- [ ] The post fully answers the target query without forcing the reader to leave for another page
- [ ] All natural follow-up questions are addressed (in the body or the FAQ section)
- [ ] No "we'll cover that in part 2" deferrals on core claims

#### Check 6: Honest claims
- [ ] No exaggerated headline claims that the body doesn't deliver on
- [ ] No "ultimate guide" / "everything you need to know" framing unless the post genuinely is comprehensive
- [ ] No fake urgency ("act now") for evergreen content
- [ ] No guaranteeing outcomes ("get paid in 24 hours") that depend on the client

#### Check 7: Not search-engine-first
- [ ] The post would still be valuable if Google didn't exist
- [ ] Keywords appear naturally in prose, not stuffed into headings, alt text, or paragraphs
- [ ] No "this article will cover" preamble that exists to load keywords into the first paragraph

#### Check 8: Original or value-add to existing information
- [ ] If the post covers a well-known topic (how to write an invoice, net-30 vs net-15), it adds new information, fresh sources, original analysis, or unique synthesis
- [ ] Not a rewording of a Wikipedia article or a top-ranking competitor's blog

#### Check 9: Trust foundations
- [ ] Author byline present (real name for YMYL; "InvoicePDF Team" only for utility pages)
- [ ] Author bio rendered
- [ ] "Last updated" line visible when it differs from the publish date
- [ ] Outbound links to primary sources (tax authorities, processor docs, late-payment law)
- [ ] No misleading headlines
- [ ] Primary CTA points to invoicepdf.io's own generator, not a competitor

**Pass threshold:** 8 of 9. Failures on Check 4 or Check 9 are blocking — fix before publish.

---

## Section 2 — E-E-A-T audit

See `eeat-signals-skill.md` for the full discipline. This audit verifies the signals are present.

### E-E-A-T checks (must pass 9 of 10)

#### Experience
- [ ] First-person experience marker present (or named third-party experience cited)
- [ ] Specific details that suggest real engagement (exact terms used, named processors, real numbers from invoices)

#### Expertise
- [ ] Author has displayed qualification relevant to this post (bookkeeping, accounting, years freelancing/running a business)
- [ ] At least 2 named expert quotes if the archetype calls for them (waive only for definition/faq with simple content)
- [ ] Technical accuracy verified — figures, rates, and rules re-checked against primary sources

#### Authoritativeness
- [ ] Site has an About page linked from the footer
- [ ] Author has a populated author page where the layout supports it
- [ ] Site has links from at least a few other relevant sites (out of scope per post, but the audit notes if the site is new)
- [ ] Internal linking signals topical authority — this post lives in an invoicing cluster and links to related posts with descriptive anchors

#### Trustworthiness
- [ ] Primary-source citations (≥ 4)
- [ ] "Last updated" line visible
- [ ] Corrections policy linked
- [ ] Honest framing — no clickbait, no exaggerated claims, no guaranteed-payment promises
- [ ] If the post makes tax/legal claims, a visible "Reviewed by" line is present
- [ ] No affiliate links disguised as recommendations; CTA is our own generator
- [ ] Contact / about info reachable from this page

**Pass threshold:** 9 of 10. For posts making tax/legal/compliance claims, all 10.

---

## Section 3 — Accuracy-and-claims gate (financial-YMYL)

This is the gate that separates invoicepdf.io from generic content farms. Run it on every money/tax/legal claim. See `accuracy-and-claims-skill.md` for the full rules.

#### Accuracy checks (must have ZERO violations)

- [ ] Every tax/VAT/sales-tax claim states its **jurisdiction** (country, and state/region where it matters)
- [ ] Every rate, threshold, fee, and statutory figure is linked to a **primary source** (tax authority, statute, processor docs)
- [ ] Every figure carries a **date or effective period** — rates and thresholds change
- [ ] No rule presented as universal when it is jurisdiction-specific ("you must charge VAT" without saying where)
- [ ] No legal claim about late-payment rights, interest, or contract terms without citing the relevant law and jurisdiction
- [ ] Where the rule depends on the reader's situation, the post says so and links the authority rather than guessing
- [ ] No figure or rule sourced only from an AI summary or a competitor's marketing page

A single unsourced or jurisdiction-less money/tax/legal claim is blocking. Fix before publish.

---

## Section 4 — Spam policy audit

Google's spam policies have evolved sharply with AI. The three most relevant for blog production at scale:

### Scaled content abuse

> "Producing many pages with the primary purpose of manipulating search rankings, regardless of whether the content is created by humans or AI."

#### Scaled content checks (must have ZERO violations)

- [ ] This post is NOT one of many near-identical posts where only the topic varies
- [ ] This post is NOT a template fill-in where only entity names change (e.g. swapping the country in "invoice requirements in ___" with no real per-country research)
- [ ] If we're publishing many posts on related invoicing topics, each has a genuinely unique angle / data / perspective
- [ ] Publishing rate is reasonable (not 50 posts/day on the same topic cluster)
- [ ] No `# H1` keyword stuffing
- [ ] No paragraph keyword stuffing (target query appears naturally, not 10x per paragraph)

#### How to test
Search 3 random sentences from the post in Google with quotes. If they return zero results, that's a unique post. If they return results from other AI-spammy sites, the post has the same fingerprint as scaled content. Rewrite.

### Site reputation abuse (formerly "parasite SEO")

> "Publishing pages on a third-party site to take advantage of that site's ranking signals."

Not applicable per post — applies if this site hosts third-party content disconnected from its main purpose. Flag in the audit if the post:

- [ ] Is on a topic completely unrelated to invoicing / small-business finance
- [ ] Was written by a third party (guest post) that the site has no editorial relationship with
- [ ] Exists to drive traffic to an unrelated affiliate offer

An invoicing site publishing a post about, say, weight-loss supplements hits this.

### Expired-domain abuse

Not applicable per post — applies at the domain level. The audit confirms:

- [ ] This site is not built on an expired domain that previously had different content
- [ ] If it is, there is a clear continuity story (acquisition, rebrand) declared publicly

Default: this is not a concern for new domains. Flag only if relevant.

### Cloaking
- [ ] The content shown to crawlers matches the content shown to users
- [ ] No JavaScript that hides text from one and shows it to the other
- [ ] No keyword-stuffed alt text invisible to readers

### Hidden text
- [ ] No white text on white background
- [ ] No tiny-font keywords
- [ ] No off-screen keyword blocks

### Doorway pages
- [ ] This post does not exist purely to funnel into the generator with no standalone value
- [ ] Each post is genuinely useful as a destination, even though the CTA points to our generator

### Link spam
- [ ] No participation in link-trading schemes
- [ ] No purchase of links for ranking
- [ ] Outbound links are editorial (authorities, processor docs), not paid placements (paid get `rel="sponsored"`)
- [ ] Internal links serve readers, not just SEO

---

## Section 5 — AI-content honesty (Google's stance)

Google's published stance (as of 2026): AI-generated content is fine if it is helpful, accurate, and adds value. AI-generated content is contraband if it is scaled, templated, or low-effort.

There is no "AI-generated" disclosure requirement from Google. Some regulated-finance contexts and honesty norms may still warrant a note.

**This site's policy:** disclose AI assistance when it materially shaped the content. Example footer line (plain Markdown):

> "This post was drafted with AI assistance under editorial review. All figures, rates, and rules have been verified against primary sources, and tax/legal claims were checked by a human reviewer."

Adding this does not hurt SEO. Not adding it is fine too. What matters is that the post is genuinely helpful, accurate, jurisdiction-clear, and original.

---

## Section 6 — The audit output

The writer / reviewer outputs the audit as a structured block, separate from the Markdown:

```
===GOOGLE TRUST AUDIT===

**Helpful Content checks (X/9 passing)**
- ✅ People-first framing
- ✅ Unique angle: <one-line description of the unique angle>
- ✅ First-hand experience: <which marker>
- ❌ Demonstrated expertise: <what's missing — e.g., "tax claims present, no reviewer line">
- ✅ Satisfying depth
- ✅ Honest claims
- ✅ Not search-engine-first
- ✅ Original value-add
- ✅ Trust foundations (CTA → our generator: yes)

**E-E-A-T checks (X/10 passing)**
- ✅ Experience
- ✅ Expertise
- ⚠️ Authoritativeness: site is < 6 months old, limited inbound links
- ✅ Trustworthiness

**Accuracy-and-claims gate (X violations)**
- ✅ All tax/legal claims state jurisdiction + primary source + date
- ❌ <claim missing jurisdiction or source — quote it>

**Spam policy checks (X violations)**
- ✅ No scaled content fingerprint
- ✅ No site reputation abuse
- ✅ No cloaking / hidden text / doorway

**Overall risk level:** [LOW / MEDIUM / HIGH]

**Action required before publish:**
1. <specific fix>
2. <specific fix>
```

The orchestrator presents this to the user. If risk is MEDIUM or HIGH, the user decides whether to ship with the flag or fix.

---

## Risk-level guide

| Risk | Trigger | Action |
|---|---|---|
| LOW | All HCU + E-E-A-T pass, zero spam violations, accuracy gate clean | Ship |
| MEDIUM | 1-2 HCU/E-E-A-T fails OR 1 spam violation OR site is new | Fix the specific issues, then ship |
| HIGH | 3+ HCU fails OR a tax/legal post failing expertise OR any unsourced/jurisdiction-less money claim OR multiple spam violations | Do not ship; redo |

A failed accuracy-and-claims gate is always at least MEDIUM and, for tax/legal claims, HIGH — financial-YMYL leaves no room for unsourced money advice.

---

## What the audit does NOT check

- **Whether the post will rank** — that's a long-term outcome, not an audit gate
- **Whether the writing is "good"** — that's the anti-AI-slop checklist in `blog-os-master.md`
- **Schema / metadata correctness** — covered by `seo-and-schema-skill.md`
- **Snippet eligibility** — covered by `featured-snippet-skill.md`
- **Internal-link math** — covered by `topical-authority-skill.md`

Each skill checks its own scope. This audit specifically checks Google's published quality + policy guidelines plus the financial-accuracy gate.

---

**BlogOS** — pass the audit, then ship.
