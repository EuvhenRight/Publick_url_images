# Managing Comprehension Debt in AI-Assisted Development

This guide gives engineering teams a concrete, adoptable process for merging AI-generated code without accumulating *comprehension debt* — code that ships, passes tests, and works, but that nobody on the team can actually explain.

## The core distinction

- **Technical debt**: messy but readable code. You understand it; it's just not clean. You can pay it down deliberately.
- **Comprehension debt**: confident-looking code you (or your team) cannot explain. Passing tests hide the gap. It surfaces at 2am when something breaks and no human on the team has a mental model of the system.

AI accelerates the ~14% of the day spent typing code. It does little for the ~86% spent deciding *what* to build and *why*. Comprehension debt grows precisely when we let the fast part outrun the slow part.

## A practical merge rule (the "Explain-Test-Own" gate)

Before merging AI-written code, the author must be able to satisfy all three:

1. **Explain** — Can you describe, in your own words, what each non-trivial block does and *why* this approach over alternatives? If not, you're rubber-stamping.
2. **Test** — Do the tests assert *behavior you intended*, not just behavior the AI happened to produce? Generated tests that pin generated behavior prove nothing.
3. **Own** — Would you be comfortable debugging this at 2am with no AI available? If the honest answer is no, the change is not ready.

If you can't pass the gate, choose one:
- Ask the AI to explain the code, then verify the explanation against the code (don't trust it blindly).
- Rewrite the unclear section yourself.
- Reduce scope: merge the part you understand, defer the rest.

## Tiered review by risk

Not all code needs the same scrutiny. Calibrate effort to blast radius.

| Risk tier | Examples | Requirement |
|-----------|----------|-------------|
| Low | Internal scripts, throwaway prototypes, docs | Skim + tests pass |
| Medium | Feature code behind a flag, non-critical paths | Full Explain-Test-Own by author |
| High | Auth, payments, data migrations, concurrency, security | Explain-Test-Own + second-human review + explicit design rationale in PR |

## Habits that keep comprehension debt low

- **Prompt for reasoning, not just output.** Ask *why*, ask for alternatives considered, ask what it would break.
- **Write the intent first.** A one-paragraph problem statement before generating keeps the 86% (deciding what to build) in human hands.
- **Small diffs.** Comprehension scales inversely with diff size. Prefer many reviewable PRs over one large generated one.
- **Document the "why" in the PR, not the "what."** The diff shows what changed; you must supply why.
- **Periodic "can you explain it?" spot checks.** Randomly ask an engineer to walk through a recently merged AI-assisted change. If they can't, that's a signal, not a punishment.

## Answering the post's question

> What's your actual rule for merging AI-written code you don't fully understand yet?

A defensible team default: **Do not merge code you cannot explain into any path that runs in production or handles user data.** For low-risk internal code, allow it explicitly and label it, so future readers know it was fast-tracked. The point isn't to slow everyone down — it's to make the trade-off *conscious* instead of silent.
