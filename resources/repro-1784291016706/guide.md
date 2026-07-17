# Diagnostic: Why Simple Systems Outlast Clever Ones

A practical guide for spotting and pricing "just in case" complexity during architecture and code review.

## The core claim

Maintenance dominates total cost of ownership for software (commonly cited at 40–90% of lifetime cost). That cost scales with structural complexity: more modules, deeper branching, more state to keep synchronized. Complexity added speculatively ("we might need it") tends to sit unused while still generating maintenance load: it has to be read, tested, patched, and understood by every future contributor.

The Unix reference point: research reconstructing decades of Unix source found the codebase grew steadily in size while median cyclomatic complexity per function was held roughly flat. Simplicity was a maintained discipline, not a one-time starting condition.

> Note on sourcing: the specific figures above (40–90% maintenance cost; the Unix complexity trend) are widely repeated in the software engineering literature. Treat them as directional, and cite the primary source when you reuse them. Do not present rounded claims as precise measurements you personally verified.

## How clever systems actually fail

They rarely fail at the demo. They fail slowly:

1. Extra abstraction layers and flags are added for hypothetical futures.
2. The system runs in a mildly degraded / hard-to-reason-about state for a long time.
3. People patch the edges rather than remove the root complexity.
4. Several small latent faults eventually align, and the system fails all at once.

The cost is not the outage. The cost is the years of slowed change and elevated defect risk before it.

## The review question

For each complex part of a design, ask:

> Did this become complex out of **genuine need** or out of **fear**?

"Fear" complexity looks like:

- Configuration options no caller actually sets to a non-default value.
- Generic abstractions with exactly one implementation.
- Plugin / strategy layers for extension points nobody has requested.
- Retry / caching / queueing added before any measured need.
- Deep inheritance or indirection that exists "so we can swap it later."

## A scoring rubric

Rate each component 0–2 on the following. Higher total = stronger candidate for simplification.

| Signal | 0 | 1 | 2 |
|---|---|---|---|
| Speculative generality | Solves a real, present requirement | Partly speculative | Built purely for a hypothetical future |
| Actual usage | Every path exercised in prod | Some paths unused | Large branches never taken |
| Reason for existence | Measured constraint | "Best practice" reflex | Fear / "just in case" |
| Cost to remove | Trivial | Moderate | High (but that's the point of finding it early) |
| Cognitive load | New dev understands in minutes | Needs a walkthrough | Needs the original author |

Components scoring 6+ deserve an explicit justify-or-delete decision.

## The removal workflow

1. **Confirm it's unused or speculative** — search callers, check telemetry, check config values in each environment.
2. **Write the characterization test** for the behavior that must survive.
3. **Delete the branch/layer**, not just disable it.
4. **Re-run tests and measure** the resulting complexity delta.
5. **Record the decision** so the complexity doesn't grow back for the same fear.

## Things to measure

- Cyclomatic complexity per function (flat trend over time is the goal, not a one-time number).
- Number of configuration flags vs. number actually varied across environments.
- Abstractions with a single concrete implementation.
- Dead branches (coverage gaps that persist release over release).

See `complexity-check.ts` for a small runnable heuristic and `review-prompt.md` for a reusable review prompt.
