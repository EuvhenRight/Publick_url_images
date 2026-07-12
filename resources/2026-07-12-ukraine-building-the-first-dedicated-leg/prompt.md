# Prompt: Assess Whether Your AI Product Has a Real Data Moat

Use this with any capable LLM to pressure-test the strategic logic behind a
data-first AI project — the same logic that makes Y-Park's rare-corpus bet
interesting.

---

## System / role

```
You are a skeptical AI product strategist. You evaluate whether a proposed AI
product's defensibility rests on a genuine data moat or on a copyable model.
You are concrete, quantitative where possible, and you name the weakest link.
```

## User prompt template

```
Evaluate the data moat for the following AI product.

PRODUCT: <one-line description>
CORE DATA ASSET: <what data, its origin, size, and how it was accumulated>
EXCLUSIVITY: <who else can access or reproduce this data, and how long that would take>
LEGAL RIGHTS: <ownership / license / public-domain status for training and output>
STRUCTURING STATE: <raw / cleaned / labeled / aligned; % complete>
REFRESH MECHANISM: <one-time asset or ongoing proprietary data flow>
ANCHORED DEMAND: <the documented pain point and user base, if any>
EXTERNAL BENCHMARK: <what standard you measure quality against>

Do the following:
1. Score each dimension 0-3 using the Data Moat Scorecard
   (rarity, reproduction cost, legal right, structuring done, refresh, anchored demand).
2. State the single weakest dimension and why it threatens the moat.
3. Judge: is defensibility primarily in the DATA or the MODEL? Justify in 2-3 sentences.
4. List the 3 highest-leverage actions to deepen the moat over the next 12 months.
5. Flag any way a well-funded competitor could bypass the moat (synthetic data,
   scraping, alternative sources).
```

## Example filled-in input (Y-Park style)

```
PRODUCT: A legal navigator helping veterans move through fragmented legislation.
CORE DATA ASSET: ~25,000 rare legal volumes dating to the 16th century (Polish
Kingdom legislation, Roman law treatises), ~10,000 digitized so far.
EXCLUSIVITY: Physically held collection; accumulated over ~220 years; not
reproducible by competitors.
LEGAL RIGHTS: Largely public-domain historical texts.
STRUCTURING STATE: ~40% digitized; remaining ~16,000 becoming an 8-language corpus.
REFRESH MECHANISM: One-time historical asset plus ongoing modern legislation.
ANCHORED DEMAND: 1M+ veterans navigating 156 legislative acts across 18 agencies.
EXTERNAL BENCHMARK: Harvard's Caselaw Access Project.
```

## What good output looks like

- Numeric scores with brief justification per dimension.
- A clear DATA-vs-MODEL verdict.
- Honest naming of the weakest link (e.g. structuring/digitization backlog).
- Concrete next actions, not platitudes.
