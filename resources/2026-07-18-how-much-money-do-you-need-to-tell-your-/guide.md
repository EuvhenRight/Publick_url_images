# The FI Number Is Set by Your Spend, Not the Market

A companion guide to the post *"How Much Money Do You Need to Tell Your Boss to Get Lost and Live off Dividends?"*

The core claim: **the size of the portfolio you need is driven mostly by how little you can happily live on**, not by which stock or yield you pick. This guide walks the arithmetic and the trade-offs so you can decide for yourself.

> Disclaimer: This is educational material, not financial advice. Numbers are illustrative. Consult a licensed professional for your situation.

## 1. The one formula that matters

```
Portfolio needed = Annual spend / Rate
```

Where `Rate` is either:
- your **dividend yield** (dividend-living model), or
- your **safe withdrawal rate** (sell-shares model).

### Worked examples (from the post)

| Annual spend | Rate | Portfolio needed |
|--------------|------|------------------|
| $24,000 | 3% | $800,000 |
| $24,000 | 5% | $480,000 |
| $18,000 | 3% | $600,000 |

Notice: dropping spend from $24k to $18k at a fixed 3% yield removes $200k from the finish line — a bigger move than most yield chasing achieves, and it's fully under your control.

## 2. Why spend is the bigger lever

- Yield is bounded and partly out of your hands (markets set it; chasing high yield adds risk).
- Spend is a decision you make and can revisit anytime.
- Lowering spend has a **double effect**: it shrinks the numerator *and* often means you need a smaller, less risky return to sustain it.

## 3. Two ways to fund the income — two different failure modes

### Dividend-living model
- **Pro:** you never sell shares; you live on the cash the portfolio throws off.
- **Con:** dividends are discretionary. A board can cut or suspend them.
  - *Example:* Disney suspended its dividend in 2020, preserving roughly $1.6B of cash, exactly when markets fell. Retirees relying on that check saw it stop.
- **Failure you must sleep through:** income disappears when you least expect it.

### Sell-shares model (the "4% rule")
- **Pro:** you aren't dependent on any company's dividend policy; you sell a slice each year.
- **Con:** selling into a downturn is **dollar-cost averaging in reverse** — you liquidate the most shares when prices are lowest (sequence-of-returns risk).
- **Note on the rule itself:** the 4% rule is not a law. William Bengen, who introduced it, later revised his own safe figure upward (to ~4.7%). Treat any single rate as a starting assumption, not a guarantee.
- **Failure you must sleep through:** a bad early market erodes principal permanently.

## 4. The real choice

The pile is the easy part — it's just division. What you're actually choosing is **which failure mode you can tolerate**:

- Can you stomach a dividend being cut mid-retirement?
- Or can you stomach selling shares while the market is down?

Most people never make this choice consciously.

## 5. The question to start with

> What's the smallest annual spend you'd genuinely be **happy** living on?

Start there. It's the single input that moves the finish line the most.

## 6. Use the calculator

See `calculator.ts` in this folder. It prints a table of portfolios needed across spend levels and rates, and reproduces the post's examples.

```bash
npx ts-node calculator.ts
```

## 7. A simple worksheet

1. Write your current annual spend.
2. Write the *minimum* spend you'd be happy with.
3. Divide each by 0.03, 0.04, and 0.05.
4. Compare the piles. Note how much the spend cut saves vs. the yield bump.
5. Decide which failure mode (dividend cut vs. selling in a downturn) you can live with.
