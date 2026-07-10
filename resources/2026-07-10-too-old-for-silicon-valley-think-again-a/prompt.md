# Prompts for Turning AI Output Into Judgment Practice

Use these with any coding assistant. The goal isn't just to get code—it's to build the reviewing and decision-making skill the market is repricing upward.

## 1. Interrogate a generated solution
```
You just produced this code:

[paste code]

Acting as a skeptical senior engineer, do the following:
1. List 3 assumptions this code makes that could be wrong.
2. Describe the top 2 ways it fails in production (edge cases, scale, concurrency, security).
3. Name one simpler alternative and one more robust alternative, with tradeoffs.
4. Give me 3 questions I should be able to answer before merging this.
```

## 2. Force explicit tradeoffs before writing code
```
I need to build [feature] in [context/constraints].
Before writing any code, present 2-3 viable approaches as a comparison table:
approach | complexity | performance | maintainability | when it's the wrong choice.
Recommend one and state what would change your recommendation.
```

## 3. Turn a task into a review exercise
```
Here is a task: [task].
Write an intentionally plausible-but-flawed implementation.
Then stop. Do NOT tell me the flaws.
I will attempt to find them; afterward, reveal them so I can check my judgment.
```

## 4. Extract domain context
```
Explain the domain rules and non-obvious constraints of [domain/system]
that a new engineer would not know but a senior would. Focus on:
- business rules that look arbitrary but aren't
- historical decisions that constrain current design
- common failure modes specific to this domain
```

## 5. For hiring managers: junior role redesign
```
Help me redesign a junior software engineer role for a team that uses AI coding tools.
Assume boilerplate is now cheap. Propose:
- 5 responsibilities that build judgment (review, testing, incident triage, verification)
- a 90-day apprenticeship plan pairing the junior with AI and a senior mentor
- metrics based on ownership and outcomes rather than lines of code
```
