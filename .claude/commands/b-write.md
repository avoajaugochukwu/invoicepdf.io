---
description: Research and draft a new invoicepdf.io blog post from a keyword → content/blog/<slug>.mdx (Perplexity-grounded, US-accurate, with authoritative external links).
argument-hint: <keyword or topic> [slug]
---

Write a new blog post for: **$ARGUMENTS**

The grounding, the accuracy gate, and the external-links requirement are the contract —
do not skip them. For a clean context, do the research + draft in a fresh subagent and
have the orchestrator write the returned file.

## 1. Load the rules
Read `.claude/blog-standards.md` in full — frontmatter contract, voice, depth bar,
one-keyword-per-URL, **external-links policy (§5)**, US accuracy gate (§6), MDX validity.
That file wins on every formatting/sourcing question.

## 2. Resolve inputs
- Derive a kebab-case `slug` from the keyword (or use the one passed as the 2nd arg).
  All lowercase, ASCII + hyphens, no stop-word junk, no trailing digits.
- If `content/blog/<slug>.mdx` already exists, STOP and ask the operator whether to
  overwrite or run `/b-review <slug>` instead.
- Fix the primary keyword. Confirm no existing post already owns it (anti-cannibalization,
  standards §4); if one does, recommend consolidating instead of creating.

## 3. Ground it (research pass)
Use WebSearch/WebFetch to study the live SERP: the section structure top results share,
the full People-Also-Ask set (→ the FAQ), and the angle they UNDER-serve (the gap to win).
Then ground every load-bearing fact with Perplexity (standards §8) and/or the authorities
in standards §5. If the topic is thin (no real substance, no sources), stop and report
`NEEDS MORE RESEARCH`.

## 4. Draft the MDX
- Plan a short `##` skeleton that fully satisfies intent (standards §3). Answer the core
  question early, then mechanics → worked example(s) → mistakes → FAQ → short close.
- Write to the frontmatter contract (standards §1); `date` = today; keyword-led title +
  `description` (≤160 chars).
- Source a featured image if none exists: place it at `/public/blog/<slug>/featured.png`
  and reference it in frontmatter. A dangling `featuredImage` is not done.

## 5. Add external links (REQUIRED — make the determination)
Apply standards §5: link the first relevant mention of each stat, tax/legal fact,
definition/etymology, named-tool flow, or standard, to the matching high-authority source
(IRS, trade.gov, Investopedia, Merriam-Webster, the tool's own docs, the stat's original
publisher). Aim ~3–6 in a long guide / ~1–3 in a short page — quality over quantity.
**Verify each URL resolves** (`curl -sIL -o /dev/null -w "%{http_code}\n" "<URL>"` → 200)
before embedding; never ship a guessed or dead link. Plain markdown only; descriptive
anchor text. Add the relevant internal cluster links too (standards §4), never self-linking.
**Tools & competitors** (standards §5): be helpful first — lead with OUR own
generator/templates, but you may link a third-party/competing tool when it's genuinely the
most useful thing (a comparison/"alternatives" post, or a need we don't serve). Curate, don't
dump a roster of rivals; keep ours first. When you DO link a competitor/affiliate, the
renderer auto-applies `rel="nofollow"` for known domains (else write raw `<a rel="nofollow">`).
Neutral authorities and cited stats stay normal followed links.

## 6. Verify (hard gate)
- Re-check every fact against its source; US accuracy gate (standards §6) clean.
- Depth bar met (standards §3) — within the word range by coverage, ≥2 worked examples in a
  how-to, FAQ answers the real PAA. Expand if thin; do not pad.
- MDX valid (standards §7). Every external link verified (§5). No self-referential links.

## 7. Write the file + report
Write `content/blog/<slug>.mdx`. Report: primary keyword, section list, final word count,
the external links added (with their verified status codes), and confirmation each accuracy
gate item passed.
