# Mentor & Self-Review Prompts for AI-Assisted Junior Development

Reusable prompts for engineering mentors and juniors to build judgment on top of AI-accelerated work. Copy into your AI tool or use as a checklist in code review.

---

## 1. Junior Self-Review Prompt (run before requesting human review)

```
You are a strict senior engineer reviewing my AI-assisted change. Do NOT rewrite the code.
Instead, ask me up to 5 questions that test whether I actually understand:
- why this approach was chosen over alternatives
- what could break in production that tests don't cover
- which parts I accepted from AI without fully verifying

Here is my change and my reasoning:
[PASTE DIFF]
[PASTE MY EXPLANATION]

After my answers, tell me which answers reveal a gap in understanding versus a gap in the code.
```

## 2. Mentor Prompt: Turn a Task Into a Learning Opportunity

```
I'm mentoring a junior engineer who used AI to complete this task:
[PASTE TASK + SOLUTION]

Help me design a 10-minute conversation that:
1. Confirms whether they understand WHY the solution works, not just that it works.
2. Surfaces one adjacent concept they should learn next.
3. Gives them a small variation of the problem to attempt WITHOUT AI, to test transfer.
Keep it Socratic. Give me the questions to ask, not lectures to deliver.
```

## 3. Prediction-First Prompt (for the junior, before solving)

```
Before I ask you to solve this, I want to state my own hypothesis and have you critique my REASONING, not give me the answer yet.

Problem: [DESCRIBE]
My hypothesis about the cause/approach: [STATE IT]
My confidence: [low/medium/high]

Without revealing the full solution, tell me:
- Which assumptions in my reasoning are risky?
- What one piece of evidence would confirm or kill my hypothesis fastest?
```

## 4. Verification Prompt (catch hallucinations)

```
You just gave me this solution:
[PASTE AI OUTPUT]

Now act as an adversarial reviewer. List:
- Any API, function, or config option here that may not exist or may be deprecated.
- Any claim in your explanation I should independently verify, and exactly how to verify it (command, doc, test).
- The single most likely way this is subtly wrong.
```

## 5. Interview / Hiring Prompt (assessing junior potential in an AI world)

```
Design a 45-minute pair-programming interview for a junior engineer where AI tools are ALLOWED.
The goal is to assess learning velocity and judgment, not memorization.
Include:
- One task where using AI well is the correct move.
- One moment where the AI's suggestion is plausible but wrong, to see if the candidate verifies.
- A debrief question that reveals whether they reflect on what they learned.
Provide the rubric focused on judgment signals, not lines of code.
```

---

## How to use

- Juniors: run prompts 3 and 4 during work, prompt 1 before review.
- Mentors: run prompt 2 weekly per report; use prompt 5 when hiring.
- Pair these with the `learning-log-template.md` so reflection is recorded, not just discussed.