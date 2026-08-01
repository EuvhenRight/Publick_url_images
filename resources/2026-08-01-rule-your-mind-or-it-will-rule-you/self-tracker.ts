#!/usr/bin/env node
/**
 * self-tracker.ts - a DIY ecological momentary assessment (EMA) for your own habits.
 *
 * Mirrors the study behind the post: sample yourself at random moments, note what
 * you were doing and how automatic it felt, then see how much of your day runs on
 * autopilot - and how much of that autopilot is actually serving your goals.
 *
 * Zero dependencies. Node 18+. Run with tsx (npx tsx self-tracker.ts <cmd>) or
 * compile with tsc first.
 *
 * Commands:
 *   plan     Generate random check-in times for today (set phone alarms for them)
 *   log      Record what you were doing at a check-in (interactive)
 *   report   Summarize how much of your day runs on autopilot
 *
 * Data is stored in ema-log.json next to this file.
 */

import { createInterface, Interface } from "node:readline";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DATA_FILE = join(dirname(fileURLToPath(import.meta.url)), "ema-log.json");

type Intended = "yes" | "no" | "neutral";

interface Entry {
  timestamp: string;
  activity: string;
  automaticity: number; // 1 = fully deliberate ... 5 = fully automatic
  intended: Intended;
}

function load(): Entry[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf8")) as Entry[];
  } catch {
    return [];
  }
}

function save(entries: Entry[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function pct(n: number, d: number): string {
  return d === 0 ? "0%" : Math.round((n / d) * 100) + "%";
}

function plan(count = 6, startHour = 9, endHour = 21): void {
  const start = startHour * 60;
  const end = endHour * 60;
  const times: number[] = [];
  while (times.length < count) {
    const m = start + Math.floor(Math.random() * (end - start));
    if (times.every((t) => Math.abs(t - m) >= 45)) times.push(m);
  }
  times.sort((a, b) => a - b);
  console.log("Set " + count + " phone alarms for today:");
  for (const m of times) console.log("  " + pad(Math.floor(m / 60)) + ":" + pad(m % 60));
  console.log("");
  console.log("At each alarm, run:  npx tsx self-tracker.ts log");
}

function ask(rl: Interface, q: string): Promise<string> {
  return new Promise((resolve) => rl.question(q, (a) => resolve(a.trim())));
}

async function log(): Promise<void> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const activity = await ask(rl, "What were you doing the moment the alarm fired? ");
  const rawAuto = await ask(rl, "How automatic did it feel? 1=fully deliberate ... 5=fully automatic: ");
  const rawIntent = (await ask(rl, "Was it what you actually wanted? (y/n/neutral): ")).toLowerCase();
  rl.close();

  let automaticity = Number(rawAuto);
  if (!Number.isFinite(automaticity) || automaticity < 1 || automaticity > 5) automaticity = 3;
  const intended: Intended = rawIntent.startsWith("y") ? "yes" : rawIntent.startsWith("n") ? "no" : "neutral";

  const entries = load();
  entries.push({ timestamp: new Date().toISOString(), activity, automaticity, intended });
  save(entries);
  console.log("Logged. You now have " + entries.length + " check-in(s).");
}

function report(): void {
  const entries = load();
  if (entries.length === 0) {
    console.log("No data yet. Run `plan`, set the alarms, then `log` at each one.");
    return;
  }
  const total = entries.length;
  const automatic = entries.filter((e) => e.automaticity >= 4);
  const autoAligned = automatic.filter((e) => e.intended === "yes");
  const againstWant = entries.filter((e) => e.intended === "no");

  console.log("=== Your autopilot report (" + total + " check-ins) ===");
  console.log("On autopilot (automaticity >= 4):     " + pct(automatic.length, total));
  console.log("Autopilot that matched your intent:   " + pct(autoAligned.length, total));
  console.log("Actions against what you wanted:      " + pct(againstWant.length, total));
  console.log("");

  const targets = Array.from(new Set(againstWant.map((e) => e.activity)));
  if (targets.length > 0) {
    console.log("Redesign targets (the moments you fought yourself):");
    for (const t of targets) console.log("  - " + t);
    console.log("");
    console.log("For each: what one change to your setup makes the better choice the default?");
  } else {
    console.log("Nothing went against your intent in this sample. Your setup is doing the work.");
  }
}

function help(): void {
  console.log("self-tracker - DIY habit automaticity tracker");
  console.log("");
  console.log("Commands:");
  console.log("  plan     Generate random check-in times for today");
  console.log("  log      Record what you were doing at a check-in (interactive)");
  console.log("  report   Summarize how much of your day runs on autopilot");
  console.log("");
  console.log("Data file: " + DATA_FILE);
}

const cmd = process.argv[2] || "help";
if (cmd === "plan") plan();
else if (cmd === "log") void log();
else if (cmd === "report") report();
else help();
