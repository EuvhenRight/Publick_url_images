# Where Does the Chokepoint Sit? Measuring Concentration in Open AI

A companion to the post arguing that open weights don't dissolve
concentration risk — they relocate it down to whoever owns the compute.

This guide gives you a vocabulary and a method to reason about the claim
instead of taking (or rejecting) it on vibes.

---

## 1. The two-layer model of concentration

Think of an AI ecosystem as a stack. Concentration can occur at any layer:

| Layer            | What "owning it" means            | Openness lever            |
|------------------|-----------------------------------|---------------------------|
| Model weights    | Controlling the artifact          | Open weights / licenses   |
| Training data    | Controlling what shaped it        | Open datasets             |
| Compute (GPUs)   | Controlling the ability to run it | Shared/on-demand compute  |
| Distribution     | Controlling discovery & defaults  | Open hubs, marketplaces   |

The post's core claim: open weights address the *weights* layer while the
real gravity has moved to the *compute* layer. "Zero GPU"-style shared
compute is an attempt to open that lower layer.

**Takeaway:** "Is this open?" is under-specified. Always ask *open at which
layer?*

---

## 2. How to test a concentration claim

The post cites a download power curve. Any such claim reduces to three
measurable questions:

1. **Top-N share** — what fraction of total activity (downloads, usage,
   spend) do the top N items capture?
2. **Gini coefficient** — how unequal is the whole distribution (0 = equal,
   1 = one item takes everything)?
3. **Long tail** — what fraction of items get almost no activity?

See `analyze_download_concentration.py` to compute all three against live
Hub metadata.

### Caveats when interpreting
- **Downloads ≠ usage ≠ economic value.** A model downloaded once and
  served to millions may matter more than a heavily downloaded toy.
- **Sampling truncates the tail.** Measuring only the top few thousand
  models understates how long the tail actually is, which *understates*
  concentration of the long tail and *overstates* per-model activity.
- **Power-law distributions are the norm** across the web, GitHub repos,
  npm packages, and citations. Finding one on a model hub is expected, not
  itself evidence of a governance failure.

---

## 3. Distinguishing "concentration" from "monopoly"

A skewed distribution is not automatically a power problem. Ask:

- **Contestability:** Can a new entrant realistically displace the top?
  Open weights *lower* the barrier at the weights layer.
- **Substitutability:** If the leading provider raised prices or added
  restrictions, are there viable alternatives?
- **Accountability:** The post's sharpest line — "'no one owns it' can
  quietly become 'no one's accountable for it.'" Diffuse ownership can
  reduce single-actor power *and* reduce clear responsibility. Both can be
  true at once.

---

## 4. A decision framework for your own stack

When choosing where to build, score each layer for risk:

1. **Weights lock-in:** Is the model open-weight, or gated behind an API?
2. **Compute lock-in:** Can you run it on more than one provider's
   hardware? Are the kernels/quantizations portable?
3. **Distribution lock-in:** Do you depend on one hub's defaults for
   discovery and updates?
4. **Exit cost:** How many hours to migrate off each layer?

The layer with the highest exit cost is *your* real chokepoint — which may
differ from the ecosystem-wide one.

---

## 5. Further reading directions
- Herfindahl–Hirschman Index (HHI) as an alternative to Gini for
  market-share concentration.
- Zipf / power-law fitting (e.g., the `powerlaw` Python package) to test
  whether a distribution is genuinely heavy-tailed.
- The economics of compute: why frontier inference cost, not download
  cost, drives the concentration the post describes.
