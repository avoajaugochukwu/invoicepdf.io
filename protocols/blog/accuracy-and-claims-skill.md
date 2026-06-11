---
name: accuracy-and-claims-skill
description: The hard publish gate for invoicepdf.io. Invoicing content is YMYL-adjacent — money, tax, payment law, contracts. Every load-bearing money/tax/legal claim is verified against an authoritative primary source and stamped with its jurisdiction before publish. A wrong or unsourced claim blocks the post. Replaces the scripture-verification gate from the source pack.
---

# Accuracy & Claims — the publish gate

This is the one gate that can stop a post from shipping. On a Bible site the gate was scripture accuracy. Here it is **financial, tax, and legal accuracy**, because our reader acts on what we say with real money.

If a freelancer reads "you can charge 8% interest on a late invoice" and that is not legal in their country, we have cost them a client relationship and our credibility. If we say "Net 30 means 30 business days" (it means 30 calendar days), we are simply wrong. Money content has a right answer, and we are accountable to it.

## Why this is a hard gate, not a guideline

Google classifies content that can affect a person's finances, safety, or legal standing as **Your Money or Your Life (YMYL)** and holds it to a higher trust bar. Invoicing, payment terms, tax, late fees, and collections all sit inside or next to that bar. A post that gets a money fact wrong does not just disappoint a reader — it underperforms in search and erodes the whole site's trust signal.

So: **no load-bearing money, tax, or legal claim ships unverified.** Not "probably right". Verified against a primary source, with the jurisdiction named.

---

## What counts as a load-bearing claim

Scan the finished draft for every statement a reader could act on or quote. These all require verification:

- **Payment-term definitions** — Net 30, Net 15, Net 60, due on receipt, 2/10 Net 30, CIA, EOM. (Net terms are calendar days from the invoice date unless stated otherwise — confirm per source.)
- **Tax rules and rates** — sales tax, VAT, GST, withholding, tax-registration thresholds, what must appear on a tax invoice. These differ by country and change by year.
- **Late fees, interest, and statutory rights** — whether you can charge a late fee, the legal maximum, statutory interest rates, and the right to claim collection costs. Highly jurisdiction-specific.
- **Collections and legal escalation** — small-claims thresholds, demand-letter norms, what's enforceable.
- **What a legal invoice must contain** — required fields differ by country and by whether the seller is tax-registered.
- **Currency, figures, and statistics** — any number a reader might repeat, especially "average days to payment" or "X% of invoices paid late" type stats.
- **Named tool facts** — a competitor or processor's pricing, fees, or features (e.g. "PayPal charges X%"). These change; verify against the official docs and date them.

What does **not** need the gate: general advice that is true everywhere ("send the invoice promptly", "keep your invoice numbers sequential"), opinion clearly framed as opinion, and worked examples using made-up but internally-consistent numbers (a $500 sample invoice).

---

## The two rules that make a claim safe

### Rule 1 — State the jurisdiction

Money and tax rules are not universal. Every rule-based claim names where it applies:

- ✅ "In the UK, you have a statutory right to charge interest on late commercial payments."
- ✅ "In the US, whether you charge sales tax on an invoice depends on your state and what you sell."
- ❌ "You can charge 8% interest on overdue invoices." (Where? For whom?)

If a post is for a global audience, either pick the primary market and say so, or give a short per-country table. Never imply one country's rule is universal. When you genuinely cannot scope it, say "this varies by country — check your local tax authority" and link the relevant authorities.

### Rule 2 — Cite a primary source

Link the claim to an authoritative source, not a content farm restating the same thing.

**Source whitelist (in priority order):**

- **Government tax authorities:** IRS.gov (US), GOV.UK / HMRC (UK), ATO.gov.au (Australia), Canada Revenue Agency (Canada), europa.eu (EU VAT, EU Late Payment Directive), and the relevant national authority for other markets.
- **Payment / late-payment law:** official legislation text (e.g. the UK Late Payment of Commercial Debts legislation on legislation.gov.uk, the EU Late Payment Directive on europa.eu).
- **Official product docs** for any named tool or processor: Stripe, PayPal, Square, etc. — their own docs/pricing pages, dated.
- **Accounting standards bodies and reputable finance outlets** for general practice.

Wikipedia and SEO content farms are starting points to find the primary source, never the citation itself. Full discipline in `research-and-citation-skill.md`.

---

## The verification procedure (Pass 2 of the research contract)

Run this after the draft is written, before the re-audit finalizes.

1. **Extract claims.** List every load-bearing claim from the draft (use the categories above). Each becomes a one-line check.
2. **Verify each** with WebSearch + WebFetch of a whitelist source. For a fast confirmation you may use Perplexity (key in `.env`) but the *citation in the post* must be the primary source, not Perplexity.
3. **Patch literally.** If the source contradicts or refines the draft, swap the wording inline. Do not restructure the post during this pass — literal corrections only.
4. **Stamp jurisdiction** on every rule-based claim that lacks it.
5. **Add the inline citation** (descriptive anchor to the primary source).
6. **Record the result** in the audit's accuracy section: claim → source → any correction.

```bash
# Optional fast confirmation (cite the primary source in the post, not this):
set -a; source .env; set +a
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"sonar","messages":[{"role":"user","content":"In the UK, what is the statutory interest rate a business can charge on a late commercial invoice in 2026?"}]}' \
  | jq -r '.choices[0].message.content'
```

---

## The block condition

A post **does not ship** if any of these is true after the verification pass:

- A load-bearing money/tax/legal claim could not be confirmed against a whitelist source.
- A rule-based claim has no jurisdiction stated and applies differently across countries.
- A cited figure (rate, threshold, fee) is out of date for the current tax year.
- A named tool's pricing/feature claim cannot be confirmed against its official docs.

When blocked, mark the draft `ACCURACY HOLD — <claim>` and return it. Either find the source, scope the claim to a jurisdiction you can verify, or cut the claim. Cutting an unverifiable claim is always better than shipping it.

---

## Dated claims and staleness

Tax rates, thresholds, statutory interest, and tool pricing change. A claim that was true last year can be wrong today, and a wrong claim is a wrong claim regardless of when it was written.

- Tie every dated claim to its year ("for the 2026 tax year") and cite the source with an access date.
- Flag the post for the refresh cadence in `update-discipline-skill.md`.
- News/update archetype posts get the tightest review — they exist to be current.

> **Rule of thumb:** if a number could change when a government updates a rate, treat it as perishable. Date it, source it, and schedule its review.

---

## Quick pre-publish accuracy checklist

- [ ] Every payment-term definition matches a primary source (calendar vs business days confirmed).
- [ ] Every tax/VAT/GST claim names its jurisdiction and cites the tax authority.
- [ ] Every late-fee / interest / collections claim names its jurisdiction and cites the law.
- [ ] Every "must include on an invoice" list is scoped to a country and sourced.
- [ ] Every statistic has a named, dated source (or is cut).
- [ ] Every named-tool pricing/feature claim cites the tool's official docs, dated.
- [ ] No claim implies one country's rule is universal.
- [ ] Dated claims are tagged with the year and scheduled for review.

If all boxes are checked, the accuracy gate passes. If any claim can't pass, cut it or scope it — never ship a maybe.
