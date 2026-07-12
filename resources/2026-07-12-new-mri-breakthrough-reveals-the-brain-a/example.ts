/**
 * component-vs-power.ts
 *
 * A tiny, self-contained illustration of the post's core idea:
 * measure WHERE the loss happens before you "add power".
 *
 * Run with: npx ts-node example.ts   (or compile with tsc)
 * No external dependencies.
 */

type Stage = {
  name: string;
  /** milliseconds this stage contributes to total latency */
  latencyMs: number;
  /** relative cost to make this stage faster by adding raw power */
  powerUpgradeCost: number;
  /** relative cost to redesign this component */
  redesignCost: number;
  /** does redesign here compound across the whole fleet? */
  compounds: boolean;
};

function profile(stages: Stage[]) {
  const total = stages.reduce((s, x) => s + x.latencyMs, 0);
  return stages
    .map((s) => ({ ...s, share: s.latencyMs / total }))
    .sort((a, b) => b.share - a.share);
}

/**
 * Decide: bigger engine (power) or smarter component (redesign)?
 * Returns a recommendation for the dominant bottleneck.
 */
function recommend(stages: Stage[]) {
  const ranked = profile(stages);
  const bottleneck = ranked[0];

  const redesignWins =
    bottleneck.redesignCost <= bottleneck.powerUpgradeCost || bottleneck.compounds;

  return {
    bottleneck: bottleneck.name,
    bottleneckShare: `${(bottleneck.share * 100).toFixed(0)}%`,
    recommendation: redesignWins
      ? `Redesign the "${bottleneck.name}" component (the coil), don't buy a bigger engine.`
      : `Power upgrade is justified for "${bottleneck.name}".`,
    reasoning: bottleneck.compounds
      ? "Redesign compounds across the existing fleet — like an RF coil that works on MRIs hospitals already own."
      : "Redesign cost is competitive with the power upgrade and avoids rebuilding the room.",
  };
}

// --- Example: an MRI-like pipeline as a software metaphor ---
const pipeline: Stage[] = [
  { name: "magnet/core-compute", latencyMs: 40, powerUpgradeCost: 100, redesignCost: 90, compounds: false },
  { name: "rf-coil/signal-collection", latencyMs: 180, powerUpgradeCost: 80, redesignCost: 12, compounds: true },
  { name: "reconstruction", latencyMs: 60, powerUpgradeCost: 30, redesignCost: 25, compounds: false },
];

console.log("Profile (highest share first):");
for (const s of profile(pipeline)) {
  console.log(`  ${s.name}: ${(s.share * 100).toFixed(0)}% of latency`);
}
console.log("\nDecision:");
console.log(recommend(pipeline));

export { profile, recommend, Stage };
