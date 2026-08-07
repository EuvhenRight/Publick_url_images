# AI-Assisted Pull Request Template

Use this template when a pull request includes substantial AI-generated or AI-assisted code. It is designed to keep review focused on intent, risk, and verification rather than raw code volume.

```markdown
## Summary

What changed?

-
-
-

Why is this change needed?

-

## AI assistance disclosure

Was AI used to generate, modify, or review this change?

- [ ] No
- [ ] Yes, for drafting code
- [ ] Yes, for refactoring
- [ ] Yes, for tests
- [ ] Yes, for documentation
- [ ] Yes, for review or debugging

Tool or model used, if relevant:

-

Human owner responsible for the final change:

-

## Scope control

This pull request is intended to change:

-

This pull request is not intended to change:

-

Files or areas that need extra reviewer attention:

-

## Risk assessment

Potential product risk:

- [ ] Low
- [ ] Medium
- [ ] High

Potential technical risk:

- [ ] Low
- [ ] Medium
- [ ] High

Main risks or assumptions:

-
-

Rollback plan:

-

## Verification

Tests run:

- [ ] Unit tests
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] Type check
- [ ] Lint
- [ ] Manual testing
- [ ] Not applicable

Commands run:

```bash
# paste commands here
```

Results:

-

Tests not run, and why:

-

## Behavior changes

User-visible behavior changes:

-

API, database, security, or performance implications:

-

## Reviewer checklist

- [ ] The change matches the stated product intent.
- [ ] The pull request is small enough to review responsibly.
- [ ] AI-generated code has been read and understood by the author.
- [ ] The implementation follows project conventions.
- [ ] Edge cases and failure modes are considered.
- [ ] Tests cover the important behavior.
- [ ] The reviewer can explain why this is safe to merge.
```

## Suggested team policy

Do not require an AI disclosure for every autocomplete-level suggestion. Do require it when AI materially shaped the design, implementation, tests, or review summary. The goal is accountability, not paperwork.