# Measuring Your Real AI Productivity Multiplier

The LinkedIn post makes a simple point: "10x" is marketing, not measurement. This guide gives you a practical, honest way to measure your *own* multiplier instead of trusting a vibe.

## Why measure at all?

The research cited in the post is worth understanding before you measure:

- **GitHub Copilot RCT (2023):** In a controlled experiment, developers completed a *single, narrow* task (writing an HTTP server in JavaScript) ~55% faster with Copilot. Real, but narrow.
- **METR study (2025):** Experienced open-source developers working on their *own* mature repos were measurably *slower* with AI tools — while self-reporting that they felt faster. The perception gap is the core trap.
- **GitClear churn analysis:** AI-associated code showed materially higher "churn" (lines rewritten or deleted shortly after being committed). More output != more value.

Takeaway: speed on toy tasks doesn't generalize, and your *feeling* of speed is unreliable. So measure.

## The honest measurement method

You don't need a lab. You need a consistent baseline and a log.

### 1. Pick comparable task types
Group work into categories where AI plausibly helps or hurts:
- Boilerplate / scaffolding
- Tests
- Docs / comments
- Bug fixing in unfamiliar code
- Bug fixing in *your own* mature code
- Novel design / architecture

Measure per category. A single global "multiplier" hides the truth.

### 2. Track time honestly
For each task record:
- Estimated time without AI (or a matched historical baseline)
- Actual wall-clock time with AI, **including** prompt-wrangling, reviewing, and fixing
- Rework in the following 1-2 weeks (churn)

The most common mistake is counting the fast first draft and ignoring the cleanup.

### 3. Compute the multiplier
```
multiplier = baseline_time / (ai_time + rework_time)
```
If it's below 1.0, AI slowed you down for that category. That's a valid, useful finding.

### 4. Watch the perception gap
After each task, note how fast you *felt* (1-5) alongside the measured time. Over a few weeks you'll see whether your gut tracks reality. Usually it doesn't.

## Interpreting results

- **Tedium (boilerplate, tests, docs):** most people find a genuine win here (often 1.2x-2x).
- **Mature/complex code you know well:** frequently 0.8x-1.1x. AI suggestions cost more review time than they save.
- **Churn matters:** if code you shipped fast gets deleted next week, subtract it. Deleted lines are not productivity.

## The point

A measured 1.3x is more valuable than a marketed 10x, because it's real and it tells you *where* to use the tool. Use the included log template to gather your own numbers.
