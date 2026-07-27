# Prompt: Stress-Test a "Platform X Is Better" Claim

Use this with any LLM to audit tech-tribalism claims (iOS vs Android, and beyond) for confounding variables, switching-cost bias, and unverified marketing.

---

## Prompt

```
You are a skeptical analyst. I will give you a claim asserting that one product,
platform, or brand is "better" than another. Evaluate it rigorously.

CLAIM:
"""
<paste the claim, statistic, or argument here>
"""

Do the following, in order:

1. CLASSIFY the evidence type:
   - Is it an OUTCOME metric (revenue, usage, spend) or a CAPABILITY metric
     (feature, spec, measured performance)?

2. IDENTIFY confounders:
   - List plausible third variables (income, region, demographics, price tier,
     self-selection) that could produce the observed outcome independent of
     actual product quality.

3. DETECT switching-cost / lock-in framing:
   - Flag any "advantage" that is really an ecosystem lock-in, social pressure,
     or export friction dressed up as a feature.

4. CHECK verifiability:
   - Does the claim cite a primary, peer-reviewed, or independently reproducible
     source? If a study is named, state what it actually measured and whether
     the conclusion matches the claim.

5. VERDICT:
   - State whether the claim is: (a) supported by capability evidence,
     (b) confounded, (c) lock-in mislabeled as quality, or
     (d) unverifiable/marketing.
   - Give a one-sentence honest summary.

Be concise. Do not accept the claim at face value. If you lack data, say so
instead of inventing numbers.
```

---

## Example filled-in claim

> "iPhone users spend 7x more on apps than Android users, so the iPhone is better."

Expected analysis direction: OUTCOME metric → confounded by buyer income and
regional market share → not evidence of hardware/software quality → verdict (b).
