---
name: variety-rotation
description: Anti-repetition rotation system for BlogOS. Prevents same-y posts by rotating intro patterns, transitions, sub-head phrasings, callout types, conclusion shapes, and other mechanical slots. The writer must pick ONE option from each relevant bank and log selections so the next post avoids the same combo. Tuned for invoicing-content blog mechanics.
---

# Variety Rotation — every post should feel like its own thing

> AI writers default to the same mechanical choices, post after post. Rotation forces variety into the slots where the default is sameness. Across a corpus of invoicing how-tos and definitions, that sameness is what makes a site read as machine-made.

**MANDATORY:** Before drafting, consult this file and the recent entries in `protocols/rotation-log.md`. After drafting, append a rotation log block (NOT to the MDX body — the orchestrator persists the log separately in `protocols/rotation-log.md`). When the next post is written, the last log is passed in so the new post avoids the same combo.

If you don't rotate, three consecutive posts on the same site read as templated even if individually each is good. Rotation is the antidote.

---

## How the system works

Each post has ~9 mechanical slots where the writer defaults to the same phrasing. This file provides **numbered rotation banks** for each slot. The writer must:

1. Pick ONE number from each relevant bank per post
2. Never reuse the same combination across consecutive posts on the same site
3. Log selections in the audit, which the orchestrator persists to `protocols/rotation-log.md`

The orchestrator feeds the recent log to the next run with: *"Avoid these rotation numbers from the last post: [paste log]"*

---

## SLOT 1 — INTRO PATTERN

The opening paragraph shape. See `BLOG-INTRO-SWIPE.md` for the full patterns. Pick one per post.

| Code | Pattern | Best for |
|---|---|---|
| 1A | Direct Answer | Definition, FAQ, cluster |
| 1B | Cold Open | Pillar guide, narrative post |
| 1C | Stake-First | Comparison, decision posts |
| 1D | Contrarian | Hot-take / myth-busting |
| 1E | Story-First | Case study, "what I learned billing clients" |
| 1F | Specific Number | Data-driven (late-payment stats) |
| 1G | Question Opener | FAQ, explainer |
| 1H | Practical Promise | How-to |
| 1I | Friction Opener | Sensitive topics (chasing late payers, firing a client) |
| 1J | Cross-Reference | Cluster post in a larger hub |

**Rule:** never use the same Slot 1 + Slot 9 (conclusion) combo two posts in a row.

---

## SLOT 2 — CONTEXT BRIDGE (after intro → into the body)

The transition from intro to the first H2's content. Default crutches: *"To understand this, we need to..."*, *"But before we dive in..."*

### Rotation bank (pick one)

**2A — The Specifics Drop**
Jump straight to the most specific thing the body will discuss.
```
The clearest place this bites is the line on your invoice that says "Net 30."
```

**2B — The Common-Belief Bridge**
Frame the body as a response to what readers usually believe.
```
The standard advice is "just add a late fee." It helps. But it's not where late payment actually starts.
```

**2C — The Personal Bridge**
Use the writer's own engagement with the topic.
```
The first time a client sat on a $4,000 invoice for 50 days, I learned what my terms were missing. Here's what I changed.
```

**2D — The Hard Question Bridge**
Lead with the hardest version of the question.
```
The version worth asking isn't "what does Net 30 mean" — it's "why do clients still pay Net 30 invoices late, and what stops it?"
```

**2E — The History Bridge**
Anchor the discussion in when this practice started mattering.
```
Net terms aren't modern. They come from the days when invoices traveled by post and 30 days was simply how long the mail took.
```

**2F — The Cold Cut**
No bridge. Hard cut from intro to the first H2 with no connector at all.

**2G — The Data Bridge**
Open with the most relevant single statistic.
```
Small businesses are owed an average of $20,000 in late payments at any given time. That number is the starting point for any honest answer.
```

**2H — The Stakes Bridge**
Restate what's at stake before going into the substance.
```
The reason this matters: every extra day an invoice sits unpaid is a day your cash isn't working. That's why the next part matters more than the definition.
```

---

## SLOT 3 — SUB-HEAD PHRASING

H2s default to label phrasings ("Background", "Section 1", "The first reason"). Rotate phrasing across the post.

### Rotation bank (pick at least 3 different styles per post)

**3A — Question H2:** "Why do clients pay Net 30 invoices late?"
**3B — Claim H2:** "A payment term is a deadline, not a suggestion"
**3C — Specific anchor H2:** "What 2/10 Net 30 means on a real invoice"
**3D — Direct-instruction H2:** "Add these seven fields to every invoice"
**3E — Comparison H2:** "Net 15 vs Net 30 — which gets you paid faster"
**3F — Number H2:** "Four invoice mistakes that delay payment"
**3G — Contrarian H2:** "Why 'Due on receipt' can actually slow you down"
**3H — Setup H2:** "What this section is going to walk through"  *(use sparingly — sometimes appropriate for how-tos)*
**3I — Story H2:** "The invoice that took 62 days to clear"

**Rule:** in a post with 5+ H2s, use at least 3 different H2 styles. Mixing styles is itself a quality signal.

---

## SLOT 4 — TRANSITIONS BETWEEN SECTIONS

Default: *"Now let's look at..."*, *"Moving on to..."*, *"Another important aspect is..."*

### Rotation bank (pick one per transition, vary across sections)

**4A — Consequence Cut**
```
That one change shortens your average days-to-payment more than any reminder email.
```

**4B — Contrast Cut**
```
A late fee disciplines the slow payer. Setting expectations up front prevents the slowness in the first place.
```

**4C — Question Cut**
```
Which raises a sharper question: what should the late fee actually be?
```

**4D — Specific Detail Cut**
```
Look at the payment-terms line on the sample invoice below and you'll see exactly where this goes.
```

**4E — Quiet Cut**
No transition line — just end the section on a punchy beat and start the next with a new H2 and a fresh first sentence.

**4F — Foreshadow Cut**
```
The late fee only works if the due date is unambiguous — and that's the next piece.
```

**4G — Reversal Cut**
```
Faster terms get you paid sooner, but push them too aggressively and you lose the client. That tension is what the next section settles.
```

**4H — Scope Expansion Cut**
```
This stops being about one invoice and starts being about your whole cash flow.
```

---

## SLOT 5 — EVIDENCE STACKING (when piling up sources)

When a section stacks multiple pieces of evidence, the default phrasing gets monotonous: *"Another study found...", "The research also shows..."*

### Rotation bank (pick one per evidence layer)

**5A** — "A 2024 [outlet] survey added a different angle: [finding on payment behavior]."
**5B** — "The same pattern shows up in [different market / sector]."
**5C** — "When [different org / payments processor] looked at the same question, they found [variant]."
**5D** — "The strongest version of this comes from [primary source — e.g. a government late-payment report]."
**5E** — "A counterweight to that came from [contradicting source]: [finding]."
**5F** — "[Specific accountant / founder] put it more directly: [quote]."
**5G** — "Outside freelancing, [agencies / suppliers] report the same shape: [analogous evidence]."
**5H** — "And then there's the raw benchmark: [specific average days-to-payment number with source]."

---

## SLOT 6 — COMMENTARY / VOICE LINES

Personality phrases — the writer's voice showing up between facts. Defaults: "It's worth noting that...", "Importantly..."

### Rotation bank (pick 2-4 per post)

**6A** — "I'm aware that sounds tidier than chasing a real client ever is."
**6B** — "[Short dry observation specific to invoicing]."
**6C** — "Worth sitting with that number for a second."  *(use max once per 5 posts)*
**6D** — "Which, if you've ever waited 50 days on a paid-on-time client, lands harder than it reads."
**6E** — "I ran my own invoices three ways before I trusted this."
**6F** — "[Specific rephrasing of the surprising detail in plainer terms]."
**6G** — "This is the part where my own billing habits changed."
**6H** — "Which is not the same as [common misreading — e.g. 'Net 30 means 30 business days']."
**6I** — "The weakest version of this advice is [counter — e.g. 'just trust the client']."
**6J** — "I'd put it differently than [named source]: [your version]."

---

## SLOT 7 — CALLOUT / EMPHASIS TYPE

When a section needs a callout, rotate the label. Remember: callouts are blockquotes with a bold label (`> **Tip:** …`) — there is no `<Callout>` component. See `scannable-formatting-skill.md`.

### Rotation bank (pick the label that fits)

**7A — Tip:** practical advice
**7B — Warning:** what to avoid (e.g. sending an editable file instead of a PDF)
**7C — Key takeaway:** the load-bearing single sentence
**7D — Note:** related context that breaks the main flow
**7E — Definition:** inline definition of a term (jargon on first use)
**7F — (plain quote):** an expert or customer quote, attributed, no bold label
**7G — Example:** a worked mini-example with a name and a number

**Rule:** not every post needs callouts. But every post over 2,000 words should have at least one.

---

## SLOT 8 — FAQ BLOCK STYLE (when applicable)

When the post includes a FAQ block at the bottom, the questions and answers can be styled in different ways.

### Rotation bank

**8A — Plain Q/A:** Question H3, answer paragraph
**8B — Inline question + bolded answer first line + supporting prose**
**8C — Q/A with a linked source per answer**
**8D — Q/A with "short answer / longer answer" two-paragraph structure**

---

## SLOT 9 — CONCLUSION SHAPE

The final beat before the CTA. Defaults: *"In conclusion..."*, *"To summarize..."*, *"At the end of the day..."*. The CTA itself always points to invoicepdf.io's own generator — never a competitor.

### Rotation bank (pick one)

**9A — Full Circle**
Reference a detail from the opening and reframe it.
```
[The opening's 62-day invoice], except now you know the three lines that would have closed it in 30.
```

**9B — Unanswered Question**
Leave the reader with something genuinely open.
```
The real question isn't "what are my terms?" It's "what happens on day 31?" That's where the late-fee guide picks up.
```

**9C — Quiet Landing**
End on a single factual statement. Let the weight do the work.
```
A clear due date and a stated late fee do more for cash flow than any reminder email.
```

**9D — Wider Lens**
Pull out to show what the post means beyond its specific scope.
```
[How clean invoicing compounds into steadier cash flow across a whole year of clients].
```

**9E — Practical Synthesis**
Restate what to do with the post's argument.
```
If you wanted to put this into practice on your next invoice: set an explicit due date, state the late fee, and send it as a PDF.
```

**9F — Honest Acknowledgement**
Acknowledge what the post doesn't cover.
```
This post covers setting terms. It doesn't cover collections once an invoice is 60+ days late — the piece on chasing overdue invoices does.
```

**9G — Specific Recommendation**
Recommend one specific next action.
```
The single thing I'd do after reading this is rebuild your standard invoice with an explicit due date and a late-fee line.
```

**9H — Restatement of Stakes**
Why this mattered.
```
[Sentence restating why terms matter, with the new framing the post just gave them — every clean invoice is a day of cash flow you don't lose].
```

---

## ROTATION LOG TEMPLATE

After every post, append this block to the audit. The orchestrator persists it to `protocols/rotation-log.md` (not the MDX body):

```
🔄 Rotation Log — <slug> — <date>
- Slot 1 (Intro Pattern): 1A
- Slot 2 (Context Bridge): 2B
- Slot 3 (H2 Phrasing Mix): 3A, 3C, 3F, 3G  (across the 5 H2s)
- Slot 4 (Section Transitions): 4B, 4A, 4D, 4G
- Slot 5 (Evidence Stacking): 5C, 5A
- Slot 6 (Commentary Lines): 6A, 6H, 6D
- Slot 7 (Callouts): 7C, 7A
- Slot 8 (FAQ Style): 8A
- Slot 9 (Conclusion): 9E
```

The next run reads the recent entries in `protocols/rotation-log.md` and avoids the same combos.

---

## CROSS-POST RULES

1. **Never reuse the Slot 1 + Slot 9 combo** two posts in a row on the same site (these define how the post *feels*).
2. **Slot 4 transitions:** use at least 3 different codes per post AND swap at least one between consecutive posts.
3. **Slot 6 commentary lines:** rotate at least 2 of 3-4 selections between consecutive posts.
4. **Slot 3 sub-head phrasing:** if the last post had a question-heavy H2 mix, the next post should lean claim-heavy.
5. **If a slot's options have all been used in the last 3 posts**, force yourself into older options or write a new one in.

---

## EMERGENCY VARIETY CHECK

If a post STILL feels templated after rotation, scan for these sneaky defaults that no slot fully catches:

| Sneaky default | Fix |
|---|---|
| "The reality is..." | Just state the reality. |
| "In fact..." | Usually unnecessary; delete. |
| "You see..." | Filler. Cut. |
| "Here's the thing:" | AI tell. Rewrite. |
| "At the end of the day..." | Cliché. Use a specific. |
| "In today's fast-paced business world..." | Empty throat-clearing. Start with the invoice. |
| "It didn't take long for..." | Replace with a specific timeframe ("by day 40"). |
| "Long story short..." | Don't summarize; show the invoice. |
| "Needless to say..." | If it's needless, don't say it. |
| "As it turns out..." | Just state the finding. |

---

## When variety is the wrong move

Variety for variety's sake isn't the goal. Some patterns are best because they fit the archetype:

- **Definition posts almost always start with Pattern 1A (Direct Answer)** — that's what the snippet bot wants and what the reader needs. Rotating "What does Net 30 mean?" into a Cold Open would lose the snippet.
- **How-to posts almost always start with Pattern 1H (Practical Promise)** — readers came to get an invoice sent.
- **Pillar guides almost always start with 1B or 1E (Cold Open or Story-First)** — argument-driven posts need narrative pull.

The rotation log catches the *sub-slots* (transitions, commentary, conclusions) more than the structural choices. The structural choices follow archetype.

---

**BlogOS** — every post should feel like its own thing.
