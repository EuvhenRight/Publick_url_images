# AI-Assisted Learning Log

A lightweight template for junior engineers to convert AI-accelerated work into durable judgment. Fill one entry per meaningful task. Keep it short—5 minutes max.

---

## Entry Template

**Date:**
**Task / PR:**

### 1. Prediction (before prompting AI)
- What I think the solution/approach is:
- My confidence (low / medium / high):

### 2. What AI produced
- Summary of the approach AI suggested:
- Did it match my prediction? (yes / partial / no)

### 3. The delta (most important field)
- Where AI and I diverged, and why:
- What I now understand that I didn't before:

### 4. Independent verification
- How I confirmed the output was correct (tests run, docs checked, executed locally):
- Any errors or hallucinations I caught in the AI output:

### 5. Judgment note
- One rule of thumb I'll carry forward:

---

## Worked Example

**Date:** 2026-07-22
**Task / PR:** Fix intermittent timeout in payment webhook handler

### 1. Prediction
- What I think: The webhook is timing out because we call the DB synchronously in the request path.
- Confidence: medium

### 2. What AI produced
- Summary: AI suggested the timeout was due to a missing index on `webhook_events.external_id`, causing a full table scan under load.
- Match? partial — different root cause than I guessed.

### 3. The delta
- I assumed synchronous DB calls; the real issue was query cost, not call placement. I hadn't considered that the same synchronous call is fine when the query is fast.
- Learned: "slow request" has at least two independent causes—where work happens vs. how expensive the work is.

### 4. Independent verification
- Ran `EXPLAIN ANALYZE` on the query: confirmed seq scan, 1.2s under load.
- Added the index in staging, latency dropped to 12ms. AI was right, but I verified rather than trusting.

### 5. Judgment note
- Before optimizing where code runs, measure how expensive each operation actually is. `EXPLAIN` first.

---

## Monthly Review Prompt (for you or your mentor)

- Which predictions am I getting right more often now?
- What class of AI mistake have I learned to catch?
- What do I still accept from AI without verifying? (That's next month's growth area.)