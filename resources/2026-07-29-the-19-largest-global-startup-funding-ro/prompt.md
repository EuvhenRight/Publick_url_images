# Prompt: Turn a Funding Leaderboard Into an Analysis

Use this with any capable LLM to move from a raw list of funding rounds to the kind of insight in the source post.

## Prompt

```
You are a venture and capital-markets analyst. I will paste a list of
startup funding rounds. For each round, do the following:

1. Identify the investor TYPE for each named investor:
   - Traditional VC
   - Growth equity
   - Hedge fund / credit fund
   - Private equity / infrastructure
   - Corporate strategic
   - Sovereign wealth fund

2. Classify the likely THESIS behind the round:
   - Software growth bet
   - Physical / infrastructure asset (priced for yield)
   - Strategic optionality (market access, data, distribution)
   - Regulatory / market-entry play

3. Flag any MISMATCH between investor type and thesis. These mismatches
   are usually the real story (e.g., credit funds buying AI data centers
   as infrastructure rather than VCs betting on software).

4. Summarize the ONE structural trend the list reveals about where
   capital is migrating and WHY the source of capital matters more than
   the headline dollar amount.

Rules:
- Do not treat headline figures as verified; flag any number that would
  need independent confirmation.
- Distinguish equity from debt/structured financing when the data allows.
- Be concise: one to two sentences per round, then a short synthesis.

Here is the list:
[PASTE ROUNDS HERE]
```

## Why this works

The prompt forces the model to separate three things a leaderboard collapses together: amount, investor type, and thesis. The mismatch step is where the non-obvious insight comes from — exactly the move the original post made when it noticed hedge funds, not VCs, were funding AI data centers.