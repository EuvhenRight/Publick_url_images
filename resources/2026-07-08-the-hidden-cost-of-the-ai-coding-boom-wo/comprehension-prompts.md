# Prompts to Convert Generated Code into Understood Code

These prompts are designed to pay down comprehension debt *before* it accrues. Run them against code an AI just produced (or against unfamiliar existing code). The goal is not to trust the answers blindly — it is to surface claims you can then verify against the actual code.

> ⚠️ An AI explaining its own code can be confidently wrong. Treat every explanation as a hypothesis to check, not a fact.

## 1. Force a plain-language walkthrough

```
Explain the following code to me as if reviewing a colleague's PR.
For each function or block:
1. What it does (one sentence).
2. Why it exists / what problem it solves.
3. One assumption it makes that could be wrong.
Do not restate the code line by line; explain intent.

<paste code>
```

## 2. Surface alternatives and trade-offs

```
For the code below, list 2-3 alternative approaches that were NOT taken.
For each, state one advantage and one reason it might have been rejected.
Then tell me which single design decision here is most likely to cause
problems later, and why.

<paste code>
```

## 3. Hunt for silent failure modes

```
Act as a skeptical reviewer. For the code below, identify:
- Edge cases or inputs that are unhandled.
- Any place where a failure would be silent (no error, wrong result).
- Concurrency, ordering, or state assumptions.
- Anything that would only break in production, not in tests.
Rank these by how hard they'd be to debug at 2am.

<paste code>
```

## 4. Generate an intent-first spec (before writing code)

```
Before writing any code, restate the problem I'm about to solve as:
- The user-facing outcome (in one sentence).
- Inputs, outputs, and invariants that must hold.
- What is explicitly OUT of scope.
Ask me up to 3 clarifying questions if the requirements are ambiguous.
Do not write code yet.
```

Use this to keep control of the 86% of the work that is deciding *what* to build.

## 5. Test the tests

```
Here is a feature and its tests. Without changing behavior, tell me:
- Which tests would still pass even if the core logic were broken?
- What intended behavior is NOT covered by any test?
- Write one additional test that would catch a realistic regression.

<paste code and tests>
```

## Workflow

1. Generate code with a clear intent spec (prompt 4).
2. Run the walkthrough (prompt 1) and verify claims against the code yourself.
3. Stress it with prompts 2, 3, and 5.
4. Only then apply the Explain-Test-Own merge gate from `guide.md`.
