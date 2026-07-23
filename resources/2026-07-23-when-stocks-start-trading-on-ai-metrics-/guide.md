# When Stocks Trade on AI Metrics: A Reader's Toolkit for Earnings Proxies

This guide unpacks the metrics referenced in the post and gives you a practical framework for pressure-testing any AI-driven valuation. The core insight: markets didn't abandon earnings — they substituted increasingly optimistic *stand-ins* for profits that haven't materialized. Each stand-in trades certainty for reach.

## The Proxy Ladder

From most concrete to most speculative:

| Level | Metric | What it claims | What it actually is | Failure mode |
|-------|--------|----------------|---------------------|--------------|
| 1 | GAAP Net Income | Audited profit | Backward-looking, adjustable | Depreciation/accounting assumptions (Burry critique) |
| 2 | Free Cash Flow | Cash generated | Less manipulable than earnings | Still hides capex timing choices |
| 3 | ARR (Annual Recurring Revenue) | Recurring revenue base | Sometimes just last month x 12 | "Run-rate" inflates a good month |
| 4 | Run-rate ARR | Annualized recent momentum | Extrapolation of the best window | Ignores churn, seasonality, ramp |
| 5 | Data-center capacity (GW) | Future revenue capability | A cost/buildout, not bookings | Treats capex as if it were revenue |
| 6 | Third-party spend trackers | Market share signal | Sampled proxy data | Not audited, coverage bias |

## The Key Distinctions

### ARR vs. Run-rate ARR
- **True ARR**: contracted recurring revenue, normalized annually.
- **Run-rate ARR**: takes a recent period (often the best month or quarter) and multiplies out. OpenAI's cited ~$25B run-rate outpaces an actual Q1 pace of ~$22-23B precisely because run-rate annualizes momentum, not a stable base.
- **Red flag**: any figure quoted as "$X run-rate" without the trailing-twelve-month actual next to it.

### Capacity is a cost, not revenue
Gigawatts of data-center capacity is a *buildout* — money spent. Booking it as if it were "oil reserves" conflates the ability to produce with production sold. Reserves have a market price; compute capacity only pays off if demand and pricing hold.

### The depreciation twist
Michael Burry's argument: hyperscalers can flatter reported earnings by extending the assumed useful life of AI hardware (e.g., from 3-4 years to 5-6). Longer life = lower annual depreciation = higher reported profit, without any change in cash. So even the "solid" GAAP number at the bottom of the ladder inherits an assumption.

## A Checklist Before You Trust an AI Valuation

1. Which metric is the headline built on? Locate it on the ladder above.
2. Is a run-rate figure paired with a trailing-twelve-month actual?
3. Is capex being described in revenue-like language ("reserves", "backlog", "capacity")?
4. Are the source numbers audited, or third-party sampled?
5. For reported earnings: what depreciation schedule is assumed, and did it change year-over-year?
6. What's the gap between the promise (forward metric) and the loss (current reality)?

## The Honest Answer to the Post's Question

"ARR, gigawatts, or free cash flow — which one would actually get your money?"

None in isolation. The useful move is to read them as a *stack* and watch for divergence: when the optimistic proxy (run-rate, GW) races ahead while the concrete proxy (FCF) lags or the audited one (earnings) relies on shifted assumptions, you're pricing the promise, not the business.
