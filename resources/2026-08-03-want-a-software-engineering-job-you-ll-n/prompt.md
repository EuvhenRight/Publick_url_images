# Adversarial Code-Review Prompt for AI-Generated Changes

Use this prompt to make an AI assistant audit its own (or another model's) output
adversarially instead of cheerleading it. The goal is to surface the
confident-but-broken cases described in the accompanying `guide.md`.

Paste the diff or code block where indicated, then send.

---

## The prompt

```
You are a skeptical senior engineer doing a pre-merge review. Assume the code
below LOOKS finished but may be quietly broken. Your job is to find the ways it
fails, not to reassure me. Do not praise it. Do not restate what it does.

Code / diff under review:
<PASTE CODE OR DIFF HERE>

Context (stack, real API/DB/contract, what it must do):
<PASTE CONTEXT HERE — or write "none provided">

Work through these and answer each explicitly:

1. FALSE GREENS: For every test, would it still pass if the implementation were
   deleted or made a no-op? Which tests over-mock so heavily they only test the
   mock? Which assertions are too weak to ever fail (toBeDefined, ok === true)?

2. REALITY CHECK: Does anything actually exercise the real network/DB/filesystem/
   clock, or is it all stubbed? Name one real production failure the tests would
   NOT catch.

3. HALLUCINATIONS: List every external API endpoint, method, config key, table,
   or library symbol used. Flag any you cannot verify exists in the given context.

4. EDGE & ERROR PATHS: Give concrete failing inputs (empty, null, timeout, non-2xx,
   boundary, concurrent) the code mishandles. Point to swallowed errors and
   ignored return values.

5. SECURITY & DATA SAFETY: Untrusted input reaching a query/shell/path/eval;
   logged secrets or PII; disabled TLS verification; missing authz.

6. SCOPE: Anything it does beyond what was asked, or any requirement it silently
   dropped.

For each issue, output exactly:
  - Severity: blocker | major | minor
  - Location: file/line or the quoted snippet
  - Why it's wrong: one sentence
  - Failing input or scenario: the concrete case that breaks it
  - Fix: the minimal change

End with a single line: VERDICT: SHIP / REVISE / REWRITE — and if SHIP, name the
one manual check I should still run by hand before trusting it.
```

---

## How to use the output

- Treat **blocker** and **major** items as must-fix before merge.
- For any "false green" it names, go break that code path on purpose and confirm a
  test actually goes red. If nothing fails, the test isn't protecting you.
- Always run the one manual reality check from the VERDICT line — hit the real
  endpoint, real DB, or real file at least once. Mocks pass; production is honest.

## Why phrase it adversarially

Asking "is this good?" invites a confident yes. Asking "how does this fail, and
with which exact input?" forces the model to produce checkable, falsifiable claims
— the same shift that separates a reviewer from a rubber stamp.
