/**
 * hype-scorer.ts
 *
 * A tiny, dependency-free scorer that turns the "Hype-to-Work Gap" framework
 * into a runnable check. Feed it structured facts about a technology claim and
 * it reports how much is deployed reality vs. forecast-wearing-a-press-release.
 *
 * Run: npx ts-node hype-scorer.ts   (or compile with tsc)
 */

export interface TechClaim {
  name: string;
  /** Year the product is announced to ship. */
  shipYear: number;
  /** Year of first real, paid, production use. Null if unknown/none. */
  firstRealUseYear: number | null;
  /** True if deployed units work alongside people without barriers/teleop. */
  autonomousWithPeople: boolean;
  /** True if the first customer is independent of the manufacturer. */
  firstCustomerIndependent: boolean;
  /** 'installed-base' = a real count today; 'forecast' = a projected number. */
  citedNumberKind: "installed-base" | "forecast";
  /** True if the headline claim describes present capability only (no aspiration). */
  purelyDescriptive: boolean;
}

export interface ScoreResult {
  name: string;
  score: number; // 0-5
  verdict: string;
  notes: string[];
}

export function scoreClaim(c: TechClaim): ScoreResult {
  const notes: string[] = [];
  let score = 0;

  // Gap 1: Shipping isn't Deployed
  const gapYears =
    c.firstRealUseYear === null ? Infinity : c.firstRealUseYear - c.shipYear;
  if (gapYears <= 0) {
    score += 1;
  } else if (gapYears === Infinity) {
    notes.push("No known first-real-use date: ship-to-use gap is open-ended.");
  } else {
    notes.push(`Ship-to-use gap of ${gapYears} year(s): shipping isn't deployed.`);
  }

  // Gap 2: Deployed isn't Collaborating
  if (c.autonomousWithPeople) score += 1;
  else notes.push("Runs behind barriers / teleop: deployed isn't collaborating.");

  // Gap 3: First customer is the maker
  if (c.firstCustomerIndependent) score += 1;
  else notes.push("First customer is the maker: internal use, not open-market proof.");

  // Level vs. slope
  if (c.citedNumberKind === "installed-base") score += 1;
  else notes.push("Cited number is a forecast (slope read as level).");

  // Double duty
  if (c.purelyDescriptive) score += 1;
  else notes.push("Claim does double duty: describes present AND projects a future.");

  let verdict: string;
  if (score <= 2) verdict = "Mostly forecast \u2014 directional, not deliverable.";
  else if (score <= 4) verdict = "Mixed \u2014 real progress with meaningful caveats.";
  else verdict = "Genuinely deployed reality.";

  return { name: c.name, score, verdict, notes };
}

// --- Example: the humanoid claims from the post ---
if (require.main === module) {
  const atlas: TechClaim = {
    name: "Boston Dynamics Atlas",
    shipYear: 2026,
    firstRealUseYear: 2028,
    autonomousWithPeople: false,
    firstCustomerIndependent: false, // Hyundai group
    citedNumberKind: "forecast",
    purelyDescriptive: false,
  };

  const xpengIron: TechClaim = {
    name: "XPENG IRON",
    shipYear: 2025,
    firstRealUseYear: 2025,
    autonomousWithPeople: false,
    firstCustomerIndependent: false, // XPENG's own factories
    citedNumberKind: "installed-base",
    purelyDescriptive: false,
  };

  for (const claim of [atlas, xpengIron]) {
    const r = scoreClaim(claim);
    console.log(`\n${r.name}: ${r.score}/5 \u2014 ${r.verdict}`);
    r.notes.forEach((n) => console.log(`  - ${n}`));
  }
}
