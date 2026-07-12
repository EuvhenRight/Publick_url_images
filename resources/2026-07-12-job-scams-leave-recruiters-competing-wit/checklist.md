# Applicant Fraud Triage Checklist

A lightweight, non-technical checklist for recruiters and hiring managers. Use it per candidate. Any **RED** should escalate to security before an offer; multiple **AMBER** warrants a live verification step.

## Identity
- [ ] Government ID passes a liveness + authenticity check (not just "looks real").
- [ ] Phone number is not a freshly provisioned VoIP/burner. **AMBER if unknown.**
- [ ] Email domain / account has plausible history. **AMBER if brand-new throwaway.**
- [ ] Name, ID, phone, email, and payment details reconcile to one person. **RED if they don't.**

## Device & Location
- [ ] Application/interview IP geolocation matches stated location. **AMBER if mismatch.**
- [ ] No impossible-travel sign-ins during the process. **RED if present.**
- [ ] Device fingerprint not linked to many other applicants. **RED if shared across identities.**
- [ ] No high-risk residential-proxy / VPN masking inconsistent with story. **AMBER.**

## Live Interview
- [ ] Candidate completed an unscripted liveness prompt on camera. **RED if refused.**
- [ ] No deepfake artifacts (lip-sync lag, edge warping, blink anomalies). **RED if present.**
- [ ] Responses typed naturally, not paste-heavy/scripted. **AMBER.**

## Money & Logistics
- [ ] Payroll/payment destination matches identity and residence. **RED if mismatch.**
- [ ] Equipment ship-to address matches address of record. **AMBER if different.**

## Post-Offer / Onboarding
- [ ] First-30-day login geography matches expected work location.
- [ ] No unexpected remote-access tooling installed on corporate hardware.
- [ ] Security team notified of any risk flags at provisioning.

---
**Rule of thumb:** you are not grading a resume. You are verifying that a single, real, authorized human is the one who will receive credentials and access.
