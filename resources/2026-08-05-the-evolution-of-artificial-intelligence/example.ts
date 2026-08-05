/**
 * independent-first-assist.ts
 *
 * A self-contained reference implementation of an AI-assist workflow
 * designed to REDUCE automation bias in a clinical (e.g. digital pathology)
 * setting.
 *
 * Core ideas demonstrated:
 *   1. Independent-first: capture the clinician's read BEFORE revealing AI.
 *   2. Calibrated confidence: never show a raw score as if it were a probability.
 *   3. Disagreement is a first-class, logged event (not a silent overwrite).
 *   4. Automation-bias risk score gates how much friction an accept requires.
 *   5. Override events are logged for the metrics that actually matter
 *      (correct->incorrect vs incorrect->correct).
 *
 * No dependencies. Run with:  npx ts-node example.ts   (or compile with tsc)
 *
 * This is illustrative scaffolding, not medical-device software.
 */

type Label = string;

interface AiPrediction {
  label: Label;
  /** Raw model score in [0,1] BEFORE calibration. Do not show this to users. */
  rawScore: number;
  /** Human-readable evidence the model can point to. */
  evidence: string[];
}

interface ClinicianRead {
  label: Label;
  /** Self-reported confidence: how sure the clinician is before seeing AI. */
  selfConfidence: 'low' | 'medium' | 'high';
}

interface CaseContext {
  caseId: string;
  /** Consequence tier of getting this wrong. */
  stakes: 'routine' | 'elevated' | 'critical';
  /** Seconds the clinician spent before committing a read. A proxy for fatigue/time-pressure. */
  secondsOnCase: number;
}

/* -------------------------------------------------------------------------- */
/* 1. Calibration: turn a raw score into an honest, bucketed statement.        */
/* -------------------------------------------------------------------------- */

/**
 * A calibration map is built offline from a reliability diagram: for each raw
 * score bucket, the OBSERVED accuracy of the model on held-out data.
 * Here we hard-code a plausible, deliberately-not-overconfident example.
 */
const CALIBRATION: Array<{ maxRaw: number; observedAccuracy: number }> = [
  { maxRaw: 0.5, observedAccuracy: 0.42 },
  { maxRaw: 0.7, observedAccuracy: 0.61 },
  { maxRaw: 0.85, observedAccuracy: 0.74 },
  { maxRaw: 0.95, observedAccuracy: 0.86 },
  { maxRaw: 1.01, observedAccuracy: 0.91 },
];

type CalibratedConfidence =
  | { kind: 'abstain'; reason: string }
  | { kind: 'stated'; observedAccuracy: number; band: string };

function calibrate(raw: number): CalibratedConfidence {
  if (raw < 0.5) {
    return { kind: 'abstain', reason: 'signal too weak to assert a label' };
  }
  const bucket = CALIBRATION.find((b) => raw < b.maxRaw)!;
  const acc = bucket.observedAccuracy;
  // Report a band, not false precision. "~85-90%" beats "87.3%".
  const lo = Math.floor(acc * 20) * 5; // round down to nearest 5
  const band = `~${lo}-${lo + 5}%`;
  return { kind: 'stated', observedAccuracy: acc, band };
}

/* -------------------------------------------------------------------------- */
/* 2. Automation-bias risk: how likely is an unsafe deferral here?             */
/* -------------------------------------------------------------------------- */

interface RiskAssessment {
  score: number; // 0..1, higher = more likely to be an unsafe rubber-stamp
  factors: string[];
}

function assessAutomationBiasRisk(
  ctx: CaseContext,
  read: ClinicianRead,
  ai: CalibratedConfidence,
  disagreement: boolean,
): RiskAssessment {
  let score = 0;
  const factors: string[] = [];

  // Time pressure: fast reads on hard cases are where deference spikes.
  if (ctx.secondsOnCase < 30) {
    score += 0.35;
    factors.push('very fast read (possible time pressure / fatigue)');
  } else if (ctx.secondsOnCase < 60) {
    score += 0.15;
    factors.push('fast read');
  }

  // A confident-LOOKING model is the most seductive when the human is unsure.
  if (ai.kind === 'stated' && ai.observedAccuracy >= 0.85 && read.selfConfidence !== 'high') {
    score += 0.25;
    factors.push('confident-looking AI + non-high clinician confidence');
  }

  // Disagreement between a committed human read and the AI is the danger zone.
  if (disagreement) {
    score += 0.25;
    factors.push('AI disagrees with the clinician\u2019s committed read');
  }

  // Stakes multiply the cost of being wrong.
  if (ctx.stakes === 'critical') {
    score += 0.15;
    factors.push('critical-stakes case');
  } else if (ctx.stakes === 'elevated') {
    score += 0.08;
    factors.push('elevated-stakes case');
  }

  return { score: Math.min(1, score), factors };
}

/* -------------------------------------------------------------------------- */
/* 3. Friction policy: gate the accept based on risk.                          */
/* -------------------------------------------------------------------------- */

type Friction =
  | { level: 'none' }
  | { level: 'require-rationale' }
  | { level: 'require-second-reader' };

function frictionFor(risk: RiskAssessment): Friction {
  if (risk.score >= 0.6) return { level: 'require-second-reader' };
  if (risk.score >= 0.3) return { level: 'require-rationale' };
  return { level: 'none' };
}

/* -------------------------------------------------------------------------- */
/* 4. Override logging: the events the safety metrics are built from.          */
/* -------------------------------------------------------------------------- */

interface OverrideEvent {
  caseId: string;
  clinicianLabel: Label;
  aiLabel: Label;
  finalLabel: Label;
  /** Only known later, at ground-truth adjudication. Optional at decision time. */
  truth?: Label;
  riskScore: number;
  timestamp: string;
}

const overrideLog: OverrideEvent[] = [];

/** The single most important report: benefit (incorrect->correct) vs harm (correct->incorrect). */
function summarizeOverrides(log: OverrideEvent[]) {
  let correctToIncorrect = 0; // HARM: human was right, AI flipped them to wrong
  let incorrectToCorrect = 0; // BENEFIT: human was wrong, AI rescued them
  for (const e of log) {
    if (e.truth === undefined) continue;
    const humanWasRight = e.clinicianLabel === e.truth;
    const finalWasRight = e.finalLabel === e.truth;
    const changed = e.finalLabel !== e.clinicianLabel;
    if (!changed) continue;
    if (humanWasRight && !finalWasRight) correctToIncorrect++;
    if (!humanWasRight && finalWasRight) incorrectToCorrect++;
  }
  return { correctToIncorrect, incorrectToCorrect };
}

/* -------------------------------------------------------------------------- */
/* 5. The workflow, wired together.                                            */
/* -------------------------------------------------------------------------- */

interface Decision {
  finalLabel: Label;
  requiredFriction: Friction;
  risk: RiskAssessment;
  aiConfidence: CalibratedConfidence;
}

/**
 * Enforces independent-first: `read` is already committed by the time we call
 * this. The AI output is only calibrated/revealed here, and any change from the
 * clinician's committed read is logged as an override event.
 */
function runAssist(
  ctx: CaseContext,
  read: ClinicianRead,
  ai: AiPrediction,
  /** What the clinician chooses AFTER seeing calibrated AI + evidence. */
  clinicianFinalChoice: (info: {
    ai: AiPrediction;
    confidence: CalibratedConfidence;
    disagreement: boolean;
  }) => Label,
  truth?: Label,
): Decision {
  const confidence = calibrate(ai.rawScore);
  const disagreement = read.label !== ai.label;
  const risk = assessAutomationBiasRisk(ctx, read, confidence, disagreement);
  const requiredFriction = frictionFor(risk);

  const finalLabel = clinicianFinalChoice({ ai, confidence, disagreement });

  if (finalLabel !== read.label) {
    overrideLog.push({
      caseId: ctx.caseId,
      clinicianLabel: read.label,
      aiLabel: ai.label,
      finalLabel,
      truth,
      riskScore: risk.score,
      timestamp: new Date().toISOString(),
    });
  }

  return { finalLabel, requiredFriction, risk, aiConfidence: confidence };
}

/* -------------------------------------------------------------------------- */
/* Demo                                                                        */
/* -------------------------------------------------------------------------- */

function demo() {
  // Scenario A: tired, fast read; confident AI disagrees; human caves. HARM.
  const decA = runAssist(
    { caseId: 'A-esoph-014', stakes: 'critical', secondsOnCase: 18 },
    { label: 'T2', selfConfidence: 'medium' },
    { label: 'T3', rawScore: 0.93, evidence: ['deep invasion at region 4', 'irregular margin'] },
    ({ ai }) => ai.label, // clinician defers to the AI
    'T2', // ground truth: the human was right
  );

  // Scenario B: unhurried; AI rescues a wrong human call. BENEFIT.
  const decB = runAssist(
    { caseId: 'B-gastr-207', stakes: 'elevated', secondsOnCase: 140 },
    { label: 'benign', selfConfidence: 'low' },
    { label: 'malignant', rawScore: 0.9, evidence: ['high mitotic count', 'nuclear atypia'] },
    ({ ai }) => ai.label, // clinician updates after weighing evidence
    'malignant', // ground truth: the AI was right
  );

  // Scenario C: weak signal -> AI abstains, low friction, human keeps their call.
  const decC = runAssist(
    { caseId: 'C-derm-051', stakes: 'routine', secondsOnCase: 95 },
    { label: 'nevus', selfConfidence: 'high' },
    { label: 'melanoma', rawScore: 0.44, evidence: ['borderline pigment network'] },
    () => 'nevus',
    'nevus',
  );

  const print = (name: string, d: Decision) => {
    const conf = d.aiConfidence.kind === 'abstain'
      ? `abstains (${d.aiConfidence.reason})`
      : `${d.aiConfidence.band} calibrated`;
    console.log(`\n[${name}] final=${d.finalLabel} | AI ${conf}`);
    console.log(`  risk=${d.risk.score.toFixed(2)} friction=${d.requiredFriction.level}`);
    if (d.risk.factors.length) console.log(`  factors: ${d.risk.factors.join('; ')}`);
  };

  print('A', decA);
  print('B', decB);
  print('C', decC);

  const summary = summarizeOverrides(overrideLog);
  console.log('\n=== Override safety summary ===');
  console.log(`  BENEFIT (incorrect->correct): ${summary.incorrectToCorrect}`);
  console.log(`  HARM    (correct->incorrect): ${summary.correctToIncorrect}`);
  console.log('  Net accuracy can rise while HARM also rises \u2014 watch both, not the average.');
}

demo();

export {
  calibrate,
  assessAutomationBiasRisk,
  frictionFor,
  runAssist,
  summarizeOverrides,
  type Decision,
  type OverrideEvent,
};
