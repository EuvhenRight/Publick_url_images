# AI Model Routing Decision Template

Use this template to document which AI model should be used for a specific workflow.

Copy one version per use case.

---

## 1. Use case summary

**Use case name:**  

**Business owner:**  

**Technical owner:**  

**Date reviewed:**  

**Current status:** Proposed / Pilot / Production / Retired  

**Short description:**  


---

## 2. Workflow classification

### Who uses it?

- [ ] Internal employees only
- [ ] Contractors or partners
- [ ] Customers
- [ ] Fully automated system

### What does the model do?

- [ ] Summarization
- [ ] Classification
- [ ] Search or retrieval assistance
- [ ] Drafting
- [ ] Code generation
- [ ] Data extraction
- [ ] Recommendation
- [ ] Decision support
- [ ] Autonomous decision-making
- [ ] Other: 

### Output destination

- [ ] Internal draft only
- [ ] Internal decision support
- [ ] Sent to customer after human review
- [ ] Sent directly to customer
- [ ] Used by another automated system

---

## 3. Data sensitivity

Check all that apply.

- [ ] Public data
- [ ] Internal business data
- [ ] Confidential company data
- [ ] Customer data
- [ ] Personal data
- [ ] Regulated data
- [ ] Security-sensitive data
- [ ] Legal or contractual data
- [ ] Financial data
- [ ] Health data
- [ ] Source code
- [ ] Credentials or secrets

**Data that must never be sent to the model:**  


**Approved data sources:**  


---

## 4. Risk rating

Rate each category from 1 to 5.

1 = low risk  
5 = high risk

| Risk category | Score | Notes |
|---|---:|---|
| Customer harm if wrong |  |  |
| Legal or regulatory exposure |  |  |
| Security exposure |  |  |
| Financial impact |  |  |
| Brand/reputation impact |  |  |
| Operational dependency |  |  |
| Data sensitivity |  |  |

**Overall risk tier:** Low / Medium / High / Prohibited until approved  

**Reason for tier:**  


---

## 5. Model requirements

| Requirement | Target | Notes |
|---|---|---|
| Minimum quality threshold |  | Example: 90% pass rate on evaluation set |
| Maximum average latency |  | Example: under 2 seconds |
| Maximum monthly budget |  |  |
| Maximum cost per request |  |  |
| Required context length |  |  |
| Required languages |  |  |
| Tool/function calling needed? | Yes / No |  |
| Structured output needed? | Yes / No |  |
| Image/audio/video needed? | Yes / No |  |
| Data residency requirement |  |  |
| Retention requirement |  |  |

---

## 6. Candidate model comparison

| Model/vendor | Capability fit | Estimated monthly cost | Latency fit | Data/security fit | Operational fit | Overall recommendation |
|---|---|---:|---|---|---|---|
| Candidate 1 | High / Medium / Low |  |  |  |  |  |
| Candidate 2 | High / Medium / Low |  |  |  |  |  |
| Candidate 3 | High / Medium / Low |  |  |  |  |  |

**Selected primary model:**  

**Reason:**  


**Selected fallback model or process:**  

**Reason:**  


---

## 7. Cost estimate

| Input | Estimate |
|---|---:|
| Expected users |  |
| Requests per user per day |  |
| Business days per month |  |
| Estimated monthly requests |  |
| Average input size |  |
| Average output size |  |
| Estimated cost per request |  |
| Estimated monthly model cost |  |
| Buffer percentage |  |
| Forecast monthly cost with buffer |  |

**Cost owner:**  

**Budget approved by:**  

---

## 8. Controls required before production

- [ ] Security review completed
- [ ] Legal/privacy review completed
- [ ] Data classification completed
- [ ] Prompt injection risks reviewed
- [ ] Evaluation set created
- [ ] Human review process defined
- [ ] Logging enabled
- [ ] Spend monitoring enabled
- [ ] Error monitoring enabled
- [ ] Abuse or misuse monitoring enabled
- [ ] Fallback process tested
- [ ] Incident response owner assigned
- [ ] User disclosure/notice completed, if needed

---

## 9. Evaluation plan

**Evaluation dataset location:**  

**Evaluation owner:**  

**Quality metrics:**  

- Accuracy:
- Helpfulness:
- Hallucination rate:
- Refusal correctness:
- Safety policy compliance:
- Format validity:
- Latency:
- Cost per successful task:

**Minimum launch criteria:**  


**Ongoing review cadence:** Weekly / Monthly / Quarterly  

---

## 10. Human review and escalation

**Is human review required before output is used?** Yes / No  

If yes, who reviews it?  

What should reviewers check?  

When should the workflow escalate to a human expert?  


---

## 11. Decision record

**Decision:** Approved / Approved with conditions / Rejected / Needs more review  

**Approved model(s):**  

**Approved use conditions:**  


**Restrictions:**  


**Decision owner:**  

**Approvers:**  

**Next review date:**  

---

## 12. One-sentence defense

Complete this sentence:

> We chose [model or model class] for [workflow] because the task has [risk level] risk, requires [capability], is expected to cost [budget], and will be controlled through [controls].

Example:

> We chose a mid-tier approved model for internal support-ticket summarization because the task has medium risk, requires reliable summarization but not complex reasoning, is expected to cost less than $2,000 per month, and will be controlled through human review, logging, and monthly quality checks.