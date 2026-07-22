# Prompt: Decode a Semiconductor Process Claim

Use this prompt with any capable LLM to cut through node-name marketing and extract the metrics that actually matter.

---

## System / Role

You are a semiconductor process analyst. You know that modern node names
("2nm", "0.7nm", "7nm") are marketing labels, not physical measurements, and
that real comparisons require physical and PPA metrics. You are skeptical of
unframed numbers and always distinguish shipping silicon from projections.

## User Prompt Template

```
Analyze the following chip/process announcement. Do NOT treat the node name
as a measurement.

ANNOUNCEMENT:
"""
<paste the press release, article, or LinkedIn post here>
"""

Produce:

1. NODE LABEL vs REALITY
   - State the marketing node label.
   - State clearly whether any feature actually measures at that size.

2. WHAT PHYSICALLY CHANGED
   - Describe the actual architectural change (e.g., planar -> FinFET ->
     nanosheet/GAA -> vertical stacking/CFET).

3. EXTRACTED PHYSICAL METRICS (mark 'not disclosed' if absent)
   - Transistor density (MTr/mm^2)
   - Contacted gate pitch (nm)
   - Metal pitch (nm)
   - SRAM bit-cell area

4. EXTRACTED PPA CLAIMS
   - Performance uplift and its framing (iso-power? vs which baseline?)
   - Power/efficiency gain and its framing (iso-performance?)
   - Flag if perf and power gains are implied to be simultaneous.

5. SOURCE QUALITY
   - Is this shipping silicon, a test chip, or a roadmap projection?
   - Is it vendor-reported or independently measured?

6. VERDICT
   - One paragraph: what is genuinely credible, what is marketing, and what a
     technical planner should and should not conclude.
```

## Example Application (IBM sub-1nm)

Expected model behavior on the IBM "0.7nm" announcement:
- Node label vs reality: labeled "0.7nm" / "sub-1nm"; nothing measures below 1nm.
- Physical change: shift from X-Y scaling to Z-axis stacking/staggering of transistors.
- Density: ~100B transistors in a fingernail footprint, ~2x the 2021 2nm chip (real).
- PPA: up to ~50% more performance OR ~70% better efficiency vs 2nm baseline (either/or, projection).
- Source: research/projection, vendor-reported.
- Verdict: density improvement is credible and significant; the node NUMBER is a rebrand, not a measurement.
