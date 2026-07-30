# Change-size checklist

The size of each change is the lever. This checklist keeps changes small enough to
review honestly and merge safely — the habit that lets small teams (and small squads
inside big teams) ship every day.

## For the author, before opening a PR

- [ ] **Can this ship on its own?** If it can't be merged and released independently,
      it's probably too big or too coupled — split it.
- [ ] **Is it under ~400 changed lines?** Not a hard rule, but past this a review
      turns into a rubber stamp. If bigger, note *why* and how the reviewer should
      read it.
- [ ] **One intent per PR.** Refactor *or* feature *or* fix — not all three. Mixed PRs
      hide bugs in the noise.
- [ ] **Behind a flag if incomplete.** Merge continuously; reveal to users when ready.
- [ ] **Reversible?** Can this be rolled back with a single revert if it misbehaves?
- [ ] **Self-explanatory title + description.** What changed, why, and what you
      deliberately left out.

## For the reviewer

- [ ] **Review correctness and risk, not style.** Formatting and naming conventions
      belong to a linter/formatter, not a human comment.
- [ ] **Would you bet the deploy on this?** That's the bar — not "is this how I would
      have written it."
- [ ] **Nitpicks are labeled as optional** (e.g. `nit:`) and never block a merge.
- [ ] **Fast turnaround.** A small PR that sits for a day loses the whole point of
      being small. Aim to review within hours.
- [ ] **If it's too big to review well, say so and ask for a split** — don't approve
      what you can't actually vouch for.

## Team norms that make the above stick

- Automate formatting and linting in CI so style is never a review topic.
- Set a **default of one required approver** for low-risk changes; reserve extra
  eyes for genuinely risky areas.
- Track **PR size and review latency** as health metrics. Rising size or latency is
  an early warning that batch size (and coordination cost) is creeping up.
- Make "split it" the socially normal response to a big PR, not a rebuke.

---

*Small changes are easy to review and safe to merge. Small bets compound; big bets
gamble.*
