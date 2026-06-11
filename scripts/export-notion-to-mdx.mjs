/**
 * One-time migration: export Notion blog posts to file-based MDX.
 *
 * Run with:  node --env-file=.env scripts/export-notion-to-mdx.mjs
 *
 * - Pulls all "Done" posts from the Notion database
 * - Converts each post's blocks to Markdown (notion-to-md)
 * - Downloads featured + in-content images into public/blog/<slug>/
 * - Writes content/blog/<slug>.mdx with frontmatter
 *
 * Safe to delete this file (and the notion-to-md dep) after the migration.
 */
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_IMG_DIR = path.join(ROOT, 'public', 'blog');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const plain = (rich) => (rich?.map((t) => t.plain_text).join('') ?? '').trim();

function getFeaturedImageUrl(props) {
  const files = props['Featured Image']?.files;
  if (!files?.length) return null;
  const f = files[0];
  return f.type === 'external' ? f.external.url : f.file?.url ?? null;
}

async function downloadImage(url, destDir, baseName) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get('content-type') || '';
    let ext = path.extname(new URL(url).pathname).split('?')[0];
    if (!ext) {
      ext = ct.includes('png') ? '.png' : ct.includes('webp') ? '.webp' : ct.includes('gif') ? '.gif' : ct.includes('svg') ? '.svg' : '.jpg';
    }
    const fileName = `${baseName}${ext}`;
    await fs.mkdir(destDir, { recursive: true });
    await fs.writeFile(path.join(destDir, fileName), buf);
    return fileName;
  } catch (err) {
    console.warn(`  ! failed to download image ${url}: ${err.message}`);
    return null;
  }
}

// Rewrite markdown image URLs -> local /blog/<slug>/<file>, downloading each.
async function localizeImages(markdown, slug) {
  const destDir = path.join(PUBLIC_IMG_DIR, slug);
  const imgRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  const tasks = [];
  let match;
  let idx = 0;
  while ((match = imgRegex.exec(markdown)) !== null) {
    const [full, alt, url] = match;
    if (url.startsWith('/')) continue; // already local
    const baseName = `image-${idx++}-${crypto.createHash('md5').update(url).digest('hex').slice(0, 8)}`;
    tasks.push({ full, alt, url, baseName });
  }
  let out = markdown;
  for (const t of tasks) {
    const fileName = await downloadImage(t.url, destDir, t.baseName);
    if (fileName) {
      out = out.replace(t.full, `![${t.alt}](/blog/${slug}/${fileName})`);
    }
  }
  return out;
}

function yamlEscape(str) {
  return `"${String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

async function main() {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_API_KEY / NOTION_DATABASE_ID missing. Run with: node --env-file=.env scripts/export-notion-to-mdx.mjs');
  }

  await fs.mkdir(CONTENT_DIR, { recursive: true });

  // Fetch all "Done" posts (paginated).
  const pages = [];
  let cursor;
  do {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: { property: 'Status', status: { equals: 'Done' } },
      start_cursor: cursor,
    });
    pages.push(...res.results);
    cursor = res.next_cursor ?? undefined;
  } while (cursor);

  console.log(`Found ${pages.length} published posts.`);

  for (const page of pages) {
    const props = page.properties;
    const slug = plain(props.Slug?.rich_text) || page.id;
    const title = plain(props.Title?.title) || 'Untitled Post';
    console.log(`\n→ ${slug} (${title})`);

    // Convert blocks to markdown.
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    let markdown = n2m.toMarkdownString(mdBlocks).parent || '';
    markdown = await localizeImages(markdown, slug);

    // Featured image.
    let featuredImage = '/placeholder-image.jpg';
    const remoteFeatured = getFeaturedImageUrl(props);
    if (remoteFeatured) {
      const fileName = await downloadImage(remoteFeatured, path.join(PUBLIC_IMG_DIR, slug), 'featured');
      if (fileName) featuredImage = `/blog/${slug}/${fileName}`;
    }

    const date = props.Created?.created_time || page.created_time || new Date().toISOString();
    const excerpt = plain(props.Excerpt?.rich_text) || '';
    const metaDescription = plain(props['Meta Description']?.rich_text) || excerpt;
    const readingTime = props.ReadingTime?.number || null;
    const tags = props.Tags?.multi_select?.map((t) => t.name) || [];
    const authors = props.Author?.multi_select?.map((a) => a.name) || [];
    const author = authors.length ? authors.join(', ') : 'InvoicePDF Team';

    const fm = [
      '---',
      `title: ${yamlEscape(title)}`,
      `slug: ${yamlEscape(slug)}`,
      `date: ${yamlEscape(date)}`,
      `excerpt: ${yamlEscape(excerpt)}`,
      `description: ${yamlEscape(metaDescription)}`,
      `author: ${yamlEscape(author)}`,
      `featuredImage: ${yamlEscape(featuredImage)}`,
      readingTime ? `readingTime: ${readingTime}` : null,
      `tags: [${tags.map(yamlEscape).join(', ')}]`,
      '---',
      '',
    ].filter((l) => l !== null).join('\n');

    const fileContent = `${fm}\n${markdown.trim()}\n`;
    await fs.writeFile(path.join(CONTENT_DIR, `${slug}.mdx`), fileContent, 'utf8');
    console.log(`  ✓ wrote content/blog/${slug}.mdx`);
  }

  console.log(`\nDone. Exported ${pages.length} posts to content/blog/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
