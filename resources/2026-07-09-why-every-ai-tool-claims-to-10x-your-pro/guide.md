# Measuring Real AI Productivity Gains (Not the 10x Myth)

This guide helps you move past marketing claims and actually measure whether an AI tool improves your workflow. It expands on the post's core argument: the gains are often real but modest, and we are famously bad at judging our own speed.

## 1. Why "10x" Is Almost Always Wrong

### Amdahl's Law in plain terms
If a task is only part of your workday, speeding up that task can never speed up the whole day more than that portion allows.

The formula for overall speedup:

```
Speedup_total = 1 / ((1 - P) + (P / S))
```

Where:
- `P` = fraction of work the tool actually accelerates (0 to 1)
- `S` = speedup factor on that fraction

**Worked example:** Coding is ~25% of a developer's day (`P = 0.25`). Even if AI made coding *infinitely* fast (`S = ∞`):

```
Speedup_total = 1 / ((1 - 0.25) + 0) = 1 / 0.75 = 1.33x
```

So the theoretical ceiling from perfect coding automation is **1.33x** — not 10x. To 10x a whole workday you would need to accelerate essentially everything by an enormous factor.

### The genre-convention tell
When unrelated products (proposals, marketing, code) all claim the same round number, it's positioning, not measurement.

## 2. Why Your Own Judgment Is Unreliable

The METR randomized controlled trial (2025) found experienced open-source developers were **~19% slower** with AI tools, despite:
- Predicting a 24% speedup beforehand
- Believing they were 20% faster afterward

Lesson: **perceived** productivity and **actual** productivity diverge sharply. Never trust a vibe. Measure.

## 3. How to Actually Measure It

### Pick outcome metrics, not activity metrics
| Good (outcome) | Misleading (activity) |
|---|---|
| PR cycle time (open → merge) | Lines of code written |
| Time-to-resolve a ticket end to end | Number of AI completions accepted |
| Rework / revert rate | Characters autocompleted |
| Review turnaround time | "Feels faster" surveys |

### Run a lightweight A/B on yourself
1. Choose a repeatable workflow (e.g., "implement a small feature end to end").
2. For 2 weeks, log wall-clock time per task **without** the tool.
3. For 2 weeks, log the same **with** the tool.
4. Compare medians, not means (outliers dominate small samples).
5. Track a quality metric (bugs, reverts) so speed gains aren't hiding new costs.

### Beware confounds
- Learning effects: tasks feel faster the second time regardless of tooling.
- Selection bias: don't only measure tasks the AI is good at.
- Vendor studies: discount studies published by the tool seller.

## 4. Realistic Expectations

A study of ~300 engineers found ~31.8% faster PR review and close times. That is genuinely material — and it's roughly 1.3x on a specific workflow, consistent with Amdahl's math. Aim for stacking several modest, real gains rather than chasing one mythical 10x.

## 5. Questions to Ask Any Vendor
- What fraction of my total workflow does this touch?
- Is the benchmark end-to-end or a cherry-picked subtask?
- Who funded the study, and was it randomized/controlled?
- What's the effect on quality and rework, not just speed?

## TL;DR
Real gains are quieter than the marketing. Use Amdahl's Law to sanity-check claims, measure outcomes not activity, and don't trust your own sense of speed — it's demonstrably biased optimistic.
