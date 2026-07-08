# AI-Assisted Change: PR Checklist

Paste this into your pull request template (`.github/pull_request_template.md`) or copy into the PR description for any change that used significant AI assistance.

---

## AI Assistance Disclosure

- [ ] This PR includes code generated or heavily shaped by an AI tool.
- Tool(s) used: `_______________`
- Approximate share of the diff that is AI-generated: `___%`

## Explain

- [ ] I can explain, in my own words, what every non-trivial block does.
- [ ] I understand *why* this approach was chosen over obvious alternatives.
- One-line summary of the approach and its main trade-off:
  > `_______________________________________________`

## Test

- [ ] Tests assert the behavior I *intended*, not just behavior the AI produced.
- [ ] I added or reviewed at least one test that would fail if the core logic were subtly wrong.
- [ ] Edge cases considered: `_______________`

## Own

- [ ] I would be comfortable debugging this at 2am without AI help.
- [ ] No unexplained "magic" remains (unclear regexes, opaque config, clever one-liners).

## Risk tier

- [ ] Low (internal/throwaway) — skim acceptable
- [ ] Medium (feature code) — full author review done
- [ ] High (auth / payments / data / security / concurrency) — second-human review required

## For High-risk changes only

- [ ] A second engineer has independently read and can explain the change.
- Design rationale (why this is correct, not just that it passes):
  > `_______________________________________________`

---

**Guiding rule:** If you cannot check the three boxes under *Explain*, *Test*, and *Own*, do not merge into a production or data-handling path. Reduce scope, rewrite the unclear part, or defer.
