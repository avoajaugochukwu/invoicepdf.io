---
name: keyword-research
description: The pre-draft research pipeline. Takes a keyword and produces a synthesized brief covering SERP shape, People Also Ask boxes, related queries, audience voice, and competitor angles. Baseline runs on WebSearch + WebFetch alone; DataForSEO / Perplexity / Firecrawl are optional accelerators (keys live in .env). This is what runs before drafting any invoicepdf.io blog post.
---

# Keyword Research — assembling the brief

> The writer cannot produce a Google-grade post from a keyword alone. The keyword must be turned into a *brief* — SERP shape, what's actually ranking, what real searchers asked next, what audience pain looks like in their own words, what angle is open. This skill is the pipeline that builds that brief from one keyword using WebSearch + WebFetch. It is tool-agnostic: the baseline works with nothing but the two built-in research tools.

---

## Inputs

The pipeline accepts one of:

1. **A bare keyword**: `how to write an invoice`
2. **A keyword + archetype**: `how to write an invoice` (how-to)
3. **A keyword + competing/old URL** (when the goal is to update or beat an existing page on the SERP)
4. **A keyword + URL + archetype** (full manual override)

If the input is just a keyword and the keyword has multiple plausible archetypes (e.g. `proforma invoice` could be a definition or a how-to), the pipeline decides from SERP shape: read the top results, see whether Google rewards a short definition, a step list, or a long guide, and pick the archetype that matches.

Named archetypes used across this corpus: pillar, cluster, how-to, definition, comparison, listicle, faq, template/tool-landing, topical-landing, news/update.

---

## Tools

Baseline (always available, zero config):

```
WebSearch  — SERP results + People Also Ask + related searches
WebFetch   — pull a ranking page or a primary source and read its structure
```

Optional accelerators (keys already in `.env`; use only when they buy real signal):

```
DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD  — exact search volume + competition
PERPLEXITY_API_KEY                       — fast multi-source synthesis
FIRECRAWL_API_KEY                        — clean structured scrape of JS-heavy pages
OPENAI_API_KEY / ANTHROPIC_API_KEY       — synthesis / classification fallback
```

Never block on the accelerators. If a key is missing or the service is down, the baseline still produces a complete brief.

---

## The pipeline

Five passes, run in roughly this order. Passes 1-3 can run in parallel.

### Pass 1 — WebSearch the SERP (what's actually ranking)

Search the target query. Read the result set as it would appear to a freelancer Googling at 11pm trying to bill a client.

```
WebSearch: "how to write an invoice"
```

Stash from the results:
- The top 8-10 organic URLs + their titles + meta descriptions
- People Also Ask questions (e.g. "What needs to be on an invoice?", "Can I write my own invoice?", "Do I need to be a business to invoice someone?")
- Related searches Google surfaces ("invoice example", "free invoice template", "what to put on an invoice")
- Whether a featured snippet exists, and its shape (paragraph, numbered list, table)

If you want exact volume + competition numbers to prioritize between near-tie keywords, *optionally* hit DataForSEO here. The baseline does not need it — SERP shape and PAA already tell you intent.

### Pass 2 — Cluster mapping (related queries → H2 candidates)

Expand the seed into its cluster. Run 3-5 follow-up WebSearches on the variations you saw in Pass 1's related searches and PAA.

```
WebSearch: "what to include on an invoice"
WebSearch: "invoice example for freelancers"
WebSearch: "do I charge tax on an invoice"
```

Stash:
- The cluster of related queries sorted by how often they recur across searches (these become H2 candidates or internal-link targets)
- Modifier patterns ("invoice for beginners", "invoice example", "free invoice", "how to send an invoice") — these tell you what the post must cover
- Whether any variation is strong enough to be its own post (split) or belongs as a section (merge)

*Optional accelerator:* DataForSEO `keyword_suggestions` returns 50 variations with volume in one call if you want the full cluster ranked numerically. Baseline: the WebSearch related-searches block is enough to plan the H2s.

### Pass 3 — WebFetch the top 2-3 ranking pages (what they actually say)

Fetch the body of the top 2-3 ranking URLs from Pass 1. This tells the writer what angle is already covered so they can find an *open* angle, not duplicate the leaders.

```
WebFetch: <TOP_URL_1>  — extract H1, H2 list, word count, intro paragraph
WebFetch: <TOP_URL_2>  — same
WebFetch: <TOP_URL_3>  — same
```

Stash for each top result:
- URL
- H1
- H2 list (what sections they cover)
- Approximate length (short definition vs long guide)
- Intro paragraph (how they open)

This shapes the angle. If all three open with "An invoice is a document that..." — your opening should NOT be that. If all three bury the actual template behind 800 words of preamble, yours should lead with a worked example. If all three are generic 1,200-word guides, yours should be either tighter (a 400-word definition that wins the snippet) or substantially more useful (a how-to with a real filled-in invoice and a one-click link to the invoicepdf.io generator).

*Optional accelerator:* Firecrawl returns cleaner structured markdown for JS-heavy SaaS competitor pages where WebFetch struggles. Use it only when WebFetch returns garbled content.

### Pass 4 — Audience voice (what billers actually ask)

Find the language real freelancers, contractors, and small-business owners use. Search where they complain and ask: Reddit (r/freelance, r/smallbusiness, r/Entrepreneur), Quora, and forum threads.

```
WebSearch: "how to invoice a client reddit"
WebSearch: "client won't pay invoice reddit"
WebSearch: "first time invoicing site:reddit.com"
```

Then WebFetch the most relevant thread to pull verbatim quotes.

Stash:
- 5-10 verbatim reader questions in their exact phrasing ("Do I need an LLC to send an invoice?", "What do I put if I don't have a company number?")
- 3-5 verbatim pain-point quotes ("Client ghosted me after I sent the invoice and I don't know what to do")
- Common misconceptions (e.g. that you need to be a registered business to invoice, or that an invoice and a receipt are the same thing)
- The real fears underneath the query — getting paid late, looking unprofessional, getting tax wrong

This is the highest-signal source of *real audience voice*. SERP research gives you keywords; this gives you the language readers actually use, and the trust gaps the post must close.

### Pass 5 — Synthesis (compress into a brief)

With Passes 1-4 in hand, synthesize the research into a usable brief. The baseline synthesis is just structured note-taking by the orchestrator — read the four passes and fill in the brief template below.

*Optional accelerator:* one Perplexity `sonar` call can compress the four passes and surface primary sources fast:

```bash
set -a; source .env; set +a

curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar",
    "messages": [{
      "role": "user",
      "content": "Synthesize a brief for an invoicepdf.io SEO blog post on the keyword \"<KEYWORD>\". Based on this research: <PASTE_PASSES_1_TO_4>. Output: (1) the 3-5 reader intents this keyword captures; (2) the open angle (what the top 3 pages do badly); (3) 5-8 primary sources to cite with URLs — prefer .gov tax authorities (IRS, HMRC, GOV.UK), accounting standards bodies, and reputable invoicing references; (4) 3-5 PAA questions to answer as H2s or in the FAQ; (5) internal-link targets — which other invoicepdf.io posts this should link to; (6) the primary CTA, which is always the invoicepdf.io generator."
    }]
  }' | jq -r '.choices[0].message.content'
```

Use whichever path you have. The output is the same brief either way.

---

## The assembled brief (output of this pipeline)

After all five passes, the orchestrator has assembled a brief covering:

```
## TARGET QUERY
"<keyword>" (intent: <informational | how-to | comparison | transactional>)

## ARCHETYPE
<pillar | cluster | how-to | definition | comparison | listicle | faq | template-landing | topical-landing | news>

## URL
/blog/<slug>

## SERP shape
- Featured snippet currently: <yes/no, shape, source>
- PAA questions: [<5-10 questions>]
- Top 3 ranking: <URLs + H2 lists + length + opening style>
- Related searches: [<terms>]

## OPEN ANGLE
<2-3 sentences on what the top 3 are missing>

## AUDIENCE VOICE (from Reddit / forums)
- Real questions readers ask: [<5-10 verbatim>]
- Pain points: [<verbatim quotes>]
- Common misconceptions: [<bullets>]

## PRIMARY SOURCES TO CITE
- [<URL, outlet, date, relevance>] × 5-8
  (prefer IRS / HMRC / GOV.UK / accounting bodies for any tax, rate, or compliance claim)

## H2 PLAN (per archetype)
<H2 list matching the archetype's canonical skeleton from page-structures-skill.md>

## INTERNAL LINK TARGETS
<3-5 sibling slugs + 1 pillar slug, drawn from content/blog/, verified to exist>

## FAQ QUESTIONS (PAA capture)
- <PAA question 1> — <40-60 word answer plan>
- × 3-5

## FEATURED SNIPPET TARGET
- query: <the snippet target>
- shape: paragraph | list | table
- answer: <40-60 word answer plan>

## PRIMARY CTA
invoicepdf.io generator — "Create your invoice free in under a minute" (never a competitor)
```

This brief is what the writer subagent receives. It does not exist as a saved file by default — it lives in the subagent's context for the duration of the write. The orchestrator can choose to save it as `briefs/<slug>.md` for audit / review purposes.

---

## When to save the brief vs run inline

Two modes:

### Inline (default)
The brief is assembled, the writer drafts immediately, the brief is discarded after the post ships. Faster, simpler.

### Saved
The brief is saved to `briefs/<slug>.md` before drafting. Useful for:
- Topics where the operator wants to review the brief before drafting
- Posts that may need re-drafting later with the same research base
- YMYL-adjacent financial topics (tax treatment, late-payment law, financing terms) where the accuracy gate warrants extra review — see `accuracy-and-claims-skill.md`

The default is inline. Add `--save-brief` to save.

---

## Cost per run

The baseline (WebSearch + WebFetch) has no marginal API cost. Only the optional accelerators cost money:

| Pass | Tool | Approx cost |
|---|---|---|
| 1 — SERP | WebSearch | free (baseline) |
| 1 — SERP volume (optional) | DataForSEO Advanced SERP | ~$0.0025 per query |
| 2 — cluster (optional) | DataForSEO keyword_suggestions | ~$0.0075 per call |
| 3 — competitor scrape | WebFetch | free (baseline) |
| 3 — clean scrape (optional) | Firecrawl | ~$0.01 per page |
| 4 — audience voice | WebSearch + WebFetch | free (baseline) |
| 5 — synthesis (optional) | Perplexity sonar, ~2K tokens | ~$0.002 per query |

**Baseline total per post:** $0. **With all accelerators on:** roughly $0.02-0.05. Even a heavy month stays in single-digit dollars. Reach for accelerators only when the baseline leaves a real gap.

---

## When to skip passes

The pipeline assembles a brief from scratch. Skip the relevant passes if:

- **The brief already exists** (operator-provided at `briefs/<slug>.md`) — skip Passes 1-5, jump straight to drafting
- **The keyword is a narrow definition** (e.g. `what is an invoice number`) where the SERP rewards a tight 300-500 word answer — run Passes 1 and 3, skip the audience scrape; the open angle is usually "be clearer and more example-driven than the competitors"
- **The keyword is off-core-topic** (e.g. `how to find the invoice price of a car`, `how to get invoice from amazon`) — confirm with the operator whether the post should exist at all before researching; these are audit/keep-or-prune candidates, not natural fits for an invoice-generator site

---

## Quality bar

A bad brief produces a bad post no matter how good the writer is. The brief is the load-bearing artifact. Specifically:

- **The open angle must be specific.** "More comprehensive than competitors" is not an angle. "The top 3 explain what an invoice is but none show a filled-in example or link to a tool that makes one in 60 seconds" is an angle.
- **Financial claims must come from research, not guessing.** The writer should not invent that "net 30 means payment in 30 calendar days from receipt" or assert a tax rate — surface it from a primary source (IRS / HMRC / GOV.UK / accounting body) and route any YMYL claim through `accuracy-and-claims-skill.md`.
- **The audience voice should be verbatim.** Reader quotes from Reddit aren't paraphrased — they're stored as exact strings.
- **The internal-link targets must exist.** Before listing `/blog/what-is-an-invoice-number` as a target, confirm `content/blog/what-is-an-invoice-number.mdx` exists.

---

## Pre-write checklist (the orchestrator runs this on the assembled brief)

- [ ] Target query is specific and matches a real search intent
- [ ] Archetype is decided and matches the SERP shape
- [ ] At least 2 competitor pages were fetched (Pass 3)
- [ ] At least 5 primary sources are identified (Pass 5), with .gov/standards-body sources for any financial claim
- [ ] Audience voice captured verbatim where the topic warrants it
- [ ] Any YMYL/financial claim is flagged for the accuracy-and-claims gate
- [ ] H2 plan matches the archetype's canonical skeleton
- [ ] Internal-link targets are real slugs (verified against `content/blog/`)
- [ ] PAA questions are real (lifted from Pass 1, not invented)
- [ ] Featured-snippet target is set
- [ ] Primary CTA points to the invoicepdf.io generator

---

**BlogOS** — the keyword becomes the brief becomes the post.
