# Prompts: Interrogate the Workflow, Then the Data

Use these before you pick any AI tool. They operationalize the post's one question — "Which workflow is broken?" — and the data audit that follows.

## Prompt 1 — Stakeholder interrogation (paste into any chat LLM)

```
You are a pragmatic AI adoption advisor. I want to add AI to my business but
haven't named the specific problem yet. Interview me one question at a time
until we have:

1. The single workflow we're trying to improve (named concretely).
2. The measurable outcome that would prove it worked.
3. The exact data the AI would need to read, and where it lives.
4. Who owns that data and its definitions.

Rules:
- Ask ONE question per turn. Wait for my answer.
- If I answer with a tool name instead of a workflow, push back.
- End by summarizing whether we are ready to select a tool, or whether the
  real project is data cleanup first. Be honest if it's cleanup.
```

## Prompt 2 — Dataset profiling (paste a data sample into an LLM)

```
Here is a sample of records from the workflow we want AI to support:

<PASTE 20-50 ROWS OF CSV OR JSON>

Profile this data for AI-readiness. Report:
1. Categorical fields with inconsistent values (case, whitespace, synonyms).
2. Fields that appear to be free text misused for structured data.
3. Fill/completeness rate per field and which fields look unreliable.
4. Likely duplicate-entity problems and what a canonical key should be.
5. A prioritized cleanup task list with a rough effort estimate for each.

Do not suggest an AI tool. Assume the tool is the easy part; focus on what
must be true about the data before any tool is chosen.
```

## Prompt 3 — Cleanup rule drafting

```
Based on the profiling above, draft normalization rules for the field
"<FIELD>". Output:
- A mapping table from raw values to canonical values.
- Edge cases a human must resolve manually.
- A one-line note on who should sign off on each ambiguous mapping.
Keep it reviewable by a non-engineer.
```

## How to use these together

1. Run Prompt 1 with the decision-maker. If it ends in "cleanup first," good — you avoided a doomed Q1 promise.
2. Export a data sample and run Prompt 2 (or `audit.ts` for a deterministic pass).
3. Turn each finding into rules with Prompt 3.
4. Redesign the intake process so the mess stops being created.
5. *Then* evaluate tools.
