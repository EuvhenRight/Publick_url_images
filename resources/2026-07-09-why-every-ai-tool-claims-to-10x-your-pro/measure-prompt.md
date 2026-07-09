# Prompt: Stress-Test an AI Tool's Productivity Claim

Use this prompt with any LLM (or as a personal checklist) to evaluate a vendor's productivity claim before you believe it.

---

## Prompt

```
You are a skeptical productivity analyst. I will paste a marketing claim about
an AI tool. Evaluate it rigorously and DO NOT accept the claim at face value.

Claim: """
<PASTE THE VENDOR CLAIM HERE, e.g. "10x your coding output">
"""

My context:
- Role: <e.g. backend engineer>
- Fraction of my day this tool touches: <estimate 0-100%>
- The workflow I'd apply it to: <describe end to end>

Do the following, in order:

1. AMDAHL CHECK. Using Amdahl's Law, compute the theoretical MAXIMUM total
   speedup if the touched fraction became instant. State whether the claimed
   number is even mathematically possible given my fraction.

2. SCOPE CHECK. Identify whether the claim measures an isolated subtask or an
   end-to-end workflow. Flag any "benchmark vs. genre convention" red flags
   (suspiciously round numbers, same figure used across unrelated products).

3. EVIDENCE CHECK. Ask: who funded the study? Was it randomized/controlled?
   Note that self-reported speedups are unreliable (the METR RCT found devs
   were ~19% slower yet believed they were ~20% faster).

4. QUALITY CHECK. What downstream costs might offset the speed gain
   (rework, review burden, defects, verification time)?

5. VERDICT. Give a realistic expected total speedup range for MY context,
   and one concrete experiment I can run this week to verify it.

Be concrete and quantitative. Prefer ranges over single numbers.
```

---

## How to run the self-experiment (step 5 output)

1. Define one repeatable end-to-end task.
2. Baseline: log wall-clock time for ~10 instances **without** the tool.
3. Treatment: log ~10 instances **with** the tool.
4. Compare **medians**, and track a quality metric (reverts, bugs, review comments).
5. Only trust the result if the effect survives your quality metric.

## Reminder
Modest, real, stacked gains (e.g. ~1.3x on PR cycle time) beat a mythical 10x. Measure outcomes, not keystrokes.
