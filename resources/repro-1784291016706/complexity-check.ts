/**
 * complexity-check.ts
 *
 * A tiny, dependency-free heuristic for flagging "fear complexity" candidates.
 * This is NOT a full static analyzer. It computes a rough cyclomatic-complexity
 * approximation per function and reports functions above a threshold, plus a
 * couple of speculative-generality smells.
 *
 * Run with:  npx ts-node complexity-check.ts <file-or-glob-of-source>
 * or adapt the analyze() function into your own tooling.
 */

export interface FunctionReport {
  name: string;
  approxComplexity: number;
  lineStart: number;
}

// Tokens that introduce a new independent branch / decision path.
const BRANCH_TOKENS = [
  /\bif\b/g,
  /\belse if\b/g,
  /\bfor\b/g,
  /\bwhile\b/g,
  /\bcase\b/g,
  /\bcatch\b/g,
  /\?\?/g, // nullish coalescing
  /&&/g,
  /\|\|/g,
  /\?[^.]/g, // ternary (rough)
];

/**
 * Very rough per-function complexity estimate.
 * Complexity = 1 + count of branch tokens in the function body.
 */
export function approximateComplexity(body: string): number {
  let count = 1;
  for (const token of BRANCH_TOKENS) {
    const matches = body.match(token);
    if (matches) count += matches.length;
  }
  return count;
}

/**
 * Split source into naive function-like chunks. Handles common JS/TS forms.
 * Intentionally simple: prefer false positives you can eyeball over a heavy parser.
 */
export function analyze(source: string, threshold = 10): FunctionReport[] {
  const lines = source.split(/\r?\n/);
  const reports: FunctionReport[] = [];

  const fnHeader =
    /(?:function\s+([A-Za-z0-9_$]+))|(?:([A-Za-z0-9_$]+)\s*[:=]\s*(?:async\s*)?\()|(?:([A-Za-z0-9_$]+)\s*\([^)]*\)\s*\{)/;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(fnHeader);
    if (!m) continue;
    const name = m[1] || m[2] || m[3] || '<anonymous>';

    // Collect a rough body by brace balance.
    let depth = 0;
    let started = false;
    const bodyLines: string[] = [];
    for (let j = i; j < lines.length; j++) {
      const line = lines[j];
      for (const ch of line) {
        if (ch === '{') {
          depth++;
          started = true;
        } else if (ch === '}') {
          depth--;
        }
      }
      bodyLines.push(line);
      if (started && depth <= 0) break;
    }

    const complexity = approximateComplexity(bodyLines.join('\n'));
    if (complexity >= threshold) {
      reports.push({ name, approxComplexity: complexity, lineStart: i + 1 });
    }
  }

  return reports.sort((a, b) => b.approxComplexity - a.approxComplexity);
}

// Simple CLI when executed directly.
if (require.main === module) {
  const fs = require('fs');
  const paths = process.argv.slice(2);
  if (paths.length === 0) {
    console.log('Usage: ts-node complexity-check.ts <file...>');
    process.exit(0);
  }
  for (const p of paths) {
    let src = '';
    try {
      src = fs.readFileSync(p, 'utf8');
    } catch {
      console.error(`Could not read ${p}`);
      continue;
    }
    const results = analyze(src);
    if (results.length === 0) {
      console.log(`${p}: no functions above threshold. Good.`);
      continue;
    }
    console.log(`\n${p}: review candidates (high branch count = ask 'need or fear?')`);
    for (const r of results) {
      console.log(`  L${r.lineStart}  ~${r.approxComplexity}  ${r.name}`);
    }
  }
}
