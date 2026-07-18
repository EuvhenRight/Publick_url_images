/**
 * FI (Financial Independence) Number Calculator
 *
 * Based on the LinkedIn post: the finish line is set primarily by how little
 * you can live on, not by the yield you chase. This tool lets you see how the
 * required portfolio moves as you change spend, yield, and withdrawal strategy.
 *
 * Run with: npx ts-node calculator.ts   (or compile with tsc)
 */

export interface FiInputs {
  /** Desired annual after-tax income you want to live on. */
  annualSpend: number;
  /** Expected annual dividend yield (e.g. 0.03 for 3%). Used for the dividend model. */
  dividendYield?: number;
  /** Safe withdrawal rate for the sell-shares model (e.g. 0.04 or 0.047). */
  withdrawalRate?: number;
}

export interface FiResult {
  annualSpend: number;
  dividendModel?: {
    yield: number;
    portfolioNeeded: number;
  };
  withdrawalModel?: {
    rate: number;
    portfolioNeeded: number;
  };
}

/**
 * Portfolio required to generate `annualSpend` from dividends at a given yield.
 * portfolio = spend / yield
 */
export function dividendPortfolio(annualSpend: number, yield_: number): number {
  if (yield_ <= 0) throw new Error("Yield must be greater than 0");
  return annualSpend / yield_;
}

/**
 * Portfolio required under a safe-withdrawal-rate model.
 * portfolio = spend / rate
 */
export function withdrawalPortfolio(annualSpend: number, rate: number): number {
  if (rate <= 0) throw new Error("Withdrawal rate must be greater than 0");
  return annualSpend / rate;
}

export function computeFi(inputs: FiInputs): FiResult {
  const { annualSpend, dividendYield, withdrawalRate } = inputs;
  const result: FiResult = { annualSpend };

  if (dividendYield !== undefined) {
    result.dividendModel = {
      yield: dividendYield,
      portfolioNeeded: dividendPortfolio(annualSpend, dividendYield),
    };
  }
  if (withdrawalRate !== undefined) {
    result.withdrawalModel = {
      rate: withdrawalRate,
      portfolioNeeded: withdrawalPortfolio(annualSpend, withdrawalRate),
    };
  }
  return result;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/**
 * Demonstrates the core insight: spend is the biggest lever.
 * Same freedom, very different piles.
 */
function demo(): void {
  const spends = [24000, 36000, 48000, 60000];
  const yields = [0.03, 0.04, 0.05];

  console.log("Portfolio needed by annual spend and yield/withdrawal rate\n");
  console.log(
    ["Spend", ...yields.map((y) => `${(y * 100).toFixed(1)}%`)].join("\t")
  );
  for (const spend of spends) {
    const row = [fmt(spend)];
    for (const y of yields) {
      row.push(fmt(dividendPortfolio(spend, y)));
    }
    console.log(row.join("\t"));
  }

  console.log("\nExample from the post:");
  console.log(`  $24k @ 3% -> ${fmt(dividendPortfolio(24000, 0.03))}`);
  console.log(`  $24k @ 5% -> ${fmt(dividendPortfolio(24000, 0.05))}`);
  console.log(
    `  Cutting spend to $18k @ 3% -> ${fmt(dividendPortfolio(18000, 0.03))} (spend is the bigger lever)`
  );
}

// Execute the demo when run directly.
if (require.main === module) {
  demo();
}
