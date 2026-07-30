# Why small teams ship faster — supporting resources

Companion resources for the post on why small engineering teams ship faster than big
ones. The post's core claim is that speed is not about talent; it's about **how much
has to stay in sync** and **how big each change is**.

This folder turns that claim into things you can actually use:

| File | What it is | Use it to |
|------|------------|-----------|
| `coordination-cost.ts` | A tiny, dependency-free calculator | See the "boring arithmetic" for your own team sizes |
| `scaling-velocity-playbook.md` | A practical playbook | Keep shipping velocity as the team grows |
| `change-size-checklist.md` | A reviewer/author checklist | Keep individual changes small and safe to merge |

## The one idea underneath all of it

Capacity grows **linearly** with headcount. The number of communication paths grows
**quadratically**:

```
communication pairs = n * (n - 1) / 2
```

- 3 people → 3 pairs
- 6 people → 15 pairs
- 12 people → 66 pairs

Double the team from 3 to 6 and you get 2x the people but 5x the relationships to keep
aligned. That gap — not harder problems — is where growing teams quietly lose speed.
The fix isn't to stay small forever; it's to shrink the surface that has to stay in
sync (independent squads) and to shrink each change (small, reviewable batches).

Reference: Fred Brooks, *The Mythical Man-Month* (1975) — "Adding manpower to a late
software project makes it later" (Brooks's Law).
