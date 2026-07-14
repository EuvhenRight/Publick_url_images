/**
 * Portfolio concentration analyzer.
 *
 * Given fund holdings (name + weight), computes:
 *  - total weight in a flagged group (e.g. AI-linked megacaps)
 *  - Herfindahl-Hirschman Index (HHI) and effective number of holdings
 *  - a naive isolated-drawdown impact estimate
 *
 * No external dependencies. Run with: `ts-node example.ts` or compile with tsc.
 * Replace the sample data with real, current holdings from your ETF issuer.
 */

export interface Holding {
  name: string;
  /** portfolio weight as a fraction, e.g. 0.07 for 7% */
  weight: number;
  /** mark true if you consider this an AI-linked name */
  aiLinked?: boolean;
}

export function normalizeWeights(holdings: Holding[]): Holding[] {
  const total = holdings.reduce((s, h) => s + h.weight, 0);
  if (total <= 0) throw new Error("Total weight must be positive");
  return holdings.map((h) => ({ ...h, weight: h.weight / total }));
}

export function aiExposure(holdings: Holding[]): number {
  return holdings
    .filter((h) => h.aiLinked)
    .reduce((s, h) => s + h.weight, 0);
}

/** Herfindahl-Hirschman Index on fractional weights (0..1). */
export function hhi(holdings: Holding[]): number {
  return holdings.reduce((s, h) => s + h.weight * h.weight, 0);
}

/** 1 / HHI = effective number of equally-weighted holdings. */
export function effectiveHoldings(holdings: Holding[]): number {
  const index = hhi(holdings);
  return index > 0 ? 1 / index : 0;
}

/**
 * Naive estimate: if the AI-linked group drops by `drawdown` (e.g. 0.30)
 * and nothing else moves, what is the portfolio-level loss?
 */
export function isolatedDrawdownImpact(
  holdings: Holding[],
  drawdown: number
): number {
  return aiExposure(holdings) * drawdown;
}

export function report(holdings: Holding[], drawdown = 0.3): string {
  const n = normalizeWeights(holdings);
  const exposure = aiExposure(n);
  const eff = effectiveHoldings(n);
  const impact = isolatedDrawdownImpact(n, drawdown);
  return [
    `Holdings listed:            ${n.length}`,
    `Effective # of holdings:    ${eff.toFixed(1)}  (1/HHI)`,
    `AI-linked weight:           ${(exposure * 100).toFixed(1)}%`,
    `Isolated ${(drawdown * 100).toFixed(0)}% AI drawdown => ${(impact * 100).toFixed(1)}% portfolio loss`,
    ``,
    `Reminder: "effective holdings" far below the count = hidden concentration.`,
    `These are estimates for reasoning, not forecasts or advice.`,
  ].join("\n");
}

// --- Sample data (illustrative weights; replace with current issuer data) ---
const sample: Holding[] = [
  { name: "Nvidia", weight: 0.075, aiLinked: true },
  { name: "Apple", weight: 0.065, aiLinked: true },
  { name: "Microsoft", weight: 0.062, aiLinked: true },
  { name: "Amazon", weight: 0.038, aiLinked: true },
  { name: "Alphabet", weight: 0.035, aiLinked: true },
  { name: "Meta", weight: 0.026, aiLinked: true },
  { name: "Broadcom", weight: 0.024, aiLinked: true },
  { name: "Rest of index (aggregated)", weight: 0.675, aiLinked: false },
];

if (require.main === module) {
  console.log(report(sample, 0.3));
}
