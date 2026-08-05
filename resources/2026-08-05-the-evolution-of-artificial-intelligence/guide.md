# Designing Clinical AI That Earns the Right Amount of Trust

A practitioner's guide to fighting automation bias in AI-assisted oncology workflows.

This guide is a companion to a post about a single uncomfortable finding: adding AI to a group of pathologists raised the group's overall accuracy, but a fraction of the time a doctor who *already had the right answer* changed it to a wrong one after the model chimed in — and they gave in faster when they were short on time.

The headline accuracy number is a model-quality problem. The override number is a **workflow-design** problem. This guide is about the second one, because that is the part teams control after the model ships.

> Note on numbers: the figures cited in the post (e.g. ~93% AI vs ~88% specialist staging accuracy, and ~7% correct→incorrect flips among 28 pathologists) are illustrative of a well-documented pattern in the literature, not a citation of one canonical study. Use them to reason about mechanisms, not to quote as gospel. Validate against your own tools and populations.

---

## 1. What automation bias actually is

**Automation bias** is the tendency to over-trust an automated recommendation — to treat a machine's output as more authoritative than the evidence justifies. It shows up in two failure modes:

- **Commission errors** — following an incorrect AI suggestion despite contradicting evidence (the clinician *had* the right call and abandoned it).
- **Omission errors** — failing to act because the AI did not flag anything (missing what the model missed, because its silence read as "all clear").

The related trap is **automation complacency**: when a tool is usually right, humans stop actively checking it. Reliability *earns* complacency. That is the cruel twist — the better the model gets, the less scrutiny it receives, so the rare errors it does make sail through unchallenged.

---

## 2. Why oncology amplifies it

- **High cognitive load + time pressure.** Slide backlogs, tumor boards, and end-of-day fatigue are exactly the conditions under which people defer. Override resistance drops when time is short.
- **Opaque confidence.** A model that renders a crisp "93% malignant" *looks* more sure than a hedging human, regardless of whether that number is calibrated.
- **Asymmetric, delayed consequences.** The cost of a wrong deferral (mis-stage, wrong therapy line) is severe but arrives weeks later, disconnected from the moment of the click.
- **Diffusion of responsibility.** "The AI and I agreed" feels safer than a solo call, even when the AI added no independent information.

---

## 3. Seven design patterns that reduce over-reliance

### 3.1 Independent-first (commit-before-reveal)
Capture the clinician's read **before** showing the AI output. This preserves an independent judgment to compare against and makes disagreements visible instead of silently absorbed. Even a lightweight "your call?" prompt before reveal measurably reduces anchoring.

### 3.2 Calibrated, honest confidence
A raw softmax score is not a probability. Show confidence only if it is **calibrated** (a "90%" is right ~90% of the time). Prefer ranges, reliability-diagram-backed buckets, or abstention ("insufficient signal") over a false-precision percentage. Never display more decimal places than the calibration supports.

### 3.3 Reasons, not verdicts
Present *evidence* (highlighted regions, features, comparable cases) rather than a bare label. A verdict invites deference; evidence invites verification. If the model can't show its work, weaken how strongly the UI asserts the conclusion.

### 3.4 Friction proportional to stakes
For high-consequence, low-confidence, or clinician-disagreement cases, add deliberate friction: require a one-line rationale to accept, force a second reader, or route to a tumor board. Cheap agreement should stay cheap; consequential agreement should cost a sentence.

### 3.5 Surface disagreement loudly
When the AI and the clinician's committed read differ, make it a first-class event — not a quietly overwritten field. Disagreement is the highest-value signal in the whole system for both patient safety and model monitoring.

### 3.6 Watch the clock
Instrument time-on-case. When accept-rate climbs as time-per-case falls, you are watching fatigue-driven deference in real time. Consider soft nudges ("you're moving fast on high-stakes reads") rather than hard blocks.

### 3.7 Second opinion, not final word
Frame the AI in copy, defaults, and training as a *colleague who can be wrong*, never an oracle. The clinic that wins treats a confident answer as a second opinion to be weighed — the framing in the UI should reinforce that every time.

---

## 4. Deployment governance

- **Silent / shadow mode first.** Run the model alongside clinicians without showing output; compare before you influence.
- **Subgroup validation.** Accuracy is a weighted average that can hide harm. Break performance down by tumor subtype, stain, scanner/vendor, and demographic subgroup.
- **Drift monitoring.** Slides, scanners, and staining protocols change. Track input distribution and calibration over time, not just at launch.
- **Human-factors sign-off.** Review the *presentation* of AI output as a safety artifact, alongside the model itself.
- **Reversibility.** Every AI-influenced decision should be traceable and, where possible, reversible before it hits the chart.

---

## 5. Metrics worth tracking

| Metric | What it tells you | Watch for |
| --- | --- | --- |
| **Correct→incorrect override rate** | How often AI flips a right human call to wrong | Any upward trend; the core harm signal |
| **Incorrect→correct override rate** | How often AI rescues a wrong human call | The intended benefit; compare against the row above |
| **Agreement rate vs. time-per-case** | Fatigue / rubber-stamping | Agreement rising as time falls |
| **Calibration error (ECE)** | Whether shown confidence is honest | Growing gap between stated and actual accuracy |
| **Disagreement resolution outcomes** | Who was right when human and AI split | AI-right-but-overridden AND human-right-but-overruled |
| **Abstention rate** | Model's honesty about its own limits | Suspiciously low abstention on hard cases |

The single most important comparison: **incorrect→correct** (benefit) versus **correct→incorrect** (harm). Net accuracy can rise while the harm term also rises — an average that improves for the population can still be manufacturing a new, specific class of error.

---

## 6. Pre-deployment checklist

- [ ] Clinician commits an independent read before AI output is revealed.
- [ ] Confidence shown is calibrated (reliability diagram on file) — or not shown at all.
- [ ] Output leads with evidence, not a bare label.
- [ ] High-stakes / low-confidence / disagreement cases carry extra friction.
- [ ] Disagreements are logged as events, not silent overwrites.
- [ ] Time-per-case is instrumented and reviewed.
- [ ] Correct→incorrect override rate is monitored post-launch with an alert threshold.
- [ ] Performance validated on relevant subgroups, not just the aggregate.
- [ ] Drift and calibration monitored continuously.
- [ ] UI copy and training frame the tool as a second opinion, never the final word.

---

## 7. The one-line summary

Building a model that is usually right is now the easy part. The hard part is designing the moment where a tired human at 6pm decides whether to argue with it. Spend your design budget there.
