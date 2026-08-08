export const meta = {
  name: 'blog-batch',
  description: 'Plan, write, and illustrate a batch of invoicepdf.io blog posts from keywords',
  phases: [
    { title: 'Plan', detail: 'dedup topics vs existing library, assign slug/title/date' },
    { title: 'Write', detail: 'one grounded writer agent per topic (b-write contract)' },
    { title: 'Images', detail: 'render purple hero images for the new posts' },
  ],
};

// args: { topics: [<keyword strings>], startDate: "YYYY-MM-DD" }
let A = args;
if (typeof A === 'string') {
  try {
    A = JSON.parse(A);
  } catch (e) {
    A = {};
  }
}
const topics = (A && A.topics) || [];
const startDate = (A && A.startDate) || '2026-08-08';
if (!topics.length) {
  log('no topics passed; nothing to do');
  return { posts: [], dropped: [] };
}

const PLAN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['posts', 'dropped'],
  properties: {
    posts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['keyword', 'slug', 'title', 'date'],
        properties: {
          keyword: { type: 'string' },
          slug: { type: 'string' },
          title: { type: 'string' },
          date: { type: 'string' },
        },
      },
    },
    dropped: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['keyword', 'reason'],
        properties: { keyword: { type: 'string' }, reason: { type: 'string' } },
      },
    },
  },
};

const WRITE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['slug', 'ok'],
  properties: {
    slug: { type: 'string' },
    ok: { type: 'boolean' },
    words: { type: 'number' },
    note: { type: 'string' },
  },
};

phase('Plan');
const plan = await agent(
  `You are the planner for a batch of invoicepdf.io blog posts. Project root is the current working directory.

CANDIDATE KEYWORDS (one post each, unless dropped):
${topics.map((t) => `- ${t}`).join('\n')}

Do this:
1. List existing coverage so you never duplicate: run \`ls content/blog/*.mdx\` and read the slugs in lib/invoice/landings.ts (grep 'slug:'). These already exist — do NOT plan a post that a landing page or an existing post already owns (anti-cannibalization).
2. For each candidate keyword that is NOT already covered, assign:
   - slug: kebab-case, lowercase ASCII + hyphens, no trailing digits, no stop-word junk. Must be unique and not collide with an existing blog slug or landing slug.
   - title: a compelling, keyword-led H1 (US English). Front-load the primary keyword.
   - date: an ISO datetime string. Stagger posts one day apart starting from ${startDate}T09:00:00.000Z (post 1 = ${startDate}, post 2 = next day, etc.) so publishDates are not all identical.
3. Drop a candidate (into "dropped" with a short reason) if: it duplicates an existing post/landing, it is an unrankable pure-navigational/brand-login term, or two candidates in this batch are the same intent (keep the higher-value one, drop the other).

Return the plan object. Keep every non-dropped candidate as a post.`,
  { schema: PLAN_SCHEMA, phase: 'Plan' }
);

const posts = (plan && plan.posts) || [];
log(`planned ${posts.length} posts, dropped ${(plan.dropped || []).length}`);
if (!posts.length) return { posts: [], dropped: plan.dropped || [] };

const written = await parallel(
  posts.map((p) => () =>
    agent(
      `Write ONE invoicepdf.io blog post. Project root is the current working directory. This is an autonomous batch — do NOT ask questions; make sensible decisions and finish.

TARGET KEYWORD: "${p.keyword}"
SLUG: ${p.slug}   (write to content/blog/${p.slug}.mdx)
TITLE (you may refine, keep keyword-led): ${p.title}
DATE (use verbatim in frontmatter): ${p.date}

CONTRACT — follow exactly:
1. Read .claude/blog-standards.md IN FULL and .claude/commands/b-write.md. Those files win on frontmatter, voice, depth, one-keyword-per-URL, external-links policy, US accuracy gate, and MDX validity.
2. Ground every load-bearing fact. Study the live SERP with WebSearch/WebFetch: shared section structure, the People-Also-Ask set (-> your FAQ), and the gap competitors under-serve. If a Perplexity MCP tool is available, use it too. If the topic is genuinely thin (no substance, no sources), write the best short useful page you can rather than failing — do NOT leave it empty.
3. Draft valid MDX. Frontmatter contract (match existing posts): title, slug, date (use the DATE above), excerpt, description (<=160 chars), author "Charles Ugo", featuredImage "/blog/${p.slug}/featured.webp", tags (["invoice"] or a fitting tag), and faqs: a list of {q,a} answering the real PAA. Body: no H1 (title comes from frontmatter); open by answering the core question, then mechanics -> >=1 worked example -> common mistakes -> short close. Lead with OUR generator/templates where relevant (internal links to existing pages), never self-link this post.
4. External links (REQUIRED): link the first mention of each stat / tax-legal fact / definition / named-tool flow / standard to a high-authority source (IRS, trade.gov, Investopedia, Merriam-Webster, the tool's own docs). VERIFY each URL returns 200 with: curl -sIL -o /dev/null -w "%{http_code}" "<URL>" — never ship a dead or guessed link. ~3-6 in a long guide, ~1-3 in a short one. Ours first; competitor/affiliate links get rel="nofollow".
5. Write an image prompt sidecar to content/blog/${p.slug}.image.md — a single paragraph using this house style, filled in for THIS post:
   "Premium editorial blog header banner for an invoicing software brand. Wide landscape, clean off-white background, generous negative space, high-end SaaS marketing aesthetic. LEFT HALF: a bold left-aligned sans-serif headline reading exactly \\"<3-5 word headline>\\", near-black, with the single word \\"<one emphasis word>\\" in a violet-to-indigo purple gradient — correct spelling, crisp kerning, no gibberish. Below it a smaller muted-gray subtitle reading exactly \\"<3-6 word subtitle>\\". RIGHT HALF: <one literal 3D subject that represents this post>, semi-realistic 3D render, soft realistic shadows, clean studio lighting. Thin minimal line-art accents, small violet accent dots. Palette: near-black, violet and indigo purple accents, light gray, off-white. Calm, modern, uncluttered. No watermarks, no busy icon soup, no logos."
6. Verify before finishing: MDX parses (valid frontmatter + no stray JSX), US accuracy gate clean, every external link returned 200, no self-referential link, depth bar met.

Write content/blog/${p.slug}.mdx and content/blog/${p.slug}.image.md. Return {slug, ok:true, words:<count>, note:<one line>}. If you truly cannot write it, return ok:false with the reason in note.`,
      { schema: WRITE_SCHEMA, label: `write:${p.slug}`, phase: 'Write' }
    )
  )
);

const okPosts = written.filter((w) => w && w.ok);
log(`wrote ${okPosts.length}/${posts.length} posts`);

phase('Images');
await agent(
  `Generate the purple hero images for the posts just written in this batch. Project root is the current working directory.
Run exactly: npm run blog:images -- --concurrency=4 ${okPosts.map((w) => w.slug).join(' ')}
That renders public/blog/<slug>/featured.webp for each slug and writes featuredImage into frontmatter. If a slug fails, retry it once individually with: npm run blog:image -- <slug>
Report which images were generated and any that failed.`,
  { label: 'images', phase: 'Images' }
);

return {
  planned: posts.map((p) => p.keyword),
  slugs: posts.map((p) => p.slug),
  written: okPosts.map((w) => w.slug),
  failed: written.filter((w) => !w || !w.ok).map((w, i) => (w && w.slug) || posts[i]?.slug),
  dropped: plan.dropped || [],
};
