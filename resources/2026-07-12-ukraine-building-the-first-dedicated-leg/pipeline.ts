/**
 * Historical-archive-to-training-corpus pipeline skeleton.
 *
 * Illustrates the stages described in guide.md for turning a rare document
 * collection (like Y-Park's ~25,000 legal volumes) into a benchmarkable,
 * multilingual training corpus. This is a structural example — swap the
 * placeholder implementations for real OCR/HTR/alignment services.
 *
 * Run: npx ts-node pipeline.ts
 */

export type Rights = "public-domain" | "licensed" | "restricted" | "unknown";

export interface SourceVolume {
  id: string;
  title: string;
  language: string;
  era: string; // e.g. "16c", "18c"
  digitized: boolean;
  rights: Rights;
  demandScore: number; // 0-3, how relevant to the anchored use case
}

export interface CorpusRecord {
  sourceId: string;
  language: string;
  text: string;
  benchmarkScore?: number; // quality vs external reference (e.g. Harvard CAP)
}

// --- Stage 1: Inventory --------------------------------------------------
export function inventory(volumes: SourceVolume[]) {
  const total = volumes.length;
  const digitized = volumes.filter((v) => v.digitized).length;
  const usable = volumes.filter(
    (v) => v.rights === "public-domain" || v.rights === "licensed"
  ).length;
  return { total, digitized, remaining: total - digitized, usable };
}

// --- Stage 2: Prioritize by demand, not chronology ----------------------
export function prioritize(volumes: SourceVolume[]): SourceVolume[] {
  return [...volumes]
    .filter((v) => !v.digitized)
    .sort((a, b) => b.demandScore - a.demandScore);
}

// --- Stage 3-4: Digitize + normalize (placeholder) ----------------------
async function ocrAndNormalize(volume: SourceVolume): Promise<CorpusRecord> {
  // Replace with real OCR/HTR + normalization. Historical fonts and
  // handwriting require specialized models; multilingual text needs
  // per-language pipelines.
  const text = `<normalized text for ${volume.id} (${volume.language}, ${volume.era})>`;
  return { sourceId: volume.id, language: volume.language, text };
}

// --- Stage 5: Align multilingual records --------------------------------
export function alignByEra(records: CorpusRecord[]) {
  const groups: Record<string, CorpusRecord[]> = {};
  for (const r of records) {
    (groups[r.language] ??= []).push(r);
  }
  return groups; // extend with real cross-language alignment
}

// --- Stage 6: Benchmark against an external reference --------------------
export function benchmark(
  record: CorpusRecord,
  referenceQuality: number
): CorpusRecord {
  // Placeholder: real version compares extraction/coverage quality
  // against a standard such as Harvard's Caselaw Access Project.
  const coverage = record.text.length > 0 ? 1 : 0;
  return { ...record, benchmarkScore: coverage * referenceQuality };
}

// --- Orchestration ------------------------------------------------------
export async function buildCorpus(volumes: SourceVolume[], referenceQuality = 0.9) {
  const stats = inventory(volumes);
  const queue = prioritize(volumes);
  const records: CorpusRecord[] = [];
  for (const v of queue) {
    const rec = await ocrAndNormalize(v);
    records.push(benchmark(rec, referenceQuality));
  }
  return { stats, aligned: alignByEra(records), records };
}

// --- Example run --------------------------------------------------------
if (require.main === module) {
  const sample: SourceVolume[] = [
    { id: "v1", title: "Roman Law Treatise", language: "la", era: "16c", digitized: false, rights: "public-domain", demandScore: 1 },
    { id: "v2", title: "Polish Kingdom Legislation", language: "pl", era: "18c", digitized: false, rights: "public-domain", demandScore: 2 },
    { id: "v3", title: "Veterans Benefits Act Commentary", language: "uk", era: "21c", digitized: true, rights: "licensed", demandScore: 3 },
  ];

  buildCorpus(sample).then((out) => {
    console.log("Inventory:", out.stats);
    console.log("Languages in corpus:", Object.keys(out.aligned));
    console.log("Records built:", out.records.length);
  });
}
