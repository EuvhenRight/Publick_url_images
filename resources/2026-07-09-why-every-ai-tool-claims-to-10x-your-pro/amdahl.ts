/**
 * amdahl.ts
 *
 * A tiny, dependency-free calculator that sanity-checks AI productivity claims
 * using Amdahl's Law. Answers the question:
 * "Even if this tool accelerates part of my work, what's the realistic
 *  ceiling on my TOTAL speedup?"
 *
 * Run with: npx tsx amdahl.ts   (or compile with tsc)
 */

export interface SpeedupInput {
  /** Fraction of total work the tool actually accelerates (0..1). */
  acceleratedFraction: number;
  /** Speedup factor applied to that fraction (e.g. 2 = twice as fast).
   *  Use Infinity to model "instant". */
  localSpeedup: number;
}

/**
 * Amdahl's Law: overall speedup given a partially-accelerated workload.
 * Speedup = 1 / ((1 - P) + (P / S))
 */
export function overallSpeedup({ acceleratedFraction: P, localSpeedup: S }: SpeedupInput): number {
  if (P < 0 || P > 1) throw new Error("acceleratedFraction must be between 0 and 1");
  if (S <= 0) throw new Error("localSpeedup must be greater than 0");
  const serialPart = 1 - P;
  const parallelPart = S === Infinity ? 0 : P / S;
  return 1 / (serialPart + parallelPart);
}

/**
 * The maximum possible speedup if the accelerated fraction became instant.
 * Useful for exposing marketing claims: this is the absolute ceiling.
 */
export function theoreticalCeiling(acceleratedFraction: number): number {
  return overallSpeedup({ acceleratedFraction, localSpeedup: Infinity });
}

/**
 * Given a claimed total speedup, what local speedup would be REQUIRED
 * on the accelerated fraction? Returns Infinity (impossible) if the claim
 * exceeds the theoretical ceiling.
 */
export function requiredLocalSpeedup(claimedTotal: number, acceleratedFraction: number): number {
  const P = acceleratedFraction;
  const denom = 1 / claimedTotal - (1 - P);
  if (denom <= 0) return Infinity; // claim is impossible for this fraction
  return P / denom;
}

function demo() {
  const codingFraction = 0.25; // ~25% of a dev's day is hands-on code

  console.log("=== AI Productivity Reality Check ===\n");

  console.log(`Coding is ~${codingFraction * 100}% of the workday.`);
  console.log(
    `Ceiling if coding became INSTANT: ${theoreticalCeiling(codingFraction).toFixed(2)}x\n`
  );

  const scenarios: SpeedupInput[] = [
    { acceleratedFraction: 0.25, localSpeedup: 2 },
    { acceleratedFraction: 0.25, localSpeedup: 5 },
    { acceleratedFraction: 0.25, localSpeedup: 10 },
  ];
  for (const s of scenarios) {
    console.log(
      `${s.localSpeedup}x on the coding ${s.acceleratedFraction * 100}% -> ` +
        `${overallSpeedup(s).toFixed(2)}x total`
    );
  }

  console.log("\n=== Debunking a 10x claim ===");
  const claim = 10;
  const need = requiredLocalSpeedup(claim, codingFraction);
  console.log(
    need === Infinity
      ? `A ${claim}x TOTAL speedup is IMPOSSIBLE if only ${codingFraction * 100}% is accelerated.`
      : `To hit ${claim}x total, you'd need ${need.toFixed(1)}x on the accelerated part.`
  );
}

// Execute demo when run directly.
if (typeof require !== "undefined" && require.main === module) {
  demo();
}
