# Diagnosing a Stalled AI Pilot: Model Problem or Fit Problem?

The LinkedIn post ends with a sharp question: when your AI pilot stalls, "was the model actually bad, or did it just never fit how your team works?" This guide turns that question into a repeatable diagnostic you can run before you scrap a project (and join the 42% who abandoned most of their AI work in 2025).

## Why this matters

Most AI failures are attributed to "the model wasn't good enough" when the real cause is workflow fit: no clear owner, no baseline to beat, unrealistic accuracy expectations, or a tool bolted onto a process nobody actually uses. Misdiagnosing the cause means you either buy more shovels (chasing a better model) or quit a project that a small workflow change would have saved.

## The two failure classes

### 1. Model / capability failure
The underlying model genuinely cannot do the task at the quality you need.

Signals:
- Accuracy plateaus well below the usable threshold even with good prompts and retrieval.
- Errors are unpredictable and unfixable (hallucinated facts, reasoning breakdowns on core cases).
- Stronger models (or fine-tuning) move the needle meaningfully — proving capability was the ceiling.

### 2. Fit / adoption failure
The model is capable, but it never landed in how work actually happens.

Signals:
- The pilot works in demos but nobody uses it in real workflows.
- No one owns the output; results go into a doc no one reads.
- The tool adds a step instead of removing one.
- Success was never defined, so "is it working?" has no answer.
- Integration friction (copy-paste, context switching, no API into existing tools).

## The diagnostic (run in order)

**Step 0 — Did you define success up front?**
If there was no target metric and no baseline, you cannot diagnose anything. Stop and define them retroactively before judging the pilot.

**Step 1 — Establish the baseline.**
What did the process cost (time, error rate, dollars) *without* AI? If you can't state this, the failure is measurement, not model.

**Step 2 — Isolate the model.**
Hand-run 20-50 representative cases through the model with your best manual prompt and full context. Score them.
- If quality is poor even here → likely a model/capability failure.
- If quality is good here but bad in production → likely a fit/integration failure.

**Step 3 — Check the workflow path.**
Map the actual steps a user takes. Count clicks, context switches, and manual steps. If the AI output requires more effort to use than the old way, it's a fit failure regardless of model quality.

**Step 4 — Check ownership and trust.**
Ask: who is accountable for acting on the output, and do they trust it? No owner or no trust = fit failure.

**Step 5 — Decide.**
- Capability failure + high value → try a stronger model, retrieval, or fine-tuning; or wait/kill if ceiling is fundamental.
- Fit failure → fix the workflow, not the model. Usually cheaper and faster.
- Low value either way → kill it deliberately (a good decision, not a failure).

## Decision table

| Manual test quality | Production quality | Likely cause | First action |
|---|---|---|---|
| Poor | Poor | Model/capability | Stronger model, retrieval, fine-tune, or kill |
| Good | Poor | Fit/integration | Fix workflow & integration |
| Good | Good but unused | Adoption/ownership | Assign owner, remove a step |
| Good | Good and used | Not a failure | Scale it |

## The honest kill criteria

Abandoning a pilot is fine — if it's a decision, not a drift. Kill deliberately when:
- Value is low even at perfect quality, OR
- It's a capability failure and the capability ceiling is fundamental for your use case, OR
- Fixing the fit would cost more than the value delivered.

Document the reason. A recorded "we killed X because Y" is worth far more than a project that quietly evaporates into the 42%.

## Related resource
See `diagnostic-prompt.md` for a copy-paste prompt that walks a stakeholder through this diagnostic in a single conversation.
