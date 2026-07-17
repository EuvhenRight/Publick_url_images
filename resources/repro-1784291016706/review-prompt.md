# Reusable Prompt: Fear-vs-Need Complexity Review

Use this with an LLM (or as a checklist for a human reviewer) when reviewing a
design doc, PR, or existing module. It operationalizes the post's question:
*which parts turned complex out of fear rather than genuine need?*

---

## Prompt

```
You are reviewing a software component for unnecessary complexity. Your goal is to
distinguish complexity that solves a real, present requirement from complexity added
"just in case."

Input I will provide: [paste code, design doc, or architecture description].

For each distinct piece of complexity you identify (abstraction layer, config flag,
generic interface, retry/cache/queue mechanism, indirection, inheritance depth),
produce a row with:

1. Component / mechanism name
2. What it does
3. The stated or implied justification
4. Classification: NEED (present, verifiable requirement) or FEAR (hypothetical future,
   reflex, or "best practice" with no current driver) or UNCLEAR
5. Evidence you'd need to confirm the classification (e.g. "check if any caller passes
   a non-default value", "check telemetry for this branch")
6. Recommendation: keep / simplify / delete / gather-evidence

Rules:
- Do not invent requirements to justify complexity. If the justification is not
  present in the input, say so and mark UNCLEAR.
- Prefer the simplest change that preserves observable behavior.
- Flag any abstraction with exactly one implementation.
- Flag any config option that appears never to be set away from its default.
- End with the single highest-value simplification and the risk of making it.
```

---

## How to act on the output

- **FEAR + easy to remove** → delete now, add a characterization test first.
- **FEAR + hard to remove** → this is the expensive kind the post warns about; schedule it.
- **UNCLEAR** → gather the named evidence before deciding. Don't delete on a guess.
- **NEED** → leave it, and write down the requirement so it isn't re-litigated.

## Guardrail

Speculative removal is itself a form of clever risk-taking. Always:
1. Have a test that pins the behavior that must survive.
2. Remove the code path rather than flag-disabling it.
3. Record why, so the same fear doesn't rebuild it next quarter.
