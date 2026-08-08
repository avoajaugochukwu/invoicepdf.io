// Single-threaded assembler: reads landing JSON sidecars in seo-plan/landings/*.json
// and appends any NOT-yet-present entries into the LANDINGS array in lib/invoice/landings.ts.
// Also ensures app/<slug>/page.tsx exists for each. Idempotent (skips slugs already in the array).
// Run AFTER a batch of writer agents; then run `npm run build` to gate.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const LANDINGS_TS = path.join(ROOT, 'lib', 'invoice', 'landings.ts');
const SIDECAR_DIR = path.join(ROOT, 'seo-plan', 'landings');
const VALID_STYLES = ['google-docs', 'word', 'canva', 'microsoft', 'excel', 'receipt', 'blank'];
const REQ = ['slug', 'styleId', 'keyword', 'platform', 'metaTitle', 'metaDescription', 'downloadFile', 'downloadLabel', 'intro', 'included', 'steps', 'faqs', 'related'];

const j = (v) => JSON.stringify(v);

function entryTs(e) {
  const lines = [
    '  {',
    `    slug: ${j(e.slug)},`,
    `    styleId: ${j(e.styleId)},`,
    `    keyword: ${j(e.keyword)},`,
    `    platform: ${j(e.platform)},`,
    `    metaTitle: ${j(e.metaTitle)},`,
    `    metaDescription: ${j(e.metaDescription)},`,
    `    downloadFile: ${j(e.downloadFile)},`,
    ...(e.docxFile ? [`    docxFile: ${j(e.docxFile)},`] : []),
    ...(e.xlsxFile ? [`    xlsxFile: ${j(e.xlsxFile)},`] : []),
    `    downloadLabel: ${j(e.downloadLabel)},`,
    `    intro: ${j(e.intro)},`,
    `    included: ${j(e.included)},`,
    `    steps: ${j(e.steps)},`,
    `    faqs: ${j(e.faqs)},`,
    `    related: ${j(e.related)},`,
    '  },',
  ];
  return lines.join('\n');
}

function validate(e) {
  for (const k of REQ) if (e[k] === undefined || e[k] === null) return `missing ${k}`;
  if (!VALID_STYLES.includes(e.styleId)) return `bad styleId ${e.styleId}`;
  if (!/^[a-z0-9-]+$/.test(e.slug)) return `bad slug ${e.slug}`;
  if (!Array.isArray(e.intro) || !Array.isArray(e.included) || !Array.isArray(e.steps) || !Array.isArray(e.faqs) || !Array.isArray(e.related)) return 'array field not array';
  if (!e.steps.every((s) => s && s.title && s.body)) return 'step missing title/body';
  if (!e.faqs.every((f) => f && f.q && f.a)) return 'faq missing q/a';
  return null;
}

function pageTsx(slug) {
  return `import { Metadata } from 'next';
import { TemplateLanding, landingMetadata } from '@/components/invoice/TemplateLanding';
import { getLanding } from '@/lib/invoice/landings';

const landing = getLanding('${slug}')!;
export const metadata: Metadata = landingMetadata(landing);

export default function Page() {
  return <TemplateLanding landing={landing} />;
}
`;
}

let ts = fs.readFileSync(LANDINGS_TS, 'utf8');
const existing = new Set([...ts.matchAll(/slug:\s*'([^']+)'|slug:\s*"([^"]+)"/g)].map((m) => m[1] || m[2]));

const sidecars = fs.existsSync(SIDECAR_DIR) ? fs.readdirSync(SIDECAR_DIR).filter((f) => f.endsWith('.json')) : [];
const toAdd = [];
const skipped = [];
for (const f of sidecars) {
  let e;
  try {
    e = JSON.parse(fs.readFileSync(path.join(SIDECAR_DIR, f), 'utf8'));
  } catch (err) {
    skipped.push([f, 'bad json']);
    continue;
  }
  if (existing.has(e.slug)) {
    skipped.push([e.slug, 'already in LANDINGS']);
    continue;
  }
  const err = validate(e);
  if (err) {
    skipped.push([e.slug || f, err]);
    continue;
  }
  toAdd.push(e);
}

if (toAdd.length) {
  // find the LANDINGS array closing "];"
  const start = ts.indexOf('export const LANDINGS');
  if (start === -1) throw new Error('LANDINGS array not found');
  const close = ts.indexOf('\n];', start);
  if (close === -1) throw new Error('LANDINGS closing "];" not found');
  const block = toAdd.map(entryTs).join('\n') + '\n';
  ts = ts.slice(0, close + 1) + block + ts.slice(close + 1); // insert right after the newline, before "];"
  fs.writeFileSync(LANDINGS_TS, ts);
  // page.tsx per slug
  for (const e of toAdd) {
    const dir = path.join(ROOT, 'app', e.slug);
    fs.mkdirSync(dir, { recursive: true });
    const p = path.join(dir, 'page.tsx');
    if (!fs.existsSync(p)) fs.writeFileSync(p, pageTsx(e.slug));
    // mark fed
  }
}

console.log(`Added ${toAdd.length}: ${toAdd.map((e) => e.slug).join(', ') || '(none)'}`);
if (skipped.length) console.log('Skipped:', skipped.map(([s, r]) => `${s}(${r})`).join(', '));
