/**
 * unit-economics.ts
 *
 * A small, dependency-free calculator to pressure-test AI product economics.
 * Companion to guide.md. The point: treat compute as COGS, not a magic word.
 *
 * Run with: ts-node unit-economics.ts  (or compile with tsc)
 */

export interface InferenceCostInputs {
  /** Average requests a single active user makes per month */
  requestsPerUserPerMonth: number;
  /** Average input tokens per request */
  inputTokensPerRequest: number;
  /** Average output tokens per request */
  outputTokensPerRequest: number;
  /** Provider price per 1M input tokens, in USD */
  inputPricePerMillion: number;
  /** Provider price per 1M output tokens, in USD */
  outputPricePerMillion: number;
}

export interface UnitEconomicsInputs {
  /** Monthly revenue per paying user, in USD */
  revenuePerUserPerMonth: number;
  /** Non-compute variable cost per user per month (support, payment fees, etc.) */
  otherVariableCostPerUser: number;
  inference: InferenceCostInputs;
}

export interface UnitEconomicsResult {
  inferenceCostPerUser: number;
  contributionMarginPerUser: number;
  contributionMarginPct: number;
  verdict: string;
}

export function inferenceCostPerUser(i: InferenceCostInputs): number {
  const inputCost =
    (i.requestsPerUserPerMonth * i.inputTokensPerRequest / 1_000_000) *
    i.inputPricePerMillion;
  const outputCost =
    (i.requestsPerUserPerMonth * i.outputTokensPerRequest / 1_000_000) *
    i.outputPricePerMillion;
  return inputCost + outputCost;
}

export function computeUnitEconomics(
  inputs: UnitEconomicsInputs
): UnitEconomicsResult {
  const infCost = inferenceCostPerUser(inputs.inference);
  const margin =
    inputs.revenuePerUserPerMonth - infCost - inputs.otherVariableCostPerUser;
  const marginPct =
    inputs.revenuePerUserPerMonth === 0
      ? 0
      : (margin / inputs.revenuePerUserPerMonth) * 100;

  let verdict: string;
  if (margin <= 0) {
    verdict =
      'NEGATIVE: You are subsidizing usage. This only works with cheap/free compute. Fragile.';
  } else if (marginPct < 40) {
    verdict =
      'THIN: Positive but exposed. A price shift or a heavier power user erodes this fast.';
  } else if (marginPct < 70) {
    verdict = 'HEALTHY: Reasonable software-like margin. Watch power-user skew.';
  } else {
    verdict = 'STRONG: Compute is a manageable line item, not your constraint.';
  }

  return {
    inferenceCostPerUser: round(infCost),
    contributionMarginPerUser: round(margin),
    contributionMarginPct: round(marginPct),
    verdict,
  };
}

/**
 * Stress test: what happens if compute price swings? (see guide.md step 5)
 * Returns margin under a range of price multipliers.
 */
export function computeStressTest(
  inputs: UnitEconomicsInputs,
  multipliers: number[] = [0.1, 0.5, 1, 2, 5]
): { multiplier: number; marginPct: number }[] {
  return multipliers.map((m) => {
    const scaled: UnitEconomicsInputs = {
      ...inputs,
      inference: {
        ...inputs.inference,
        inputPricePerMillion: inputs.inference.inputPricePerMillion * m,
        outputPricePerMillion: inputs.inference.outputPricePerMillion * m,
      },
    };
    return {
      multiplier: m,
      marginPct: computeUnitEconomics(scaled).contributionMarginPct,
    };
  });
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

// --- Example run -----------------------------------------------------------
if (require.main === module) {
  const example: UnitEconomicsInputs = {
    revenuePerUserPerMonth: 20,
    otherVariableCostPerUser: 2,
    inference: {
      requestsPerUserPerMonth: 400,
      inputTokensPerRequest: 1500,
      outputTokensPerRequest: 600,
      inputPricePerMillion: 2.5,
      outputPricePerMillion: 10,
    },
  };

  const result = computeUnitEconomics(example);
  console.log('Unit economics:', result);
  console.log('Compute stress test:', computeStressTest(example));
}
