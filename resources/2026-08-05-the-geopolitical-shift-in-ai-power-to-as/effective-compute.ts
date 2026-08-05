/**
 * effective-compute.ts
 *
 * A tiny, dependency-free model for the post
 * "The geopolitical shift in AI power to Asia."
 *
 * The post's core insight is that "AI power" is NOT one number. Owning the most
 * raw compute (the West) is different from getting the most capability per unit
 * of compute (China's claimed ~5x efficiency edge), which is different again
 * from being able to POWER the next buildout (China's grid growth).
 *
 * This script makes that concrete: it converts each bloc's RAW compute share
 * into an "effective" capability share by weighting for efficiency, then shows
 * how the ranking flips depending on which lens you privilege.
 *
 * Run it:
 *   npx tsx effective-compute.ts
 *   # or: deno run effective-compute.ts
 *   # or compile with tsc and run the .js
 *
 * IMPORTANT: the default numbers are the *illustrative* figures asserted in the
 * post, not audited facts. Edit the BLOCS array with sourced values (see
 * guide.md for where to find them) before drawing any real conclusion.
 */

interface Bloc {
  name: string;
  /** Share of the world's high-end AI compute, 0..1. (Post: US ~0.74) */
  rawComputeShare: number;
  /** Annual AI investment, USD billions (relative scale is what matters). */
  annualInvestmentUsdB: number;
  /**
   * Capability per unit of compute, relative to a 1.0 baseline.
   * Post claims China reaches comparable results with ~5x less compute,
   * i.e. ~5x the capability per FLOP => efficiencyMultiplier ~= 5.
   */
  efficiencyMultiplier: number;
  /** New electricity added to the grid each year, in TWh (proxy for headroom). */
  addedGridTWhPerYear: number;
}

// --- Illustrative inputs from the post. Replace with sourced numbers. ---
const BLOCS: Bloc[] = [
  {
    name: 'United States',
    rawComputeShare: 0.74,
    annualInvestmentUsdB: 120,
    efficiencyMultiplier: 1.0,
    addedGridTWhPerYear: 90, // slow grid growth is the post's stated bottleneck
  },
  {
    name: 'China',
    rawComputeShare: 0.16,
    annualInvestmentUsdB: 10, // ~12x less than the US per the post
    efficiencyMultiplier: 5.0,
    addedGridTWhPerYear: 550, // ~"a Germany's worth" of electricity per year
  },
  {
    name: 'Rest of world',
    rawComputeShare: 0.10,
    annualInvestmentUsdB: 20,
    efficiencyMultiplier: 1.2,
    addedGridTWhPerYear: 200,
  },
];

function pct(x: number): string {
  return `${(x * 100).toFixed(1)}%`;
}

/** Normalize a raw metric across blocs into shares that sum to 1. */
function shares<T>(items: T[], pick: (t: T) => number): number[] {
  const total = items.reduce((s, it) => s + pick(it), 0) || 1;
  return items.map((it) => pick(it) / total);
}

/**
 * "Effective compute" = raw compute share x efficiency multiplier, re-normalized.
 * This is the whole thesis in one line: efficiency lets a compute-poor player
 * punch above its hardware share.
 */
function effectiveComputeShares(blocs: Bloc[]): number[] {
  const weighted = blocs.map((b) => b.rawComputeShare * b.efficiencyMultiplier);
  const total = weighted.reduce((s, w) => s + w, 0) || 1;
  return weighted.map((w) => w / total);
}

function leader(names: string[], values: number[]): string {
  let bestI = 0;
  for (let i = 1; i < values.length; i++) if (values[i] > values[bestI]) bestI = i;
  return names[bestI];
}

function main(): void {
  const names = BLOCS.map((b) => b.name);

  const rawShare = BLOCS.map((b) => b.rawComputeShare);
  const capitalShare = shares(BLOCS, (b) => b.annualInvestmentUsdB);
  const energyShare = shares(BLOCS, (b) => b.addedGridTWhPerYear);
  const effShare = effectiveComputeShares(BLOCS);

  const rows = BLOCS.map((b, i) => ({
    Bloc: b.name,
    'Raw compute': pct(rawShare[i]),
    'Capital': pct(capitalShare[i]),
    'Energy headroom': pct(energyShare[i]),
    'Effective compute': pct(effShare[i]),
  }));

  console.log('\nAI power is four different rankings, not one:\n');
  console.table(rows);

  console.log('Who "leads" depends entirely on the lens you pick:');
  console.log(`  - Raw compute (owns the machines): ${leader(names, rawShare)}`);
  console.log(`  - Capital (spends the most):        ${leader(names, capitalShare)}`);
  console.log(`  - Energy headroom (can power it):   ${leader(names, energyShare)}`);
  console.log(`  - Effective compute (does more/less): ${leader(names, effShare)}`);

  console.log(
    '\nThe post\'s point: the West leads on the top two lenses, but efficiency\n' +
      'and energy (bottom two) are where the momentum sits. "AI power -> Asia" is\n' +
      'wrong as a single arrow because these lenses move independently.\n'
  );

  // Sensitivity: how big must the efficiency edge be to flip effective-compute
  // leadership away from the raw-compute leader? This is the real bet the post
  // asks you to make.
  const rawLeaderIdx = rawShare.indexOf(Math.max(...rawShare));
  const challengerIdx = BLOCS.findIndex((_, i) => i !== rawLeaderIdx);
  const flip = flipMultiplier(BLOCS, rawLeaderIdx, challengerIdx);
  console.log(
    `For ${names[challengerIdx]} to overtake ${names[rawLeaderIdx]} on effective\n` +
      `compute, its efficiency multiplier would need to exceed ~${flip.toFixed(1)}x\n` +
      `(current model assumes ${BLOCS[challengerIdx].efficiencyMultiplier}x).`
  );
}

/**
 * Minimum efficiency multiplier the challenger needs so that
 * challenger.rawCompute x mult >= leader.rawCompute x leader.efficiency.
 */
function flipMultiplier(blocs: Bloc[], leaderIdx: number, challengerIdx: number): number {
  const L = blocs[leaderIdx];
  const C = blocs[challengerIdx];
  if (C.rawComputeShare <= 0) return Infinity;
  return (L.rawComputeShare * L.efficiencyMultiplier) / C.rawComputeShare;
}

main();
