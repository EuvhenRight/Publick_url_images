"""
latency_probe.py

Minimal, dependency-light probe to measure the two latency numbers that
actually matter for LLM serving: TTFT (time to first token) and ITL
(inter-token latency). Works against any OpenAI-compatible streaming
endpoint (OpenAI, vLLM, TGI, Ollama with the OpenAI shim, etc.).

Usage:
    pip install openai
    export OPENAI_API_KEY=sk-...        # or a dummy value for local servers
    python latency_probe.py --base-url http://localhost:8000/v1 --model llama2-70b

Why: E2E latency hides the phase where your bottleneck lives. Prefill (TTFT)
is compute/prompt-length bound; decode (ITL) is memory-bandwidth bound.
Splitting them tells you which lever to pull.
"""
import argparse
import statistics
import time
from openai import OpenAI


def run_once(client, model, prompt, max_tokens):
    t0 = time.perf_counter()
    ttft = None
    token_times = []
    stream = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        stream=True,
    )
    last = t0
    n_tokens = 0
    for chunk in stream:
        delta = chunk.choices[0].delta.content if chunk.choices else None
        if not delta:
            continue
        now = time.perf_counter()
        if ttft is None:
            ttft = now - t0
        else:
            token_times.append(now - last)
        last = now
        n_tokens += 1
    e2e = time.perf_counter() - t0
    itl = statistics.mean(token_times) if token_times else float("nan")
    return {"ttft": ttft, "itl_mean": itl, "e2e": e2e, "tokens": n_tokens}


def pctl(values, p):
    values = sorted(values)
    if not values:
        return float("nan")
    k = int(round((p / 100) * (len(values) - 1)))
    return values[k]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-url", default=None, help="OpenAI-compatible base URL")
    ap.add_argument("--model", required=True)
    ap.add_argument("--runs", type=int, default=10)
    ap.add_argument("--max-tokens", type=int, default=128)
    ap.add_argument(
        "--prompt",
        default="Explain memory bandwidth vs compute bottlenecks in LLM inference in 3 sentences.",
    )
    args = ap.parse_args()

    client = OpenAI(base_url=args.base_url) if args.base_url else OpenAI()

    ttfts, itls, e2es = [], [], []
    for i in range(args.runs):
        r = run_once(client, args.model, args.prompt, args.max_tokens)
        ttfts.append(r["ttft"])
        if r["itl_mean"] == r["itl_mean"]:  # not NaN
            itls.append(r["itl_mean"])
        e2es.append(r["e2e"])
        print(
            f"run {i+1:>2}: TTFT={r['ttft']*1000:7.1f}ms  "
            f"ITL={r['itl_mean']*1000:6.1f}ms  "
            f"E2E={r['e2e']*1000:7.1f}ms  tokens={r['tokens']}"
        )

    print("\n--- summary ---")
    print(f"TTFT  p50={pctl(ttfts,50)*1000:7.1f}ms  p95={pctl(ttfts,95)*1000:7.1f}ms")
    print(f"ITL   p50={pctl(itls,50)*1000:7.1f}ms  p95={pctl(itls,95)*1000:7.1f}ms")
    print(f"E2E   p50={pctl(e2es,50)*1000:7.1f}ms  p95={pctl(e2es,95)*1000:7.1f}ms")
    print(
        "\nInterpretation:\n"
        "  High TTFT -> prefill bound: trim the prompt, enable prefix caching.\n"
        "  High ITL  -> decode/bandwidth bound: quantize, check KV cache, maybe spec-decode at low batch.\n"
    )


if __name__ == "__main__":
    main()
