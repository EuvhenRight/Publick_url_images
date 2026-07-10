# Code-Ready Is Not System-Ready: A Review Ordering Guide

This guide turns the post's core argument into an actionable review workflow. The premise: AI collapsed the cost of *writing* code, so the bottleneck moved to *reading and judgment*. The fix is not more reviewers — it's ordering.

## The core model

```
AI first  -> noise filter (syntax, style, obvious bugs, known patterns)
Human next -> judgment layer (context a model structurally cannot see)
```

The human is not there to catch typos. They are there to supply context the model has no access to.

## What the model CAN see

- The files in the diff
- The prompt / instructions
- Whatever fits in the context window
- Public patterns learned during training

## What the model CANNOT see (the escaped-bug zone)

| Category | Example | Why the model misses it |
|---|---|---|
| Past incidents | "We had an outage when this cache was invalidated eagerly" | Not in the repo |
| Architecture decisions | "This service must stay stateless for our failover model" | Lives in ADRs / people's heads |
| Security policies | "PII must never leave region X" | Contractual / org policy |
| Concurrency under load | Race condition only visible at 10k RPS | Not observable from static files |
| Customer contracts | SLA / data-handling commitments | External to the codebase |

Most escaped bugs are **system-level failures**, not syntax errs. That is precisely the category no code-only reader can catch.

## Practical review checklist (human layer)

Run these AFTER the AI pass. Each question targets context the model lacks.

1. **Blast radius** — What breaks downstream if this is wrong? Which services/consumers depend on this behavior?
2. **Incident memory** — Have we been burned by this area before? Search incident logs, not just the diff.
3. **Load behavior** — Does this hold under concurrency, retries, and partial failure? Not just "does it compile."
4. **Policy & compliance** — Does this move, log, or expose data in a way a contract or regulation prohibits?
5. **Architecture fit** — Does it respect existing boundaries (statelessness, ownership, idempotency)?
6. **Reversibility** — If this ships bad, how fast can we detect and roll back?

## Fighting alert fatigue

The post notes false-positive rates of ~5-15% and teams ignoring up to ~40% of alerts once fatigue sets in. To keep the AI layer trusted:

- **Tier alerts by confidence.** Block only on high-confidence findings; surface the rest as advisory.
- **Suppress with a reason, not silence.** Every dismissed finding gets a one-line justification so patterns are auditable.
- **Track precision monthly.** If a rule's false-positive rate exceeds your threshold, tune or retire it.
- **Never auto-merge unreviewed.** The 31% no-review merge rate cited is the failure mode, not the target.

## Metrics worth watching

The post cites a Faros AI study of ~22,000 developers over two years: code churn +861%, incidents per change +243%, review time +441%, no-review merges +31%. Whether or not your numbers match, the *shape* is the point: volume up, quality gate under-resourced.

Track your own version:

- **Change failure rate** (incidents per change)
- **Code churn** (lines rewritten within N days)
- **Review lead time** (is the human layer becoming the bottleneck?)
- **Escaped-defect origin** (diff-visible vs. system-level)

If most escaped defects are system-level, more static analysis won't help — invest in the human judgment layer and better context surfacing.

## The one-line takeaway

> AI didn't make code worse; it made code faster. Order your pipeline so machines filter noise and humans supply the context no model can see.
