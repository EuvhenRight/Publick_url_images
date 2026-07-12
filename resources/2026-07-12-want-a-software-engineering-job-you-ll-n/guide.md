# Rebuilding the Apprenticeship: A Deliberate-Practice Guide for the AI Era

The LinkedIn post argues that AI is automating the "grunt work" that used to turn juniors into seniors, quietly defunding the pipeline that produces experienced judgment. This guide is a practical response: if the reps that used to happen *by accident* are disappearing, you have to manufacture them *on purpose*.

This is written for two audiences:
- **Juniors / career-switchers** who need to build judgment without relying on being handed boring-but-formative tickets.
- **Seniors / team leads** who want to keep growing the people under them instead of hollowing out the pipeline.

---

## Part 1: Why the reps matter (the mechanism)

Judgment is not a fact you learn; it's a compressed prior built from thousands of small predictions and corrections:

1. You predict what the code will do.
2. You run it / read it and see what actually happens.
3. The gap between prediction and reality updates your intuition.

AI shortcuts step 1 and 2 by producing a working answer instantly. The danger isn't that AI is wrong — it's that when AI is *right*, you skip the prediction-and-correction loop that builds the prior. You get output without the update.

**The fix is not to avoid AI. It's to keep making explicit predictions before you let AI answer.**

---

## Part 2: The Predict-Then-Verify loop

Every time you're about to use AI to write, explain, or debug code, run this loop:

| Step | What you do | Time |
|------|-------------|------|
| 1. Predict | Write down (out loud or in a comment) what you expect the answer to be, and why. | 1–2 min |
| 2. Generate | Let AI produce its answer. | seconds |
| 3. Diff | Compare your prediction to the AI output. Where did they differ? | 2–5 min |
| 4. Interrogate | For every difference, ask: was AI right, was I right, or is it a real trade-off? | 5–10 min |
| 5. Log | Record the surprise in a decision log (see `prompt.md`). | 1 min |

The surprises are the reps. If nothing surprised you, you already knew it — fine. If something did, that's a unit of judgment you just banked.

---

## Part 3: A weekly self-apprenticeship regimen

Since the boring formative tickets are drying up, replace them with deliberate exercises. Aim for ~3 hours/week.

### Exercise A — Read code AI can't see the point of (45 min)
Pick a real open-source PR or a gnarly function in your codebase. Before asking AI, write a one-paragraph summary of *why* it exists and what would break if you deleted it. Then ask AI and compare. You're training the "why," which AI models poorly because it lacks the organizational context.

### Exercise B — Model by hand, then check (45 min)
Take something you'd normally delegate to AI (a SQL query plan, a recursive function's call stack, a race condition). Trace it on paper or in comments. Then verify with a debugger or AI. This is the "validate what you can model by hand" skill the post calls irreplaceable.

### Exercise C — Break the AI's answer on purpose (45 min)
Get an AI solution, then find its failure mode: the edge case, the scaling limit, the security hole, the maintainability cost. Write a failing test that exposes it. This builds the reviewer/architect muscle — the one that survives.

### Exercise D — Explain the trade-off to a rubber duck (30 min)
Pick one decision from the week and articulate the alternatives you rejected and why. Seniors are paid for the decisions they *didn't* make. Practice narrating them.

---

## Part 4: For seniors and leads — don't automate the apprenticeship away

The post's sharpest claim is that the same orgs betting on judgment are defunding its production. If you manage people, you can push back locally:

- **Reserve a "human-first" tier of work.** Explicitly assign some tickets where the junior must produce a first draft before AI touches it. The inefficiency is the point — it's training, not throughput.
- **Review reasoning, not just diffs.** Ask "what did you consider and reject?" in code review. Make judgment visible and rewardable.
- **Pair on the AI, not around it.** Sit with a junior and narrate your own predict-then-verify loop. The invisible skill (knowing when the AI is bluffing) transfers only when you say it out loud.
- **Track a leading indicator.** How much of your junior's output did they *predict* correctly before generating? Rising accuracy = growing judgment.

---

## Part 5: A note on the data cited in the post

The post references:
- **SignalFire** (State of Talent reporting): entry-level tech roles down ~6% overall from late 2022 to mid-2025, with steeper drops in some occupations, while 26+ employment in the same roles grew.
- **BLS**: ~15% projected growth for software developers through 2034.

Treat these as directional, not gospel — sourcing definitions of "entry-level" vary, and projections predate current AI adoption curves. The *structural* argument (a shrinking bottom rung starves the top) holds regardless of the exact percentages. Always trace a statistic to its primary source before repeating it; that habit is itself a judgment rep.

---

## TL;DR

AI removes the accidental apprenticeship. Rebuild it deliberately: predict before you generate, model hard things by hand, break AI answers on purpose, and — if you lead people — protect a tier of formative work from full automation. The engineers who thrive won't be the ones who used AI most; they'll be the ones who kept updating their own priors while everyone else outsourced them.
