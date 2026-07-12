# Judgment Log Template

> Purpose: manufacture the deliberate-practice reps that AI now removes from everyday work.
> The post's core claim: seniors are made by low-stakes reps that AI is automating away.
> This log is how you keep the reps while still using AI.

Keep one file per week (e.g. `2026-W28.md`). Aim for 5–10 entries per week.

---

## Weekly goal

- Target reps this week: __ (aim for 5+)
- Skill I'm deliberately building: ______________________

---

## Entry template (copy per rep)

### Rep #__ — <short title>

- **Date:**
- **Context:** (what were you doing?)
- **My prediction BEFORE using AI:**
- **What AI / reality produced:**
- **The delta (where prediction ≠ outcome):**
- **Who was right & why:** (me / AI / genuine trade-off)
- **Rule of thumb extracted:**
- **Confidence I could reproduce this WITHOUT AI (1–5):**

---

## Example entry (filled in)

### Rep #1 — Flaky test root cause

- **Date:** 2026-07-12
- **Context:** A test failed ~1 in 10 runs in CI.
- **My prediction BEFORE using AI:** Probably a timing/async race in the setup.
- **What AI / reality produced:** Actual cause was a shared module-level fixture mutated across tests; order-dependent.
- **The delta:** I assumed concurrency; real issue was shared mutable state and test ordering.
- **Who was right & why:** AI/reality — I anchored on "flaky == async" and ignored global state.
- **Rule of thumb extracted:** Before blaming timing, check for state that persists between tests. Isolate fixtures first.
- **Confidence I could reproduce this WITHOUT AI (1–5):** 4

---

## End-of-week review

- Reps completed: __ / target
- Biggest surprise this week:
- Average "reproduce without AI" confidence:
- What I'll practice more next week:

---

## Why track "reproduce without AI" confidence?

The post warns: "You can't validate or architect what you can't model by hand." This single score is your leading indicator. If it trends up over months, your judgment is growing. If your output goes up but this stays low, you're producing without learning — exactly the trap the article describes.
