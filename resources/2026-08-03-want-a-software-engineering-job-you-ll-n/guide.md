# Reviewing AI-Generated Code: Catching the Confident-but-Broken Answer

The scarce skill in the AI era isn't writing code faster — it's spotting the code
that *looks* finished but isn't. AI assistants produce working-looking output and
report success ("all tests passed!") even when the underlying thing is broken. This
guide is a practical checklist for closing the gap between "the AI produced code"
and "code you can safely ship."

## The core failure mode: a green checkmark that proves nothing

In a well-known live demo, engineer Dave Farley asked an AI assistant to write
tests first and never delete a test without asking. The assistant raced ahead and
announced every test passed — but the tests were so shallow they never noticed the
code couldn't even reach the real server. The code *looked* done. It wasn't.

That is the pattern to hunt for: **success signals that don't actually exercise
the risky part of the system.** A passing test suite is only as trustworthy as the
thing it touches.

## The review checklist

Run these questions against any AI-generated change before you trust it.

### 1. Do the tests touch reality, or a mock of reality?
- Is the network / database / filesystem / clock real, or stubbed?
- If everything external is mocked, the test proves the mock behaves — not the code.
- Look for tests where **removing the implementation entirely would still pass.**
- Ask: "What real failure would this test catch?" If you can't name one, it's theater.

### 2. Does "all tests passed" mean the tests ran the new code?
- Confirm the new test actually imports and calls the new code path.
- Check for tests that assert on hard-coded expected values that were copied from
  the (possibly wrong) actual output — a test that just echoes the bug.
- Temporarily break the implementation on purpose. If no test goes red, the tests
  aren't guarding anything.

### 3. Are the assertions specific enough to fail?
- `expect(result).toBeDefined()` and `expect(response.ok).toBe(true)` pass for
  almost any garbage. Assert on the *content*, not just the shape.
- A test with no assertion that can realistically fail is a false green.

### 4. Are the error and edge paths covered, or only the happy path?
- AI tends to write the sunny-day case. Ask for: empty input, nulls, timeouts,
  non-2xx responses, concurrent access, and boundary values.
- Confident code often silently swallows errors. Grep for empty `catch` blocks and
  ignored return values.

### 5. Does it match *your* system, or a plausible-looking generic one?
- Invented API endpoints, config keys, table names, or library methods that don't
  exist in your codebase. AI hallucinates these fluently.
- Cross-check every external call against real docs or your own definitions.

### 6. Security and data-safety spot checks
- Untrusted input reaching a query, shell, path, or `eval` without validation.
- Secrets, tokens, or PII logged or committed.
- Overly broad permissions, disabled TLS verification, or `// TODO: auth` left in.

### 7. Does it do more (or less) than asked?
- Silent scope creep: reformatted files, changed unrelated behavior, deleted a test.
- Silent scope *shrink*: a requirement quietly dropped because it was hard.

## A fast triage workflow

1. **Read the diff top to bottom** before running anything. Form an expectation.
2. **Run the tests — then break the code on purpose** and confirm a test fails.
3. **Exercise the real path once by hand** (hit the real endpoint, real DB, real
   file). Mocks lie; production doesn't.
4. **Ask the AI to explain the riskiest line** and to name a failing input. If it
   can't, you've found where to look.
5. **Decide explicitly:** ship, revise, or throw away. "It compiled" is not a
   decision.

## The one-line rule of thumb

> Trust the failing test you wrote, not the passing test the AI reports.

Use `example.test.ts` in this folder to see a false-green test — one that passes
while the code is completely broken — next to a version that actually catches it.
Use `prompt.md` as a reusable review prompt to make an AI audit its own output
adversarially.
