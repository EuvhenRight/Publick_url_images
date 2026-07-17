# Judging AI-Generated Code: A Practical Review Framework

The LinkedIn post argues that the frontend developer's core skill has shifted from *producing* lines to *judging* output that arrives faster than you can vet it. This guide turns that observation into a concrete, teachable workflow.

## The three phases (mapped to the post)

| Phase | Old job | New job | Failure mode |
|-------|---------|---------|--------------|
| Upstream | Type boilerplate | Specify intent precisely | Vague prompts → plausible-but-wrong code |
| Middle | Write every line | Accept/reject suggestions | Auto-accepting → silent scope creep |
| Downstream | Debug your own code | Rework code you didn't write | Churn (GitClear: ~41% higher for AI code) |

## Why this matters

Two data points from the post frame the problem:

- **~20% acceptance rate** (ZoomInfo 2025 rollout): most suggestions are rejected. Rejection *is* the work.
- **~41% higher churn** (GitClear): AI code that looks finished at 10am is often rewritten by 4pm.

The implication: speed of generation is not speed of delivery. The bottleneck moved from the blank file to the review gate.

## A review checklist for AI-generated components

Run each suggestion through these gates before accepting.

### 1. Intent match
- [ ] Does it solve the problem I specified, or a *nearby* problem?
- [ ] Are there invented requirements (extra props, unused states, speculative features)?

### 2. Correctness
- [ ] Edge cases: empty, loading, error, null/undefined data.
- [ ] Does it handle the async lifecycle (cleanup, cancellation, stale closures)?
- [ ] Are dependencies real and current, or hallucinated / deprecated?

### 3. Fit with the codebase
- [ ] Matches existing patterns (state management, styling, file structure)?
- [ ] Introduces a new library where an existing one already works?
- [ ] Accessibility: labels, roles, keyboard support?

### 4. Maintainability (the churn tax)
- [ ] Would a teammate understand this in 3 months?
- [ ] Is it duplicated logic that should be extracted?
- [ ] Am I keeping this because it's *right*, or because it's *already there*?

> Rule of thumb: if you can't explain why a line is correct, you can't accept it. "The AI wrote it" is not a review.

## Training judgment in developers who never faced the blank file

The post's closing question: how do you build review instinct in someone who never had to build from scratch?

Practical exercises:

1. **Reject-first drills.** Give a junior a fully AI-generated component with 3 seeded bugs (a stale closure, a missing error state, a hallucinated import). Goal: find all three before accepting anything.
2. **Prompt-to-diff comparison.** Have them write a spec, generate code, then hand-write the same component. Compare. Discuss where generation diverged from intent.
3. **Churn tracking.** Tag AI-authored PRs. Review how much gets rewritten within two weeks. Make the hidden line item visible.
4. **Explain-the-line reviews.** In code review, ask "why this line?" on AI sections. If the answer is a shrug, it goes back.

## Bottom line

The day didn't get shorter — the skill moved. Optimize the two new bottlenecks: **specifying intent** (upstream) and **rejecting cheaply** (middle + downstream). The checklist and prompt in this folder are starting points.