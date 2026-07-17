# The Complexity Diagnostic: Name the Failure Mode

A practical guide inspired by the observation that most outages come from internal changes, not external attackers. The core discipline: before shipping any "clever" addition, name the specific failure mode it introduces and confirm you have an alert that would catch it.

## Why this matters

Empirical postmortem reviews repeatedly find:

- The majority of outages trace to internal changes (deploys, config, features) rather than attacks.
- A large share of incidents have **no proactive alerting** — the complexity shipped, the detection didn't.
- Local reliability improvements (a retry, a cache, a failover) frequently become global failures.

Complexity carries a *burden of proof* that simplicity never pays. A simple interface can be trusted by default. A complex one has to be decomposed, each piece analyzed, and re-assembled before it's trustworthy — and that proof usually comes due in production.

> Note on the numbers: figures like "80% internal", "69% no alerting", "26 reports" originate from a specific 2023-2024 study cited in the source post. Treat them as directional, not universal constants. The method below stands regardless of exact percentages.

## The diagnostic (run before merging)

For each new mechanism you're adding, answer:

1. **What complexity am I buying?** State the mechanism in one sentence ("a retry on service A -> B").
2. **What new failure mode does it introduce?** Be specific and causal, not "it might break".
   - Bad: "the retry could fail"
   - Good: "retries multiply request volume to B during a slowdown, which can saturate B's connection pool and the shared database behind it"
3. **What is the blast radius?** Local component, one service, or the whole system?
4. **Is there an alert that would catch this specific mode before users do?** Name the signal, threshold, and who it pages.
5. **If no alert exists, is the complexity worth adding the alert for — or worth not shipping?**

If you cannot complete step 2, you do not understand the change well enough to ship it.

## Common local-improvement / global-failure patterns

| Local "improvement" | Hidden global failure mode | Alert that catches it |
|---|---|---|
| Retry on failure | Retry storms amplify load during partial outage | Downstream request-rate spike vs. baseline; retry-attempt counter |
| Aggressive caching | Stale reads / thundering herd on cache expiry | Cache hit-ratio drop; origin request surge |
| Auto-failover | Split-brain or flapping between nodes | Failover-event rate; leader-election churn |
| Deeply integrated agent/driver | Single faulty update becomes global SPOF | Staged-rollout error delta; version-adoption vs. error-rate |
| Connection pooling | Pool exhaustion under fan-out | Pool-wait time; saturation percentage |
| Timeout increase | Threads pile up, slow cascading failure | p99 latency; in-flight request count |

## The honest caveat

Simple is not automatically better. Some problems genuinely require complexity, and complexity sometimes sells precisely because it overwhelms the buyer. The discipline is **not** "always choose simple." It is: *know exactly which complexity you're buying and why, and pair every added mechanism with the detection for its failure mode.*

## Checklist (copy into your PR template)

- [ ] Named the mechanism being added
- [ ] Named the specific failure mode it introduces
- [ ] Stated the blast radius
- [ ] Identified an alert that catches the failure mode
- [ ] Alert exists / created in this PR, OR complexity deferred
- [ ] Considered whether a simpler design removes the failure mode entirely
