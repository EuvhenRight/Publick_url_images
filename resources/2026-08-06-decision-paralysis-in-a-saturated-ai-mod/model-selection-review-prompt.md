# Reusable Prompt: AI Model Selection Review

Use this prompt with an AI assistant to prepare for an internal model selection discussion.

Do not paste confidential, regulated, customer, or security-sensitive data into a public or unapproved AI tool. Replace sensitive details with placeholders.

---

## Prompt

You are helping our team evaluate AI model selection for an enterprise workflow.

Act as a pragmatic AI governance, LLMOps, security, and cost management reviewer. Your job is not to pick the most popular model. Your job is to help us decide which model class is appropriate for this task, what risks we need to control, and what decision would be defensible to finance, security, legal, product, and engineering.

Use the information below.

### Workflow description

[Describe the workflow. Example: customer support agents use AI to draft replies to billing questions.]

### Users

[Who uses this? Internal employees, contractors, customers, automated system, etc.]

### Output destination

[Internal only, reviewed before external use, sent directly to customers, used by another system, etc.]

### Data involved

[List data categories only. Do not paste actual sensitive data. Example: customer account metadata, support-ticket text, public docs.]

### Task type

[Summarization, classification, drafting, coding, recommendation, decision support, autonomous decision, etc.]

### Accuracy requirements

[What level of correctness is needed? What happens if the model is wrong?]

### Latency requirements

[Maximum acceptable response time, if known.]

### Volume and cost assumptions

[Estimated requests per month, average input/output size if known, budget constraints.]

### Candidate models or vendors

[List candidates if known. If unknown, discuss model classes instead: low-cost, mid-tier, frontier, specialized, self-hosted/open-weight, etc.]

### Existing controls

[Human review, logging, monitoring, retrieval system, access control, redaction, evals, fallback, etc.]

### Constraints

[Security, privacy, data residency, vendor restrictions, compliance, procurement, customer commitments, etc.]

---

## Tasks

Please produce the following:

1. **Workflow risk tier**  
   Classify this as low, medium, high, or prohibited until formally approved. Explain why.

2. **Model class recommendation**  
   Recommend the appropriate model class, not just a specific vendor. Options may include low-cost general model, mid-tier model, strongest available model, specialized model, self-hosted/open-weight model, or no model until controls exist.

3. **Decision rationale**  
   Explain why this model class is appropriate for the task, cost, and risk level.

4. **When not to use the cheapest model**  
   Identify conditions under which a cheaper model would be risky or false economy.

5. **When not to use the strongest model**  
   Identify conditions under which the strongest or most expensive model would be unnecessary.

6. **Required controls before production**  
   List required controls across security, privacy, evaluation, monitoring, human review, fallback, and cost management.

7. **Evaluation plan**  
   Suggest a practical test plan, including sample size, metrics, pass/fail thresholds, and review cadence.

8. **Cost review**  
   Identify the cost drivers and recommend ways to prevent uncontrolled spend.

9. **Fallback plan**  
   Recommend what should happen if the model is unavailable, too slow, too expensive, or fails quality checks.

10. **Decision table**  
   Provide a table comparing at least three options: cheaper model, stronger model, and wait/no launch.

11. **Final recommendation**  
   Write a concise recommendation that a business owner could defend in a review meeting.

12. **Open questions**  
   List the most important unanswered questions that could change the decision.

Be specific, practical, and conservative where user harm, regulated data, legal exposure, or security risk may be involved.