---
description: Audit an existing invoicepdf.io post and fix it in place to the current standard — voice, depth, US accuracy, MDX validity, anti-cannibalization, and authoritative external links.
argument-hint: <slug or path to content/blog/*.mdx>
---

Audit and fix in place: **$ARGUMENTS**

You are bringing an existing post up to standard — preserve its correct facts and topic
coverage; do not re-research from scratch or invent claims. But reformatting must not leave
a thin or under-sourced post thin or under-sourced — deepen and cite per §3a/§4 below.

## 1. Load the rules
Read `.claude/blog-standards.md` in full (frontmatter, voice, depth, one-keyword-per-URL,
**external-links policy §5**, US accuracy gate §6, MDX validity §7).

## 2. Read the post
Read `content/blog/<slug>.mdx` (accept a full path too). Keep its frontmatter (refresh
`date` to today), its slug, its real facts, and its internal links. Note its single primary
keyword.

## 3. Fix in place to the standard
- Voice: clear & friendly, fluff cut; bold lead-ins over `###` soup (standards §2).
- Structure: answer early; dedupe repeated sections; `## Frequently Asked Questions` present
  and answering the real PAA; tables well-formed.
- Anti-cannibalization (standards §4): confirm the post owns ONE primary keyword and doesn't
  restate a sibling's intent. If it overlaps another post, sharpen its angle (or recommend a
  merge) and fix cross-links. Never create a self-referential link.

### 3a. Don't reformat thinness — fix it
If the post is below its word range, has one-sentence `##` stubs, a single worked example, or
a stub FAQ, deepen it from the existing material (explain the mechanism, add the obvious
common-mistake, walk a second example). If the gap is genuinely factual and needs new
sources, ground it via Perplexity (standards §8) / the §5 authorities — do not fabricate.

## 4. Add external links (REQUIRED — the determination is yours)
Apply standards §5. Most existing posts have ZERO authoritative outbound links — fix that:
link the first relevant mention of each stat, tax/legal fact, definition/etymology,
named-tool flow, or standard to the matching authority (IRS, trade.gov, Investopedia,
Merriam-Webster, the tool's docs, the stat's original publisher). Aim ~3–6 in a long guide /
~1–3 in a short page. **Verify each URL resolves**
(`curl -sIL -o /dev/null -w "%{http_code}\n" "<URL>"` → 200) before embedding; never ship a
guessed or dead link. Plain markdown, descriptive anchor text — the renderer handles
`target`/`rel`. Add or repair internal cluster links too.
**Tools & competitors** (standards §5): be helpful first — lead with OUR own
generator/templates. Linking a competing tool is allowed where it genuinely helps (comparison
/"alternatives" posts, or needs we don't serve), but curate — don't leave a link farm of
rivals, and don't bury our product under them. Competitor/affiliate links get `rel="nofollow"`
automatically (known domains) or via raw `<a rel="nofollow">`; authorities/citations stay
followed. If a prior draft dumped a roster of rival links on a how-to page, trim and re-balance
rather than ban.

## 5. Self-verify before finishing
- US accuracy gate (standards §6) clean — fix any VAT / "must charge sales tax" / SSN-on-invoice /
  "need an LLC" / wrong Net-terms / reused-invoice-number / unattributed-stat leak.
- MDX valid (standards §7): no raw `<`, balanced fences, well-formed tables, `description` ≤160.
- Frontmatter unchanged except `date`; slug and author preserved; featuredImage present on disk.
- Every external link verified (status code noted); no self-referential links.

## 6. Report
Overwrite `content/blog/<slug>.mdx`. Report: what changed, the external links added (with
verified status codes), final word count vs the type's range, and any remaining gap
(flag `NEEDS EXPANSION` with specifics if still thin).
