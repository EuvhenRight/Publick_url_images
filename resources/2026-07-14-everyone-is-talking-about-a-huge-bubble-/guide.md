# Measuring Your Hidden AI Concentration Risk

The LinkedIn post makes two claims worth acting on:

1. **Circular financing** may inflate reported AI demand (Nvidia funds OpenAI, OpenAI buys Nvidia GPUs).
2. **Concentration risk** means a "diversified" index fund can carry a heavy, unchosen AI bet.

This guide gives you a concrete, verifiable way to check point #2 for your own portfolio, plus a framework for reasoning about point #1.

> Note on figures: the post cites numbers such as ~$100B Nvidia-to-OpenAI commitment, $73.1B / 57.9% of Q1 2025 VC into AI, OpenAI ~$25B revenue with a projected $14B operating loss in 2026, and AI names near 20% of S&P 500 profits. Treat these as claims to verify against primary sources (company filings, PitchBook/CB Insights, S&P index factsheets) before relying on them. They are directional, not gospel.

---

## Part 1: Quantify your S&P 500 AI exposure

Cap-weighted index funds (S&P 500, total market) overweight whatever has recently appreciated. A handful of megacaps with large AI exposure can dominate.

### Step 1 — Find the top holdings weight
Most S&P 500 ETFs publish daily holdings. Pull the weights of the largest AI-linked names (e.g. Nvidia, Microsoft, Apple, Amazon, Alphabet, Meta, Broadcom). Sum them.

If the top ~7 names are ~30-35% of the fund, then a 30% drawdown *isolated to those names* implies roughly:

```
portfolio_hit ≈ concentration_weight × name_drawdown
            ≈ 0.32 × 0.30 ≈ 9.6% loss
```

...before any contagion to the rest of the index.

### Step 2 — Estimate effective number of bets
Use the Herfindahl-Hirschman Index (HHI) on holding weights:

```
HHI = Σ(weight_i²)
effective_holdings = 1 / HHI
```

A fund labeled "500 stocks" can have an effective_holdings figure far below 500 when a few names dominate. The `example.ts` script computes this.

### Step 3 — Decide if it matters to you
- If AI-linked concentration is acceptable for your horizon and risk tolerance, do nothing.
- If not, options include equal-weight index funds, ex-tech tilts, or non-US/value sleeves. (This is not personalized advice.)

---

## Part 2: A framework for the circular-financing claim

The question the post ends on — *strip self-financed demand out of Nvidia's numbers* — is a useful analytical exercise, not a precise calculation you can do from outside. To reason about it responsibly:

1. **Distinguish committed vs. recognized revenue.** A funding commitment (multi-year, conditional) is not the same as GPU revenue booked this quarter. Match apples to apples.
2. **Trace the flow.** Vendor financing / strategic investment that returns as purchases is real economically but can overstate *independent* demand. Look for: how much of a customer's spend is funded by the supplier?
3. **Check disclosure.** Related-party transactions and customer concentration appear in 10-K/10-Q risk factors and revenue notes. If one customer is >10% of revenue, it must generally be disclosed.
4. **Separate the two bubbles.** The post's core distinction is sound: frothy pre-revenue startup valuations are a different phenomenon from profitable megacaps. Don't let one argument disprove the other.

### Red flags vs. green flags

| Signal | Bubble-ish | Grounded |
|---|---|---|
| Valuation basis | multiple on narrative/TAM | multiple on current earnings |
| Demand source | supplier-financed, circular | diverse, self-funded buyers |
| Cash flow | large operating losses | positive FCF |
| Customer mix | concentrated | broad |

---

## Part 3: What this is NOT

- Not a market-timing tool. "When does it pop" is unanswerable; the post itself sidesteps it.
- Not investment advice. It is a diligence checklist and a concentration calculator.

## Verify-it-yourself sources
- ETF issuer daily holdings files (weights)
- SEC EDGAR (10-K/10-Q revenue notes, customer concentration, related parties)
- Company earnings call transcripts
- Independent VC data (PitchBook, CB Insights) for funding-share claims
