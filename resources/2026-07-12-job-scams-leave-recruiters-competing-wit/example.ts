/**
 * applicant-risk-score.ts
 *
 * A self-contained, dependency-free reference implementation of a
 * signals-based applicant risk score. It demonstrates the post's thesis:
 * score the DEVICE and IDENTITY behind an application, not resume content.
 *
 * This is illustrative heuristic logic, NOT a production fraud engine.
 * Thresholds and weights should be tuned against your own data, and any
 * automated screening must comply with applicable employment and privacy law.
 *
 * Run with: ts-node example.ts   (or compile with tsc)
 */

export interface ApplicantSignals {
  // Identity coherence
  idPassedLivenessCheck: boolean;
  phoneIsVoipOrBurner: boolean;
  emailIsBrandNewThrowaway: boolean;
  identityFieldsReconcile: boolean; // name/id/phone/email/payment all point to one person

  // Device & network
  ipGeoMatchesStatedLocation: boolean;
  impossibleTravelDetected: boolean;
  deviceFingerprintSharedAcrossIdentities: boolean;
  highRiskProxyOrVpn: boolean;

  // Interview behavior
  completedLivenessPrompt: boolean;
  deepfakeArtifactsObserved: boolean;
  responsesAppearScripted: boolean;

  // Money & logistics
  paymentDestinationMatchesIdentity: boolean;
  shipToMatchesAddressOfRecord: boolean;
}

export type RiskLevel = "LOW" | "REVIEW" | "BLOCK";

interface ScoredSignal {
  signal: string;
  weight: number;
  triggered: boolean;
}

/**
 * Each rule contributes weight when its risky condition is TRUE.
 * Higher total => higher fraud risk.
 */
export function scoreApplicant(s: ApplicantSignals): {
  score: number;
  level: RiskLevel;
  reasons: string[];
} {
  const rules: ScoredSignal[] = [
    { signal: "ID failed liveness/authenticity", weight: 40, triggered: !s.idPassedLivenessCheck },
    { signal: "Identity fields do not reconcile", weight: 35, triggered: !s.identityFieldsReconcile },
    { signal: "Impossible-travel sign-ins", weight: 35, triggered: s.impossibleTravelDetected },
    { signal: "Device shared across many identities", weight: 35, triggered: s.deviceFingerprintSharedAcrossIdentities },
    { signal: "Deepfake artifacts observed", weight: 40, triggered: s.deepfakeArtifactsObserved },
    { signal: "Refused/failed liveness prompt", weight: 30, triggered: !s.completedLivenessPrompt },
    { signal: "Payment destination mismatch", weight: 30, triggered: !s.paymentDestinationMatchesIdentity },
    { signal: "IP geo mismatch", weight: 15, triggered: !s.ipGeoMatchesStatedLocation },
    { signal: "High-risk proxy/VPN", weight: 12, triggered: s.highRiskProxyOrVpn },
    { signal: "VoIP/burner phone", weight: 12, triggered: s.phoneIsVoipOrBurner },
    { signal: "Brand-new throwaway email", weight: 10, triggered: s.emailIsBrandNewThrowaway },
    { signal: "Scripted-looking responses", weight: 10, triggered: s.responsesAppearScripted },
    { signal: "Ship-to differs from address of record", weight: 12, triggered: !s.shipToMatchesAddressOfRecord },
  ];

  const reasons = rules.filter((r) => r.triggered).map((r) => r.signal);
  const score = rules.reduce((sum, r) => sum + (r.triggered ? r.weight : 0), 0);

  // Any single high-severity identity/deepfake failure forces BLOCK.
  const hardBlock =
    !s.idPassedLivenessCheck ||
    !s.identityFieldsReconcile ||
    s.deepfakeArtifactsObserved ||
    s.deviceFingerprintSharedAcrossIdentities ||
    s.impossibleTravelDetected;

  let level: RiskLevel;
  if (hardBlock || score >= 60) level = "BLOCK";
  else if (score >= 25) level = "REVIEW";
  else level = "LOW";

  return { score, level, reasons };
}

// --- Demo ---------------------------------------------------------------
if (require.main === module) {
  const cleanCandidate: ApplicantSignals = {
    idPassedLivenessCheck: true,
    phoneIsVoipOrBurner: false,
    emailIsBrandNewThrowaway: false,
    identityFieldsReconcile: true,
    ipGeoMatchesStatedLocation: true,
    impossibleTravelDetected: false,
    deviceFingerprintSharedAcrossIdentities: false,
    highRiskProxyOrVpn: false,
    completedLivenessPrompt: true,
    deepfakeArtifactsObserved: false,
    responsesAppearScripted: false,
    paymentDestinationMatchesIdentity: true,
    shipToMatchesAddressOfRecord: true,
  };

  const suspiciousCandidate: ApplicantSignals = {
    ...cleanCandidate,
    identityFieldsReconcile: false,
    impossibleTravelDetected: true,
    deviceFingerprintSharedAcrossIdentities: true,
    phoneIsVoipOrBurner: true,
    paymentDestinationMatchesIdentity: false,
  };

  console.log("Clean candidate:", scoreApplicant(cleanCandidate));
  console.log("Suspicious candidate:", scoreApplicant(suspiciousCandidate));
}
