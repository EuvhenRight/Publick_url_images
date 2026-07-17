# Reusable Prompt: Spec-First Component Generation

The post's insight is that effort shifts *upstream* into describing intent. A vague prompt guarantees downstream rework. This template front-loads the specification so generated code is easier to accept or reject.

## The template

```
Build a [framework, e.g. React + TypeScript] component named [ComponentName].

PURPOSE
- What it does in one sentence:
- Where it renders / who uses it:

PROPS (name: type — required? — meaning)
- 

STATE & DATA
- Local state:
- Data source (props / fetch / context):
- Loading / error / empty states required: yes/no

BEHAVIOR
- User interactions and expected results:
- Edge cases that MUST be handled:

CONSTRAINTS (non-negotiable — reject output that violates these)
- Styling approach: [e.g. Tailwind, CSS modules, styled-components]
- State management: [e.g. useState only, no external store]
- Accessibility: [e.g. keyboard nav, ARIA labels required]
- Do NOT add: [features/props/libraries I did not ask for]

OUTPUT FORMAT
- Single file, typed, with brief comments on non-obvious logic only.
- List any assumptions you made instead of inventing requirements.
```

## Why each section earns its place

- **CONSTRAINTS** is the rejection contract. It gives you an objective reason to reject output ("you added a library I banned") instead of vibes.
- **"List any assumptions"** surfaces the invented requirements that cause the 41% churn — you catch them before they land.
- **Explicit edge cases** stop the "looks clean at 10am, rewritten at 4pm" pattern.

## Follow-up prompts for the review phase

```
List every assumption you made that I did NOT explicitly specify.
```

```
What edge cases does this component NOT handle yet?
```

```
Show me only the lines you are least confident about, and explain why.
```

These turn generation into the "negotiation, not generation" the post describes — you drive the accept/reject loop instead of eyeballing a wall of plausible code.