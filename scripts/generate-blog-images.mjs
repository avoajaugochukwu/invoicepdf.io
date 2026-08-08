// Generates clean, on-brand featured hero images for blog posts via OpenAI gpt-image-2.
// House style: premium SaaS editorial banner, PURPLE (violet/indigo) accents.
//
// Art direction is split (bottta pattern):
//   1. The writer agent authors a per-post prompt sidecar: content/blog/<slug>.image.md
//   2. This script reads that sidecar verbatim and sends it to OpenAI.
//      If no sidecar exists, it falls back to defaultPrompt(title).
// Output: public/blog/<slug>/featured.webp  (matches frontmatter convention).
// After writing, sets `featuredImage` in the post frontmatter if missing/dangling.
//
// Usage:
//   node scripts/generate-blog-images.mjs                 # all posts missing an image
//   node scripts/generate-blog-images.mjs <slug> [<slug>] # specific posts (force)
//   node scripts/generate-blog-images.mjs --force         # regenerate everything
//   node scripts/generate-blog-images.mjs --concurrency=4
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import sharp from 'sharp';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const PUB = path.join(ROOT, 'public', 'blog');
const MODEL = 'gpt-image-2';
const SIZE = '1536x1024';
const QUALITY = 'low'; // the look comes from the prompt, not the tier

// --- load OPENAI_API_KEY from .env (no dotenv dep) ---
function loadEnv() {
  for (const f of ['.env.local', '.env']) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}
loadEnv();

function defaultPrompt(title) {
  const words = title.replace(/[:—].*$/, '').split(/\s+/).filter(Boolean);
  const emphasis = words.slice().sort((a, b) => b.length - a.length)[0] || words[0] || 'Invoice';
  const headline = words.slice(0, 5).join(' ');
  return [
    'Premium editorial blog header banner for an invoicing software brand. Wide landscape, clean off-white background, generous negative space, high-end SaaS marketing aesthetic.',
    `LEFT HALF: a bold left-aligned sans-serif headline reading exactly: "${headline}". Render it near-black, with the single word "${emphasis}" in a violet-to-indigo purple gradient. Correct spelling, crisp kerning, no gibberish, no extra words.`,
    'Below it, a smaller muted-gray subtitle reading exactly: "Free invoice tools & guides".',
    'RIGHT HALF: one clean semi-realistic 3D object representing invoicing (a document, a receipt, or a card-and-coin), soft realistic shadows, clean studio lighting.',
    'Thin minimal line-art accents: a few connector lines, small circular nodes, small violet accent dots.',
    'Palette: near-black, violet and indigo purple accents, light gray, off-white. Calm, modern, uncluttered. No watermarks, no busy icon soup, no logos.',
  ].join('\n');
}

function readSidecar(slug) {
  const p = path.join(BLOG_DIR, `${slug}.image.md`);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').trim() : null;
}

async function generateImage(prompt) {
  const body = JSON.stringify({ model: MODEL, prompt, size: SIZE, quality: QUALITY, output_format: 'webp', n: 1 });
  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body,
      });
      if (res.ok) {
        const data = await res.json();
        return data.data[0].b64_json;
      }
      lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      if (![429, 500, 502, 503, 504].includes(res.status)) throw lastErr;
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, Math.min(2 ** attempt * 1000, 15000)));
  }
  throw lastErr;
}

function setFeatured(slug) {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdx)) return;
  const raw = fs.readFileSync(mdx, 'utf8');
  const parsed = matter(raw);
  const want = `/blog/${slug}/featured.webp`;
  if (parsed.data.featuredImage === want) return;
  parsed.data.featuredImage = want;
  fs.writeFileSync(mdx, matter.stringify(parsed.content, parsed.data));
}

async function doSlug(slug, force) {
  const dir = path.join(PUB, slug);
  const out = path.join(dir, 'featured.webp');
  if (!force && fs.existsSync(out)) {
    setFeatured(slug);
    return { slug, skipped: true };
  }
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdx)) return { slug, error: 'no mdx' };
  const title = matter(fs.readFileSync(mdx, 'utf8')).data.title || slug;
  const prompt = readSidecar(slug) || defaultPrompt(title);
  const b64 = await generateImage(prompt);
  const buf = await sharp(Buffer.from(b64, 'base64'))
    .resize({ width: 1536, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toBuffer();
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(out, buf);
  setFeatured(slug);
  return { slug, ok: true };
}

async function runPool(items, concurrency, worker) {
  const results = [];
  let i = 0;
  const run = async () => {
    while (i < items.length) {
      const idx = i++;
      try {
        results[idx] = await worker(items[idx]);
      } catch (e) {
        results[idx] = { slug: items[idx], error: String(e).slice(0, 160) };
      }
      const r = results[idx];
      console.log(`  ${r.ok ? '✓' : r.skipped ? '·' : '✗'} ${r.slug}${r.error ? ' — ' + r.error : ''}`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

const args = process.argv.slice(2);
const force = args.includes('--force');
const conc = Number((args.find((a) => a.startsWith('--concurrency=')) || '').split('=')[1]) || 4;
let slugs = args.filter((a) => !a.startsWith('--'));
const explicit = slugs.length > 0;
if (!explicit) {
  slugs = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY missing');
  process.exit(1);
}
console.log(`Generating hero images (${MODEL}, purple) for ${slugs.length} post(s), concurrency ${conc}...`);
const res = await runPool(slugs, conc, (s) => doSlug(s, force || explicit));
const ok = res.filter((r) => r.ok).length;
const sk = res.filter((r) => r.skipped).length;
const err = res.filter((r) => r.error);
console.log(`Done. ${ok} generated, ${sk} skipped, ${err.length} failed.`);
if (err.length) console.log('Failed:', err.map((e) => e.slug).join(', '));
