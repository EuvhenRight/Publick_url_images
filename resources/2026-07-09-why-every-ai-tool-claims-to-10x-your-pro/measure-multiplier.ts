/**
 * measure-multiplier.ts
 *
 * Self-contained script to compute an honest AI productivity multiplier
 * from the productivity-log.csv format in this folder.
 *
 * Run with: npx tsx measure-multiplier.ts productivity-log.csv
 * (or ts-node). No external dependencies.
 */

import { readFileSync } from "node:fs";

interface Entry {
  date: string;
  category: string;
  description: string;
  baselineMin: number;
  aiMin: number;
  reworkMin: number;
  feltSpeed: number;
}

function parseCsv(path: string): Entry[] {
  const text = readFileSync(path, "utf8").trim();
  const [, ...rows] = text.split(/\r?\n/); // skip header
  return rows.map((line) => {
    // naive CSV split; assumes no commas inside fields except quoted (kept simple)
    const cols = line.split(",");
    return {
      date: cols[0],
      category: cols[1],
      description: cols[2],
      baselineMin: Number(cols[3]),
      aiMin: Number(cols[4]),
      reworkMin: Number(cols[5]),
      feltSpeed: Number(cols[6]),
    };
  });
}

/** Honest multiplier: baseline / (ai time + rework). >1 = faster, <1 = slower. */
function multiplier(e: Entry): number {
  const effective = e.aiMin + e.reworkMin;
  if (effective <= 0) return NaN;
  return e.baselineMin / effective;
}

function summarize(entries: Entry[]) {
  const byCategory = new Map<string, Entry[]>();
  for (const e of entries) {
    const list = byCategory.get(e.category) ?? [];
    list.push(e);
    byCategory.set(e.category, list);
  }

  console.log("=== Honest AI Multiplier by Category ===\n");
  for (const [cat, list] of byCategory) {
    const totalBaseline = list.reduce((s, e) => s + e.baselineMin, 0);
    const totalEffective = list.reduce((s, e) => s + e.aiMin + e.reworkMin, 0);
    const catMult = totalBaseline / totalEffective;
    const avgFelt = list.reduce((s, e) => s + e.feltSpeed, 0) / list.length;
    console.log(
      `${cat.padEnd(16)} measured ${catMult.toFixed(2)}x  | felt ~${avgFelt.toFixed(1)}/5  | n=${list.length}`
    );
  }

  const grandBaseline = entries.reduce((s, e) => s + e.baselineMin, 0);
  const grandEffective = entries.reduce((s, e) => s + e.aiMin + e.reworkMin, 0);
  const overall = grandBaseline / grandEffective;

  console.log("\n=== Overall ===");
  console.log(`Overall honest multiplier: ${overall.toFixed(2)}x`);
  console.log(
    overall >= 1
      ? "Net gain \u2014 but check which categories carry it."
      : "Net loss \u2014 AI is costing you time somewhere. Look at low-scoring categories."
  );
  console.log("\nReminder: this is YOUR number, not a billboard's 10x.");
}

function main() {
  const path = process.argv[2] ?? "productivity-log.csv";
  const entries = parseCsv(path);
  if (entries.length === 0) {
    console.error("No entries found. Add rows to your log first.");
    process.exit(1);
  }
  summarize(entries);
}

main();
