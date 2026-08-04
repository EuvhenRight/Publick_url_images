# Reusable prompts: driving a coding agent through legacy code

Copy-paste prompts for the legacy-modernization workflow in `guide.md`. They work with any capable coding agent (Devin, Claude Code, Cursor agent, Copilot Workspace). Fill in the `<>` placeholders. Each prompt asks for **one reviewable artifact** — that is what keeps a junior-level agent useful and safe.

---

## 1. System map (read-only)

```
You are onboarding to an unfamiliar codebase. Do NOT change any files.

Goal: produce a system map for <module / service / directory>.

Produce a single markdown document with:
1. Entry points (how execution starts: routes, jobs, CLI, cron).
2. The main modules and what each is responsible for, in one line each.
3. How a typical <request / transaction / job> flows end to end, step by step.
4. External dependencies: databases, queues, third-party APIs, files.
5. Anything you are unsure about, listed explicitly as open questions.

Cite the file and line for every claim. Do not guess silently — if intent
is unclear, put it under open questions.
```

---

## 2. Tribal-knowledge extraction (read-only)

```
Read <files/dir>. Do not modify anything.

Write a "things a new engineer would trip over" document:
- Magic numbers / hardcoded values and what they appear to mean.
- Non-obvious assumptions the code relies on (ordering, time zones, encoding,
  nullability, units).
- Dead code or unreachable branches you can identify.
- Every TODO/HACK/FIXME comment, restated in plain language with the risk it
  implies.

For each item give file:line and a confidence level (high/medium/low).
```

---

## 3. Characterization tests (additive, the safety net)

```
Target: <function / class / module>.

Write characterization tests that lock in the CURRENT behavior — including
behavior that looks wrong. The goal is a regression net before we change
anything, not to fix bugs.

Rules:
- Use <test framework>.
- Cover the happy path plus edge cases: empty, null, boundary values, and any
  error paths you can trigger.
- If current behavior is surprising, add the test AND a comment noting it looks
  suspicious — do not change the source.
- Do not modify production code. Tests only.

After writing, run the suite and report which tests pass and which fail.
```

---

## 4. Dependency & risk report (read-only)

```
Analyze <repo/dir> and produce a risk report, read-only:
- Files with no test coverage.
- Files that handle money, auth, PII, or external side effects.
- Modules with the most callers (highest blast radius if changed).
- Deprecated or unmaintained dependencies.

Rank the findings by "risk if we touch it blindly" and explain each ranking.
```

---

## 5. Scoped, reversible change (modifies code — needs review)

```
Task: <one specific change, e.g. "add null-safe handling to parseInvoice for
missing tax fields">.

Constraints:
- Change only what this task requires. If you find other problems, list them
  separately — do not fix them.
- Add or update tests so the new behavior is covered and existing
  characterization tests still pass.
- Work on branch <branch-name>. Do not touch main.
- Keep the diff small enough for a human to read in full.

When done: show the diff, the test results, and a 3-line summary of what
changed and why. Stop and wait for review before merging.
```

---

## 6. Dependency / framework upgrade (only with tests in place)

```
Upgrade <dependency> from <old version> to <new version>.

Preconditions you must confirm first: is there a runnable test suite? If not,
stop and tell me — we add characterization tests before upgrading.

Then:
- Make the minimal changes required for the new version.
- Run the full suite; iterate until green.
- List every breaking change you handled and every behavior you could NOT
  verify with tests, so a human can check those manually.
```

---

## Prompting rules that keep an agent safe on legacy code

- **One artifact per prompt.** A map, a test file, a diff — never "map it, test it, and refactor it" in one go.
- **Demand citations.** `file:line` for every claim turns confident hallucination into a checkable claim.
- **Ask for open questions and confidence.** "What are you unsure about?" surfaces exactly the spots a human must check.
- **Read-only until tests exist.** Modification prompts should refuse to run when there's no way to tell if the change worked.
- **Separate finding from fixing.** "List other problems, don't fix them" stops scope creep that a reviewer can't follow.
- **Always end modifying tasks with: show the diff, run the tests, wait for review.**
