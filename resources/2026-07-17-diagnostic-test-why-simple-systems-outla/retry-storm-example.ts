/**
 * Demonstrates how a "local improvement" (adding retries) can become a
 * "global failure" (overloading a downstream dependency), and how to make the
 * failure mode observable + bounded.
 *
 * Run: ts-node retry-storm-example.ts  (or compile with tsc)
 * No external dependencies.
 */

// --- A fake downstream dependency with a fixed concurrency budget ---------
class Downstream {
  private inFlight = 0;
  private readonly capacity: number;
  peakInFlight = 0;
  rejected = 0;
  served = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  async handle(): Promise<void> {
    this.inFlight++;
    this.peakInFlight = Math.max(this.peakInFlight, this.inFlight);
    try {
      if (this.inFlight > this.capacity) {
        // Saturated: this is the global failure the retry amplifies.
        this.rejected++;
        throw new Error("downstream saturated");
      }
      await sleep(50); // simulated work
      this.served++;
    } finally {
      this.inFlight--;
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// --- Caller with configurable retry behavior ------------------------------
interface RetryConfig {
  maxAttempts: number;
  // A circuit breaker bounds the failure mode: once tripped, stop retrying.
  breakerErrorThreshold?: number;
}

async function call(
  ds: Downstream,
  cfg: RetryConfig,
  metrics: { attempts: number; errors: number; breakerOpen: boolean }
): Promise<boolean> {
  for (let attempt = 1; attempt <= cfg.maxAttempts; attempt++) {
    if (cfg.breakerErrorThreshold && metrics.errors >= cfg.breakerErrorThreshold) {
      metrics.breakerOpen = true;
      return false; // fail fast instead of amplifying load
    }
    metrics.attempts++;
    try {
      await ds.handle();
      return true;
    } catch {
      metrics.errors++;
      await sleep(10);
    }
  }
  return false;
}

async function simulate(cfg: RetryConfig, label: string) {
  const ds = new Downstream(20); // downstream can handle 20 concurrent
  const metrics = { attempts: 0, errors: 0, breakerOpen: false };
  const clients = 100; // burst of traffic

  await Promise.all(
    Array.from({ length: clients }, () => call(ds, cfg, metrics))
  );

  console.log(`\n[${label}]`);
  console.log(`  total attempts sent : ${metrics.attempts} (from ${clients} clients)`);
  console.log(`  peak in-flight      : ${ds.peakInFlight} (capacity 20)`);
  console.log(`  downstream rejected : ${ds.rejected}`);
  console.log(`  breaker opened      : ${metrics.breakerOpen}`);
}

async function main() {
  // Naive retry: each failure re-sends, amplifying load on an already-hot dependency.
  await simulate({ maxAttempts: 3 }, "Naive retry (amplifies load)");

  // Bounded retry with circuit breaker: the failure mode is contained + observable.
  await simulate(
    { maxAttempts: 3, breakerErrorThreshold: 40 },
    "Retry + circuit breaker (bounded)"
  );

  console.log(
    "\nLesson: the retry is a local improvement, but peak in-flight is the\n" +
    "failure mode to name and alert on. Bound it (breaker/budget) and watch it."
  );
}

main();
