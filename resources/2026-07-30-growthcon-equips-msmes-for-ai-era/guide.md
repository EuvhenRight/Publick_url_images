# Turning AI Access into Real Value: A Back-Office-First Playbook for MSMEs

The post this guide accompanies makes one argument: for a small business, *access* to AI was never the hard part. Turning that access into measurable money is. GrowthCon PH gathered 400+ owners to get 'ready' for AI, and the app that won (GABAi, built by students) didn't do anything flashy — it automated inventory, tax math, and government paperwork for first-time owners. That is the tell. The unglamorous back office is where AI actually turns into profit.

This guide turns that idea into something you can act on this quarter.

---

## Why most AI efforts return nothing

A widely-cited 2025 MIT report (the NANDA 'State of AI in Business' study, often summarized as 'The GenAI Divide') found that roughly **95% of enterprise generative-AI pilots delivered no measurable impact on profit and loss**. That is the statistic behind the post's 'zero extra profit' line. Read it carefully: it is not that the tools fail to work. It is that *using* AI and *earning* from it are different sports.

The pilots that returned nothing tended to share the same pattern:

- They started from a tool ('we should use AI') instead of a cost or a bottleneck.
- They automated something visible and exciting rather than something expensive and repetitive.
- They had no baseline number, so 'is it working?' was never actually answerable.
- They depended on messy, scattered data that nobody had cleaned up first.

The pilots that paid off did the opposite. They picked one recurring, boring, quantifiable task and shrank the hours or errors it cost every week.

---

## The plumbing-first principle

Ask a simple question of any candidate: *would this show up on next quarter's numbers?*

Flashy front-office demos (a website chatbot, an AI 'brand voice') are easy to show off and hard to tie to revenue. Back-office plumbing is the reverse: nobody claps, but the effect is countable.

High-value plumbing for a typical MSME:

| Area | Boring task AI can shrink | How it shows up in money |
| --- | --- | --- |
| Inventory | Reorder timing, stockout / overstock prediction | Less dead capital, fewer lost sales |
| Bookkeeping & tax | Categorizing expenses, computing VAT / withholding, reconciling receipts | Fewer penalties, fewer accountant hours |
| Compliance / gov paperwork | Pre-filling recurring forms and filings | Hours saved, missed-deadline fines avoided |
| Collections | Drafting follow-ups, flagging overdue invoices | Faster cash in, better cash flow |
| Customer ops | Triaging and routing messages, summarizing tickets | Faster response, fewer staff hours per order |
| Purchasing | Comparing supplier quotes, extracting terms from PDFs | Lower input cost |

Note what these share: a **repeating** task, a **measurable** cost (hours, peso, error rate), and **data you already have**.

---

## Find your own candidates: the Boring Money Map

Run this once, on paper, before you buy or build anything.

1. **List the 10 tasks your team does most often.** Weekly or daily, not one-offs.
2. **For each, write the current cost.** Hours per week, peso per month, or errors per month. If you can't estimate it, you can't manage it — estimate anyway.
3. **Mark data readiness.** Is the input already digital and consistent (a spreadsheet, a POS export, structured records)? Or is it in someone's head, on paper, in a group chat?
4. **Mark tolerance for mistakes.** Some tasks (a draft email) tolerate an AI error; others (a tax filing that gets submitted) do not, and need a human check step.
5. **Circle anything that is high-cost, high-frequency, digital-input, and error-tolerant-with-review.** Those are your first pilots. Everything else waits.

The scoring tool in `example.ts` does step 5 for you and ranks the list.

---

## Scoring a candidate (do this before committing)

Score each idea 1–5 on four axes and multiply out:

- **Value** — money or hours saved per month if it worked well.
- **Frequency** — how often the task repeats.
- **Data readiness** — how clean and digital the inputs already are.
- **Effort (inverse)** — score *low* effort high. A one-afternoon setup beats a six-month build.

A rough priority score = `Value x Frequency x DataReadiness x EaseOfBuild`. Do the top one or two. Ignore the rest until they are done. Trying five pilots at once is the fastest way into the 95%.

---

## A 30 / 60 / 90 rollout that avoids the 95%

**Days 0–30 — Baseline and one pilot.**
- Pick the single top-scored task.
- Write down its current cost *before* you touch it (hours/week, error rate, peso). No baseline, no proof.
- Ship the smallest possible version. Buy an off-the-shelf tool before you build; most back-office plumbing already exists.
- Keep a human in the loop on anything with legal or financial consequences.

**Days 30–60 — Measure honestly.**
- Compare the new cost to the baseline. Did hours drop? Did errors drop? Did anything get *slower* because of review overhead?
- Kill it without ceremony if the delta is near zero. A fast, cheap 'no' is a win, not a failure.

**Days 60–90 — Bank it, then repeat.**
- Document the saved hours/peso so it is defensible.
- Only now move to candidate number two.

---

## Guardrails

- **A demo is not a result.** If you can't state the before/after number, you don't have a result.
- **Don't automate a broken process.** Fix or simplify the workflow first; AI on top of chaos just makes faster chaos.
- **Watch the review tax.** If checking the AI's output costs as much time as doing the task did, the net saving is zero.
- **Own your data.** The moat is not the model (everyone rents the same ones) — it is your clean, proprietary operational data.
- **Match the tool to the mistake.** Error-tolerant tasks can run more autonomously; consequential ones need a person on the last step.

---

## The one-line test

Before any AI purchase, decision, or pilot, answer this out loud:

> *Which line on next quarter's P&L does this move, and by how much?*

If you can't answer, you are buying a ticket, not readiness.
