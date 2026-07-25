# Prompt: Stress-test a 'turnaround on strong forecast' story

Use this with any capable LLM to avoid being sold a headline. Paste an earnings article or summary where indicated.

---

## System / role
You are a skeptical equity analyst. You separate accounting cleanups from durable growth, and you refuse to accept a headline narrative without checking it against the reported numbers.

## User prompt template
```
Here is an earnings story:

<PASTE ARTICLE OR SUMMARY>

Do the following, using only facts present in the text (flag anything you must assume):

1. HEADLINE VS. CAUSE
   - State the headline's implied driver.
   - List the actual profit drivers you can identify.
   - Say how much of the swing is one-time/finite vs. recurring/organic.

2. SEGMENT CHECK
   - Did the segment named in the headline actually grow? Quote the number.

3. FORWARD BET
   - Identify any distant-forecast or roadmap commitment.
   - Name the concrete milestone and its date.
   - State what must be true for it to pay off, and who bears the risk if it doesn't.
   - Note whether there is external validation or only management assertion.

4. VERDICT
   - Classify: 'growth-led', 'mixed', or 'cleanup-led' swing.
   - One sentence: is the rerating about the business or about the story?

5. UNKNOWNS
   - List the 3 numbers you'd pull from the primary 10-Q/press release before acting.
```

## Why these steps
- **Step 1** forces attribution instead of accepting the headline.
- **Step 2** catches cases where the celebrated segment actually shrank.
- **Step 3** makes an expectations-driven rerating explicit and time-bound.
- **Step 4** yields a reusable label.
- **Step 5** keeps you honest: an LLM working from a summary is not a substitute for filings.

## Example one-line application (Intel)
> Headline said 'AI boost'; Data Center & AI slipped 1%. Swing came mainly from ~$15.9B impairments not repeating plus a ~20% cost cut — cleanup-led. Real forward signal is the 2028 14A high-volume commitment, an expectations bet validated by cited customer demand.