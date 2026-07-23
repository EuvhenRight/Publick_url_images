/**
 * Earnings-proxy calculators for pressure-testing AI valuations.
 *
 * Illustrative only. Figures used in comments match the discussion in the
 * companion post (OpenAI ~$25B run-rate vs ~$22-23B actual Q1 pace).
 *
 * Run with: npx ts-node metrics.ts
 */

/** Convert a recent-period revenue into a run-rate (the optimistic annualization). */
export function runRate(periodRevenue: number, periodsPerYear: number): number {
  return periodRevenue * periodsPerYear;
}

/**
 * Gap between a cited run-rate and the true trailing-twelve-month (TTM) figure.
 * Returns the inflation as a percentage of TTM.
 */
export function runRateInflation(citedRunRate: number, ttmActual: number): number {
  if (ttmActual <= 0) return NaN;
  return ((citedRunRate - ttmActual) / ttmActual) * 100;
}

/**
 * The depreciation-life trick (Burry critique).
 * Extending useful life lowers annual depreciation and raises reported profit
 * with zero change in cash.
 */
export function depreciationEffect(
  hardwareCost: number,
  oldLifeYears: number,
  newLifeYears: number
): { oldAnnual: number; newAnnual: number; profitUplift: number } {
  const oldAnnual = hardwareCost / oldLifeYears;
  const newAnnual = hardwareCost / newLifeYears;
  return {
    oldAnnual,
    newAnnual,
    profitUplift: oldAnnual - newAnnual, // pre-tax reported profit gained per year
  };
}

/**
 * A crude "promise-to-reality" ratio: how much forward optimism is priced
 * against current losses. Higher = more hope in the price.
 */
export function promiseToRealityRatio(citedRunRate: number, forecastLoss: number): number {
  if (forecastLoss <= 0) return Infinity;
  return citedRunRate / forecastLoss;
}

// ---- Demonstration ----
if (require.main === module) {
  // Run-rate built from a strong recent quarter
  const strongQuarter = 6.25; // $B
  const cited = runRate(strongQuarter, 4); // $25B run-rate
  const ttm = 22.5; // $B actual trailing pace
  console.log('Cited run-rate ($B):', cited);
  console.log('Run-rate inflation vs TTM (%):', runRateInflation(cited, ttm).toFixed(1));

  // Depreciation trick on a $10B AI hardware base
  const dep = depreciationEffect(10, 3, 6);
  console.log('Old annual depreciation ($B):', dep.oldAnnual.toFixed(2));
  console.log('New annual depreciation ($B):', dep.newAnnual.toFixed(2));
  console.log('Reported profit uplift per year ($B):', dep.profitUplift.toFixed(2));

  // Promise vs reality: $25B run-rate against $33B forecast loss
  console.log('Promise-to-reality ratio:', promiseToRealityRatio(25, 33).toFixed(2));
}
