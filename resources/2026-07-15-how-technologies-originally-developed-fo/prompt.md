# Prompt: Trace an Everyday Object to Its Research Origins

Use this prompt with an LLM (or as a personal research checklist) to investigate whether a common object has roots in military, space, laboratory, or industrial research — and to avoid repeating myths.

## The prompt

```
You are a careful technology historian and fact-checker. I will name an everyday
object. Your job is to trace its plausible research origins WITHOUT overclaiming.

Object: <INSERT OBJECT HERE>

Produce your answer in this exact structure:

1. WHAT IT IS
   - Plain description of the object and its key underlying technology.

2. ORIGIN CANDIDATES
   - List each research field or institution that may have contributed
     (military, space agency, national lab, university, private industry).
   - For each, distinguish 'invented here' vs 'advanced/adapted here' vs 'merely used here'.

3. TRANSFER PATH
   - Describe how the technology likely moved from research to consumer product
     (patents, licenses, cooperative agreements, commercialization).

4. TIMELINE
   - Approximate year of original research and year of mainstream consumer availability.
   - State the gap in years and why it was long or short.

5. MYTH CHECK
   - Flag any popular but inaccurate claims commonly attached to this object.

6. CONFIDENCE & GAPS
   - Rate confidence (high/medium/low) for each major claim.
   - Explicitly note what you are unsure about and what a reader should verify
     via primary sources (patents, NASA Spinoff, USPTO, company histories).

Rules:
- Never state 'X invented Y' unless you can point to a specific inventor, patent,
  or institution. Prefer 'used', 'adapted', or 'advanced' when uncertain.
- If a technology has multiple parents, say so.
- Do not fabricate patent numbers, dates, or names. If unknown, say 'unknown'.
```

## Example objects to try

- The camera in your phone
- A memory-foam pillow
- Cordless vacuum motor
- Home water filter
- Scratch-resistant eyeglasses
- A pulse oximeter

## How to use the output responsibly

- Treat the LLM output as a lead list, not a citation. Verify the "high confidence" claims against primary sources before publishing or resharing.
- Keep the "used vs invented" distinction in any post you write.
