# The Power Interconnection Bottleneck: A Practical Guide for AI Infrastructure Decisions

This guide translates the LinkedIn post into a working framework you can use when planning compute capacity, negotiating with utilities, or evaluating whether to build vs. lease.

---

## 1. Why the constraint moved from silicon to power

| Era | Scarce resource | Nature of constraint | Can money fix it? |
|-----|-----------------|----------------------|-------------------|
| ~2023 | GPUs, HBM, CoWoS packaging | A **product** with a supply chain | Yes — you can out-bid, pre-pay, corner supply |
| ~2025+ | Grid interconnection in congested markets | A **queue** governed by studies & permitting | Largely no — everyone waits in the same line |

Key mental model: **A market responds to price. A queue responds to position and eligibility.** When the binding constraint becomes a queue, the strategies that worked in a market (spend more) stop working. You must instead change your *position* or *eligibility*.

---

## 2. The interconnection timeline (typical, congested market)

Rough phases for a large new load in a congested region (Northern Virginia, Silicon Valley, parts of Northern Europe):

1. **Feasibility / application** — weeks to months
2. **Interconnection / system impact studies** — 6–18 months
3. **Substation & transmission upgrades** — 12–30 months (often the long pole)
4. **Permitting (local + environmental)** — runs in parallel, can gate everything

Total in the worst markets: **24–36 months.** Note these overlap; the critical path is usually physical upgrades + permitting, not the paperwork.

---

## 3. The FERC Principle 7 inversion (flexible load)

The traditional premium was on **firm, always-on power**. Regulators (e.g., FERC's proposed large-load principles) are moving toward **fast-tracking loads that can curtail on command** during grid stress.

The competitive edge inverts:

- Old edge: *guarantee* you'll always draw your full allocation.
- New edge: *agree to draw less* during peak stress in exchange for faster connection.

Why it works technically: a curtailable load doesn't force the utility to size firm capacity for your peak, so it can be accommodated sooner without waiting for full upgrades.

**Flexibility can jump a queue that money cannot.**

---

## 4. The overbuild / stranded-asset risk

Historical analog: 1990s telecom fiber overbuild. Capacity was laid for a demand curve that bent differently than expected, leaving "dark fiber" unused for years.

Parallel risk today: if **performance-per-watt improves faster than workload demand grows**, power infrastructure sized for 2024-era workloads could sit half-used by ~2028.

Decision implication: heavy, inflexible, long-lived firm-power commitments carry *stranding risk*. Flexible / modular / curtailable arrangements hedge against both the queue AND the overbuild.

---

## 5. A decision checklist

Use this when evaluating a new site or expansion:

- [ ] Is the target market interconnection-congested? (Check utility queue length publicly if available.)
- [ ] What is the realistic energization date, and what's on the critical path (studies vs. physical upgrades vs. permitting)?
- [ ] Can our workload tolerate curtailment? (Training checkpoints? Batch/deferrable jobs? Multi-region failover?)
- [ ] Would a flexible-load / curtailment agreement materially advance our position in the queue?
- [ ] What is our exposure to stranding if perf/watt improves 2–3x over the asset's life?
- [ ] Have we compared build-new vs. lease-existing capacity where power is already energized?
- [ ] Do we have a diversified geographic queue position (multiple sites in parallel)?

---

## 6. Curtailment feasibility: which workloads qualify?

| Workload type | Curtailment tolerance | Notes |
|---------------|----------------------|-------|
| Large-scale training | High (with checkpointing) | Can pause/resume; schedule around peaks |
| Batch inference / offline eval | High | Naturally deferrable |
| Fine-tuning jobs | Medium-High | Checkpoint frequently |
| Real-time serving (latency SLA) | Low | Needs firm power or geographic redundancy |
| Mixed cluster | Medium | Partition curtailable vs. firm sub-clusters |

Strategy: **partition** your fleet — put deferrable work behind flexible-load agreements to jump the queue, keep a smaller firm-power footprint for latency-sensitive serving.

---

## Sources & caveats

Figures (24–36 months, market names, FERC Principle 7) are drawn from the source post and reflect general industry reporting as of 2025–2026. Interconnection timelines and regulatory proposals change; verify current FERC filings and specific utility queues before committing capital.
