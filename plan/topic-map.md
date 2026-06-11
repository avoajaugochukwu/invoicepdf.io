# invoicepdf.io — Topic Map (one primary keyword per URL)

Single source of truth for which URL owns which keyword. **Before creating or expanding any
page, check here** — if a keyword already has an owner, sharpen/redirect, don't add a rival
(see `plan/plan.md` Phase 1 + blog-standards §4). Volumes are US (DataForSEO, 2026-06).

## Cluster A — Tools & templates (transactional hub)
| URL | Primary keyword | Vol | KD | Status |
|---|---|---|---|---|
| `/` | brand / invoice generator | — | — | live |
| `/invoice-generator` | free invoice generator | 27,100 | ~30 | live (hub) |
| `/invoice-template-google-docs` | invoice template google docs | 12,100 | 0 | live |
| `/invoice-template-word` | invoice template word | 22,200 | 8 | live |
| `/invoice-template-canva` | invoice template canva | 18,100 | 7 | live |
| `/microsoft-invoice-template` | microsoft invoice template | 9,900 | 6 | live |
| `/receipt-template` | receipt template | 14,800 | 6 | live |
| `/blank-invoice-template` | blank invoice template | — | low | live |

## Cluster B — Invoice basics (informational)
| URL | Primary keyword | Vol | KD | Status |
|---|---|---|---|---|
| `/blog/what-is-an-invoice-beginner-guide` | what is an invoice | 14,800 | 6 | optimized P4 |
| `/blog/what-does-invoice-mean` | invoice meaning / definition | 9,900 | 17 | optimized P4 |
| `/blog/what-is-an-invoice-number` | invoice number | — | low | optimized P4 |
| `/blog/what-does-an-invoice-look-like` | what does an invoice look like | — | low | interlink P5 |
| `/blog/how-to-write-an-invoice-for-beginners` | how to write an invoice | 77+ cluster | 28 | keeper (P1) / b-review P5 |
| `/blog/how-to-send-an-invoice` | how to send an invoice | — | low | interlink P5 |
| `/blog/how-to-send-an-invoice-on-paypal` | how to send an invoice on paypal | — | low | interlink P5 |
| `/blog/how-to-pay-an-invoice-beginners-guide` | how to pay an invoice | — | low | interlink P5 |
| `/blog/invoice-vs-receipt` | invoice vs receipt | 2,400 | 3 | live ✅ P5 |
| `/blog/invoice-vs-bill` | invoice vs bill | 880 | 3 | live ✅ P5 |

## Cluster C — Getting paid / payment terms
| URL | Primary keyword | Vol | KD | Status |
|---|---|---|---|---|
| `/blog/what-does-net-30-mean-on-an-invoice` | net 30 | — | low | optimized P4 (was pos 28) |
| `/blog/invoice-financing-made-simple` | invoice financing | 7 imp | — | pos 2 — protect/interlink P5 |

## Cluster D — International / customs
| URL | Primary keyword | Vol | KD | Status |
|---|---|---|---|---|
| `/blog/what-is-a-proforma-invoice` | proforma invoice | 12,100 | 8 | optimized P4 |
| `/blog/what-is-a-commercial-invoice` | commercial invoice / what is a commercial invoice | 3,600 / 720 | 27 / 7 | live ✅ P5 |

## Cluster E — Adjacent (different intent, low core value)
| URL | Primary keyword | Notes |
|---|---|---|
| `/blog/how-to-find-the-invoice-price-of-a-car` | invoice price of a car | Car-buying intent, off-core. Keep, light interlink only. |

## Interlinking rules
- **Every informational post links to the tool hub** (`/invoice-generator`) and ≥1 template page,
  leading with our own product before any third-party tool.
- **Cross-link within a cluster** (basics ↔ basics, customs ↔ customs) and to the natural neighbor
  cluster (basics → getting-paid for terms; customs → basics for definitions).
- **No self-links.** No two URLs share a primary keyword (this table enforces it).
- Competitor/affiliate links carry `rel="nofollow"` (auto via `components/MdxContent.tsx`); authority
  citations (IRS, SBA, CBP, trade.gov, ICC, dictionaries) stay followed.

## Open keyword gaps (future posts — verify intent first)
- "due on receipt" / "what does due on receipt mean" (terms cluster)
- "how to ask for payment" / payment-reminder (getting-paid)
- "purchase order vs invoice" (basics)
- "invoice template excel / google sheets" (would need an .xlsx generator — see plan Phase 2 future)
