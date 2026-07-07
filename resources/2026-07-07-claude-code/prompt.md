# Reusable Prompts for Long-Horizon Claude Code Tasks

Copy, fill the brackets, and paste into Claude Code.

## 1. Repo Exploration (before any edits)

```
Before changing anything, explore this repository and give me:
1. A one-paragraph summary of the architecture.
2. The key entry points and where core logic lives.
3. Any risky or fragile areas relevant to: [TASK].
Do NOT edit files yet. End with a proposed plan I can approve.
```

## 2. Plan-First Feature Work

```
Goal: [FEATURE DESCRIPTION].
Acceptance criteria:
- [CRITERION 1]
- [CRITERION 2]

Produce a step-by-step implementation plan with named phases.
For each phase list: files touched, risk level, and how I verify it.
Wait for my approval before writing code.
```

## 3. Multi-Day Audit / Migration

```
I want to [AUDIT/MIGRATE]: [SCOPE].
Break this into phases sized ~2-4 hours each.
After each phase, stop and give me:
- A diff summary
- Test/lint results
- Remaining risks
We will run one phase per session. Start with Phase 1 only.
```

## 4. Safe Refactor Guardrails

```
Refactor [MODULE] to [GOAL].
Constraints:
- Do not change public APIs without flagging them.
- Keep all existing tests passing; add tests for new behavior.
- Show me a summary diff before applying large changes.
Proceed phase by phase.
```

## 5. Post-Run Review

```
Summarize what you changed in this session:
1. Files modified and why.
2. Any assumptions you made.
3. Anything you skipped or couldn't verify.
4. Suggested commit message.
```

## Tips

- Keep a `CLAUDE.md` so these prompts start with shared context.
- Commit before running prompts 3 and 4 so rollback is trivial.
- If you hit quota or cache issues mid-task, ask Claude to write the current plan and progress to a `PROGRESS.md` file so you can resume.