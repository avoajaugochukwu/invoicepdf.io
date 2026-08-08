#!/usr/bin/env python3
"""
invoicepdf.io AI/automation keyword fan-out (US). Wide net.
Reuses the same DataForSEO Labs endpoints as fanout.py but with
automation/AI/agentic/workflow seeds spread across many angles.
Output: keywords_ai.csv / .json (does NOT touch keywords_all.csv).
"""
import os, json, time, base64, urllib.request, urllib.error, csv, pathlib

ROOT = pathlib.Path(__file__).parent
RAW = ROOT / "raw_ai"
RAW.mkdir(parents=True, exist_ok=True)

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
LOCATION = 2840
LANGUAGE = "English"

# spread wide: AI, automation, agentic, workflow, extraction, OCR, tools
RELATED_SEEDS = [
    ("invoice automation", 3),
    ("ai invoice", 3),
    ("invoice ai", 2),
    ("automated invoicing", 2),
    ("invoice generator ai", 2),
    ("ai invoice generator", 2),
    ("invoice processing", 2),
    ("invoice data extraction", 2),
    ("invoice ocr", 2),
    ("invoice scanner", 2),
    ("invoice management software", 2),
    ("automate invoicing", 2),
    ("invoice workflow", 2),
    ("accounts payable automation", 2),
]
SUGGESTION_SEEDS = [
    "invoice automation",
    "ai invoice",
    "ai invoice generator",
    "automated invoice",
    "automatic invoice",
    "invoice ocr",
    "invoice scanner",
    "invoice processing",
    "invoice data extraction",
    "invoice parser",
    "invoice extraction",
    "invoice management",
    "invoice software",
    "invoice app",
    "invoice api",
    "recurring invoice",
    "invoice reminder",
    "invoice approval",
    "accounts payable automation",
    "billing automation",
    "invoice chatgpt",
    "ai billing",
    "smart invoice",
]
IDEA_SEEDS = [
    ["invoice automation", "ai invoice generator", "invoice processing", "invoice ocr"],
    ["automated invoicing", "invoice software", "invoice management", "invoice api"],
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
            "keyword": kw, "search_volume": vol, "cpc": info.get("cpc"),
            "competition": info.get("competition"),
            "competition_level": info.get("competition_level"),
            "kd": props.get("keyword_difficulty"), "intent": intent,
            "sources": {source}, "seeds": {seed},
        }
    else:
        rec["sources"].add(source); rec["seeds"].add(seed)
        if rec.get("search_volume") in (None, 0) and vol:
            rec["search_volume"] = vol
        for k in ("cpc","competition","competition_level"):
            if rec.get(k) is None and info.get(k) is not None:
                rec[k] = info.get(k)
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
        try: items = res["tasks"][0]["result"][0]["items"] or []
        except Exception: items = []
        for it in items: absorb(it, "related", seed)
        print(f"   +{len(items)} (total {len(KW)})")
    for seed in SUGGESTION_SEEDS:
        print(f"[suggest] {seed}")
        body = [{"keyword": seed, "language_name": LANGUAGE, "location_code": LOCATION,
                 "include_seed_keyword": True, "limit": 1000}]
        res = post("dataforseo_labs/google/keyword_suggestions/live", body)
        if not res: continue
        try: items = res["tasks"][0]["result"][0]["items"] or []
        except Exception: items = []
        for it in items: absorb(it, "suggestion", seed)
        print(f"   +{len(items)} (total {len(KW)})")
    for kws in IDEA_SEEDS:
        print(f"[ideas] {kws}")
        body = [{"keywords": kws, "language_name": LANGUAGE, "location_code": LOCATION, "limit": 1000}]
        res = post("dataforseo_labs/google/keyword_ideas/live", body)
        if not res: continue
        try: items = res["tasks"][0]["result"][0]["items"] or []
        except Exception: items = []
        for it in items: absorb(it, "idea", ",".join(kws))
        print(f"   +{len(items)} (total {len(KW)})")

    rows = list(KW.values())
    for r in rows:
        r["sources"] = "|".join(sorted(r["sources"]))
        r["seeds"] = "|".join(sorted(r["seeds"]))
        r["sv"] = r["search_volume"] or 0
    rows.sort(key=lambda r: r["sv"], reverse=True)
    cols = ["keyword","search_volume","cpc","competition","competition_level","kd","intent","sources","seeds"]
    with open(ROOT / "keywords_ai.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows: w.writerow(r)
    (ROOT / "keywords_ai.json").write_text(json.dumps(rows, indent=2))
    print(f"\nDONE: {len(rows)} unique keywords -> keywords_ai.csv")

if __name__ == "__main__":
    run()
