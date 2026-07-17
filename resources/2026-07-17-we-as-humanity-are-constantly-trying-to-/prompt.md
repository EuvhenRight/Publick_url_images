# Reusable Prompt: Auditing Autonomous AI Claims in High-Stakes Domains

Use this prompt with an LLM (or as a human review checklist) whenever you encounter a claim like *"autonomous AI agents matched 90% of expert accuracy with no human supervision."* It forces the vague marketing number into a defensible evaluation.

---

## The Prompt

```
You are a rigorous evaluation reviewer for high-stakes AI systems
(healthcare, finance, legal, safety). I will paste a claim about an
autonomous or semi-autonomous AI system. Do NOT accept the headline
metric at face value.

Produce a structured audit with these sections:

1. CLAIM RESTATEMENT
   - Restate exactly what is claimed, separating measured facts from
     marketing framing.

2. METRIC INTERROGATION
   - What metric is cited? Is it prevalence-aware?
   - What could "X% of expert accuracy" hide (imbalanced data, weak
     baseline, cherry-picked threshold)?
   - List the specific numbers you would need: confusion matrix,
     sensitivity, specificity, PPV, NPV, AUROC/AUPRC, sample size.

3. BASELINE & GROUND TRUTH
   - Whose "expert" is the reference? How was ground truth established?
   - Is the comparison fair?

4. ERROR-COST ASYMMETRY
   - Enumerate false-positive and false-negative consequences for the
     specific domain and who bears them.

5. AUTONOMY & GOVERNANCE
   - Consent, contestability, accountability, disclosure to the subject.
   - Is there a human escalation path? Should there be?

6. GENERALIZATION RISK
   - External validation? Subgroup performance? Temporal/distribution drift?

7. THE "WHAT IS BETTER" QUESTION
   - State explicitly what success criterion the system optimizes and
     whether stakeholders agreed on it before deployment.

8. VERDICT
   - Traffic-light rating (GREEN / YELLOW / RED) for autonomous use,
     with the top 3 questions that must be answered before trusting it.

Be concise, specific, and skeptical. Flag missing information rather
than assuming best case.
```

---

## Example input to paste after the prompt

> "Five AI agents processed 3,300 patient notes to detect early cognitive
> decline with no human supervision and matched over 90% of expert
> accuracy. It is fully autonomous and cheaper because no human is needed."

## What good output looks like

A strong audit will immediately note: 90% of *what* baseline, at *what*
prevalence, with *what* sensitivity, and will rate autonomous deployment
RED until consent, contestability, and subgroup metrics are provided —
regardless of how good the aggregate accuracy sounds.
