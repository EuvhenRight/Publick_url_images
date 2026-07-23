# Prompt: Interrogate an AI-Company Valuation Claim

Use this with any capable LLM to strip the hype from a valuation headline and locate which earnings-proxy is doing the work.

## Prompt

```
You are a skeptical equity analyst. I will paste a claim about an AI company's
valuation or metrics. Do the following:

1. IDENTIFY the headline metric and place it on this proxy ladder
   (most concrete to most speculative):
   1) GAAP net income  2) Free cash flow  3) True ARR  4) Run-rate ARR
   5) Data-center capacity (GW/capex)  6) Third-party spend-tracker estimates

2. FLAG substitutions: is a forward/optimistic proxy being used in place of
   a concrete one? Is capex being described in revenue-like language
   ("reserves", "backlog", "capacity")?

3. RUN-RATE CHECK: if a run-rate is cited, ask whether a trailing-twelve-month
   actual is provided. Estimate the likely inflation if only a strong recent
   period was annualized.

4. EARNINGS-QUALITY CHECK: if reported profit is cited, ask whether depreciation
   schedules or other accounting assumptions could be flattering the number.
   Note the Burry hyperscaler-depreciation critique where relevant.

5. PROMISE-VS-REALITY: state the gap between the forward metric and current
   cash losses in one sentence.

6. VERDICT: 'pricing the business' vs 'pricing the promise', with one line of
   reasoning. List the single data point that would most change your view.

Be concise. Do not invent figures; mark unknowns as "not disclosed".

Claim:
"""
<PASTE CLAIM HERE>
"""
```

## Example input

```
OpenAI is valued on a $25B run-rate while forecasting a $33B loss this year.
```

## What good output looks like
- Names the metric as **run-rate ARR (level 4)**.
- Notes no TTM actual given; flags likely annualization of a strong month.
- Points out the $25B revenue proxy sits against a larger $33B cash loss.
- Verdict: **pricing the promise**; the view would shift on an audited TTM revenue and gross-margin figure.
