// Generates on-brand featured cover images (1200x630 PNG) for blog posts.
// Reads the post title from content/blog/<slug>.mdx frontmatter.
// Usage: node scripts/make-covers.mjs <slug> [<slug> ...]
//        node scripts/make-covers.mjs --placeholder   (writes public/placeholder-image.jpg)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines.slice(0, 4);
}

function titleOf(slug) {
  const file = path.join(ROOT, 'content', 'blog', `${slug}.mdx`);
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^title:\s*"?(.*?)"?\s*$/m);
  return m ? m[1] : slug;
}

function svgFor(title) {
  const lines = wrap(title, 26);
  const fontSize = lines.length >= 4 ? 56 : 66;
  const lineH = fontSize * 1.18;
  const blockH = lines.length * lineH;
  const startY = 315 - blockH / 2 + fontSize * 0.8;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${Math.round(startY + i * lineH)}">${esc(l)}</tspan>`)
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e3a8a"/>
      <stop offset="0.55" stop-color="#7D2AE8"/>
      <stop offset="1" stop-color="#0078D4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="0" y="0" width="1200" height="630" fill="#000000" opacity="0.12"/>
  <text font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="${fontSize}" fill="#ffffff">${tspans}</text>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="30" fill="#ffffff" opacity="0.92">invoicepdf.io</text>
  <rect x="80" y="585" width="120" height="6" rx="3" fill="#ffffff" opacity="0.85"/>
</svg>`;
}

async function writeCover(slug) {
  const title = titleOf(slug);
  const dir = path.join(ROOT, 'public', 'blog', slug);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, 'featured.webp');
  await sharp(Buffer.from(svgFor(title))).webp({ quality: 82 }).toFile(out);
  console.log(`  wrote public/blog/${slug}/featured.webp  ("${title}")`);
}

async function writePlaceholder() {
  const svg = svgFor('InvoicePDF.io — Free Invoices');
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(path.join(ROOT, 'public', 'placeholder-image.webp'));
  console.log('  wrote public/placeholder-image.webp');
}

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node scripts/make-covers.mjs <slug> [<slug> ...] | --placeholder');
  process.exit(1);
}
for (const a of args) {
  if (a === '--placeholder') await writePlaceholder();
  else await writeCover(a);
}
console.log('Done.');
