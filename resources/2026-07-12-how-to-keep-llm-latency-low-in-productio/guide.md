# Keeping LLM Latency Low in Production

A practical, layered guide to diagnosing and reducing latency for LLM inference. The core idea: latency is a **budget across layers**, not a single knob. Match techniques to your workload instead of stacking optimizations blindly.

---

## 1. Measure the right numbers first

Latency is not one number. Instrument these separately:

| Metric | What it measures | Dominant bottleneck |
|--------|------------------|---------------------|
| **TTFT** (Time To First Token) | Prefill: processing the input prompt | Compute + prompt length |
| **ITL / TPOT** (Inter-Token Latency / Time Per Output Token) | Decoding: generating each subsequent token | Memory bandwidth (KV cache reads) |
| **E2E latency** | Total request time | Sum of prefill + decode |
| **Throughput** | Tokens/sec across all concurrent requests | Batch efficiency |

**Why it matters:** Streaming does not make the model faster — it hides the wait. TTFT drives *felt* speed. If TTFT is 2s and ITL is 20ms, users feel the 2s far more than total generation time.

---

## 2. Why "add more GPUs" is usually the weakest fix

Inference is largely **memory-bandwidth bound**, not compute bound, at the small batch sizes typical of interactive workloads.

- Tensor parallelism (splitting one model across GPUs) adds **cross-node/cross-GPU communication overhead**.
- Databricks' Llama2-70B benchmarks showed going 4x → 8x GPUs cut latency to only ~0.7x at small batch sizes — roughly 2x the cost for a marginal gain.
- More GPUs mainly help **throughput** (more concurrent requests) or fitting a bigger model, not single-request latency.

**Rule of thumb:** Scale hardware for capacity/throughput. Do not scale hardware expecting per-request latency wins.

---

## 3. The cheapest win is upstream: trim the prompt

Often 40–60% of input tokens in an average API call are wasted context (redundant instructions, stale history, unused retrieved chunks, boilerplate).

You pay twice:
1. **Cost** — you're billed per input token.
2. **Latency** — prefill scales with prompt length; you spend TTFT attending over padding.

Tactics:
- Prune retrieved context to top-k most relevant chunks.
- Summarize or truncate conversation history.
- Remove repeated system-prompt boilerplate; use prompt caching where the provider supports it.
- Deduplicate and compact tool schemas.

Do this **before** touching the serving stack. It's the highest ROI change.

---

## 4. Serving-stack techniques — and when each helps

The same trick helps or hurts depending on batch size.

### Continuous batching (e.g. vLLM)
- Interleaves requests at the token level, keeps GPUs busy.
- **Great for throughput**; raises effective batch size.
- Side effect: it can cancel the benefits of low-batch tricks like speculative decoding.

### Speculative decoding
- A small draft model proposes tokens; the big model verifies in parallel.
- **Shines at LOW batch sizes** (spare compute available).
- Its edge **evaporates as batch size rises** — when the GPU is already saturated by continuous batching, there's no spare compute to speculate with.
- Tuning speculative decoding and continuous batching independently can quietly cancel each other out.

### Quantization (INT8/FP8/INT4)
- Reduces memory footprint and bandwidth pressure → helps the decode (ITL) bottleneck.
- Watch for quality regressions; validate on your eval set.

### KV cache management (PagedAttention, prefix caching)
- Reuses shared prefixes (system prompts, few-shot examples) across requests → cuts prefill.
- Reduces memory fragmentation → allows larger effective batches.

### Chunked prefill / prefill-decode disaggregation
- Separates the compute-bound prefill phase from bandwidth-bound decode so one doesn't starve the other.

---

## 5. A decision order when latency creeps up

1. **Measure**: split TTFT vs ITL. Which one regressed?
2. **If TTFT is bad** → shrink the prompt, enable prefix/prompt caching, use chunked prefill.
3. **If ITL is bad** → quantize, check memory bandwidth, reduce max tokens, consider speculative decoding *only if batch is low*.
4. **If throughput (queueing) is the real problem** → continuous batching, then horizontal replicas.
5. **Only then** consider more/bigger GPUs, knowing the diminishing returns.

---

## 6. Anti-patterns

- Stacking every optimization and hoping. Techniques interact (see speculative decoding vs batching).
- Optimizing total generation time when TTFT is what users feel.
- Buying GPUs to fix a memory-bandwidth or prompt-length problem.
- Reporting a single average latency number instead of percentiles per phase (p50/p95 of TTFT and ITL).

---

## References / sources cited in the post
- Databricks LLM inference benchmarks (Llama2-70B GPU scaling).
- Morph estimates on wasted input-token context (40–60%).

(Figures are as cited in the source post; validate against your own benchmarks before making cost decisions.)
