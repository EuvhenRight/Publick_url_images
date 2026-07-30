/**
 * coordination-cost.ts
 *
 * The "boring arithmetic" from the post, made runnable.
 *
 * Capacity grows in a straight line with headcount.
 * The connections between people grow on a curve.
 * This script shows the gap for any team size, and shows why splitting
 * one big team into independent squads collapses the coordination cost.
 *
 * Run it:
 *   npx tsx coordination-cost.ts
 *   # or: deno run coordination-cost.ts
 *   # or compile with tsc and run the .js
 *
 * No dependencies. No network. Just math.
 */

/** Number of unique communication pairs among n people: n*(n-1)/2. */
export function communicationPairs(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`team size must be a non-negative integer, got ${n}`);
  }
  return (n * (n - 1)) / 2;
}

/**
 * Coordination cost if you split `people` into `squads` roughly equal,
 * mostly-independent groups. Cost is the sum of within-squad pairs plus a
 * small number of cross-squad liaison links (one representative per squad).
 */
export function splitCoordinationCost(people: number, squads: number): number {
  if (squads < 1 || squads > people) {
    throw new RangeError(`squads must be between 1 and ${people}, got ${squads}`);
  }
  const base = Math.floor(people / squads);
  const remainder = people % squads;

  let withinSquad = 0;
  for (let i = 0; i < squads; i++) {
    const size = base + (i < remainder ? 1 : 0);
    withinSquad += communicationPairs(size);
  }
  // One liaison per squad keeping the squads aligned with each other.
  const crossSquad = communicationPairs(squads);
  return withinSquad + crossSquad;
}

function bar(value: number, max: number, width = 40): string {
  const filled = max === 0 ? 0 : Math.round((value / max) * width);
  return "\u2588".repeat(filled) + "\u2591".repeat(width - filled);
}

function main(): void {
  const sizes = [3, 6, 9, 12, 20, 50];
  const maxPairs = communicationPairs(sizes[sizes.length - 1]);

  console.log("\nCapacity is linear. Communication paths are quadratic.\n");
  console.log("people | pairs | vs. 3 people | growth");
  console.log("-------+-------+--------------+" + "-".repeat(42));

  const basePairs = communicationPairs(3);
  for (const n of sizes) {
    const pairs = communicationPairs(n);
    const multiple = (pairs / basePairs).toFixed(1);
    console.log(
      `${String(n).padStart(6)} | ${String(pairs).padStart(5)} | ${
        (multiple + "x").padStart(12)
      } | ${bar(pairs, maxPairs)}`
    );
  }

  console.log("\nSplitting into independent squads collapses the curve.\n");
  const people = 12;
  console.log(`Team of ${people}:`);
  console.log(`  1 big group          -> ${communicationPairs(people)} pairs to keep in sync`);
  for (const squads of [2, 3, 4]) {
    console.log(
      `  ${squads} independent squads  -> ${splitCoordinationCost(people, squads)} pairs to keep in sync`
    );
  }

  console.log(
    "\nSize isn't destiny. The size of each change is — and the number of\n" +
      "people who must agree before it merges. Shrink both.\n"
  );
}

// Run only when executed directly, not when imported.
if (typeof require !== "undefined" && require.main === module) {
  main();
}
