# The Antenna, Not the Magnet: A Decision Guide for "Component vs. Power" Upgrades

This guide turns the core insight of the MRI metamaterial-coil story into a reusable
decision framework for engineers and technical leaders. The MRI team didn't buy a bigger
magnet — they redesigned the cheap, swappable coil that collects the signal. This guide
helps you spot when *your* system has the same opportunity.

> Note on the science: the specifics below (metamaterial RF coils, 7T orbit imaging at the
> Max Delbrück Center) are summarized from the ScienceDaily report and are illustrative,
> not a substitute for the primary paper. The framework is the reusable part.

## The pattern

When a system underperforms, the reflex is often "add power":
- Bigger magnet (MRI)
- Bigger instance / more CPU (software)
- More people (teams)
- Larger model (ML)

The alternative is "redesign a component":
- Swap the RF coil (MRI)
- Fix the hot query / cache layer (software)
- Fix the handoff process (teams)
- Better retrieval / prompt (ML)

Power upgrades often require rebuilding the room around them (new shielding, cooling,
capital, coordination). Component upgrades ride on everything already in place.

## Diagnostic questions

Ask these before approving a "more power" spend:

1. **Where is the signal actually collected/produced?**
   In MRI, resolution loss lived at the receiver coil, not the magnet. Find the true
   bottleneck stage, not the most expensive-looking one.

2. **Is the bottleneck the powered core or a peripheral component?**
   Cores are expensive to change and force environmental rebuilds. Peripherals are
   swappable and cheap.

3. **What is the blast radius of each option?**
   Power upgrade: new capital, new dependencies, downtime. Component redesign: often
   drop-in, reversible.

4. **Does the fix compound across existing installations?**
   The metamaterial coil works on machines hospitals *already own*. A fix that spreads
   without re-provisioning is worth far more than a marginal core upgrade.

5. **Have you measured, or are you guessing?**
   "More power" is the default when nobody has profiled where the loss occurs.

## Scoring rubric

Score each option 0-2 on the axes below; higher totals favor the component redesign.

| Axis | Power upgrade | Component redesign |
|------|---------------|--------------------|
| Addresses measured bottleneck | ? | ? |
| Low environmental rebuild cost | ? | ? |
| Reversible / low risk | ? | ? |
| Compounds across existing fleet | ? | ? |
| Fast to ship | ? | ? |

If the redesign column wins, resist the bigger-engine reflex.

## Worked software analogy

A service is slow. Reflex: upsize the database instance (the "magnet").
Investigation shows 90% of latency is one N+1 query hitting an uncached table
(the "coil"). Adding an index + a read-through cache is the metamaterial coil:
cheap, swappable, works on the hardware you already run, and compounds across
every endpoint that touches that table.

See `example.ts` for a runnable illustration of profiling before scaling.
