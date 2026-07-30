/**
 * AI use-case prioritizer for MSMEs.
 *
 * Ranks candidate AI automations by how likely they are to move real money,
 * favoring boring, high-frequency back-office plumbing over flashy front-office
 * demos. This is the scoring step from guide.md, made runnable.
 *
 * No dependencies. Run with:
 *   npx tsx example.ts
 * or compile with `tsc example.ts` then `node example.js`.
 */

interface Candidate {
  name: string;
  /** 1-5: money or hours saved per month if it worked well. */
  value: number;
  /** 1-5: how often the task repeats (5 = many times daily). */
  frequency: number;
  /** 1-5: how clean and digital the inputs already are (5 = structured export). */
  dataReadiness: number;
  /** 1-5: 5 = off-the-shelf / one afternoon, 1 = custom multi-month build. */
  easeOfBuild: number;
  /** Does a wrong output carry legal/tax/financial risk? Forces a human check. */
  consequential: boolean;
}

interface ScoredCandidate extends Candidate {
  priority: number;
  verdict: string;
  note: string;
}

function clamp(n: number): number {
  if (n < 1) return 1;
  if (n > 5) return 5;
  return Math.round(n);
}

function score(c: Candidate): ScoredCandidate {
  const value = clamp(c.value);
  const frequency = clamp(c.frequency);
  const dataReadiness = clamp(c.dataReadiness);
  const easeOfBuild = clamp(c.easeOfBuild);

  // Priority = Value x Frequency x DataReadiness x EaseOfBuild (range 1..625).
  const priority = value * frequency * dataReadiness * easeOfBuild;

  let verdict: string;
  if (priority >= 300) verdict = 'START NOW';
  else if (priority >= 120) verdict = 'QUEUE';
  else verdict = 'IGNORE FOR NOW';

  const notes: string[] = [];
  if (c.consequential) {
    notes.push('Keep a human on the final step (legal/tax/financial risk).');
  }
  if (dataReadiness <= 2) {
    notes.push('Inputs are messy — clean/digitize the data before automating.');
  }
  if (easeOfBuild <= 2 && verdict !== 'IGNORE FOR NOW') {
    notes.push('Buy off-the-shelf before you build; a custom build risks the 95%.');
  }
  if (value <= 2) {
    notes.push('Low payoff — likely a flashy demo, not a P&L mover.');
  }

  return {
    ...c,
    value,
    frequency,
    dataReadiness,
    easeOfBuild,
    priority,
    verdict,
    note: notes.join(' ') || 'Solid plumbing candidate.',
  };
}

function prioritize(candidates: Candidate[]): ScoredCandidate[] {
  return candidates.map(score).sort((a, b) => b.priority - a.priority);
}

// --- Example data (a GABAi-style first-time-owner retail shop) ---
const candidates: Candidate[] = [
  // Boring plumbing — the real frontier.
  { name: 'Auto-categorize expenses & compute VAT', value: 5, frequency: 5, dataReadiness: 4, easeOfBuild: 4, consequential: true },
  { name: 'Inventory reorder / stockout prediction', value: 5, frequency: 4, dataReadiness: 4, easeOfBuild: 3, consequential: false },
  { name: 'Pre-fill recurring government paperwork', value: 4, frequency: 3, dataReadiness: 3, easeOfBuild: 3, consequential: true },
  { name: 'Draft overdue-invoice follow-ups', value: 4, frequency: 4, dataReadiness: 5, easeOfBuild: 5, consequential: false },
  // Flashy front-office — usually looks great, moves nothing.
  { name: 'Website marketing chatbot', value: 2, frequency: 3, dataReadiness: 2, easeOfBuild: 3, consequential: false },
  { name: 'AI brand-voice social posts', value: 2, frequency: 2, dataReadiness: 4, easeOfBuild: 5, consequential: false },
];

function report(rows: ScoredCandidate[]): void {
  console.log('\nAI use-case priority (higher = do first)\n');
  for (const r of rows) {
    console.log(`${String(r.priority).padStart(3)}  [${r.verdict.padEnd(14)}] ${r.name}`);
    console.log(`      -> ${r.note}`);
  }
  const top = rows.filter((r) => r.verdict === 'START NOW').slice(0, 2);
  console.log('\nStart with only these (baseline the metric BEFORE you begin):');
  if (top.length === 0) {
    console.log('  Nothing scored high enough — sharpen your estimates or fix data first.');
  } else {
    for (const t of top) console.log(`  - ${t.name}`);
  }
  console.log('');
}

report(prioritize(candidates));

export { prioritize, score };
export type { Candidate, ScoredCandidate };
