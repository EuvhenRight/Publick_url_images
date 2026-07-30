# Playbook: keep shipping fast as the team grows

Growth doesn't slow teams down. The rituals added to *manage* growth do. This
playbook is a set of concrete moves for keeping a small team's velocity while adding
people — organized by the two levers that actually matter: **coordination surface**
(how much has to stay in sync) and **change size** (how big each merge is).

> The goal isn't "stay small forever." Plenty of large orgs ship every hour by
> splitting into small, independent squads. The goal is to grow headcount without
> growing the number of people who must agree before anything ships.

---

## Lever 1 — Shrink the coordination surface

Every person you add multiplies relationships, not just hands (see
`coordination-cost.ts`). Contain that.

- **Split into independent squads before you feel you have to.** Aim for teams that
  can design, build, test, and deploy a slice of the product without waiting on
  another team. If two squads must coordinate for every release, they are one team
  wearing two names.
- **Give each squad a clear service/domain boundary.** Ownership beats a shared
  backlog. Ambiguous ownership is a coordination tax paid on every change.
- **Default to async, written decisions.** A short design note that anyone can read
  later scales far better than a meeting that only the attendees remember.
- **Cap the number of required approvers.** "Everyone who touched this file must
  approve" turns quadratic communication cost into a merge queue. One knowledgeable
  reviewer is usually enough.
- **Watch for the meeting tax.** If shipping now requires a standup, a planning
  ceremony, a sign-off, and a retro, the process — not the problem — is the
  bottleneck. Remove one ritual and measure whether anything actually breaks.

## Lever 2 — Shrink the change

Small changes are easy to review and safe to merge. Small bets compound; big bets
gamble.

- **Ship the small thing today.** Nobody on a three-person team plans a three-week
  rewrite; don't let a bigger team's comfort with big batches creep in.
- **Trunk-based-ish flow.** Short-lived branches, merged within a day or two, behind
  feature flags when needed. Long-lived branches are coordination debt with interest.
- **Feature-flag incomplete work** so you can merge continuously without shipping
  half-built features to users.
- **Keep PRs small.** A reviewer's attention is finite; a 60-line PR gets a real
  review, a 1,500-line PR gets a rubber stamp. See `change-size-checklist.md`.
- **Optimize for learning speed, not output.** Shipping small and often means you
  discover you built the wrong thing before you've built too much of it.

---

## Anti-patterns to catch early

| Symptom | What it usually means | Move |
|---------|----------------------|------|
| Reviews became rounds of style nitpicks | Manual policing of things a tool should own | Automate formatting/lint; ban style debates in review |
| "We need a process for that" after every incident | Adding ritual to feel safe | Add the *smallest* guardrail; delete it if it doesn't earn its keep |
| Releases got batched into a weekly train | Coordination cost too high to release freely | Decouple deploys per squad; reduce required approvers |
| Every change touches many teams | Boundaries don't match the work | Redraw ownership so common changes stay inside one squad |
| PRs keep growing | Batch size creeping up | Set a soft line-count budget; split by default |

---

## When *not* to optimize for speed

Some teams should be slow on purpose. If your buyers value predictable over fast
(regulated industries, safety-critical systems, contractual release windows), deliberate
pace is a feature, not a bug. The playbook still applies — small changes and clear
ownership make *deliberate* releases safer too — but "ship every day" is not the goal
for everyone.

---

## A 20-minute diagnostic

Ask your team one question from the post: *when we grew, what actually slowed us down —
the problems, or the process we added to feel safe?*

Then list every step a change goes through from "idea" to "in production." For each
step, ask:

1. Does this reduce a **real, observed** risk, or a hypothetical one?
2. How many people must be involved for it to complete?
3. Could a tool do it instead of a human?

Delete or automate the steps that don't survive those questions. That's usually where
the lost speed went.

---

*Reference: Fred Brooks, "The Mythical Man-Month" (1975). Brooks's Law: adding
manpower to a late software project makes it later.*
