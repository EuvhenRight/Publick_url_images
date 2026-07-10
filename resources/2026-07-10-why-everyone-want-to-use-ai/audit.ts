/**
 * Data readiness profiler.
 *
 * A dependency-free TypeScript utility that profiles a set of records and
 * flags the exact problems described in the post: inconsistent categorical
 * values (open/Open/OPEN), duplicate entities, sparse fields, and free-text
 * fields masquerading as structured data.
 *
 * Usage (Node with tsx or ts-node):
 *   import { profileDataset } from "./audit";
 *   const report = profileDataset(records, { idField: "customerId" });
 *   console.log(formatReport(report));
 */

export type Record = { [key: string]: unknown };

export interface ProfileOptions {
  /** Field that should uniquely identify a real-world entity (for dup detection). */
  idField?: string;
  /** Distinct-value threshold above which a low-cardinality field is flagged. */
  categoricalThreshold?: number;
}

export interface FieldReport {
  field: string;
  total: number;
  filled: number;
  fillRate: number;
  distinctValues: number;
  caseCollisions: string[][]; // groups of values that differ only by case/whitespace
  looksFreeText: boolean;
}

export interface DatasetReport {
  rowCount: number;
  fields: FieldReport[];
  duplicateIds: { value: string; count: number }[];
  warnings: string[];
}

function normalizeKey(v: unknown): string {
  return String(v).trim().toLowerCase();
}

export function profileDataset(records: Record[], opts: ProfileOptions = {}): DatasetReport {
  const { idField, categoricalThreshold = 30 } = opts;
  const rowCount = records.length;
  const warnings: string[] = [];

  const fieldNames = Array.from(
    records.reduce((set, r) => {
      Object.keys(r).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  );

  const fields: FieldReport[] = fieldNames.map((field) => {
    const values = records
      .map((r) => r[field])
      .filter((v) => v !== null && v !== undefined && String(v).trim() !== "");

    const filled = values.length;
    const rawDistinct = new Set(values.map((v) => String(v)));
    const normalizedGroups = new Map<string, Set<string>>();
    for (const v of values) {
      const key = normalizeKey(v);
      if (!normalizedGroups.has(key)) normalizedGroups.set(key, new Set());
      normalizedGroups.get(key)!.add(String(v));
    }

    const caseCollisions = Array.from(normalizedGroups.values())
      .filter((set) => set.size > 1)
      .map((set) => Array.from(set));

    // Heuristic: high average length + very high cardinality suggests free text.
    const avgLen =
      values.reduce((sum, v) => sum + String(v).length, 0) / (filled || 1);
    const cardinalityRatio = rawDistinct.size / (filled || 1);
    const looksFreeText = avgLen > 40 && cardinalityRatio > 0.7;

    return {
      field,
      total: rowCount,
      filled,
      fillRate: rowCount ? filled / rowCount : 0,
      distinctValues: rawDistinct.size,
      caseCollisions,
      looksFreeText,
    };
  });

  // Duplicate entity detection.
  const duplicateIds: { value: string; count: number }[] = [];
  if (idField) {
    const counts = new Map<string, number>();
    for (const r of records) {
      const raw = r[idField];
      if (raw === null || raw === undefined || String(raw).trim() === "") continue;
      const key = normalizeKey(raw);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    for (const [value, count] of counts) {
      if (count > 1) duplicateIds.push({ value, count });
    }
    duplicateIds.sort((a, b) => b.count - a.count);
  } else {
    warnings.push("No idField provided \u2014 skipped duplicate-entity detection.");
  }

  for (const f of fields) {
    if (f.caseCollisions.length > 0) {
      warnings.push(
        `Field \"${f.field}\" has case/whitespace collisions (e.g. ${f.caseCollisions[0].join(", ")}). Normalize before AI use.`
      );
    }
    if (f.fillRate < 0.8) {
      warnings.push(
        `Field \"${f.field}\" is only ${(f.fillRate * 100).toFixed(0)}% filled \u2014 may be unreliable for the AI to read.`
      );
    }
    if (f.looksFreeText) {
      warnings.push(
        `Field \"${f.field}\" looks like free text. Confirm it isn't being misused for structured data (the \"lunch orders\" trap).`
      );
    }
  }

  return { rowCount, fields, duplicateIds, warnings };
}

export function formatReport(report: DatasetReport): string {
  const lines: string[] = [];
  lines.push(`Rows analyzed: ${report.rowCount}`);
  lines.push("");
  lines.push("Fields:");
  for (const f of report.fields) {
    lines.push(
      `  ${f.field}: fill ${(f.fillRate * 100).toFixed(0)}%, distinct ${f.distinctValues}` +
        (f.caseCollisions.length ? `, ${f.caseCollisions.length} case-collision group(s)` : "") +
        (f.looksFreeText ? ", looks-free-text" : "")
    );
  }
  if (report.duplicateIds.length) {
    lines.push("");
    lines.push(`Duplicate ids: ${report.duplicateIds.length} value(s) appear more than once.`);
    report.duplicateIds.slice(0, 5).forEach((d) =>
      lines.push(`  ${d.value}: ${d.count} rows`)
    );
  }
  lines.push("");
  lines.push("Warnings:");
  if (report.warnings.length === 0) lines.push("  (none) \u2014 data looks AI-ready.");
  report.warnings.forEach((w) => lines.push(`  - ${w}`));
  return lines.join("\n");
}

// --- Demo (mirrors the messy support data from the post) ---
if (typeof require !== "undefined" && require.main === module) {
  const sample: Record[] = [
    { customerId: "C-100", status: "open", notes: "customer reported login bug" },
    { customerId: "c-100", status: "Open", notes: "lunch: 2 burritos, 1 salad" },
    { customerId: "C-101", status: "OPEN", notes: "" },
    { customerId: "C-102", status: "closed", notes: "resolved by restart" },
  ];
  console.log(formatReport(profileDataset(sample, { idField: "customerId" })));
}
