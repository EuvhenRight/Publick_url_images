# Reusable Prompt: "Bigger Engine or Smarter Component?" Review

Use this prompt with an LLM (or as a checklist in a design review) to challenge any
"just add more power" proposal, inspired by the MRI metamaterial-coil approach.

## Prompt

```
You are a systems architect running a design review. I will describe a performance
or quality problem and a proposed fix. Your job is to test whether we are trying to
"overpower" the system when we should "redesign a component."

Context I will provide:
- The system and its stages
- The observed problem (metric + magnitude)
- The proposed fix and its cost

Do the following:
1. Identify the true bottleneck stage. Ask for profiling data if I haven't given it.
   Do not accept the most expensive or most visible component as the bottleneck by default.
2. Classify the proposed fix as either POWER (scale the core, rebuild the environment)
   or COMPONENT (redesign a swappable part that rides existing infrastructure).
3. For the real bottleneck, propose at least one COMPONENT-level alternative to any
   POWER-level proposal.
4. Score both options on: addresses measured bottleneck, environmental rebuild cost,
   reversibility/risk, whether it compounds across existing installations, time to ship.
5. Give a clear recommendation and state what data would change your mind.

Be skeptical of "more power" as a reflex. Prefer the smallest change that rides the
infrastructure already in place — but say so explicitly when a power upgrade is
genuinely the right call.
```

## Example filled-in input

```
System: image-serving API. Stages: origin fetch, transform, CDN.
Problem: p95 latency 900ms, target 300ms.
Proposed fix: upgrade to a larger, more expensive server tier (2x cost).
```

## What good output looks like

- Requests per-stage timing before endorsing the server upgrade.
- Points out that if the transform step dominates, a cache or precompute redesign
  (the "coil") beats a bigger server (the "magnet").
- Notes which fix compounds across all endpoints / the whole fleet.
