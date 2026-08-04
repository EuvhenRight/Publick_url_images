# Putting an AI Software Engineer on Legacy Code

A human-in-the-loop playbook for the exact situation Japan is betting on: pointing a coding agent (Devin, Claude Code, Cursor's agent, Copilot Workspace, etc.) at old, tangled, under-documented systems whose original authors are gone.

The uncomfortable truth from the post this accompanies: on its own, an agent resolves only a fraction of real-world coding tasks (public SWE-bench-style benchmarks put single-shot autonomous resolution somewhere in the low tens of percent), and messy legacy code is its *worst* case. That is not a reason to skip it. It is a reason to change the job you give it. The agent's highest-value work on legacy code is **archaeology and scaffolding**, not autonomous rewrites.

---

## The core mental model

Don't hire the agent as a solo engineer who ships. Hire it as a tireless junior who:

1. **Reads faster than any human** — reconstructs how the system works from the code itself.
2. **Never gets bored** of writing characterization tests, docstrings, and dependency maps.
3. **Must have its work checked** — every change gets a human review and a green test suite before it lands.

That framing is why "-kun" fits. You are training a junior, not replacing a senior.

---

## Phase 0 — Make the environment safe before the agent touches anything

Agents are only as safe as the guardrails around them. Do this first:

- **Work on a branch, never on `main`.** Every agent run is a PR you can throw away.
- **Pin the blast radius.** Give the agent a scoped working directory / repo, not prod credentials.
- **Get *some* test to run.** Even a single smoke test that boots the app is worth more than none. If nothing runs, Phase 1's first job is to make one thing runnable.
- **Turn on a diff review gate.** No agent commit merges without a human approving the diff.
- **Snapshot behavior.** For legacy systems the spec *is* the current behavior. Capture real inputs/outputs before changing anything so you can prove you didn't break them.

---

## Phase 1 — Archaeology (where agents actually shine)

Use the agent to turn an opaque system into a documented one. This is low-risk (read-only or additive) and high-leverage.

Ask it to produce, one artifact per task:

- **A system map**: entry points, modules, data stores, external calls, and how a request flows end to end.
- **A "tribal knowledge" doc**: implicit assumptions, magic numbers, dead code, and TODO/HACK comments explained in plain language.
- **A dependency & risk report**: which files change together, which have no tests, which touch money/PII.
- **Characterization tests**: tests that assert *what the code does today*, not what it should do. These become your safety net for every later change.

Review each artifact like you would a junior's onboarding notes. Correct the agent's misreadings — that feedback makes the next task better.

---

## Phase 2 — Small, reversible changes

Only after the system is mapped and pinned by characterization tests do you let the agent modify code. Keep each task:

- **Narrow** — one behavior, one module, one PR. "Add null handling to `parseInvoice`," not "modernize the billing system."
- **Test-fenced** — the task is done only when new + existing tests pass.
- **Reversible** — a diff a human can read in one sitting and revert in one click.

Good starter tasks on legacy code: adding missing tests, tightening error handling, replacing a deprecated dependency, extracting a function, adding logging/observability, writing migration scaffolding for a human to finish.

---

## Where agents win vs. lose on legacy code

| Task | Fit | Why |
|---|---|---|
| Reconstruct how a subsystem works | Strong | Reads all the code without fatigue |
| Write characterization / regression tests | Strong | Mechanical, high-volume, easy to verify |
| Document undocumented modules | Strong | Pattern-matches intent from code + naming |
| Localized bug fix with a failing test | Good | Clear target, clear success signal |
| Dependency / framework upgrade | Mixed | Fine with tests; risky without them |
| Broad refactor across many files | Weak | Loses the thread; changes ripple invisibly |
| Rewrite an undocumented system from scratch | Weak | No spec, no oracle, silent behavior drift |

Rule of thumb: **the better your tests, the more autonomy the agent has earned.** Legacy code with no tests means the agent's job is to build the tests first.

---

## The human-in-the-loop checklist (per task)

```
[ ] Task is scoped to one behavior / one module
[ ] There is a way to tell if it worked (a test, a repro, an output to diff)
[ ] Agent runs on a branch, not main
[ ] Characterization tests exist for the code being touched
[ ] Diff is small enough for a human to fully read
[ ] A human reviewed the diff and understands every line
[ ] Full test suite is green before merge
[ ] Behavior snapshot (Phase 0) still matches
```

If you can't check the first two boxes, the task isn't ready for an agent yet — it's ready for scoping.

---

## Adoption question, reframed

The post ends on whether an AI coder feels like a rival or the teammate you can't hire fast enough. Operationally the answer is the same either way: **give it the work humans dread and can verify — reading, documenting, and testing old code — and keep a person on the review gate.** That's the setup that pays off whether your team is short 789,000 engineers or just short on time.
