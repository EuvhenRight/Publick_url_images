/**
 * earnings_swing.ts
 *
 * A small, self-contained utility to decompose an earnings 'swing' into
 * recurring vs. one-time drivers, so a headline narrative can be tested
 * against the actual income statement.
 *
 * Run with: npx ts-node earnings_swing.ts
 * (or compile with tsc and run the JS)
 */

export interface SwingComponent {
  label: string;
  /** Contribution to the profit swing, in the same currency units (e.g. USD billions). */
  amount: number;
  /** true if this repeats in future periods; false if one-time/finite. */
  recurring: boolean;
}

export interface SwingAnalysis {
  total: number;
  recurringTotal: number;
  oneTimeTotal: number;
  recurringShare: number; // 0..1
  verdict: string;
}

export function analyzeSwing(components: SwingComponent[]): SwingAnalysis {
  const total = components.reduce((s, c) => s + c.amount, 0);
  const recurringTotal = components
    .filter((c) => c.recurring)
    .reduce((s, c) => s + c.amount, 0);
  const oneTimeTotal = total - recurringTotal;
  const recurringShare = total !== 0 ? recurringTotal / total : 0;

  let verdict: string;
  if (recurringShare >= 0.6) {
    verdict = 'Growth-led: most of the swing looks durable.';
  } else if (recurringShare >= 0.3) {
    verdict = 'Mixed: real cost work, but leaning on non-recurring items.';
  } else {
    verdict = 'Cleanup-led: swing driven mainly by one-time / finite items.';
  }

  return { total, recurringTotal, oneTimeTotal, recurringShare, verdict };
}

// --- Illustrative example using figures from the Intel post ---
// NOTE: numbers are approximate and for demonstration only.
if (require.main === module) {
  const intelQ2: SwingComponent[] = [
    // Prior-year impairments not repeating is a positive swing vs. last year.
    { label: 'Impairments not repeating', amount: 15.9, recurring: false },
    // Cost cuts are structural but finite in how much profit they can add.
    { label: 'R&D + admin cost cuts (~20%)', amount: 3.0, recurring: false },
    // Data Center & AI slipped 1% — modeled as a small drag.
    { label: 'Data Center & AI segment (-1%)', amount: -0.3, recurring: true },
    // Other operating changes to reconcile toward the reported figure.
    { label: 'Other operating changes', amount: 1.4, recurring: true },
  ];

  const result = analyzeSwing(intelQ2);
  console.log('Total swing (illustrative):', result.total.toFixed(1), 'USD bn');
  console.log('Recurring:', result.recurringTotal.toFixed(1));
  console.log('One-time / finite:', result.oneTimeTotal.toFixed(1));
  console.log('Recurring share:', (result.recurringShare * 100).toFixed(0) + '%');
  console.log('Verdict:', result.verdict);
}
