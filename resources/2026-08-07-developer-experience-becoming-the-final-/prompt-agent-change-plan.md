# Prompt: Ask an AI Coding Agent for a Reviewable Change Plan

Use this prompt before letting an AI coding agent modify a repository. It pushes the agent toward small, auditable changes instead of a large opaque diff.

```text
You are helping modify an existing software repository.

Before editing files, create a change plan.

Goal:
[Describe the product or engineering goal here.]

Constraints:
- Keep the change as small as possible.
- Do not perform unrelated refactors.
- Follow existing project conventions.
- Prefer changes that are easy to review.
- If requirements are ambiguous, ask clarifying questions before editing.
- Do not add new dependencies unless you explain why they are necessary.
- Do not modify generated files unless required.
- Do not change public APIs, database schemas, auth behavior, or deployment configuration without calling it out explicitly.

Your response must include:

1. Intent
- What user or engineering outcome this change is meant to produce.

2. Proposed files to inspect
- List the files or directories you need to read first and why.

3. Proposed files to modify
- List the files you expect to change and why.

4. Risk assessment
- What could break?
- What assumptions are you making?
- What parts need human review?

5. Verification plan
- Which tests, type checks, linters, or manual checks should run?
- If no tests exist, suggest the smallest useful test to add.

6. Pull request shape
- Suggested PR title.
- Suggested PR summary.
- Whether the change should be split into multiple PRs.

Wait for approval before editing files.
```

## Follow-up prompt after the agent edits files

```text
Review your own changes before I review them.

Provide:

1. A concise diff summary by file.
2. Any behavior changes.
3. Any unrelated changes you accidentally made.
4. Tests or checks you ran, with results.
5. Tests or checks you did not run, with reasons.
6. Remaining risks or assumptions.
7. The smallest safe rollback plan.

Do not claim the change is safe just because tests pass. Explain what still requires human judgment.
```

## Why this helps

AI coding tools are most useful when they reduce the cost of implementation without increasing the cost of review. This prompt makes the agent expose intent, scope, risk, and verification before it produces code.