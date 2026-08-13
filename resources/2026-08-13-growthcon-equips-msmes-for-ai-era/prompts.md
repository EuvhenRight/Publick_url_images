# Reusable AI Prompts for MSME Workflows

Copy, paste, and replace the bracketed fields.

## 1) Customer reply draft
**Prompt**

You are helping draft a customer service reply for a small business.

Write a clear, polite first draft using the facts below.

Business context:
- Business name: [Business Name]
- Tone: [friendly/professional/warm/concise]
- Audience: [new customer / existing customer / frustrated customer]

Customer message:
[Paste customer message]

Approved facts:
- [Fact 1]
- [Fact 2]
- [Fact 3]

Rules:
- Do not invent policies, prices, or timelines
- If information is missing, mention that it needs confirmation
- Keep the reply under [number] words
- End with a clear next step

Return:
1. A draft reply
2. A short note listing anything that needs human review

## 2) Invoice follow-up draft
**Prompt**

Draft a polite invoice reminder email.

Details:
- Customer name: [Customer Name]
- Invoice number: [Invoice Number]
- Amount due: [Amount]
- Due date: [Due Date]
- Days overdue: [Days]
- Payment method or link: [Link or instructions]
- Tone: polite, firm, professional

Rules:
- Do not sound threatening
- Do not mention legal action
- Keep it short and clear
- Include the invoice number, amount due, and payment next step

Return:
1. A subject line
2. The email body
3. One alternate version that is slightly firmer

## 3) Internal review prompt
**Prompt**

Review this AI draft for accuracy, tone, and missing details.

Checklist:
- Are the facts correct?
- Is the tone appropriate?
- Is anything missing?
- Could the message confuse the customer?
- Does it need escalation to a human?

Draft:
[Paste draft]

Return:
- Required edits
- Nice-to-have edits
- Final recommended version

## 4) Prompt template for any repetitive workflow
**Prompt**

Help me automate the first draft of a repetitive business task.

Task:
[Describe the task]

Inputs available:
- [Input 1]
- [Input 2]
- [Input 3]

Output needed:
[Email / message / checklist / summary / form response]

Rules:
- Use only the provided information
- Keep the output concise and practical
- Flag anything uncertain
- Match this tone: [tone]

Before writing the draft, list the assumptions you are making.
Then write the draft.

## 5) Simple human review rule
Use this before sending any AI-assisted message:
- Facts correct?
- Tone right?
- Policy followed?
- Edge case checked?
- Ready to send?

If any answer is no, revise before sending.
