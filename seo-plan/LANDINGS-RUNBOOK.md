# invoicepdf.io landings write-loop — runbook

Drain seo-plan/landings-worklist.json (27) into LANDINGS + app/<slug>/page.tsx, with a BUILD GATE + ROLLBACK per batch so the site never breaks.

## Source of truth
- landings-worklist.json — queue (slug,keyword,styleId,platform,downloadFile,docxFile[,xlsxFile]).
- landings-progress.json — {fed:[slug...]} append-only.
- Agents write seo-plan/landings/<slug>.json sidecars (race-free). They do NOT touch landings.ts or page.tsx.

## Each tick
1. remaining = worklist slugs not in fed. If 0 → TERMINATE.
2. Fire background Workflow landings-batch.js with args {items:[next 6 worklist objects]}. Append their slugs to fed immediately.
3. On completion: ASSEMBLE + GATE (below). Then ScheduleWakeup ~1200s.

## Assemble + build gate (after each batch)
1. `git add -A && git stash` is NOT used. Instead snapshot for rollback: note current `git status` OR copy landings.ts to /tmp/landings.bak.ts before assembling.
2. `node scripts/assemble-landings.mjs` — appends new sidecar entries into LANDINGS + creates app/<slug>/page.tsx.
3. `npm run build`. If GREEN → keep, continue. If RED → read log, find the offending slug's entry, remove that entry from landings.ts + delete its app/<slug>/page.tsx + move its sidecar to seo-plan/landings/bad/, restore from /tmp/landings.bak.ts if needed, rebuild until green. Log the bad slug.

## Terminate
All worklist slugs fed AND assembled: final `npm run build` green, then report. Landings auto-appear in sitemap + footer.
