/**
 * curtailment_tradeoff.ts
 *
 * A small, self-contained model to reason about the core tradeoff in the post:
 * firm always-on power (long queue) vs. flexible curtailable power (faster queue).
 *
 * No external dependencies. Run with: npx ts-node curtailment_tradeoff.ts
 * or compile with tsc and run the JS.
 */

interface ScenarioInput {
  name: string;
  /** Months until the cluster is energized and earning. */
  monthsToEnergize: number;
  /** Fraction of hours per year the load must curtail (0 = firm, e.g. 0.05 = 5%). */
  curtailmentFraction: number;
  /** Monthly gross value produced by a fully-utilized cluster ($). */
  monthlyValueWhenRunning: number;
  /** Analysis horizon in months. */
  horizonMonths: number;
  /** Optional: probability the asset is stranded (perf/watt bends the curve). 0..1 */
  strandingRisk?: number;
}

interface ScenarioResult {
  name: string;
  monthsToEnergize: number;
  productiveMonths: number;
  effectiveUtilization: number;
  grossValue: number;
  riskAdjustedValue: number;
}

function evaluate(s: ScenarioInput): ScenarioResult {
  const productiveMonths = Math.max(0, s.horizonMonths - s.monthsToEnergize);
  // Curtailment reduces effective output while running.
  const effectiveUtilization = 1 - s.curtailmentFraction;
  const grossValue =
    productiveMonths * s.monthlyValueWhenRunning * effectiveUtilization;
  const strandingRisk = s.strandingRisk ?? 0;
  const riskAdjustedValue = grossValue * (1 - strandingRisk);

  return {
    name: s.name,
    monthsToEnergize: s.monthsToEnergize,
    productiveMonths,
    effectiveUtilization,
    grossValue,
    riskAdjustedValue,
  };
}

// --- Example scenarios (edit the numbers for your own situation) ---

const HORIZON = 60; // 5-year view
const MONTHLY_VALUE = 1_000_000; // $1M/month from a fully-utilized cluster

const firmPower: ScenarioInput = {
  name: "Firm power (long queue)",
  monthsToEnergize: 30, // stuck in the 24-36 month interconnection queue
  curtailmentFraction: 0, // never curtails
  monthlyValueWhenRunning: MONTHLY_VALUE,
  horizonMonths: HORIZON,
  strandingRisk: 0.25, // heavier firm commitment => higher stranding exposure
};

const flexiblePower: ScenarioInput = {
  name: "Flexible / curtailable (fast-track)",
  monthsToEnergize: 12, // jumps the queue via a curtailment agreement
  curtailmentFraction: 0.05, // curtails ~5% of hours on peak days
  monthlyValueWhenRunning: MONTHLY_VALUE,
  horizonMonths: HORIZON,
  strandingRisk: 0.15, // more optionality => lower stranding exposure
};

function format(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function report(r: ScenarioResult): void {
  console.log(`\n=== ${r.name} ===`);
  console.log(`Months to energize:      ${r.monthsToEnergize}`);
  console.log(`Productive months:       ${r.productiveMonths}`);
  console.log(`Effective utilization:   ${(r.effectiveUtilization * 100).toFixed(1)}%`);
  console.log(`Gross value:             ${format(r.grossValue)}`);
  console.log(`Risk-adjusted value:     ${format(r.riskAdjustedValue)}`);
}

function main(): void {
  const a = evaluate(firmPower);
  const b = evaluate(flexiblePower);
  report(a);
  report(b);

  const delta = b.riskAdjustedValue - a.riskAdjustedValue;
  console.log("\n--- Verdict ---");
  console.log(
    delta > 0
      ? `Flexible wins by ${format(delta)} risk-adjusted. Curtailment cost is dwarfed by earlier energization.`
      : `Firm wins by ${format(-delta)} risk-adjusted. Curtailment penalty outweighs the earlier start here.`
  );
  console.log(
    "\nKey insight: the dominant lever is usually monthsToEnergize, not curtailmentFraction."
  );
  console.log(
    "A few % of curtailed hours rarely offsets 12-24 months of not earning at all."
  );
}

main();

export { evaluate, ScenarioInput, ScenarioResult };
