/**
 * Lean AI team economics — a tiny, dependency-free calculator.
 *
 * Run:  npx tsx example.ts      (or: ts-node example.ts)
 *
 * It answers three questions from the post:
 *   1. What is our revenue per employee (the new scoreboard)?
 *   2. Does the next hire out-earn the machine (marginal-hire test)?
 *   3. How capital-efficient are we versus the money we raised?
 *
 * All numbers are illustrative. Swap in your own.
 */

export interface Team {
  /** Annual revenue (ARR or run-rate) in USD. */
  annualRevenue: number;
  /** Full-time-equivalent headcount (count contractors doing FTE work). */
  headcount: number;
}

/** Revenue per employee — what founders brag about now, not the raise. */
export function revenuePerEmployee(team: Team): number {
  if (team.headcount <= 0) throw new Error("headcount must be > 0");
  return team.annualRevenue / team.headcount;
}

/** Rough tier label for an RPE figure (illustrative, not gospel). */
export function rpeTier(rpe: number): string {
  if (rpe >= 5_000_000) return "lean-AI outlier";
  if (rpe >= 1_000_000) return "elite";
  if (rpe >= 400_000) return "strong";
  if (rpe >= 200_000) return "healthy";
  return "below-benchmark";
}

export interface HireInputs {
  /** Annual base salary in USD. */
  baseSalary: number;
  /** Multiplier for benefits, payroll tax, overhead. Default 1.4. */
  loadMultiplier?: number;
  /** Annual per-seat tooling/compute cost. Default 6000. */
  toolingPerYear?: number;
  /** Months until the person reaches full productivity. Default 3. */
  rampMonths?: number;
  /** Gross-margin dollars this seat adds at steady state, per year. */
  expectedAnnualGrossMargin: number;
  /** Annual cost of comparable output from tooling/agents. Optional. */
  automationAlternativeCost?: number;
}

/** Fully loaded annual cost of a seat. */
export function fullyLoadedCost(h: HireInputs): number {
  const load = h.loadMultiplier ?? 1.4;
  const tooling = h.toolingPerYear ?? 6_000;
  return h.baseSalary * load + tooling;
}

export interface HireVerdict {
  fullyLoadedCost: number;
  /** First-year contribution, discounted for ramp. */
  firstYearContribution: number;
  /** Steady-state contribution minus fully loaded cost. */
  steadyStateNet: number;
  /** A cheaper automation path delivers comparable output? */
  automationBeatsHire: boolean;
  verdict: "hire" | "automate-or-wait";
  reason: string;
}

export function marginalHireVerdict(h: HireInputs): HireVerdict {
  const cost = fullyLoadedCost(h);
  const ramp = h.rampMonths ?? 3;
  const productiveFraction = Math.max(0, (12 - ramp) / 12);
  const firstYearContribution =
    h.expectedAnnualGrossMargin * productiveFraction;
  const steadyStateNet = h.expectedAnnualGrossMargin - cost;

  // The automation input already assumes comparable output, so the only
  // question is whether the machine does it for less than the loaded seat.
  const automationBeatsHire =
    h.automationAlternativeCost !== undefined &&
    h.automationAlternativeCost < cost;

  let verdict: HireVerdict["verdict"] = "hire";
  let reason = "Seat clears its cost and beats the automation alternative.";

  if (steadyStateNet <= 0) {
    verdict = "automate-or-wait";
    reason = "Seat does not out-earn its fully loaded cost at steady state.";
  } else if (automationBeatsHire) {
    verdict = "automate-or-wait";
    reason = "A cheaper automation path delivers comparable output.";
  }

  return {
    fullyLoadedCost: cost,
    firstYearContribution,
    steadyStateNet,
    automationBeatsHire,
    verdict,
    reason,
  };
}

export interface CapitalEfficiency {
  /** Annual revenue generated per dollar raised. */
  revenuePerDollarRaised: number;
  /** Months of runway at current burn. */
  runwayMonths: number;
}

export function capitalEfficiency(args: {
  annualRevenue: number;
  totalRaised: number;
  monthlyBurn: number;
  cashOnHand: number;
}): CapitalEfficiency {
  return {
    revenuePerDollarRaised:
      args.totalRaised > 0 ? args.annualRevenue / args.totalRaised : Infinity,
    runwayMonths:
      args.monthlyBurn > 0 ? args.cashOnHand / args.monthlyBurn : Infinity,
  };
}

const fmt = (n: number): string =>
  n === Infinity
    ? "inf"
    : n.toLocaleString("en-US", { maximumFractionDigits: 0 });

// --- Demo -------------------------------------------------------------
if (typeof require !== "undefined" && require.main === module) {
  // A lean-AI outlier in the spirit of the post (illustrative figures).
  const lean: Team = { annualRevenue: 500_000_000, headcount: 50 };
  const rpe = revenuePerEmployee(lean);
  console.log(`RPE: $${fmt(rpe)}/person  (${rpeTier(rpe)})`);

  const hire = marginalHireVerdict({
    baseSalary: 200_000,
    expectedAnnualGrossMargin: 260_000,
    rampMonths: 4,
    automationAlternativeCost: 40_000,
  });
  console.log(`Hire test: ${hire.verdict.toUpperCase()} - ${hire.reason}`);
  console.log(
    `  fully loaded: $${fmt(hire.fullyLoadedCost)}, ` +
      `steady net: $${fmt(hire.steadyStateNet)}`
  );

  const cap = capitalEfficiency({
    annualRevenue: 500_000_000,
    totalRaised: 60_000_000,
    monthlyBurn: 2_000_000,
    cashOnHand: 48_000_000,
  });
  console.log(
    `Capital efficiency: $${cap.revenuePerDollarRaised.toFixed(2)} revenue per ` +
      `$ raised, ${fmt(cap.runwayMonths)} months runway`
  );
}
