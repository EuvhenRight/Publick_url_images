# Data Readiness Before AI: A Pre-Flight Guide

The post's core argument: the tool is the easy afternoon; the data cleanup is the quarter. This guide turns that lesson into a repeatable pre-flight check you run **before** picking any AI tool.

## The mental model

1. **Name the broken workflow first.** If you can't name it, you're not ready to buy anything.
2. **Inspect the data that workflow produces.** Assume it's messier than anyone claims.
3. **Redesign the workflow, then choose the tool.** Organizations that redesigned first were roughly twice as likely to see returns.

## Why this matters (the numbers from the post)

- ~88% of enterprises say they use AI somewhere.
- Only ~6% report a real earnings impact.
- ~80% of projects never reach production — mostly from messy data, not weak models.

These figures are directional (they circulate across enterprise AI surveys and vary by source). Treat them as a reminder that adoption != impact, not as precise benchmarks.

## Step 1 — Name the workflow

Answer in one sentence: "We want AI to help with ____ so that ____ improves."

Bad: "We want an AI-powered platform."
Good: "We want to reduce time-to-first-response on support tickets by drafting replies from prior resolutions."

If the sentence needs a tool name to make sense, stop.

## Step 2 — Audit the underlying data

Run the checklist below against the actual dataset the workflow depends on.

### Categorical consistency
- [ ] Are status/category fields normalized? (`open`, `Open`, `OPEN` are three values to a machine.)
- [ ] How many distinct values exist in fields that should have <10?
- [ ] Are there free-text fields being (mis)used for structured data — or for lunch orders?

### Identity & ownership
- [ ] Is there one canonical customer/record ID?
- [ ] How many duplicate records exist for the same real-world entity?
- [ ] Who owns the record definition when teams disagree?

### Completeness & freshness
- [ ] What % of rows have the fields the AI actually needs?
- [ ] How stale is the data? Is it still being written to?

### Trust
- [ ] Would a human trust this field to make a decision? If not, an AI reading it just launders the mess faster.

## Step 3 — Size the cleanup honestly

For each problem above, estimate: rows affected, rule complexity, and who must approve the fix. The founder in the post discovered his "AI project" was really six weeks of dedup rules and an ownership argument. Surface that up front so the roadmap is honest.

## Step 4 — Only now, choose a tool

With a named workflow, a redesigned intake process, and trustworthy data, tool selection becomes the easy afternoon it should be.

## Companion files
- `audit.ts` — a runnable data-quality profiler you can point at a CSV/JSON export.
- `prompt.md` — prompts for interrogating a stakeholder and for profiling a dataset with an LLM.
