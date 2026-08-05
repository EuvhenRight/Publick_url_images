# Reading AI-Power Geopolitics: A Four-Lens Framework

Companion notes for the LinkedIn post *"The geopolitical shift in AI power to Asia."*

The post makes one contrarian argument in two parts:

1. **The West still owns the machines and the money.** A country producing better models does not automatically hold the leverage if it doesn't control the compute and capital underneath them.
2. **"Asia" is not one team.** A Chinese efficiency win is a *threat* to the hardware economies of Taiwan, Japan, and Korea, because their prosperity is built on selling the very chips China is trying to need less of.

These notes give you (a) a reusable framework for reasoning about "who holds AI power," (b) a table that pins every number in the post to the kind of source that can confirm or refute it, and (c) the standard traps that make this topic easy to get wrong.

> ⚠️ **On the numbers.** The figures below are the ones asserted in the post (74% of high-end compute, ~12x investment gap, ~5x efficiency gap, ~10% Taiwan drawdown, ~16% single-day chipmaker drop, "a Germany's worth" of new electricity per year). They are plausible orders of magnitude, not audited facts. Treat each as a *claim to verify* against the primary sources named in the table before you repeat it.

---

## The four lenses

"AI power" is not one quantity. It's at least four, and they don't move together. When a headline collapses them into a single arrow ("→ Asia"), that's usually where the error hides.

| Lens | The question it answers | Who the post says leads | Why it can move independently |
|------|-------------------------|-------------------------|-------------------------------|
| **1. Compute** | Who physically owns the high-end chips and servers that train/run frontier models? | US (~74% of high-end compute) | Fab capacity, export controls, and data-center buildout change slowly. |
| **2. Capital** | Who is spending the most to build and train? | US (~12x China) | Investment can surge or freeze on a quarterly basis. |
| **3. Energy** | Who can actually power the next generation of data centers? | China (adding ~a Germany of grid per year) | Grid expansion and permitting are national-policy bound. |
| **4. Efficiency** | Who gets the most capability per unit of compute/energy? | China (~5x less compute for comparable results) | A single architecture or training breakthrough can reset it overnight. |

**The framework's payoff:** the post's whole thesis is that lenses 1–2 (owning the machines/money) and lenses 3–4 (powering them / stretching them) are diverging — and that the *divergence* is what markets reacted to. Power isn't crossing the Pacific; it's shifting from the **hardware axis** (chips, the Taiwan/Japan/Korea belt) to the **leverage axis** (efficiency + energy). That reframing is the reusable idea. Any "Country X now leads in AI" claim should be decomposed into these four before you believe the arrow.

---

## Every claim in the post → where to check it

| Claim in the post | What it really asserts | Where to verify it | Watch out for |
|-------------------|------------------------|--------------------|---------------|
| US controls ~74% of high-end AI compute | Share of *frontier-capable* accelerators/servers, not all silicon | Epoch AI (compute trends), SemiAnalysis, think-tank compute-tracking reports | "High-end" is a moving definition; consumer/edge chips are excluded |
| US invests ~12x more than China | National AI investment gap | Stanford HAI *AI Index*, OECD AI investment data | Private vs. state spending are counted differently across countries |
| Chinese models match US using ~5x less compute | Capability-per-FLOP, not absolute capability | Model technical reports, third-party eval leaderboards (LMArena, etc.) | Efficiency claims often cherry-pick benchmarks; verify apples-to-apples |
| China adds ~"a Germany" of electricity/year | Annual grid capacity/generation additions | IEA electricity reports, national grid operator data | Nameplate capacity ≠ delivered TWh; compare like units |
| US waits years to connect new data centers | Interconnection queue lag | IEA/utility interconnection-queue studies, FERC filings | Regional, not national; varies wildly by grid |
| Taiwan index ~-10% from peak (correction) | A market drawdown, not a structural shift | Index price history (TAIEX), market data providers | Corrections are common and often reverse; confirm dates |
| Japanese chipmaker lost 16% in one day | A single-session move in one named stock | The company's price history + dated news on the trigger | Don't generalize one stock's day into a national verdict |

If you can't source a number to a row in this table, don't put it in a post.

---

## The five traps this topic sets

1. **The single-arrow trap.** "AI power → Asia" hides four separate lenses moving in opposite directions. Always decompose.
2. **The monolith trap.** "Asia" bundles a chip *seller* (Taiwan/Japan/Korea) with a chip *minimizer* (China). Their interests are opposed, so a "win for Asia" can be a loss for most of Asia — exactly the market reaction the post opens with.
3. **The stock-price-as-verdict trap.** A 10% correction or a 16% down day is a *repricing of expectations*, not proof of who leads. Markets move on surprise and positioning, not on ground truth.
4. **The efficiency-is-permanent trap.** A 5x efficiency edge is a snapshot. Algorithmic advantages diffuse fast (open weights accelerate this); compute and energy advantages compound slowly. Don't extrapolate a snapshot into a trend.
5. **The free-means-winning trap.** Giving models away (open weights) is a *strategy*, not a scoreboard. It's rational precisely for the player who is compute-poor and wants to erode the moat of the compute-rich. Ask *why* the move is being made, not just who made it.

---

## The one question worth asking

The post ends by forcing a bet: if one thing decides the next few years — **cheap/free models (efficiency)** or **raw electricity (energy)** — which wins?

That's a genuinely useful framing because it isolates the two lenses (3 and 4) where the East currently leads from the two (1 and 2) where the West does. A defensible answer picks the constraint that's *hardest to buy your way out of*:

- **Efficiency** is knowledge — it leaks, gets copied, and its advantage decays.
- **Energy** is physics and permitting — it's slow, capital-heavy, and its advantage compounds.

Whoever hits the binding constraint last wins. Use the four lenses to decide which constraint that is for the actor you're analyzing — then bet on the lens that can't be shortcut.

See `effective-compute.ts` for a tiny model that combines these lenses into a single "effective compute" comparison you can re-run with your own numbers.
