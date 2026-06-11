#!/usr/bin/env python3
"""
invoicepdf.io keyword fan-out — mimics how a human searches (US location).

Per seed:
  1. related_keywords    -> walks Google's "related searches" tree (human fan-out)
  2. keyword_suggestions -> long-tail full-text matches ("invoice template ___")
  3. keyword_ideas       -> category-adjacent terms (same Google Ads category)

Merged & deduped, enriched with: search volume, CPC, competition, KD, intent.
Reads DataForSEO creds from invoicepdf.io/.env.
"""
import os, json, time, base64, urllib.request, urllib.error, csv, pathlib

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw"
RAW.mkdir(parents=True, exist_ok=True)

# --- load .env (two dirs up) ---
ENV = pathlib.Path(__file__).resolve().parents[2] / ".env"
if ENV.exists():
    for line in ENV.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

LOGIN = os.environ["DATAFORSEO_LOGIN"]
PASSWORD = os.environ["DATAFORSEO_PASSWORD"]
AUTH = base64.b64encode(f"{LOGIN}:{PASSWORD}".encode()).decode()

LOCATION = 2840   # United States
LANGUAGE = "English"

RELATED_SEEDS = [
    ("invoice template", 3),
    ("invoice generator", 3),
    ("how to write an invoice", 2),
    ("free invoice template", 2),
    ("invoice maker", 2),
    ("invoice example", 2),
    ("what is an invoice", 2),
    ("proforma invoice", 2),
    ("commercial invoice", 2),
]
SUGGESTION_SEEDS = [
    "invoice template",
    "invoice generator",
    "free invoice",
    "invoice maker",
    "create invoice",
    "invoice pdf",
    "invoice format",
    "invoice example",
    "blank invoice",
    "commercial invoice",
    "how to make an invoice",
    "invoice number",
    "receipt template",
    "billing",
]
IDEA_SEEDS = [
    ["invoice template", "invoice generator", "invoice maker", "create invoice"],
]

def post(path, body):
    req = urllib.request.Request(
        "https://api.dataforseo.com/v3/" + path,
        data=json.dumps(body).encode(),
        headers={"Authorization": "Basic " + AUTH, "Content-Type": "application/json"},
        method="POST",
    )
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            print("  HTTP", e.code, e.read().decode()[:200])
        except Exception as e:
            print("  err", e)
        time.sleep(3)
    return None

KW = {}
def absorb(item, source, seed):
    kd = item.get("keyword_data") or item
    kw = kd.get("keyword")
    if not kw:
        return
    info = kd.get("keyword_info") or {}
    props = kd.get("keyword_properties") or {}
    intent = (kd.get("search_intent_info") or {}).get("main_intent")
    rec = KW.get(kw)
    vol = info.get("search_volume")
    if rec is None:
        KW[kw] = {
            "keyword": kw,
            "search_volume": vol,
            "cpc": info.get("cpc"),
            "competition": info.get("competition"),
            "competition_level": info.get("competition_level"),
            "kd": props.get("keyword_difficulty"),
            "intent": intent,
            "sources": {source},
            "seeds": {seed},
        }
    else:
        rec["sources"].add(source)
        rec["seeds"].add(seed)
        if rec.get("search_volume") in (None, 0) and vol:
            rec["search_volume"] = vol
        for k_dfs, k_loc in [("cpc","cpc"),("competition","competition"),
                             ("competition_level","competition_level")]:
            if rec.get(k_loc) is None and info.get(k_dfs) is not None:
                rec[k_loc] = info.get(k_dfs)
        if rec.get("kd") is None and props.get("keyword_difficulty") is not None:
            rec["kd"] = props.get("keyword_difficulty")
        if not rec.get("intent") and intent:
            rec["intent"] = intent

def run():
    for seed, depth in RELATED_SEEDS:
        print(f"[related d{depth}] {seed}")
        body = [{"keyword": seed, "language_name": LANGUAGE, "location_code": LOCATION,
                 "depth": depth, "include_seed_keyword": True, "limit": 1000,
                 "include_serp_info": False}]
        res = post("dataforseo_labs/google/related_keywords/live", body)
        if not res: continue
        (RAW / f"related__{seed.replace(' ','_')}.json").write_text(json.dumps(res, indent=2))
        try:
            items = res["tasks"][0]["result"][0]["items"] or []
        except Exception:
            items = []
        for it in items: absorb(it, "related", seed)
        print(f"   +{len(items)} items (total {len(KW)})")

    for seed in SUGGESTION_SEEDS:
        print(f"[suggest] {seed}")
        body = [{"keyword": seed, "language_name": LANGUAGE, "location_code": LOCATION,
                 "include_seed_keyword": True, "limit": 1000}]
        res = post("dataforseo_labs/google/keyword_suggestions/live", body)
        if not res: continue
        (RAW / f"suggest__{seed.replace(' ','_')}.json").write_text(json.dumps(res, indent=2))
        try:
            items = res["tasks"][0]["result"][0]["items"] or []
        except Exception:
            items = []
        for it in items: absorb(it, "suggestion", seed)
        print(f"   +{len(items)} items (total {len(KW)})")

    for kws in IDEA_SEEDS:
        print(f"[ideas] {kws}")
        body = [{"keywords": kws, "language_name": LANGUAGE, "location_code": LOCATION,
                 "limit": 1000}]
        res = post("dataforseo_labs/google/keyword_ideas/live", body)
        if not res: continue
        (RAW / "ideas.json").write_text(json.dumps(res, indent=2))
        try:
            items = res["tasks"][0]["result"][0]["items"] or []
        except Exception:
            items = []
        for it in items: absorb(it, "idea", ",".join(kws))
        print(f"   +{len(items)} items (total {len(KW)})")

    rows = list(KW.values())
    for r in rows:
        r["sources"] = "|".join(sorted(r["sources"]))
        r["seeds"] = "|".join(sorted(r["seeds"]))
        r["sv"] = r["search_volume"] or 0
    rows.sort(key=lambda r: r["sv"], reverse=True)

    cols = ["keyword","search_volume","cpc","competition","competition_level","kd","intent","sources","seeds"]
    with open(ROOT / "keywords_all.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows: w.writerow(r)
    (ROOT / "keywords_all.json").write_text(json.dumps(rows, indent=2))
    print(f"\nDONE: {len(rows)} unique keywords -> keywords_all.csv / .json")

if __name__ == "__main__":
    run()
