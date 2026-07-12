# Detecting Fraudulent Applicants: A Signals-Based Hiring Defense Guide

This guide translates the LinkedIn post into practical, actionable defenses for HR, security, and talent teams. The core thesis: **the resume is not the vulnerability — the trust you extend when someone passes screening is.** Fraudulent applicants (including state-sponsored operations) rarely lie on paper. They defeat you at the identity and device layer.

> Note on statistics: figures like "1 in 343 applicants" and "300+ U.S. firms" come from specific vendor/DOJ reports referenced in the post. Treat them as illustrative of scale, not universal constants. Verify against primary sources (DOJ press releases, your own vendor's data) before citing.

---

## 1. The Threat Model

Traditional hiring assumes the adversary is a candidate exaggerating skills. The modern adversary is different:

| Traditional risk | Modern fraud risk |
|---|---|
| Inflated resume | Real (sometimes stolen) credentials |
| Bad hire you can fire | Credentialed insider with system access |
| Detectable in first 90 days | Standing breach on day one |
| One person | Operation: farms, laptop mules, deepfakes |

Key tactics observed in the wild:
- **Laptop farms** — a US-based facilitator hosts company laptops; the actual worker connects remotely from overseas, defeating geo checks.
- **Deepfake video interviews** — real-time face/voice synthesis to pass live calls.
- **Identity mismatch** — phone, email, government ID, and payment account never fully reconcile to one real person.
- **Automation signatures** — scripted keystrokes, mass applications from one device.

---

## 2. Signals to Check (not resume content)

### Identity coherence
- Do phone, email domain age, ID document, and banking details point to the *same* verifiable person?
- Was the phone number recently provisioned (VoIP/burner)?
- Does the payment destination match the claimed residence and identity?

### Device & network
- Is the applicant device signing in from multiple countries in a short window (impossible travel)?
- VPN/residential proxy indicators inconsistent with stated location.
- One device fingerprint associated with many distinct applications/identities.

### Behavioral / interaction
- Scripted vs. typed input (paste-heavy responses, uniform keystroke timing).
- Audio/video artifacts: lip-sync lag, frame-boundary warping, lighting inconsistency around the face, unnatural blink cadence.
- Reluctance to perform a simple live "liveness" action on camera (turn head, hold hand near face, respond to an unexpected prompt).

### Post-hire (the real breach window)
- New hire connecting from unexpected geographies immediately after provisioning.
- Remote-access tooling installed on corporate hardware early.
- Shipping address for equipment that differs from stated residence.

---

## 3. Practical Interview & Onboarding Controls

1. **Live, unscripted verification step.** Ask the candidate on video to do something not answerable by a script or pre-rendered deepfake (e.g., "hold up your ID and turn it," "move your hand across your face," "read this number I'm putting in chat right now"). Real-time deepfakes struggle with occlusion and unexpected prompts.
2. **Independent identity verification** through a vendor that checks document authenticity + liveness, not just document *appearance*.
3. **Reconcile the money trail.** Confirm that payroll destination, tax identity, and claimed residence align. Laptop-farm operations often break here.
4. **Ship-to = live-at check.** For remote roles, flag when equipment ship-to differs from the address of record.
5. **Continuous post-hire monitoring** for impossible-travel logins in the first 30–60 days, when a fraudulent hire is most valuable to the adversary.

---

## 4. Auditing Your ATS

Ask your applicant tracking system / hiring stack:
- Does it capture and expose device fingerprint and IP geolocation per application?
- Can it flag one device across many applications?
- Does it integrate identity/liveness verification before an offer?
- Does it hand off any risk signal to your security/IAM team at provisioning time?

If the honest answer to all of these is "no," your ATS is checking resume content — exactly the layer the adversary doesn't attack.

See `checklist.md` for a copy-paste triage checklist and `example.ts` for a runnable heuristic risk-scoring reference.
