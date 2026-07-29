// funding-round-classifier.ts
// A small, runnable TypeScript utility that classifies funding rounds
// using the framework from guide.md. No external dependencies.
//
// Run with: npx ts-node example.ts   (or compile with tsc)

export type InvestorType =
  | "vc"
  | "growth_equity"
  | "hedge_or_credit_fund"
  | "private_equity"
  | "corporate_strategic"
  | "sovereign";

export type ThesisType =
  | "software_growth"
  | "physical_asset"
  | "strategic_optionality"
  | "regulatory_play";

export interface FundingRound {
  company: string;
  country: string;
  amountUsdM: number;
  investors: string[];
  investorTypes: InvestorType[];
  thesis: ThesisType;
}

export interface Insight {
  company: string;
  headline: string;
  patternFlags: string[];
}

// Flags the "real story" behind a round when investor type
// diverges from a conventional VC software bet.
export function analyzeRound(round: FundingRound): Insight {
  const flags: string[] = [];

  if (
    round.investorTypes.includes("hedge_or_credit_fund") &&
    round.thesis === "physical_asset"
  ) {
    flags.push(
      "Infrastructure play: priced as a cash-flowing asset, not a growth bet."
    );
  }

  if (round.investorTypes.includes("corporate_strategic")) {
    flags.push(
      "Strategic positioning: investor likely seeking market access or optionality beyond ROI."
    );
  }

  if (
    round.investorTypes.every((t) => t === "vc" || t === "growth_equity") &&
    round.thesis === "physical_asset"
  ) {
    flags.push(
      "Category migration: VCs entering a capital-intensive/hardware category they'd historically avoid."
    );
  }

  if (flags.length === 0) {
    flags.push("Conventional pattern: investor type matches thesis.");
  }

  return {
    company: round.company,
    headline: `$${round.amountUsdM}M into ${round.company} (${round.country})`,
    patternFlags: flags,
  };
}

// --- Illustrative sample data (verify before citing) ---
const sample: FundingRound[] = [
  {
    company: "Berlin Drone Co",
    country: "DE",
    amountUsdM: 569,
    investors: ["Founders Fund", "Sequoia"],
    investorTypes: ["vc"],
    thesis: "physical_asset",
  },
  {
    company: "Ionic Digital",
    country: "US",
    amountUsdM: 400,
    investors: ["Citadel", "Oaktree"],
    investorTypes: ["hedge_or_credit_fund"],
    thesis: "physical_asset",
  },
  {
    company: "CRED",
    country: "IN",
    amountUsdM: 200,
    investors: ["Meta"],
    investorTypes: ["corporate_strategic"],
    thesis: "regulatory_play",
  },
];

if (require.main === module) {
  for (const round of sample) {
    const insight = analyzeRound(round);
    console.log(insight.headline);
    insight.patternFlags.forEach((f) => console.log("  - " + f));
    console.log();
  }
}
