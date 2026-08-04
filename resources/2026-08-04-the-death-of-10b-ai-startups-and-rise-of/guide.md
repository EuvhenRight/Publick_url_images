# The Barbell: Lean AI Team Economics

A short field guide to the argument in the post — why the middle is collapsing,
and how to run a team on the winning end of the barbell. Figures here are
directional and move fast; verify before you quote them.

## Why the middle is collapsing

Two extremes are both booming while the space between them starves:

- **Frontier labs** win on capital and distribution. A handful of them absorbed a
  huge share of all startup funding, so cash stops being their constraint.
- **Tiny teams** win on margin and speed. They stay profitable because every
  dollar of revenue is spread across very few people.
- **The mid-tier startup** — the one that raised a fortune to hit a $10B mark —
  carries a giant's cost base without a giant's war chest, and a scale-up's
  overhead without a small team's efficiency. It has nowhere to stand.

The takeaway is not "big AI is dying." It is: *pick a side of the barbell on
purpose.* Being accidentally in the middle is the expensive place to be.

## The new scoreboard: revenue per employee (RPE)

**RPE = annual revenue ÷ FTE headcount** (count contractors doing full-time work).

Rough, illustrative benchmarks:

| Tier | RPE |
| --- | --- |
| Below benchmark | < $200K |
| Healthy SaaS | $200K–$400K |
| Strong | $400K–$1M |
| Elite public software | ~$1M |
| Lean-AI outlier | $5M+ |

The post's example: an AI coding tool reportedly passing ~$500M in sales with
under 50 people implies **$10M+ per person** — an order of magnitude past even
elite software. That is the number founders now brag about instead of the raise.

## Three levers from the post

1. **Extremes win, middle starves.** Decide deliberately whether you are
   competing on capital/distribution (go big) or margin/speed (stay lean).
2. **RPE is the scoreboard.** Track it monthly. If it is flat while headcount
   climbs, you are buying activity, not progress.
3. **Every seat must out-earn a machine.** Before adding a person, compute the
   break-even against the automation alternative.

## The marginal-hire test

Before approving a hire, estimate three things:

- **Fully loaded cost** = base salary × ~1.4 (benefits, payroll tax, overhead)
  + annual tooling/compute per seat.
- **Expected annual gross-margin contribution** at steady state, discounted for
  ramp time.
- **The automation alternative**: could tools/agents produce comparable output
  for materially less?

Hire only when contribution clears fully loaded cost **and** the automation path
is meaningfully worse. See `example.ts` for a runnable version, and `prompt.md`
for a decision prompt you can paste into an assistant.

## Raise-big vs. stay-lean

**Raise big when:** the market is winner-take-all, capital is itself a moat,
distribution needs scale, and you can convert cash into a durable advantage
(proprietary data, compute, brand).

**Stay lean when:** margins compound, the product is defensible without heavy
spend, you value control and optionality, and the market rewards efficiency over
land-grab.

There is no universally correct answer — only a coherent one. Danger comes from
raising big *and* operating like a lean team, or staying lean *and* competing in
a capital-intensive land-grab.

## Anti-patterns

- Hiring to *signal* momentum rather than to add margin.
- Raising to hit a valuation milestone instead of a business need.
- Treating headcount as a proxy for progress.
- Ignoring RPE because the ARR line still points up.

## Caveats on the numbers

Startup funding concentration, Cursor/Anysphere revenue, and headcount figures
are widely reported estimates from 2025–2026 and change quickly. Use them to
reason about *orders of magnitude*, not as precise, citable facts.
