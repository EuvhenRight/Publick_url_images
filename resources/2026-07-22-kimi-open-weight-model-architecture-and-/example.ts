/**
 * Minimal model-routing pattern: decide per request whether to use an
 * open-weight model (cheaper) or a closed frontier model (pricier, sometimes
 * more capable). This is a self-contained illustration with mock clients.
 *
 * Core idea from the Kimi K2 discussion: when capability gaps are small and
 * price gaps are large, your durable advantage is HOW you route requests.
 *
 * Run with: ts-node example.ts  (or compile with tsc)
 */

interface LLMRequest {
  prompt: string;
  /** Business importance of correctness, 0 (bulk) to 1 (critical). */
  stakes: number;
  /** Whether the request must stay self-hosted for compliance. */
  requiresDataLocality?: boolean;
}

interface ModelResult {
  model: string;
  text: string;
  estimatedCostUsd: number;
}

// --- Mock clients (replace with real API calls) ---

const PRICING = {
  openWeight: 2.5 / 1_000_000, // $ per output token (illustrative)
  closedFrontier: 8.0 / 1_000_000,
};

function estimateTokens(prompt: string): number {
  // rough heuristic: assume output ~ prompt length
  return Math.max(50, Math.ceil(prompt.length / 4));
}

async function callOpenWeight(req: LLMRequest): Promise<ModelResult> {
  const tokens = estimateTokens(req.prompt);
  return {
    model: "kimi-k2-open-weight",
    text: `[open-weight answer to: ${req.prompt.slice(0, 40)}...]`,
    estimatedCostUsd: tokens * PRICING.openWeight,
  };
}

async function callClosedFrontier(req: LLMRequest): Promise<ModelResult> {
  const tokens = estimateTokens(req.prompt);
  return {
    model: "closed-frontier",
    text: `[frontier answer to: ${req.prompt.slice(0, 40)}...]`,
    estimatedCostUsd: tokens * PRICING.closedFrontier,
  };
}

// --- Routing logic ---

/**
 * Route based on stakes and compliance. Tune thresholds against YOUR own
 * evaluation set rather than public benchmarks.
 */
export function shouldUseClosedFrontier(req: LLMRequest): boolean {
  if (req.requiresDataLocality) return false; // must self-host -> open weights
  const HIGH_STAKES_THRESHOLD = 0.75;
  return req.stakes >= HIGH_STAKES_THRESHOLD;
}

export async function route(req: LLMRequest): Promise<ModelResult> {
  return shouldUseClosedFrontier(req)
    ? callClosedFrontier(req)
    : callOpenWeight(req);
}

// --- Demo ---

async function main() {
  const requests: LLMRequest[] = [
    { prompt: "Summarize this support ticket in one line.", stakes: 0.2 },
    { prompt: "Draft the final legal clause for an irreversible contract.", stakes: 0.9 },
    { prompt: "Classify PII in customer records.", stakes: 0.6, requiresDataLocality: true },
  ];

  let total = 0;
  for (const req of requests) {
    const res = await route(req);
    total += res.estimatedCostUsd;
    console.log(
      `stakes=${req.stakes} -> ${res.model} ($${res.estimatedCostUsd.toFixed(6)})`
    );
  }
  console.log(`Total estimated cost: $${total.toFixed(6)}`);
}

if (require.main === module) {
  main().catch(console.error);
}
