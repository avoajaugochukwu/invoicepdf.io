---
name: topical-authority
description: The hub-and-spoke (pillar-cluster) content architecture that signals topical authority to Google for invoicepdf.io. This is how a growing set of invoicing posts becomes a recognized authority on invoicing rather than a pile of disconnected pages. Covers pillar selection, the live cluster map of existing posts, internal-linking discipline, and when to write a new cluster vs expand an existing post.
---

# Topical Authority — hub-and-spoke

> Google does not just rank individual pages. It ranks sites for *topics*. A site with a well-organized pillar and 8-15 supporting cluster posts will outrank a site with 50 disconnected posts on the same topic, even when the disconnected posts are individually well written.

Internal linking is a priority for this site. The existing posts ship with almost no links between them — every one of them is currently an orphan. Fixing that, and never creating a new orphan, is the job of this skill.

---

## The model in one diagram

```
                        Pillar page (head term)
                        e.g. "how to create an invoice"
                              ▲
                              │  internal links
                              │
            ┌────────┬────────┼────────┬────────┐
            │        │        │        │        │
        Cluster 1  Cluster 2  ...    Cluster N-1  Cluster N
       "what is an  "invoice          "how to     "what does
        invoice     number"           send an      net 30 mean"
        number"                       invoice"

                    (clusters link to each other
                     AND back up to the pillar)
```

The pillar covers the head term comprehensively. Each cluster covers one specific long-tail under it. Clusters link **up** to the pillar and **across** to siblings. The pillar links **down** to every cluster.

---

## Selecting pillars

A pillar is worth writing only when:

1. The head term has meaningful search volume (≥ 500/month is a fine starting bar).
2. You have or can write ≥ 6 cluster posts under it.
3. The topic is genuinely within invoicepdf.io's domain (invoicing, getting paid, small-business money).
4. You can take an angle that beats the existing top 3.

If you can't list 6 candidate clusters, the topic is a cluster, not a pillar.

---

## The live cluster map (current corpus)

These are the pillars invoicepdf.io is building, with the 18 existing posts assigned. Pillars marked **(to write)** don't exist yet — write them next, because their clusters are already live and orphaned. Keep this map current; it is the source of truth for which siblings to link.

### Pillar 1 — How to Create an Invoice
Head term: "how to create an invoice". Pillar slug: `how-to-create-an-invoice` *(exists — upgrade it to full pillar depth and link down to every cluster below)*.

| Cluster slug | Target query | Type | Notes |
|---|---|---|---|
| `how-to-make-an-invoice-for-beginners` | how to make an invoice | How-to | near-dup of write/create — see merge note |
| `how-to-write-an-invoice-beginners-guide` | how to write an invoice | How-to | near-dup pair |
| `how-to-write-an-invoice-for-beginners` | how to write an invoice for beginners | How-to | near-dup pair |
| `how-to-send-an-invoice` | how to send an invoice | How-to | |
| `how-to-send-an-invoice-on-paypal` | how to send an invoice on paypal | How-to | |
| `what-is-an-invoice-number` | what is an invoice number | Definition | |
| `what-does-an-invoice-look-like` | what does an invoice look like | Definition | |

### Pillar 2 — What Is an Invoice
Head term: "what is an invoice". Pillar slug: `what-is-an-invoice-beginner-guide` *(exists — promote one canonical "what is an invoice" page to pillar; see merge note)*.

| Cluster slug | Target query | Type |
|---|---|---|
| `what-does-invoice-mean` | what does invoice mean | Definition |
| `what-does-an-invoice-look-like` | what does an invoice look like | Definition (shared with Pillar 1) |
| `what-is-an-invoice-number` | what is an invoice number | Definition (shared with Pillar 1) |
| `what-is-a-proforma-invoice` | what is a proforma invoice | Definition |
| `understanding-pro-forma-invoices-what-they-are-and-how-to-use-them` | proforma invoice guide | Definition (dup of above — merge) |

### Pillar 3 — Invoice Payment Terms & Getting Paid **(to write)**
Head term: "invoice payment terms". Suggested pillar slug: `invoice-payment-terms`.

| Cluster slug | Target query | Type | Status |
|---|---|---|---|
| `what-does-net-30-mean-on-an-invoice` | what does net 30 mean | Definition | exists |
| `how-to-pay-an-invoice-beginners-guide` | how to pay an invoice | How-to | exists |
| `invoice-financing-made-simple` | invoice financing | Definition/guide | exists |
| `how-to-get-paid-faster` | how to get paid faster | Listicle | planned |
| `invoice-late-fees` | how to charge late fees on an invoice | How-to | planned (accuracy-gate heavy) |
| `net-15-vs-net-30` | net 15 vs net 30 | Comparison | planned |

### Off-core outliers (audit / prune candidates)
`how-to-get-invoice-from-amazon` and `how-to-find-the-invoice-price-of-a-car` match "invoice" the word but not our buyer (they're consumer-retrieval and car-buying intent). They have no natural pillar. Either build a small "retrieving invoices from platforms" cluster if data supports it, or prune — see `update-discipline-skill.md`. Do not force-link them into the core pillars.

### Known duplicates to resolve first
Three near-duplicate pairs are cannibalizing each other. Merge each to one canonical post and 301 the rest before building links, so links don't point at a page that's about to be redirected (full plan in `update-discipline-skill.md`):

- Two "what is an invoice" beginner guides → one canonical (becomes Pillar 2).
- Two "write an invoice for beginners" how-tos (plus the "make an invoice" variant) → one canonical how-to.
- `what-is-a-proforma-invoice` + `understanding-pro-forma-invoices…` → one canonical proforma post.

---

## Internal-link discipline

Every post links **up**, **across**, and (for pillars) **down**.

### Cluster post rules
- **1 link up to the pillar**, in the intro or first major section. Anchor text = the pillar's target query.
- **2-4 links across to sibling clusters**, placed where the sibling topic genuinely relates — not dumped in the conclusion.
- Minimum total internal links per post: **3** (1 up + 2 across).

### Pillar rules
- **Link down to every cluster** in the relevant body section (not a "see also" appendix).
- Group cluster links by sub-topic once there are > 8 clusters.

### Anchor-text rules
Internal anchor text is the strongest internal-SEO signal you control.
- ✅ Anchor = the linked post's target query, or close to it, reading naturally in the sentence.
- ❌ Never "click here", "this article", "learn more".
- ❌ Never the same anchor text twice to the same post on one page.

Example:

> "Before you set terms, it helps to know exactly [what an invoice number is](/blog/what-is-an-invoice-number) and where it goes."

### Links to MDX, in MDX
Internal links are markdown: `[anchor](/blog/<slug>)`. They render same-tab. The site CTA to the generator is separate from internal-link discipline and always points to invoicepdf.io's generator (see `conclusion-and-cta-skill.md`).

---

## What good density looks like

For a healthy pillar:

- 1 pillar page (2,500-4,000 words).
- 8-15 cluster posts (1,000-1,800 words each).
- Every cluster links up to the pillar → the pillar earns 8-15 inbound internal links.
- Each cluster links to 2-4 siblings → each cluster earns 8-30 inbound links from siblings.
- The pillar links down to every cluster.

That density is what Google reads as "this site covers invoicing seriously".

---

## New cluster vs expand existing

### Write a NEW cluster when:
- The query has a different intent (a "what is" vs a "how to").
- It targets a different long-tail.
- Merging would push a post past ~2,500 words and dilute focus.
- The existing post already ranks well — don't disturb it.

### EXPAND an existing post when:
- Same intent, and the existing post is short (< 1,500 words).
- The new question is a natural sub-section.
- The existing post isn't ranking yet — expansion is cheaper than a new page.

When expanding:
1. Open the existing MDX in `content/blog/`.
2. Add the new H2 + content and any new internal links.
3. Update `date` in frontmatter (and note "Last updated" in the body if you surface it).
4. Add inline citations for any new claims and run the accuracy gate.
5. If the update changes a previous claim, add a short blockquote correction note (there is no `<CorrectionNote>` component — use `> **Correction (Mar 2026):** …`).

---

## Keeping the map current

Update the live cluster map above (or a per-pillar map you keep alongside it) whenever:
- A new cluster post is planned or published.
- A post is merged into another (note "merged into `<slug>`").
- A post is pruned.

When you write any new post, read this map first so you link to the right pillar and siblings. A current map is what makes internal linking automatic instead of an afterthought.

---

## The semantic neighborhood

Beyond explicit links, cluster posts should share *semantic* signals — same entities, same primary sources, same terminology.

- Reuse canonical sources across the cluster (cite IRS.gov / GOV.UK the same way everywhere).
- Use consistent terminology — call it "payment terms" everywhere, not "payment terms" in one post and "billing terms" in another.
- Reuse the same worked-example framing (the freelance designer's $500 invoice) where it fits, so the cluster reads as one coherent author.

---

## What kills topical authority

- **Orphan posts** — zero inbound internal links. Every existing post is currently an orphan; fixing that is step one.
- **Tag-only architecture** — relying on `tags` for navigation instead of body links. Tags are a weak signal.
- **Duplicate-intent posts** — two posts targeting the same query (we have three such pairs). Merge and redirect.
- **Pillar without clusters** or **clusters without a pillar** — both read as incoherent to Google.

---

## Pre-publish topical-authority checklist

- [ ] Post's pillar is identified in the live cluster map above.
- [ ] 1 internal link UP to the pillar (for clusters).
- [ ] 2-4 internal links across to siblings.
- [ ] Anchor text matches the target queries of linked posts.
- [ ] No "click here" / "learn more" anchors.
- [ ] The post is not a duplicate of an existing one (checked the map).
- [ ] The map is updated when the post ships.

---

**BlogOS for invoicepdf.io** — sites that rank cover topics, not pages.
