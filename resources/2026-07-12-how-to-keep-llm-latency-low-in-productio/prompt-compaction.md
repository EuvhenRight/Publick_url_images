# Prompt Compaction Prompt

The cheapest latency win usually sits upstream of the model. Use this meta-prompt
with a small/fast model (or a preprocessing step) to strip wasted context before
it hits your serving stack. Trimming 40–60% of wasted input tokens reduces both
cost and prefill/TTFT latency.

---

## Prompt

```
You are a context-compaction assistant. Your job is to reduce the token count of
the INPUT CONTEXT below while preserving everything required to answer the user's
current request. Do NOT answer the request yourself.

Rules:
1. Keep all facts, constraints, IDs, numbers, code, and instructions that are
   relevant to the CURRENT USER REQUEST.
2. Remove: redundant restatements, stale conversation turns no longer referenced,
   boilerplate, filler, and retrieved passages unrelated to the current request.
3. Preserve exact wording for anything quoted, code, schemas, or API contracts.
4. Never invent information. If unsure whether something is needed, keep it.
5. Output only the compacted context, no commentary.

CURRENT USER REQUEST:
{{user_request}}

INPUT CONTEXT:
{{context}}

COMPACTED CONTEXT:
```

---

## Notes
- Run compaction with a small, cheap model so the compaction step itself doesn't
  eat your latency savings.
- Measure: log token count before/after and TTFT before/after. If compaction adds
  more latency than it saves, cache results or apply only above a length threshold.
- Complement with provider-side **prompt/prefix caching** for shared system prompts
  and few-shot examples — that reuse avoids re-prefilling identical prefixes.
- Do not compact anything the model must quote verbatim (legal text, code, schemas).
