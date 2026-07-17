/**
 * Why "90% accuracy" can be misleading in high-stakes screening.
 *
 * Runnable with: npx tsx evaluation.ts   (or ts-node)
 * No external dependencies.
 */

interface Confusion {
  tp: number; // true positives
  fp: number; // false positives
  tn: number; // true negatives
  fn: number; // false negatives
}

interface Metrics {
  accuracy: number;
  sensitivity: number; // recall / true positive rate
  specificity: number;
  precision: number; // positive predictive value
  npv: number; // negative predictive value
  f1: number;
  prevalence: number;
}

function computeMetrics(c: Confusion): Metrics {
  const total = c.tp + c.fp + c.tn + c.fn;
  const accuracy = (c.tp + c.tn) / total;
  const sensitivity = c.tp / (c.tp + c.fn || 1);
  const specificity = c.tn / (c.tn + c.fp || 1);
  const precision = c.tp / (c.tp + c.fp || 1);
  const npv = c.tn / (c.tn + c.fn || 1);
  const f1 = (2 * precision * sensitivity) / (precision + sensitivity || 1);
  const prevalence = (c.tp + c.fn) / total;
  return { accuracy, sensitivity, specificity, precision, npv, f1, prevalence };
}

function pct(x: number): string {
  return (x * 100).toFixed(1) + "%";
}

function report(label: string, c: Confusion): void {
  const m = computeMetrics(c);
  console.log(`\n=== ${label} ===`);
  console.log(`Prevalence of condition : ${pct(m.prevalence)}`);
  console.log(`Accuracy (headline)     : ${pct(m.accuracy)}`);
  console.log(`Sensitivity / recall    : ${pct(m.sensitivity)}  <- catches real cases`);
  console.log(`Specificity             : ${pct(m.specificity)}`);
  console.log(`Precision / PPV         : ${pct(m.precision)}  <- when it flags, is it right?`);
  console.log(`NPV                     : ${pct(m.npv)}`);
  console.log(`F1                      : ${pct(m.f1)}`);
}

// Scenario A: A lazy model on an imbalanced dataset.
// Cognitive decline present in ~8% of 3,300 notes (264 cases).
// The model NEVER flags anyone. It looks great on "accuracy".
const lazyModel: Confusion = {
  tp: 0,
  fn: 264, // all real cases missed
  fp: 0,
  tn: 3036, // all healthy correctly ignored
};

// Scenario B: A genuinely useful model at the same prevalence.
const usefulModel: Confusion = {
  tp: 238, // catches 90% of the 264 real cases
  fn: 26,
  fp: 152, // some false alarms
  tn: 2884,
};

report("Lazy 'always negative' model", lazyModel);
report("Genuinely useful model", usefulModel);

console.log(
  "\nTakeaway: the lazy model scores ~92% accuracy but has 0% sensitivity —" +
    "\nit misses every patient who needs help. Always demand sensitivity," +
    "\nspecificity, and PPV, not a single accuracy number.\n"
);

export { computeMetrics, Confusion, Metrics };
