/**
 * node-normalizer.ts
 *
 * A small, self-contained utility for comparing semiconductor process claims
 * WITHOUT trusting the marketing node name ("2nm", "0.7nm", etc.).
 *
 * It normalizes vendor claims to physical metrics (transistor density, PPA)
 * and flags claims that lack the context needed for an honest comparison.
 *
 * No external dependencies. Run with: ts-node node-normalizer.ts
 * or compile with tsc and run the emitted JS.
 */

export interface ProcessClaim {
  vendor: string;
  /** Marketing label, e.g. "2nm", "0.7nm". NOT a measurement. */
  nodeLabel: string;
  /** Transistor density in millions of transistors per mm^2 (MTr/mm^2). */
  densityMTrPerMm2?: number;
  /** Contacted gate pitch in nm (real physical spacing). */
  contactedGatePitchNm?: number;
  /** Finest metal pitch in nm. */
  metalPitchNm?: number;
  /** Performance uplift vs a named baseline, at ISO-power. */
  perfUpliftPctIsoPower?: number;
  /** Power reduction vs a named baseline, at ISO-performance. */
  powerReductionPctIsoPerf?: number;
  /** The baseline this claim is measured against. */
  baseline?: string;
  /** Source of the numbers. */
  source: 'shipping-silicon' | 'test-chip' | 'projection' | 'unknown';
}

export interface ClaimAssessment {
  vendor: string;
  nodeLabel: string;
  /** True density-based comparability score, higher is more trustworthy (0-100). */
  comparabilityScore: number;
  warnings: string[];
}

/**
 * Node labels stopped being measurements around the 22/16nm generation.
 * Physical gate/metal pitches have hovered in the ~40-60nm range for years.
 */
export function nodeLabelIsMeasurement(): boolean {
  return false; // Always. This is the entire point.
}

export function assessClaim(claim: ProcessClaim): ClaimAssessment {
  const warnings: string[] = [];
  let score = 0;

  if (claim.densityMTrPerMm2 != null) {
    score += 40;
  } else {
    warnings.push('No transistor density (MTr/mm^2) disclosed — density is the most useful comparison metric.');
  }

  if (claim.contactedGatePitchNm != null || claim.metalPitchNm != null) {
    score += 20;
  } else {
    warnings.push('No physical pitch (gate/metal) disclosed.');
  }

  const hasIsoPower = claim.perfUpliftPctIsoPower != null;
  const hasIsoPerf = claim.powerReductionPctIsoPerf != null;
  if (hasIsoPower || hasIsoPerf) {
    score += 15;
    if (hasIsoPower && hasIsoPerf) {
      warnings.push('Perf uplift AND power reduction quoted together — verify these are separate iso-framed figures, not a simultaneous claim.');
    }
  } else {
    warnings.push('No iso-power / iso-performance framing for PPA gains.');
  }

  if (claim.baseline) {
    score += 10;
  } else {
    warnings.push('No named baseline — "faster" and "denser" are meaningless without a reference.');
  }

  switch (claim.source) {
    case 'shipping-silicon':
      score += 15;
      break;
    case 'test-chip':
      score += 8;
      warnings.push('Figures are from a test chip, not shipping silicon.');
      break;
    case 'projection':
      warnings.push('Figures are PROJECTIONS from a roadmap, not measured silicon.');
      break;
    default:
      warnings.push('Source of figures is unknown/unstated.');
  }

  return {
    vendor: claim.vendor,
    nodeLabel: claim.nodeLabel,
    comparabilityScore: Math.min(score, 100),
    warnings,
  };
}

/**
 * Compare two claims by a physical metric instead of node names.
 * Returns a human-readable verdict.
 */
export function compareByDensity(a: ProcessClaim, b: ProcessClaim): string {
  if (a.densityMTrPerMm2 == null || b.densityMTrPerMm2 == null) {
    return `Cannot compare ${a.vendor} "${a.nodeLabel}" vs ${b.vendor} "${b.nodeLabel}" — density missing. Do not rely on node labels.`;
  }
  const ratio = a.densityMTrPerMm2 / b.densityMTrPerMm2;
  const denser = ratio > 1 ? a.vendor : b.vendor;
  return `${denser} is denser. Ratio ${a.vendor}:${b.vendor} = ${ratio.toFixed(2)}x. ` +
    `Node labels "${a.nodeLabel}" and "${b.nodeLabel}" are irrelevant to this result.`;
}

// --- Example usage --------------------------------------------------------
if (require.main === module) {
  const ibm2021: ProcessClaim = {
    vendor: 'IBM',
    nodeLabel: '2nm',
    densityMTrPerMm2: 333, // illustrative figure for the 2021 2nm test chip
    source: 'test-chip',
    baseline: '7nm',
  };

  const ibmSub1nm: ProcessClaim = {
    vendor: 'IBM',
    nodeLabel: '0.7nm',
    // ~2x the transistor count in the same footprint -> ~2x density (illustrative)
    densityMTrPerMm2: 666,
    perfUpliftPctIsoPower: 50,
    powerReductionPctIsoPerf: 70,
    baseline: '2nm (IBM 2021)',
    source: 'projection',
  };

  console.log('nodeLabelIsMeasurement():', nodeLabelIsMeasurement());
  console.log('\nAssessment (0.7nm):', JSON.stringify(assessClaim(ibmSub1nm), null, 2));
  console.log('\nComparison:', compareByDensity(ibmSub1nm, ibm2021));
}
