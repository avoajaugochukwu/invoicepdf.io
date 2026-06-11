---
name: eeat-signals
description: Experience, Expertise, Authoritativeness, Trustworthiness — the four signals Google uses to judge whether a page deserves to rank, especially in YMYL (your-money-or-your-life) niches. Invoicing, tax, payments, and contracts are financial-YMYL territory. This skill codifies the concrete on-page elements that demonstrate E-E-A-T: author bylines, bios, "reviewed by" lines for tax/legal claims, first-person experience markers, last-updated dates, named expert quotes, and credentials display.
---

# E-E-A-T Signals — the trust layer

> E-E-A-T is not a ranking algorithm. It is the framework Google's human Quality Raters use to evaluate pages, and the algorithm tries to approximate their judgment. So E-E-A-T is real, even though it is not a number.

Every post on invoicepdf.io has to prove four things before it deserves to rank:

1. **Experience** — has the author actually done the thing they are writing about (sent invoices, chased late payers, filed the tax form)?
2. **Expertise** — does the author know the field (invoicing, small-business finance, payments)?
3. **Authoritativeness** — is the author / site a recognized voice in this space?
4. **Trustworthiness** — is the page honest, current, and accurate?

This skill is the checklist of on-page elements that make those four claims visible. Without them, the post is a faceless wall of text and Google has no reason to rank it over the thousand other walls of text on the same topic.

---

## YMYL — when E-E-A-T matters most

Google holds "your money or your life" topics to a higher bar. YMYL topics include:

- **Financial advice and money management** ← this site
- **Tax, invoicing, getting paid, cash flow** ← this site
- Legal information (contracts, late-payment law, payment terms) ← this site touches this
- Medical information
- News and current events
- Civic information (voting, government)

invoicepdf.io is squarely financial-YMYL. We tell freelancers, contractors, and small-business owners how to bill clients, what to put on an invoice to stay compliant, how to get paid faster, and when tax (VAT/sales tax) applies. Those are money decisions. A garden hose review can skate by. A page telling someone how to charge VAT, what a legally compliant invoice must contain, or how to enforce a late-payment fee cannot. Every E-E-A-T signal has to be in place.

When a post makes a tax, legal, or compliance claim, the accuracy-and-claims gate (`accuracy-and-claims-skill.md`) is mandatory: every money/tax/legal claim must state its jurisdiction and trace to a primary source. E-E-A-T and that gate work together — one establishes *who* is trustworthy, the other establishes *that the claims are true*.

---

## The on-page signals (mandatory)

### Signal 1 — Author byline

Every post displays the author's name. The default author is **InvoicePDF Team**, but a real bylined human is strongly preferred for anything beyond a simple product/tool page — especially YMYL posts.

Rendered at the top of every post, directly under the H1 (the `title`), as a visible line of body prose. Because this site renders plain Markdown through `next-mdx-remote` with no custom components, the byline is either the first line of the body or a line the page layout injects from the `author` frontmatter field. There is no separate byline component to call.

Example first line of body:

> By Maya Chen — Published June 10, 2026, updated June 10, 2026

**Rule:** never publish under "Admin" or "Staff" or a faceless brand handle for YMYL content. Use a real name. "InvoicePDF Team" is acceptable for utility pages (tool landing, simple how-to) but a named author with a finance/small-business background is what earns trust on tax, compliance, and payment-law posts. If the author is the founder, name them.

### Signal 2 — Author bio at footer

At the bottom of every post (before the FAQ section if there is one), include a short author bio as plain prose — a blockquote or a small heading plus a paragraph. There is no `<AuthorBio>` component; write it in Markdown.

The bio should contain:

- Author name (and, if the site has author pages, a Markdown link to it)
- A real photo where the layout supports it (Markdown image)
- An 80-150 word bio with relevant credentials
- One descriptive link out (their author page, LinkedIn, or professional site)

Author bio rule: the bio should make the *specific* claim that this person is qualified to write *this* type of post. Generic bios ("Maya is a content writer at InvoicePDF") are inert. Specific bios carry weight:

> "Maya Chen spent eight years as a freelance designer invoicing clients across the US and EU, then three years as a bookkeeper for small agencies. She has filed her own self-employment taxes since 2016 and has chased more late invoices than she'd like to admit."

That bio earns the right to write about invoicing, late payment, and self-employment tax.

### Signal 3 — Author page (where the layout supports it)

If the site publishes author pages, every named author should have one. The author page is a high-E-E-A-T artifact in its own right and contains:

- Full bio (300-600 words)
- Credentials, education, certifications (bookkeeping, accounting, years freelancing/running a business)
- Links to other places the author writes
- Photo and contact info
- A list of every post they've published on this site
- Professional profiles (LinkedIn, X)
- An honest statement of scope ("Maya writes about invoicing, freelancing, and self-employment tax in the US and UK. She is not an accountant and does not give jurisdiction-specific tax advice — those posts are reviewed by a credentialed accountant.")

If author pages don't exist yet in the layout, surface the equivalent trust signals inline in the post body and in the bio. Don't link to an author page that 404s.

### Signal 4 — "Reviewed by" line (tax / legal / compliance posts)

For posts that make tax, legal, accounting, or payment-law claims, add a reviewer in addition to the author. Since there is **no `reviewed_by` frontmatter field** on this site, surface the reviewer as a **visible line in the post body** (typically right under the byline) or via the page layout — not in frontmatter.

Example visible line:

> By Maya Chen — Reviewed by Daniel Ortega, CPA — Last updated June 10, 2026

The reviewer must be a different person from the author and must have credentials in the relevant field (CPA, chartered accountant, ACCA, tax advisor, small-business attorney for contract/late-payment claims). The reviewer's name + credential is the trust signal — without the credential, "reviewed by" is theater.

Pair this with the accuracy-and-claims gate: a reviewed tax post still has to state jurisdiction and cite the tax authority directly.

### Signal 5 — Last-updated date

Every post shows its published date, and shows a "Last updated" date too when it differs. The `date` frontmatter field carries the ISO publish date; surface "Last updated" as a visible line in the body or via the layout (again, there is no dedicated frontmatter field for it).

> Published June 10, 2026 • Last updated June 10, 2026

Rule: refresh the "Last updated" line whenever you make a *substantive* change. Fixing a typo is not substantive. Updating a tax threshold, a VAT rate, a late-payment statutory interest figure, a payment-processor fee, or adding a new section — those are substantive, and financial content goes stale fast. See `update-discipline-skill.md` for the full rules.

### Signal 6 — First-person experience markers

This is the "Experience" letter in E-E-A-T, added in Google's December 2022 update specifically to push back against AI-generated theoretical content.

Where it applies, mark first-person experience in the prose:

- "I tested net-15 versus net-30 terms across forty client invoices last year."
- "We switched our agency from PayPal to Stripe and tracked the fee difference for six months."
- "The first time a client ghosted a $4,000 invoice, here's what actually got me paid."
- "I called HMRC's VAT helpline to confirm this before publishing."

Generic prose:
> "It can be helpful to add a late-payment fee to your invoices."

First-person prose:
> "I added a 1.5% monthly late fee to my invoices in 2023. Two things changed — and one of them surprised me."

The second version is the same idea, but it has *experience* in it. Google's HCU classifier is built to detect the difference.

**Constraint:** never fabricate experience. If the author has not done the thing, don't claim they have. Better to cite a named third party's experience than to invent your own.

### Signal 7 — Named expert quotes

Every cluster, pillar, comparison, and news/update post quotes at least two named experts. Full attribution:

> "Most freelancers undercharge for late payment because they treat the invoice as a request, not a contract," said Jane Okafor, a chartered accountant at a London small-business practice, in a 2025 interview with a small-business finance outlet. ([source](https://example.com))

Attribution rule: **name + role + outlet + date + linked source**. Anything less is contraband.

Pull quotes from primary sources where the expert spoke or wrote the words. Quoting an article that quotes the expert is one step removed — go to the original wherever possible. See `research-and-citation-skill.md`.

### Signal 8 — Primary-source citations

E-E-A-T's "trustworthiness" letter. The post links to ≥ 4 primary sources (more for pillars). For invoicing/finance content, primary sources are:

- Government tax authorities — IRS.gov, GOV.UK / HMRC, ATO.gov.au, Canada's CRA, EU VAT pages on europa.eu
- Payment-practice and late-payment law — UK late-payment legislation, the EU Late Payment Directive, equivalent statutes
- Accounting and standards bodies — recognized professional bodies and official standards
- Official documentation of named tools and payment processors (Stripe, PayPal, Square docs) when discussing *their* features and fees
- Reputable small-business / finance outlets reporting their own analysis

What does **not** count as primary:

- Wikipedia (use it as a starting point, then go to its citations)
- "10 best invoicing tools" listicles on competitor blogs
- AI-generated summaries
- Reddit, Quora, Medium (unless the author IS the original source)

### Signal 9 — Credentials display

Where the author has formal credentials relevant to the post, display them inline somewhere in the post body:

> "As a bookkeeper, I've reconciled enough messy invoices to tell you exactly which line item clients query first — and it's almost always the tax line."

This is much stronger than burying credentials in the bio at the bottom. The reader sees the credential in context, where it earns trust for the specific claim.

### Signal 10 — Corrections policy

The site should have a public corrections policy linked from the footer:

> "We correct errors in our posts. If you find one — especially a wrong figure, rate, or rule — [email us](mailto:hello@invoicepdf.io) and we'll fix it. Corrections are noted at the bottom of the affected post with the date and what changed."

When a post has been corrected, append a short correction note at the bottom as plain Markdown (no custom component):

> **Correction (May 10, 2026):** Updated the UK statutory late-payment interest rate after a reader pointed out the figure was from a prior base-rate period. The underlying guidance is unchanged.

This is a strong trust signal. Sites that publicly track corrections look serious. Sites that quietly edit look sketchy — and for financial figures, silent edits are exactly what readers worry about.

---

## What E-E-A-T is NOT

Common confusions:

- **It is not keyword density.** Stuffing the author bio with "invoice" doesn't help.
- **It is not link count.** Ten low-quality outbound links hurt more than four primary sources.
- **It is not "AI disclosure".** Google's stated position is that AI use is fine as long as the content is helpful and accurate. Adding "this post was written by AI" doesn't earn or lose ranking by itself. The page either has E-E-A-T or it doesn't.
- **It is not just for YMYL.** Financial posts are held to a higher bar, but every page benefits from the signals above.

---

## E-E-A-T audit checklist (run on every post before publish)

### Author signals
- [ ] Visible byline with the author's real name (or "InvoicePDF Team" only for utility pages)
- [ ] Author bio rendered at the post footer as Markdown prose
- [ ] Bio contains a *specific* claim of relevant invoicing/finance/small-business qualification
- [ ] If author pages exist, the byline links to one that resolves

### YMYL signals (tax / legal / compliance posts)
- [ ] Reviewer surfaced as a visible body/layout line (not frontmatter — there is no `reviewed_by` field)
- [ ] Reviewer has relevant credentials (CPA, chartered accountant, tax advisor, attorney)
- [ ] Reviewer name + credential rendered visibly
- [ ] Accuracy-and-claims gate passed: every money/tax/legal claim states jurisdiction and cites a primary source

### Experience signals
- [ ] At least one first-person experience marker in the body (or a named third-party experience explicitly cited)
- [ ] If author has formal credentials relevant to this post, displayed inline

### Trust signals
- [ ] Published date (from `date`) + a visible "Last updated" line when they differ
- [ ] ≥ 4 outbound links to primary sources (more for pillars)
- [ ] ≥ 2 named expert quotes with full attribution + linked source (where the archetype calls for them)
- [ ] Every numeric claim — rate, threshold, fee, percentage — cited
- [ ] Corrections policy linked in the footer
- [ ] If the post has been previously corrected, the correction is logged at the bottom

---

## E-E-A-T anti-patterns

These are the easy-to-spot mistakes:

- **Faceless byline on a tax post.** "By InvoicePDF Team" on a VAT-compliance guide → fix by attributing to a real person with finance background
- **Generic bio.** "Loves coffee and writing" → fix by stating specific invoicing/finance qualifications
- **Anonymous quotes.** "Accountants say..." → fix by naming the expert or removing the claim
- **Wikipedia-only sources.** → fix by following Wikipedia's citations to the primary source (the tax authority, the statute)
- **Undated figures.** A tax threshold or fee with no date and no jurisdiction → fix by adding both
- **AI-only voice.** Zero first-person markers across a 2,000-word post → fix by inserting at least one specific moment of author experience
- **Credentials by implication.** Bio says "expert" without saying what makes them one → fix by being specific

---

## What to do if the author has no credentials yet

Some posts are written by capable generalists on the team who don't hold a formal accounting or tax credential. That's fine — but be honest about it.

The bio should declare the author's *actual* qualification, even if it's practitioner experience rather than a certification:

> "I'm not an accountant. I'm a freelancer who has invoiced clients in three countries for six years and learned this the hard way. Everything here that touches tax or law is reviewed by a credentialed accountant, and where the rule depends on your jurisdiction, I say so and link you to the official source."

This honest framing is actually a strong trust signal. It is the AI-slop sites that fake credentials and pretend to be experts. Real practitioners who admit the limits of their expertise earn more trust than fake experts.

For tax, legal, and compliance claims specifically, a non-credentialed author should have a visible "Reviewed by" line pointing to someone with formal credentials, and every such claim must clear the accuracy-and-claims gate. That covers the gap.

---

**BlogOS** — pages that earn the ranking they get.
