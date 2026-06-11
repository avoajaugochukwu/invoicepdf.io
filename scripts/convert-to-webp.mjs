// One-shot: convert all raster blog images (+ the placeholder) to WebP, rewrite every
// MDX reference, and delete the originals. Idempotent-ish (skips if no rasters remain).
// Usage: node scripts/convert-to-webp.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const RASTER = /\.(png|jpe?g)$/i;

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

async function convertImages() {
  const targets = [
    ...walk(path.join(ROOT, 'public', 'blog')).filter((f) => RASTER.test(f)),
    ...['public/placeholder-image.jpg'].map((f) => path.join(ROOT, f)).filter((f) => fs.existsSync(f)),
  ];
  let saved = 0;
  for (const src of targets) {
    const dst = src.replace(RASTER, '.webp');
    const before = fs.statSync(src).size;
    await sharp(src).webp({ quality: 82 }).toFile(dst);
    const after = fs.statSync(dst).size;
    saved += before - after;
    fs.unlinkSync(src);
  }
  console.log(`  converted ${targets.length} images to webp (saved ~${(saved / 1024 / 1024).toFixed(1)} MB)`);
}

function rewriteMdx() {
  const dir = path.join(ROOT, 'content', 'blog');
  let changed = 0;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mdx'))) {
    const p = path.join(dir, f);
    const raw = fs.readFileSync(p, 'utf8');
    // Any /blog/... .png|.jpg|.jpeg → .webp (covers featuredImage + in-body images)
    const next = raw.replace(/(\/blog\/[^)"'\s]+?)\.(png|jpe?g)/gi, '$1.webp');
    if (next !== raw) {
      fs.writeFileSync(p, next);
      changed++;
    }
  }
  console.log(`  rewrote image refs in ${changed} MDX files`);
}

await convertImages();
rewriteMdx();
console.log('Done.');
