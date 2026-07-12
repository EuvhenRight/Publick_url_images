# Prompts for Deliberate Practice with AI (Keep the Reps, Not Just the Output)

These prompts are designed to force the prediction-and-correction loop instead of letting AI hand you an answer you never had to earn. Copy them into your AI tool of choice.

---

## 1. The Predict-First Wrapper

Use this BEFORE asking AI to solve something. Paste your own prediction first.

```
I am practicing deliberate reps and want to build judgment, not just get an answer.

Here is the problem:
<PASTE PROBLEM>

Here is MY prediction of the solution and my reasoning:
<PASTE YOUR PREDICTION>

Now:
1. Give your solution.
2. Explicitly compare it to my prediction. List every meaningful difference.
3. For each difference, tell me whether I was right, you were right, or it's a genuine trade-off (and why).
4. Do NOT flatter me. If my reasoning was shallow or wrong, say exactly where.
```

---

## 2. The "Why Does This Exist" Code Reader

Use this to train context/judgment, which AI models weakly.

```
Here is a function/PR/module:
<PASTE CODE>

Before I give my interpretation, do NOT explain it yet.

Instead, ask me 3 questions that would reveal whether I actually understand why this code exists and what would break if it were removed.

After I answer, grade my understanding and fill the gaps.
```

---

## 3. The Adversarial Reviewer

Use this to build the reviewer/architect muscle the post says survives.

```
Here is a solution (mine or AI-generated):
<PASTE SOLUTION>

Act as a skeptical staff engineer in code review. Find:
- The most likely edge case that breaks it.
- The scaling limit (what input size or load makes it fail?).
- One security or correctness risk.
- One maintainability cost future-me will regret.

For the worst issue, write a failing test that demonstrates it. Then let ME attempt the fix before you show yours.
```

---

## 4. The Trade-off Narrator

Use this to practice articulating decisions — the thing seniors are actually paid for.

```
I made this technical decision:
<DECISION>

Context/constraints:
<CONSTRAINTS>

Interrogate my reasoning:
1. What alternatives should I have explicitly considered?
2. For each alternative, what would have to be true for it to be the better choice?
3. What am I likely to regret about this decision in 6 months?
Be direct and specific. No generic advice.
```

---

## 5. The Surprise Log Entry (paste into your journal, not the AI)

After any of the above, capture the rep:

```
Date:
Task:
What I predicted:
What actually happened:
The surprise (the delta that updated my intuition):
Rule of thumb I'm extracting:
```

Over months, this log becomes a written record of your growing judgment — and proof to a hiring manager that you build it deliberately, not by accident.
