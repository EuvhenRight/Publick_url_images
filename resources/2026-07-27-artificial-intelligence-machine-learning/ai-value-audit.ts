/**
 * AI Value Audit — a runnable scoring tool for the 4-step test
 * in the accompanying guide.md.
 *
 * No dependencies. Run with:  npx tsx ai-value-audit.ts
 * or compile:                  tsc ai-value-audit.ts && node ai-value-audit.js
 */

type MetricKind = "deflected" | "contained" | "resolved" | "other";

interface AiInitiative {
  name: string;
  /** Did you redesign who-does-what, or add a tool on top? */
  rebuiltWorkflow: boolean;
  /** Was the target metric written down BEFORE seeing results? */
  metricPreRegistered: boolean;
  /** How is the headline metric defined? */
  metricKind: MetricKind;
  /** Baseline value of the metric (last 90 days). */
  baseline: number;
  /** Current value of the metric. */
  current: number;
  /** Is a higher number better? (e.g. resolution rate = true, cost = false) */
  higherIsBetter: boolean;
  /** Weeks of sustained measurement (a demo week does not count). */
  weeksMeasured: number;
}

interface AuditResult {
  initiative: string;
  verdict: "VALUE" | "UNPROVEN" | "SPRINKLE";
  score: number; // 0-100
  flags: string[];
  metricDelta: number; // signed improvement, positive = better
}

function improvement(i: AiInitiative): number {
  const raw = i.current - i.baseline;
  return i.higherIsBetter ? raw : -raw;
}

function auditInitiative(i: AiInitiative): AuditResult {
  const flags: string[] = [];
  let score = 0;

  // Step 1: rebuild vs sprinkle (worth 30)
  if (i.rebuiltWorkflow) score += 30;
  else flags.push("Sprinkle: no workflow was redesigned around the tool.");

  // Step 2: pre-registered metric (worth 20)
  if (i.metricPreRegistered) score += 20;
  else flags.push("Metric was not written down before results (hindsight bias risk).");

  // Step 3: metric precision (worth 20)
  if (i.metricKind === "resolved") {
    score += 20;
  } else if (i.metricKind === "deflected" || i.metricKind === "contained") {
    score += 8;
    flags.push(
      `"${i.metricKind}" can rise even when the customer's problem is not fixed. ` +
        `Prefer a "resolved"-style metric.`
    );
  } else {
    flags.push("Metric kind is unclassified — define it precisely.");
  }

  // Step 4: durability + real movement (worth 30)
  const delta = improvement(i);
  if (delta <= 0) {
    flags.push("Metric did not move in the intended direction.");
  } else if (i.weeksMeasured < 8) {
    score += 10;
    flags.push(
      `Only ${i.weeksMeasured} weeks measured. Demo-week gains often decay; ` +
        `require 8-12+ weeks.`
    );
  } else {
    score += 30;
  }

  let verdict: AuditResult["verdict"];
  if (!i.rebuiltWorkflow) verdict = "SPRINKLE";
  else if (score >= 75 && delta > 0) verdict = "VALUE";
  else verdict = "UNPROVEN";

  return { initiative: i.name, verdict, score, flags, metricDelta: delta };
}

function printResult(r: AuditResult): void {
  const line = "-".repeat(56);
  console.log(line);
  console.log(`Initiative: ${r.initiative}`);
  console.log(`Verdict:    ${r.verdict}  (score ${r.score}/100)`);
  console.log(`Metric \u0394:   ${r.metricDelta > 0 ? "+" : ""}${r.metricDelta}`);
  if (r.flags.length) {
    console.log("Flags:");
    for (const f of r.flags) console.log(`  - ${f}`);
  } else {
    console.log("Flags:     none");
  }
}

// --- Example inputs (edit these with your own initiatives) ---
const examples: AiInitiative[] = [
  {
    name: "Support agent rebuild (Tier-1 auto-resolution)",
    rebuiltWorkflow: true,
    metricPreRegistered: true,
    metricKind: "resolved",
    baseline: 41, // % of tickets resolved without human
    current: 58,
    higherIsBetter: true,
    weeksMeasured: 12,
  },
  {
    name: "Chatbot bolted onto FAQ page",
    rebuiltWorkflow: false,
    metricPreRegistered: false,
    metricKind: "contained",
    baseline: 30,
    current: 44,
    higherIsBetter: true,
    weeksMeasured: 2,
  },
];

if (require.main === module) {
  console.log("AI VALUE AUDIT\n");
  examples.map(auditInitiative).forEach(printResult);
  console.log("-".repeat(56));
}

export { auditInitiative, improvement };
export type { AiInitiative, AuditResult, MetricKind };
