# Evaluating Autonomous AI in High-Stakes Domains: A Practical Guide

This guide turns the philosophical question from the post — *"What standard would you want a system measuring your own mind against?"* — into a concrete evaluation framework you can apply when deploying autonomous AI agents in high-stakes settings (healthcare, finance, legal, safety).

## Why this matters

The headline claim ("5 agents, 3,300 notes, 90%+ of expert accuracy, no human supervision") is impressive but incomplete. "90% of expert accuracy" tells you almost nothing without answers to the questions below. This guide gives you the checklist and the math to interrogate such claims responsibly.

---

## 1. Interrogate the headline metric

"Matched 90% of expert accuracy" can mean many different things. Before trusting it, pin down:

- **Baseline definition**: Whose expertise is the reference? Single clinician, consensus panel, or a downstream ground-truth (e.g., confirmed diagnosis years later)?
- **Metric choice**: Accuracy is misleading for rare conditions. If only 8% of notes show cognitive decline, a model that always says "no decline" is 92% accurate and 100% useless.
- **Prevalence-aware metrics**: Prefer sensitivity/recall, specificity, PPV, NPV, and AUROC/AUPRC.

## 2. Cost of each error type is asymmetric

In cognitive-decline screening:

| Error | Consequence |
|-------|-------------|
| False negative | Missed early intervention window; harm to patient |
| False positive | Anxiety, unnecessary testing, cost, potential stigma |

A single "accuracy" number hides this trade-off. Always request a confusion matrix and the operating threshold.

## 3. The "patient out of the room" problem

Autonomy is not free. Ask:

- **Consent**: Did the subject agree to an autonomous verdict, or only to research?
- **Contestability**: Can a person see, question, and appeal the output?
- **Accountability**: When the system is wrong, who is responsible?
- **Disclosure**: Is the human told a machine made the assessment?

"Completely autonomous" and "cheaper because you don't need a human" are engineering wins that can be governance failures if these questions are unanswered.

## 4. Distribution & generalization

- Was validation on a held-out set from the *same* hospital, or external sites?
- Demographic subgroup performance (age, race, language, comorbidities)?
- Temporal drift: notes change as clinical documentation practices change.

## 5. A minimal deployment gate

Before any autonomous high-stakes deployment, require:

1. Pre-registered metrics with prevalence-adjusted thresholds.
2. Subgroup performance tables (no single aggregate number).
3. A human-in-the-loop escalation path for borderline cases.
4. Continuous monitoring with drift alarms.
5. An explicit, published definition of "better" — the post's core point: *we shipped before agreeing what better means.*

---

## Companion files

- `evaluation.ts` — runnable TypeScript showing why "90% accuracy" can be worthless and how to compute honest metrics.
- `prompt.md` — a reusable prompt for auditing vendor/research claims about autonomous AI systems.
