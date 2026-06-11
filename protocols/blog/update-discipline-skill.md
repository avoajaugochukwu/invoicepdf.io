---
name: update-discipline
description: When to update an existing post vs publish a new one. When to redirect. How to merge near-duplicates. When to sunset stale posts. How to keep financial posts accurate as tax years and rates change. This is the skill that prevents content rot, link decay, and accidental duplicate-intent posts from accumulating across the invoicepdf.io corpus.
---

# Update Discipline — the long maintenance game

> Most blog content rots. A post that ranked in year one drifts out of relevance, figures go stale (tax years roll over, late-payment rates change, a payment processor renames a feature), sources move, and the site quietly loses traffic without anyone noticing why. For an invoicing site this is sharper than usual: a post that gives last year's tax-year guidance or a wrong net-30 explanation isn't just stale, it's wrong in a way that costs the reader money. This skill is the maintenance discipline that prevents that.

---

## The four lifecycle decisions

For any post that has been published for ≥ 6 months, you face one of these decisions:

1. **Leave alone** — post is still ranking, still accurate, still serving billers
2. **Update in place** — post needs refreshing but the intent and angle are still valid
3. **Replace** — post is fundamentally outdated, off-strategy, or the angle has changed
4. **Merge** — two posts target the same intent and are diluting each other

The wrong decision rots the corpus. The right decision compounds.

---

## When to UPDATE in place

Update the existing post (do not publish a new one) when:

- The target query and intent are unchanged
- The structural skeleton is still sound
- Specific figures, dates, or facts need refreshing (a new tax year, a changed statutory late-payment rate, a renamed PayPal/Stripe feature)
- New primary sources have emerged (an updated IRS / HMRC / GOV.UK page)
- The post is missing a recently-added archetype element (e.g. it predates the FAQ block convention)
- New internal links should be added (because new sibling clusters have been published)
- The H2 skeleton can be expanded with one or two new sections

### How to update in place

1. Open the existing MDX file at `content/blog/<slug>.mdx`
2. Make the changes
3. Bump `date` in frontmatter to today's ISO date (this is the only date field the renderer reads, and it feeds the visible publish/updated date)
4. Add or replace outbound citation links inline in the body (`[anchor](https://...)`) — there is no separate citations frontmatter block
5. If the update *corrects* a previous claim, add a short correction note as a blockquote at the relevant spot (see below) — there is no custom JSX, so callouts are GFM blockquotes
6. Run the post through `accuracy-and-claims-skill.md` again if any financial figure changed
7. Run the re-audit (blog-os-master.md Step 8) on the updated post
8. Commit with a clear message: `Update what-does-net-30-mean-on-an-invoice: refresh statutory late-payment rate + add FAQ`

### What counts as a "substantive" update (warrants bumping `date`)

- New section added
- Figure / fact updated to current data (new tax year, changed rate, new threshold)
- New worked example added
- New primary source added
- Factual correction made
- New internal links added (3+)

What does NOT warrant bumping `date`:
- Typo fix
- Formatting tweak
- Single-link replacement (without changing the source's claim)
- Image swap

Bumping `date` is itself an SEO signal — Google notices fresh content. Don't fake it by changing the date without changing the substance.

### When to add a correction note

Add it when the update *changes a previous claim* — important on financial posts, where a quietly-edited wrong number erodes trust. Use a GFM blockquote (no custom components exist):

```markdown
> **Updated June 2026.** This guide previously said net 30 means
> "payment due 30 days after the invoice date." It is more precisely
> 30 calendar days from the invoice date unless the invoice states
> "net 30 from receipt." Corrected, with the distinction spelled out below.
```

Publicly tracking corrections is a strong trust signal. Sites that own their corrections are taken more seriously — especially on money topics — than sites that quietly edit.

---

## When to REPLACE (publish a new post + redirect the old)

Replace when:

- The target query has *shifted* (e.g. a post built around a specific tax year's rules now needs a year-agnostic rewrite, or vice versa)
- The angle has *changed* (the new post takes a substantially different position)
- The post architecture is wrong (e.g. it was a thin listicle and we need a how-to or pillar)
- The post would require > 50% rewrite to update

### How to replace

1. Write the new post at a new slug at `content/blog/<new-slug>.mdx` (do not reuse the old slug — the URL is stamped on history)
2. Publish the new post
3. Set up a 301 redirect from the old slug to the new slug
4. Update any internal links pointing to the old slug (`Grep` the repo for `/blog/<old-slug>`)
5. Delete the old MDX file (the 301 keeps the URL alive)
6. Keep a record of the old post outside `content/blog/` if anyone needs to reference it

### The 301 redirect

In Next.js, redirects live in `next.config.js` via `redirects()`:

```js
async redirects() {
  return [
    {
      source: '/blog/old-slug',
      destination: '/blog/new-slug',
      permanent: true,
    },
  ]
}
```

301 (permanent) signals to Google that the old URL is gone and the new URL inherits its SEO equity. 302 (temporary) does not transfer equity. Always 301 for retirements and merges.

### When NOT to replace

- The old post still ranks #1 — leave it alone, even if you'd write it differently today
- The old post is the canonical reference for inbound links you don't control — leave the URL alive

---

## When to MERGE two posts

If two posts target overlapping intents:

1. Pick the stronger of the two as the survivor (more traffic, better URL, cleaner slug)
2. Move the unique content from the weaker into the survivor
3. Bump the survivor's `date`, expand its internal links, re-run the accuracy gate on any figures, run the re-audit
4. 301-redirect the weaker's slug to the survivor's slug
5. Delete the weaker's MDX

### Detecting overlap

Run a periodic audit:

- For each post in `content/blog/`, note its primary target query
- Group posts by target query
- Any group with > 1 post is a merge candidate

---

## Worked example — de-duplicating the current corpus

The corpus has 18 posts and several obvious near-duplicates. Here is the concrete merge plan.

### Pair 1 — the two "what is an invoice" beginner guides

- `what-is-an-invoice-beginner-guide`
- `what-is-an-invoice-guide-for-beginners`

Same intent ("what is an invoice", beginner), same archetype (definition). **Merge.**

1. Pick the survivor — keep `what-is-an-invoice-beginner-guide` (cleaner, shorter slug; confirm with GSC which has more impressions before finalizing).
2. Pull any unique sections (a better example, a clearer FAQ answer) from `...-guide-for-beginners` into the survivor.
3. Bump the survivor's `date`; make sure it links to `/blog/what-does-invoice-mean`, `/blog/what-does-an-invoice-look-like`, and `/blog/what-is-an-invoice-number`; primary CTA → invoicepdf.io generator.
4. 301: `/blog/what-is-an-invoice-guide-for-beginners` → `/blog/what-is-an-invoice-beginner-guide`.
5. Delete `content/blog/what-is-an-invoice-guide-for-beginners.mdx`.

### Pair 2 — the two "write an invoice for beginners" guides

- `how-to-write-an-invoice-beginners-guide`
- `how-to-write-an-invoice-for-beginners`

Same intent ("how to write an invoice", beginner), same archetype (how-to). **Merge.** Note there's also `how-to-create-an-invoice` and `how-to-make-an-invoice-for-beginners` in the corpus — check all four against GSC; they may collapse into a single canonical how-to with the others redirected, or split cleanly by intent (create vs write vs make are likely the same intent). Treat "make" / "write" / "create an invoice for beginners" as one canonical post unless GSC shows them ranking for genuinely distinct queries.

1. Survivor: the strongest performer (check GSC). If a tie, keep `how-to-write-an-invoice-beginners-guide`.
2. Merge unique steps / examples into the survivor.
3. Bump `date`; link up to the "what is an invoice" canonical and to `/blog/how-to-send-an-invoice`; primary CTA → generator.
4. 301 the loser(s) → survivor.
5. Delete the redirected MDX files.

### Pair 3 — the two proforma posts

- `what-is-a-proforma-invoice`
- `understanding-pro-forma-invoices-what-they-are-and-how-to-use-them`

Same topic, same intent (definition + how-to-use). **Merge.**

1. Survivor: `what-is-a-proforma-invoice` (tighter slug, matches the head query "proforma invoice"). Fold the "how to use them" angle from the long-slug post in as an H2.
2. Bump `date`; internal-link to `/blog/what-is-an-invoice-beginner-guide` and any commercial-invoice post; primary CTA → generator.
3. 301: `/blog/understanding-pro-forma-invoices-what-they-are-and-how-to-use-them` → `/blog/what-is-a-proforma-invoice`.
4. Delete the long-slug MDX.

### Audit / prune candidates (not merges)

- `how-to-find-the-invoice-price-of-a-car` — off-core-topic (car buying, not billing). Decide keep-or-prune: it pulls unrelated intent and dilutes topical focus. If it has real traffic, leave it but don't build a cluster around it; otherwise sunset (410).
- `how-to-get-invoice-from-amazon` — off-core-topic (retrieving a receipt, not issuing an invoice). Same treatment.

Decide these against GSC impressions before acting; off-topic-but-trafficked stays, off-topic-and-dead gets sunset.

---

## When to SUNSET (delete and 410)

Sunset when:

- The topic is genuinely irrelevant to invoicepdf.io's direction (e.g. the off-core-topic posts above, if they have no traffic)
- The post is harming the site's helpful-content profile (low quality, off-topic)
- The URL has no inbound links worth preserving

### How to sunset

1. Confirm no internal links point to the slug (`Grep` for `/blog/<slug>`)
2. Delete the MDX
3. Either:
   - Return HTTP 410 Gone (preferred for content that should be deindexed quickly)
   - Or 301 to the closest topical landing page (preferred if there's a natural successor)

Sunsetting is rare. Most "old" posts should be updated, replaced, or merged — not sunset.

---

## The freshness ladder

Different content has different freshness expectations. Financial/YMYL content sits higher on this ladder than generic blogging:

| Content type | Refresh cadence | Why |
|---|---|---|
| News / update commentary | One-time; archive after 3 months | Time-bound |
| Tax-year / rate-dependent posts | At every tax-year rollover + on any rate change | A wrong year's figure is wrong, not just stale |
| Comparison posts (tools, processors) | Every 6 months | Pricing and features shift |
| How-to guides (send/write/pay an invoice) | Every 12 months | Processor UIs and steps change |
| Pillar pages | Every 12-18 months | Major refresh, not constant |
| Definition pages (what is an invoice, invoice number) | Every 24-36 months | Definitions don't shift fast |

### The financial-accuracy cadence (special case)

Any post that states a tax rate, tax-year threshold, statutory late-payment / interest rate, or country-specific compliance rule must be checked:

- **At every tax-year rollover** for the jurisdictions it covers (US tax year, UK April-to-April, etc.)
- **Whenever a cited rate changes** (e.g. a statutory late-payment interest rate is revised)
- **Whenever a cited .gov page moves or updates**

These checks run through `accuracy-and-claims-skill.md`. Prefer writing such posts to be year-agnostic ("check the current threshold on [IRS / GOV.UK]") so they need fewer forced refreshes — but where a concrete figure is given, it must be current and the `date` bumped when it changes.

---

## The maintenance run

Periodically (monthly is fine), run a maintenance audit:

```
For each MDX file in content/blog/:
  - Check `date` against the archetype's refresh cadence (and the financial-accuracy cadence)
  - Check every outbound URL for 200 status (no 404s) via WebFetch
  - Check every internal /blog/<slug> link resolves to a real MDX file
  - Check that any tax / rate / threshold figure is still current
  - Flag posts ranking below position 20 for the target query (GSC)
  - Flag posts with declining impressions / clicks in Search Console
  - Flag duplicate-intent groups (merge candidates)
```

The output is a triage list. Each post gets one of the four decisions (leave / update / replace / merge) and the corresponding action.

---

## Visible "last updated" stamping

The renderer reads only `date` from frontmatter (no `last_updated`, `version`, or `versions` fields — those are dead). So:

- `date` *is* the last-updated date. Bump it on substantive updates; it drives the visible date the reader sees and the freshness signal.
- For high-traffic financial posts, put a short visible note in the body so readers can trust currency, e.g. an opening blockquote: `> Last reviewed June 2026 against current IRS and GOV.UK guidance.`
- Do not invent extra frontmatter to carry version history — it won't render. If you need a changelog, keep it in the commit history or a small body section.

---

## Redirect hygiene

Over time the redirects pile up. Rules:

- Never redirect a redirect (A → B → C). Update the A redirect to point directly to C.
- Audit redirects quarterly. Remove redirects for slugs gone > 2 years with zero referrer traffic.
- Never repurpose a slug. If `/blog/what-is-an-invoice-number` was about invoice numbers and becomes about something else, that's a bait-and-switch and Google notices.

---

## What kills update discipline

- **Bumping `date` without actually updating content** — Google notices the dishonesty over time
- **Letting a tax-year or rate figure go stale** — the worst failure on a money site; it's actively wrong
- **Leaving 404s on outbound links** — primary sources move; the maintenance run catches them
- **Sunsetting posts without redirects** — every dead URL is wasted SEO equity
- **Duplicate intent across posts** — kills both, since neither concentrates ranking signals (see the worked example above)
- **Never updating anything** — the corpus rots quietly

---

## Pre-update checklist

- [ ] Decision (update / replace / merge / sunset) is correct for this post
- [ ] If updating, all changes are substantive (not just date-bumping)
- [ ] `date` bumped to today (ISO)
- [ ] Correction note (blockquote) added if a previous claim was corrected
- [ ] Any changed financial figure re-checked via `accuracy-and-claims-skill.md`
- [ ] New citations added as inline body links
- [ ] If replacing/merging, new slug differs from old slug
- [ ] If replacing/merging, 301 redirect configured in `next.config.js`
- [ ] If replacing/merging, internal links to old slug updated
- [ ] Primary CTA still points to the invoicepdf.io generator
- [ ] Re-audit run on the updated post

---

**BlogOS** — content compounds when you maintain it.
