# Building a Data Moat: A Practical Guide

The LinkedIn post about Ukraine's Y-Park Legal AI hub raises a strategic question that applies far beyond legaltech: **what is the more durable AI moat — the model, or the dataset nobody else can assemble?**

This guide turns that question into a decision framework and a concrete workflow for anyone assessing or building a data-first AI product.

---

## 1. Why the dataset usually wins

Model architectures diffuse fast. Open weights, published papers, and cheap fine-tuning mean any competent team can reproduce a state-of-the-art architecture within weeks. What resists copying:

- **Provenance** — source material that took decades or centuries to accumulate (Y-Park's ~25,000 volumes back to the 16th century).
- **Exclusivity** — data physically or legally held by one party.
- **Structure** — the labeling, alignment, and cleaning work already done.
- **Refresh rate** — a proprietary pipeline that keeps producing fresh data.

A useful test: *If a well-funded competitor started today, how long until they have equivalent data?* If the answer is "years" or "never," you have a moat.

---

## 2. The Data Moat Scorecard

Score each dimension 0–3. A total above 12 signals a defensible data asset.

| Dimension | 0 | 1 | 2 | 3 |
|-----------|---|---|---|---|
| **Rarity** | Public, everywhere | Public but scattered | Semi-private | Uniquely held |
| **Reproduction cost** | Days | Months | Years | Practically impossible |
| **Legal right to use** | Unclear/blocked | Restricted | Licensed | Owned/public-domain |
| **Structuring done** | Raw | Partially cleaned | Cleaned | Cleaned + labeled + aligned |
| **Refresh mechanism** | None | Manual | Semi-automated | Continuous proprietary flow |
| **Anchored demand** | Speculative | Adjacent | Documented pain point | Captive user base |

Y-Park scores high on rarity, reproduction cost, and anchored demand (1M+ veterans, 156 legislative acts, 18 agencies) — but lower on "structuring done" (only ~10k of 25k digitized), which is exactly where the current work sits.

---

## 3. From archive to training corpus — the pipeline

When the asset is historical documents, the value is unlocked through a repeatable pipeline:

1. **Inventory** — catalog every source, its language, era, condition, and rights status.
2. **Digitize** — high-resolution scans; prioritize by demand relevance, not chronology.
3. **OCR + HTR** — printed text OCR plus handwritten text recognition for older volumes; historical fonts and multilingual text need specialized models.
4. **Normalize** — unify encodings, expand abbreviations, reconcile spelling variants across eras.
5. **Align** — for multilingual corpora, build parallel or comparable text alignments (8 languages in Y-Park's case).
6. **Benchmark** — evaluate against an external standard (Y-Park uses Harvard's Caselaw Access Project) so quality claims are credible.
7. **License + govern** — clarify usage rights, especially for a public-good corpus.

See `pipeline.ts` for a runnable skeleton of stages 1–6.

---

## 4. Strategic lessons from the post

- **Frame the AI as a data project.** The label attracts attention; the corpus creates the value.
- **Anchor to a documented pain point.** "Fixing a real problem" de-risks adoption far more than chasing a speculative market.
- **Read location as signal.** Staying near the front line communicates permanence and commitment — a positioning choice, not just logistics.
- **Aim for category ownership when you can't win on capital.** With VC 12–16x behind CEE peers, being first and unique matters more than being biggest.

---

## 5. Questions to ask before betting on a data moat

- Can the data be legally used for training and commercial output?
- Is there a plausible synthetic or scraped substitute that erodes the moat?
- Does structuring cost exceed the eventual value?
- Who benefits if the corpus becomes a public good — and does that change the business model?
- What keeps the moat wet: is there an ongoing data-refresh advantage, or is it a one-time asset?
