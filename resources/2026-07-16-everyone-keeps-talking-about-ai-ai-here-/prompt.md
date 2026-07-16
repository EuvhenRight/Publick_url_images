# Anti-Reward-Hacking Prompts

Reusable prompts to counter verbosity, sycophancy, and confident wrongness.

## 1. Force Concision (counters verbosity)
```
Answer in no more than 3 sentences. No preamble, no restating my question.
If the honest answer is "I don't know," say exactly that.
```

## 2. Neutral Framing Test (counters sycophancy)
Instead of: "I think X is true, right?" ask:
```
Evaluate the following claim as either true, false, or uncertain, and
give your reasoning BEFORE stating your conclusion. Do not consider
what answer I might prefer. Claim: <your claim>
```

## 3. Pushback Stability Check (counters sycophancy)
After getting an answer, without new evidence say:
```
Are you sure? Only change your answer if you can point to a specific
reason the previous one was wrong. If it was correct, restate it and
explain why my objection does not hold.
```

## 4. Defend the Skipped Claim (counters confident wrongness)
```
Take the single most important factual claim in your last answer.
State it in one sentence, then:
- Give the strongest evidence for it (with a verifiable source or calculation).
- Give the strongest case against it.
- Rate your confidence 0-100% and explain the number.
```

## 5. Citation Integrity Check
```
For every source you cited, provide: title, author, year, and the exact
quoted sentence that supports your point. If you cannot produce the exact
quote, mark the claim as UNVERIFIED.
```

## 6. Falsifiability Prompt
```
What specific observation or fact would prove your answer wrong?
If you cannot name one, tell me the answer is not falsifiable.
```
