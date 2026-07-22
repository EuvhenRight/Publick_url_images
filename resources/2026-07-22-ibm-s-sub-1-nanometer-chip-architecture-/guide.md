# Reading Past the Node Name: A Practical Guide to Semiconductor Process Labels

This guide helps engineers, technical decision-makers, and curious readers understand what modern process node names ("2nm", "0.7nm") actually mean — and how to evaluate chips without being misled by marketing conventions.

## 1. The Core Problem: Node Names Are Not Measurements

Once upon a time (roughly through the early 2000s), the "node" number corresponded to a real physical dimension — typically the gate length or the half-pitch of the smallest features on the chip. A "90nm" process really had features around 90nm.

That stopped being true. Since around the 22nm/16nm generation, node names became **marketing labels** that signal a generational density/performance improvement, not a ruler reading.

Key facts:

- Actual transistor contacted gate pitch (CGP) and metal pitch have stayed in the **~40–60nm range** for years, far larger than the node name suggests.
- A "7nm" part from one foundry and a "7nm" part from another can differ substantially in density, power, and performance.
- IBM's "0.7nm" / "sub-1nm" node contains **nothing that physically measures below a nanometer.**

## 2. What Actually Changed: X-Y Scaling vs. Z-Axis Stacking

For ~60 years, scaling meant shrinking features in the flat X-Y plane (classic Moore's Law / Dennard scaling).

That approach hit physical and economic limits. The industry's responses:

| Era | Strategy | Example |
|-----|----------|---------|
| Planar | Shrink 2D feature size | Pre-~2011 |
| FinFET | Raise the channel into a vertical fin (3D channel) | ~22nm onward |
| Gate-All-Around (GAA) / Nanosheet | Wrap the gate fully around stacked horizontal sheets | ~2nm era |
| Stacked / CFET-style | Stagger and stack transistors in the Z axis | IBM "0.7nm" direction |

IBM's headline advance is **stacking and staggering transistors vertically** rather than shrinking them further horizontally — "adding floors to a building that ran out of ground."

### Reported figures (treat as vendor projections, not shipping benchmarks)
- ~100 billion transistors in a fingernail-sized footprint
- Roughly double the transistor count of IBM's 2021 2nm chip
- Up to ~50% more performance **or** ~70% better efficiency (typically an either/or tradeoff, not simultaneous)

## 3. Metrics That Actually Mean Something

When comparing chips or roadmaps, ignore the node name and ask for these:

1. **Transistor density** — millions of transistors per mm² (MTr/mm²). This is the single most useful density comparison.
2. **Contacted Gate Pitch (CGP / CPP)** — spacing between transistor gates.
3. **Metal Pitch (MMP / M0 pitch)** — spacing of the finest interconnect layer.
4. **SRAM bit-cell area** — a real, comparable physical structure.
5. **Power/Performance/Area (PPA)** — the three-way tradeoff at a stated voltage and workload.
6. **iso-power / iso-performance framing** — "X% faster at same power" OR "Y% less power at same speed." A single number without this framing is nearly meaningless.

## 4. A Checklist for Evaluating a Vendor Claim

- [ ] Is the node number presented as a measurement or a label? (It's a label.)
- [ ] Is transistor density (MTr/mm²) disclosed?
- [ ] Are performance/efficiency gains stated as iso-power OR iso-performance (not both at once)?
- [ ] Is the comparison baseline named (vs. which prior node)?
- [ ] Are the numbers from shipping silicon, a test chip, or a projection/roadmap?
- [ ] Is the claim from the foundry, or independently measured (e.g., TechInsights die analysis)?

If most answers are missing, you're reading marketing, not engineering.

## 5. Practical Takeaway

> The density is real. The number on the box isn't.

When you plan roadmaps, budgets, or architecture decisions around a "2nm" or "0.7nm" claim, normalize everything to physical metrics (density, PPA, pitch). Otherwise you risk comparing two labels that share a name and almost nothing else.

## References / Further Reading
- MIT Technology Review coverage on why nanometer node names no longer describe physical features.
- IEEE Spectrum articles on Gate-All-Around (GAA) nanosheet and CFET (complementary FET) research.
- TechInsights die-level analyses for independently measured density figures.
