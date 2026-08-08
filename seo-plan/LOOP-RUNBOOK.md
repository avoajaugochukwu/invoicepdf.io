# invoicepdf.io blog write-loop — runbook

Goal: drain `seo-plan/worklist.json` (216 blog topics) into `content/blog/<slug>.mdx` with purple hero images, autonomously, until none remain. Never break the build (blog posts are MDX rendered per-request by next-mdx-remote, so a bad post errors only its own page — still, keep them valid).

## Source of truth
- `worklist.json` — the queue. `posts[].keyword` in promise order.
- `progress.json` — `{fed:[...]}`. **Done = keyword present in `fed`**, NOT a slug file (the planner renames slugs). Append-only.
- `skip.json` — `{skipped:{slug|keyword: reason}}` for planner-dropped candidates so they don't block termination.

## Each tick
1. Compute remaining:
   ```
   python3 -c "import json;w=json.load(open('seo-plan/worklist.json'));f=set(json.load(open('seo-plan/progress.json'))['fed']);r=[p['keyword'] for p in w['posts'] if p['keyword'] not in f];print(len(r));print('\n'.join(r[:6]))"
   ```
2. If remaining == 0 → go to TERMINATE.
3. Else pick the next 6 keywords as a **theme-spread** (round-robin across themes: AI/AUTOMATION, RECONCILE/TRACK, INDUSTRY TEMPLATE, TOOL/BRAND, EXPLAINER, TEMPLATE/GENERAL, HOW-TO, CRM/CLIENT; highest promise first within each theme, skipping any already in `fed`). This minimises intra-batch and adjacent-batch duplicate drops. Fire them as a **background** workflow:
   ```
   Workflow({ scriptPath: "<abs>/.claude/workflows/blog-batch.js", args: { topics: [<next 6>], startDate: "<advancing date>" } })
   ```
   Advance `startDate` ~6 days each batch so publishDates stagger and don't all collide.
4. IMMEDIATELY append those 6 keywords to `progress.json.fed` (crash-safety: a mid-tick crash must never re-fire them). Record any planner `dropped[]` from the previous batch's result into `skip.json`.
5. `ScheduleWakeup` with a ~1500s fallback and the same loop prompt. The workflow completion notification normally wakes the next tick sooner.

## Terminate
1. RECONCILE: any fed keyword whose intended slug produced no `content/blog/<slug>.mdx` and is not in `skip.json` = silent failure → re-feed once (one more batch). If it fails twice, log to `skip.json` with reason "write-failed x2" and move on.
2. Ensure every post has an image: `npm run blog:images` (idempotent, skips existing). Regenerate any missing.
3. Sanity: `node -e "require('gray-matter')"` parse check is implicit; optionally run `npm run build` once — if it fails, isolate the offending MDX (the build log names the route), fix or move that one post aside, rebuild.
4. `ScheduleWakeup({ stop: true })` and post a final summary.

## Notes
- Batch size 6 balances the workflow concurrency cap (~10) against API rate limits.
- Landing pages (LANDINGS array) are OUT of this loop — they touch typed TS and can break the build. Handle separately/manually.
- Images need `OPENAI_API_KEY` (in .env). Model `gpt-image-2`, purple palette, `public/blog/<slug>/featured.webp`.
