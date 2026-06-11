---
name: engagement-mechanics
description: Scroll-depth psychology and scannability mechanics for blog posts. This is how a blog post keeps a skimming reader scrolling and a real reader engaged — through scannability cadence, the But/Therefore rule, a dopamine ladder adapted for text, and the four web-specific retention killers.
---

# Engagement Mechanics — keeping the scroll alive

> A blog reader is skimming first, reading second. They scroll faster than they read. They make stay-or-leave decisions in 8-15 seconds on every screen. Your post has to win the skim test before the read test ever happens.

---

## The dopamine ladder (web version)

Every reader's journey releases increasing engagement as they progress. The six levels, mapped to blog reality:

### Level 1: STIMULATION (first 0.5 seconds)
- The page loads
- They see the headline, the featured image, the visual rhythm
- Subconscious processing in milliseconds

**For blogs:** the H1 (rendered from the `title` frontmatter) plus the featured image plus the visible first paragraph are the stun gun. If those don't earn 2 more seconds, the reader bounces.

### Level 2: CAPTIVATION (first 8-15 seconds)
- The reader reads the first paragraph
- They evaluate: "is this what I came for, and does this writer know it?"
- A curiosity gap forms or doesn't

**Trigger:** the direct-answer paragraph satisfies them in 40-60 words AND opens a loop they need to scroll to close. ("Net 30 means payment is due within 30 days — but the part that trips people up is when the clock starts.")

### Level 3: ANTICIPATION (first scroll, ~30 seconds)
- They scan the H2 skeleton
- They form a hypothesis about whether the rest is worth their time
- HIGHEST engagement happens when the H2s preview specific value they didn't expect

**For blogs:** every H2 must promise something specific. "Background" is not a promise. "Why 'payment due on receipt' gets paid slower than a fixed date" is.

### Level 4: VALIDATION (every H2 they reach)
- They scan-read or fully read a section
- They get either a payoff (satisfying answer) or a setup for the next loop
- Unclosed loops compound — readers who stop mid-section don't return

**Critical:** every H2 should close the loop opened by the previous H2 AND open the next one.

### Level 5: AFFECTION (second visit)
- Reader returns to the site for another post
- They start to recognize the voice
- Why E-E-A-T matters — affection requires *someone* to be consistent

**For blogs:** build trust through the author byline, voice consistency, and reliable delivery on the headline promise.

### Level 6: ACTION (the conversion)
- Reader trusts the site enough to act
- They create an invoice, bookmark a guide, or share the post
- This is what compounds into a real audience and real usage

**Action:** every post earns one CTA — and on this site it is the invoice generator ("create a professional invoice free, no signup"). See `conclusion-and-cta-skill.md`. There is no newsletter to subscribe to and no comments to leave.

---

## The four web-specific retention killers

### Killer 1: THE WALL OF TEXT

**What it looks like:**
> 1,200 words of unbroken prose, no sub-headings, no lists, no images, no callouts.

**Why it kills:** the skimming reader scrolls past it because they cannot tell what's in it. The reading reader gets lost.

**The fix:** every 200-300 words gets a *visual event* — sub-head, bulleted list, table, image, blockquote callout, or pull quote.

A 1,500-word post should have 5-7 visual events minimum. Otherwise it reads as undifferentiated mass.

### Killer 2: THE DELAY DISEASE

**What it looks like:**
> "In this article, we will explore the world of invoicing, examining payment terms, tax considerations, and best practices. Before we begin, it's important to..."

**Why it kills:** the first paragraph is supposed to *answer the query*, not announce what the article will cover. The reader has 8 seconds; you spent them on a menu.

**The fix:** the first paragraph IS the direct answer. 40-60 words. Then the first H2 with a sub-section worth scrolling for.

### Killer 3: THE CONTEXT DUMP

**What it looks like:**
> H2: "The history of invoicing"
> 800 words about trade credit, etymology, and accounting history — before the post answers the question the reader came for.

**Why it kills:** brains cannot store abstract context without anchoring it to a stake. Front-loaded context = mass exit.

**The fix:** the golden ratio —
- 30 seconds of context maximum at the top
- Followed by an answer or action
- Context shows up later, when the reader has motivation to absorb it

For a blog: never let "Background" or "History" be the first H2. Lead with the answer; backfill context only when the reader needs it.

### Killer 4: THE PAYOFF VOID

**What it looks like:** the reader hits the section they came for, gets the answer, and the post stops being interesting from that point on.

**Why it kills:** there's a 30-second window after each payoff where the reader thinks "got what I came for, leaving now."

**The fix:** within the same paragraph that delivers a payoff, open the next loop:

> A standard invoice gets paid in about 30 days. But the average hides the lever that actually moves it — and it has nothing to do with how often you follow up.

(next H2 explains what)

The loop closes, then opens immediately. The reader scrolls to the next H2 to close the new loop.

---

## The But/Therefore rule

If your transitions between paragraphs and sections read as "and then" — you have boring content. Every transition should be:

- **But** (contrast)
- **However** (contrast)
- **Therefore** (consequence)
- **So** (consequence)
- **Which is why** (consequence)
- A question (open new loop)

If "and then" works, the connection isn't earned. Rewrite with conflict or consequence.

### The test

Read just the first sentence of each new paragraph. Does it follow from the last sentence of the previous paragraph by *contrast* or *consequence*? If half are "And then…" or "Also…", you have a list dressed as an argument.

---

## Sentence rhythm

Three short sentences in a row is an AI fingerprint. So is a paragraph of identical-length sentences. Vary the rhythm.

**Bad:**
> An invoice is a request. A receipt is a proof. A quote is an estimate.

**Good:**
> An invoice is a request for payment. It is not the same as a receipt, which proves the money already arrived, or a quote, which is just an estimate you send before the work starts. Three documents, three different jobs.

Mix punchy (5-10 words) with flowing (20-30 words). The post should look jagged on the page, not smooth.

> **Tip:** Read a paragraph aloud. If every sentence takes the same breath, break one in half and let another run long.

---

## Scannability cadence (the web's rehook)

A visual event every 200-300 words. A visual event is one of:

- **Sub-head** (H2 or H3) — plain `##` / `###`, never with `{#id}` anchors (they render as literal text on this stack)
- **Bulleted or numbered list** — for parallel items, not narrative
- **Table** — GFM pipe table, for comparing things on multiple axes
- **Image** — markdown only: `![specific alt text](/blog/<slug>/<file>)`
- **Callout** — a blockquote, since there are no custom components: `> **Tip:** keep the late-fee line on every invoice, even when you never plan to enforce it.`
- **Pull quote / blockquote** — for emphasis

There are **no custom JSX components** here (no `<Image>`, `<Callout>`, `<Table>`). Every visual event is plain markdown or GFM.

**GFM table example:**

| Payment term | What it means | Typical use |
|---|---|---|
| Due on receipt | Pay as soon as the invoice arrives | Small, one-off jobs |
| Net 15 | Pay within 15 days of the invoice date | Repeat clients you trust |
| Net 30 | Pay within 30 days of the invoice date | Agencies and larger firms |

**Blockquote callout example:**

> **Warning:** Late-fee limits vary by jurisdiction. Check your state or country's rules before printing a rate on the invoice, and state which jurisdiction you mean.

**Markdown image example:**

```mdx
![A sample Net 30 invoice with the due date circled](/blog/how-to-invoice/net-30-example.png)
```

Without a visual event, the prose becomes wallpaper. The skimming reader scrolls past wallpaper.

### Cadence rules by length

| Body length | Minimum visual events | Distribution |
|---|---|---|
| 800-1,200 | 4-6 | One every 200-250 words |
| 1,200-2,000 | 6-9 | One every 200-300 words |
| 2,000-3,000 | 9-13 | One every 200-250 words |
| 3,000-5,000 | 13-20 | One every 200 words minimum |

---

## The skim-then-read pattern

Realistic reader behavior on a blog post:

1. **Skim H1 + featured image** (1 second)
2. **Read first paragraph** (8 seconds)
3. **Skim the H2 list** (5 seconds)
4. **Decide:** scroll to a specific H2, read top-down, or leave
5. **Scan the chosen H2** by reading the first sentence + any bold/lists
6. **Read full prose** only after the scan rewards them

Designing for this pattern:

- **First sentence of every paragraph** is the most load-bearing. The skim reader reads only first sentences.
- **First sentence of every H2 section** is the second-most. Often the snippet target.
- **Bold the load-bearing phrase** in each paragraph — gives the skimmer their anchor.
- **Lists for parallel items** — the skimmer counts items without reading prose.
- **H2 phrasing** = the search query they typed, restated as a claim or question.

Posts written only for the read-through reader (long prose, no bolds, no lists) lose the skim reader by paragraph 3.

---

## Stakes escalation across the post

A post should feel like each section is higher-stakes than the last, until the synthesis. The post earns its length by escalating, not flattening.

For an informational post:
- H2 1: the simplest version of the answer ("what Net 30 means")
- H2 2: the most-asked follow-up ("when the 30 days start counting")
- H2 3: the surprising sub-question ("why Net 30 can mean you wait 45 days")
- H2 4: the contrarian / counter-case ("when shorter terms actually win the contract")
- H2 5: the deepest implication ("what your terms reveal about your cash flow")
- Conclusion: what to do with all of it (plus the generator CTA)

Each H2 takes the reader one level deeper. The post is "worth scrolling for" because the value keeps escalating.

---

## Pace variety inside sections

Within a section, mix:

- A short setup paragraph (1-3 sentences)
- A longer evidence paragraph (3-5 sentences, ideally a worked example with a name and a number)
- A scannability event (list, table, image, blockquote callout)
- A short consequence paragraph
- A transition that opens the next loop

This rhythm — short → long → visual → short → transition — keeps both the skimmer and the reader engaged. A section that is just five 4-sentence paragraphs is monotone, even if each paragraph is well-written.

---

## The post's emotional arc

Even informational posts have an emotional arc. Label the intended emotion of each H2 as you outline:

- Curiosity (open the question)
- Understanding (deliver the simple answer)
- Surprise (introduce the non-obvious part)
- Friction (the counter-argument or hardest case)
- Resolution (the synthesis)
- Forward momentum (what to do next — the generator CTA)

A post that hits the same emotional note in every section is flat. A post that swings curiosity → surprise → friction → resolution is alive.

For pillar essays, the arc is even more important. See `narrative-arc-skill.md`.

---

## Read-aloud test

Before publishing, read the post out loud — or have a TTS engine read it. Listen for:

- **Robotic patches:** "It is important to note that…", "It can be observed that…" → rewrite
- **Awkward word sequences** — if it doesn't roll, it doesn't write
- **Identical sentence lengths in a row** — sentence-length variation is rhythm
- **Phrases you would never say in conversation** → rewrite to how you'd actually say it
- **Where you naturally pause** — those are your paragraph breaks
- **Undefined jargon** — if you say "remittance advice" out loud and would normally explain it, explain it in the text too

It applies just as much to prose written for the eye.

---

## What kills engagement that anti-AI-slop doesn't catch

- **No visual events** — the wall of text problem
- **No emotional arc** — the flat report problem
- **No stakes escalation** — every section feels like the same depth
- **All paragraphs same length** — the AI-rhythm problem
- **First sentence of paragraph is generic** — the skimmer loses their anchor
- **H2s phrased as labels not as claims** — "Background" vs "Why a fixed due date beats Net 30"
- **No internal links in the body** — the post feels like a dead end
- **No worked example** — a post with no name + number teaches nothing a SERP skim can't

---

## Pre-publish engagement checklist

- [ ] A visual event every 200-300 words (markdown/GFM only — no custom JSX)
- [ ] First sentence of every paragraph is load-bearing
- [ ] Bold the load-bearing phrase per paragraph
- [ ] H2 phrasing is claim or question, never label
- [ ] No `{#id}` heading anchors (they render literally)
- [ ] Sentence-length variation visible (jagged edge if printed)
- [ ] Stakes escalate across H2s
- [ ] At least one worked example with a name and a number
- [ ] Each section has a clear emotional beat
- [ ] But/Therefore over And/Then
- [ ] Each loop closes and opens another
- [ ] Read aloud sounds natural; jargon defined on first use

---

**BlogOS** — engagement is structure plus rhythm.
