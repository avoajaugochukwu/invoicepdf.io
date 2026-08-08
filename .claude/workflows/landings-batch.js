export const meta = {
  name: 'landings-batch',
  description: 'Research and write a batch of invoicepdf.io landing-page JSON sidecars from configs',
  phases: [{ title: 'Write', detail: 'one agent per landing → seo-plan/landings/<slug>.json' }],
};

let A = args;
if (typeof A === 'string') {
  try {
    A = JSON.parse(A);
  } catch (e) {
    A = {};
  }
}
const items = (A && A.items) || []; // [{slug,keyword,styleId,platform,downloadFile,docxFile,xlsxFile?}]
if (!items.length) {
  log('no items');
  return { written: [] };
}

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'ok'],
  properties: { slug: { type: 'string' }, ok: { type: 'boolean' }, note: { type: 'string' } },
};

phase('Write');
const res = await parallel(
  items.map((it) => () =>
    agent(
      `Write ONE invoicepdf.io landing-page JSON sidecar. Project root = cwd. Autonomous — no questions, make good decisions, finish.

Write the file seo-plan/landings/${it.slug}.json containing a single JSON object with EXACTLY these keys:
{
  "slug": ${JSON.stringify(it.slug)},
  "styleId": ${JSON.stringify(it.styleId)},
  "keyword": ${JSON.stringify(it.keyword)},
  "platform": ${JSON.stringify(it.platform)},
  "metaTitle": "<=60 chars, keyword-led, compelling; e.g. 'Free ${it.keyword} — No Signup, No Watermark'>",
  "metaDescription": "<=160 chars, keyword in it, benefit-led, US English",
  "downloadFile": ${JSON.stringify(it.downloadFile)},
  ${it.docxFile ? `"docxFile": ${JSON.stringify(it.docxFile)},` : ''}
  ${it.xlsxFile ? `"xlsxFile": ${JSON.stringify(it.xlsxFile)},` : ''}
  "downloadLabel": "Download PDF template",
  "intro": ["<para 1: what this template is + who it's for (the ${it.platform} niche), 2-3 sentences>", "<para 2: free, no signup/watermark; download editable Word+PDF OR use the generator below, 2-3 sentences>"],
  "included": ["<6 bullet strings of what the template includes — tailor 1-2 bullets to the ${it.platform} niche, keep the rest general (business/client details + invoice number + dates; itemized table; auto subtotal/tax/total; notes/payment terms; print-ready one page; free editable Word + PDF, no watermark)>"],
  "steps": [{"title":"<step 1 title>","body":"<1-2 sentences>"},{"title":"<step 2>","body":"..."},{"title":"<step 3: download & send>","body":"..."}],
  "faqs": [{"q":"<real question a ${it.platform} user asks>","a":"<clear US-accurate answer>"}, {"q":"...","a":"..."}, {"q":"...","a":"..."}, {"q":"...","a":"..."}],
  "related": ["<2-3 EXISTING blog slugs>"]
}

RULES:
- Voice + accuracy must match .claude/blog-standards.md (read it if unsure). US English. No hype, no false claims.
- Copy MUST be distinct to this niche/brand — do NOT reuse another landing's sentences verbatim (anti-cannibalization). Tailor intro, steps, and FAQs to "${it.keyword}" and the ${it.platform} context.
- If this is a brand page (Canva/HubSpot/Wave/Square/Adobe/Stripe): position as a free, no-signup alternative for making an invoice, be helpful and honest (that brand is a paid/other tool; ours is a free way to create+download an invoice). Do a quick WebSearch to get the brand's positioning right. rel=nofollow handling is automatic in the renderer.
- "related": run \`ls content/blog\` and pick 2-3 slugs that genuinely relate (e.g. how-to-write-an-invoice-for-beginners, what-is-an-invoice-number, how-to-ask-for-payment, invoice-vs-receipt, and any niche-specific post that exists). Use only slugs that exist.
- Do NOT edit lib/invoice/landings.ts or create any page.tsx — ONLY write seo-plan/landings/${it.slug}.json. Valid JSON, no trailing commas, no comments.

Return {slug, ok:true}. If you cannot, {slug, ok:false, note}.`,
      { schema: SCHEMA, label: `landing:${it.slug}`, phase: 'Write' }
    )
  )
);
const ok = res.filter((r) => r && r.ok).map((r) => r.slug);
log(`wrote ${ok.length}/${items.length} sidecars`);
return { written: ok, failed: res.filter((r) => !r || !r.ok).map((r, i) => (r && r.slug) || items[i]?.slug) };
