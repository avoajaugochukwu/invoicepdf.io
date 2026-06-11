---
name: media-and-images
description: Featured-image rules, alt-text craft, file naming, dimensions and compression, and when to use an image versus a real table. Covers the discipline of media that signals quality to readers, helps accessibility, and feeds the SEO signals Google rewards. CRITICAL rendering rule: images are markdown only — never the Next.js <Image> component, which is not registered and will break the page.
---

# Media & Images — the visual layer

> Images on a blog post serve four audiences at once: the skimming reader (visual interest), the reading reader (illustration), the accessibility user (alt text), and Google's crawler (alt text + filename + caption). The same image either serves all four or fails all four.

---

## The rendering reality (read this first)

This is the single most important rule in the file, and the one the old version got wrong.

- **Use markdown images only:** `![descriptive alt](/blog/<slug>/<file>)`.
- **Never use the Next.js `<Image>` component.** It is not registered with `next-mdx-remote`. Writing `<Image src=... />` in the body will throw and break the page render. There is no `priority`, no `width={}`/`height={}` JSX props, no `caption=` prop — none of that exists here.
- The renderer maps the markdown `img` to a styled `<img>` that carries the alt text through. That styled element is the only image primitive you get.
- Captions are not a component prop. If you want a caption, put a short *italic* line directly under the image in the body.

Everything below assumes markdown images.

---

## The featured image (hero)

Every post ships with one featured image, declared in frontmatter as a path:

```yaml
featuredImage: "/blog/what-does-net-30-mean-on-an-invoice/featured.jpg"
```

This is a path string only. There is no `alt`, `caption`, `width`, or `height` sub-field in frontmatter — `featuredImage` reads a single path. The layout renders it; you don't place it in the body.

### Featured image rules

- **Path lives under the post's slug folder:** `/blog/<slug>/featured.jpg` (served from `/public/blog/<slug>/featured.jpg`). Match the convention of existing posts, e.g. `/blog/what-does-net-30-mean-on-an-invoice/featured.jpg`.
- **Dimensions: 1200 × 630.** This is also the Open Graph standard, so it shares cleanly to X, LinkedIn, Slack, iMessage without weird cropping.
- **Aspect ratio: 1.91 : 1.** Locked by those dimensions.
- **Format: JPG or WebP.** Match what existing posts use (`.jpg` is the established pattern). Both compress well; PNG only for crisp UI screenshots.
- **File size: under 200 KB.** Page-speed matters; Core Web Vitals affect ranking.
- **Recognizable subject at a glance,** even cropped to a small thumbnail — a clean invoice, a stack of paid invoices, a calendar marking a due date.

### When the post has no obvious image

Some topics resist visual representation. The fix:

- A clean screenshot of a sample invoice generated on invoicepdf.io
- A typographic hero with the post title and a subtle ledger/grid background
- A simple branded illustration (a document, a stamp marked "PAID", a due-date calendar)

Never use a generic "person on laptop" stock photo. It's the strongest signal of low-effort content.

---

## Inline images in the body

Inline images use markdown, with the path under the post's slug folder:

```
![A completed invoice showing the invoice number, Net 30 due date, line items, and total due.](/blog/what-does-net-30-mean-on-an-invoice/sample-invoice.jpg)
```

If a caption helps, add an italic line right under it:

```
![A completed invoice with a Net 30 term highlighted in the payment section.](/blog/what-does-net-30-mean-on-an-invoice/sample-invoice.jpg)

*A sample invoice generated on invoicepdf.io, with the Net 30 term shown in the payment details.*
```

That's the whole mechanism: markdown image, optional italic caption line. No JSX, no props.

---

## Alt text craft

Alt text is the single most powerful image-SEO signal, and a hard accessibility requirement. Most blogs do it badly. Since the renderer carries your markdown alt straight through to the `<img>`, the alt text in the brackets is what ships.

### Rules

- **Descriptive of the image, not the post.** Alt text is for someone who can't see the image, not for keyword-stuffing.
- **≤ 125 characters.** Screen readers don't truncate gracefully past this.
- **Sentence-case prose, not phrase fragments.** "A completed invoice with a Net 30 due date and a $1,200 total" beats "invoice net 30 due date total small business billing".
- **Target query naturally if relevant** — don't force it. If the image actually shows what the query is about, the natural description will include the query.
- **No "image of," "picture of," "screenshot of"** — screen readers already announce the element. (Exception: when "screenshot" is genuinely load-bearing context, e.g. distinguishing a UI from a paper form.)
- **Decorative images** get empty alt `![](...)`, which tells screen readers to skip. But almost no image on one of these posts is truly decorative — if it's not load-bearing, don't include it.

### Examples

| Image | Good alt | Bad alt |
|---|---|---|
| A finished invoice PDF | "A completed invoice showing invoice number INV-014, a Net 30 due date, three line items, and a $1,200 total." | "invoice image net 30 small business billing freelancer pdf" |
| The invoicepdf.io generator UI | "The invoicepdf.io generator with client details, line items, and the download PDF button." | "screenshot of app" |
| A late-fee clause on an invoice | "An invoice payment section showing a 1.5% monthly late fee added after the Net 30 due date." | "late fee" |
| Stock photo of a handshake | (probably shouldn't be in the post) | "handshake business deal trust payment success" |

### When the image has text in it

If the image contains important text or numbers, the alt text should *include that text*:

```
![A bar chart titled "Average days-to-payment by invoice term" showing Net 15 at 22 days, Net 30 at 41 days, and Due-on-receipt at 9 days.](/blog/...)
```

The alt text is now the only way a screen reader user gets the chart's content. Don't bury it.

---

## Prefer a real table over an image of a table

This is the highest-leverage call in invoicing content. Comparison and timeline content is constantly drawn as a graphic when it should be a GFM markdown table.

A real table is:
- Selectable, copyable, and translatable
- Readable by screen readers cell by cell
- Indexable by Google (snippet-eligible)
- Zero bytes of image weight

An image of a table is none of those, and its content survives only if you cram it all into alt text.

### Net 30 timeline — table, not image

Don't render this as a graphic:

```
| Day | What happens |
|---|---|
| Day 0 | You issue the invoice; the Net 30 clock starts |
| Day 30 | Payment is due |
| Day 31 | Send a polite reminder |
| Day 37 | Apply the late fee stated on the invoice |
| Day 45 | Send a firm follow-up referencing the late fee |
```

Use an image only when the content is genuinely visual — a screenshot of an actual invoice, the generator UI, or a real chart whose shape carries meaning. A comparison of terms, a fee schedule, a timeline: those are tables.

See `scannable-formatting-skill.md` for full GFM table rules.

---

## File naming

The image filename is an SEO signal Google reads. Most blogs use `IMG_4823.jpg`. Don't.

### Rules

- **Slug-case:** `net-30-sample-invoice.jpg`, not `Net_30_Sample_Invoice.JPG`
- **Descriptive:** `days-to-payment-by-term-chart.jpg` beats `chart-3.jpg`
- **Includes target keyword if natural** — don't force
- **No spaces, no special chars** — hyphens only
- **Lowercase only**
- **Brief but real** — under 50 chars usually
- **`featured.jpg`** is the conventional name for the hero, matching existing posts

### File path convention

```
/public/blog/<slug>/featured.jpg          -> referenced as /blog/<slug>/featured.jpg
/public/blog/<slug>/<descriptor>.jpg      -> referenced as /blog/<slug>/<descriptor>.jpg
```

Note: the file lives under `/public/...`, but the path you write in frontmatter and markdown omits `/public` and starts at `/blog/...`.

Example:
```
/public/blog/what-does-net-30-mean-on-an-invoice/featured.jpg
/public/blog/what-does-net-30-mean-on-an-invoice/sample-invoice.jpg
/public/blog/what-does-net-30-mean-on-an-invoice/days-to-payment-chart.jpg
```

Co-locating images by slug makes maintenance easier (delete the post = delete the folder).

---

## Image density by archetype

How many images a post needs:

| Archetype | Featured | Body images | Notes |
|---|---|---|---|
| Pillar | 1 | 2-4 | Real charts and a sample-invoice screenshot break the long body |
| Cluster | 1 | 1-2 | One supporting image per major section if genuinely visual |
| How-to | 1 | 1 per step if procedural | Generator screenshots earn their place here |
| Comparison | 1 | 0-1 | The comparison itself should be a GFM table, not an image |
| Definition | 1 | 0-1 | Often just the featured image |
| FAQ | 1 | 0-1 | Often just the featured image |
| Listicle | 1 | 1 per item if visual | E.g. one invoice-template thumbnail per item |
| Template / tool-landing | 1 | 1-2 | A screenshot of the template or generated output |
| Topical-landing | 1 | 0 | The post-card grid provides visual rhythm |
| News / update | 1 | 0-1 | Minimal, editorial |

### Don't add images just to fill the visual budget

If a post genuinely doesn't need an image at a given moment, don't add a generic one. A blockquote callout or a well-built GFM table is also a "visual event" — see `scannable-formatting-skill.md`.

---

## Dimensions and compression guidance

Images are usually the largest assets on a page. Performance discipline:

- **Featured image:** 1200 × 630, under 200 KB.
- **Body images:** size the file width to the rendered width (roughly 800px wide is plenty for the content column). Don't ship a 4000px export to display at 800px.
- **Screenshots:** crop tightly to the relevant UI. A full-window screenshot wastes pixels and weight; crop to the invoice or the control you're pointing at.
- **Compression:** keep body images under 100 KB where you can. JPG/WebP at ~80% quality is usually invisible to the eye and a big byte saving. Use PNG only when a screenshot needs crisp text edges.
- **Format:** JPG (existing convention) or WebP. Avoid uncompressed PNG for photos.

The audit catches: images over 500 KB, images with no alt text, any `<Image>` JSX in the body.

---

## Image licensing

Every image on the site needs a clear license source.

### Tier 1 — Owned by the site
- Screenshots of invoicepdf.io's own generator and output
- Charts and diagrams built from data the site collected or cites
- Illustrations commissioned for the site

**No license file needed; the site owns the image.**

### Tier 2 — Licensed
- Stock photo from a paid source (Adobe Stock, Shutterstock)
- Public domain (clearly marked)

**Keep license proof out of the public repo if confidentiality matters.**

### Tier 3 — Free with attribution
- Unsplash, Wikimedia Commons (varies by image), government / public domain

**The italic caption line must include attribution per the license.**

### Tier 4 — Contraband
- Any image found via search with no clear license
- Screenshots of a competitor's paid product beyond fair use
- AI images from a service whose ToS forbids commercial use

**Don't ship.**

---

## AI-generated images

Many sites use Midjourney, DALL-E, or similar for illustrations.

- Check the generator's terms of service for commercial use.
- Disclose AI generation in the italic caption when material — "*Illustration generated with Midjourney.*"
- Never use AI-generated images of real people (consent issues).
- Quality bar: if the image has AI "tells" (garbled text on the invoice, six-fingered hands, melted edges), don't ship. Garbled numbers on a fake invoice are especially damaging for a billing site — readers trust the brand to get numbers right.
- Prefer a real generator screenshot over an AI rendering of "an invoice."

---

## Featured image and Open Graph

The featured image doubles as the social-share image. When the post is shared on X, LinkedIn, Slack, iMessage — the featured image is what shows up.

### Conditions

- 1200 × 630 (1.91:1)
- Looks good at thumbnail size (~600 × 315 in most previews)
- Recognizable subject at a glance
- Any text overlay readable at small sizes
- No watermarks or corner logos (those crop)

Because `featuredImage` is a single path and the renderer/layout drives the OG meta from it, there is no separate `og_image` field. Make the featured image work as both.

---

## Decorative graphics, icons, dividers

A clean blog doesn't need decorative graphics. Sections are separated by H2s and spacing, not by horizontal-rule images or fancy dividers. Don't introduce per-post ornaments.

---

## Pre-publish media checklist

- [ ] `featuredImage` frontmatter set to `/blog/<slug>/featured.jpg` (file under `/public/blog/<slug>/`)
- [ ] Featured image is 1200 × 630, under 200 KB
- [ ] All images are markdown `![alt](/blog/<slug>/<file>)` — NO `<Image>` JSX anywhere
- [ ] Every image has descriptive alt text, ≤ 125 chars, not keyword-stuffed
- [ ] Images with text/numbers include that text in the alt
- [ ] Comparison / timeline / fee content is a GFM table, not an image of a table
- [ ] Body images sized to render width and compressed (< 100 KB where possible)
- [ ] Captions, where used, are an italic line under the image
- [ ] No decorative-only images without empty `![]()` alt
- [ ] Image filenames are slug-case and descriptive
- [ ] Images co-located in `/public/blog/<slug>/`
- [ ] License source clear for every image
- [ ] If AI-generated, disclosed in the italic caption, no garbled numbers

---

**BlogOS** — images that earn their bytes.
