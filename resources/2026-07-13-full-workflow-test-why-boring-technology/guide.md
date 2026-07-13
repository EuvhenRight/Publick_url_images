# Rehearsing Database Recovery: A Restore Drill Guide

The GitLab 2017 incident is the canonical lesson: five backup mechanisms, and
none delivered because **no one had ever run a full restore end to end**.
Redundancy is not insurance until the recovery path has been walked.

This guide gives you a repeatable process to rehearse PostgreSQL recovery so
that your Time to Restore Service (DORA) is a measured number, not a hope.

---

## Why this matters

- Backups that have never been restored are theory, not insurance.
- "Boring technology" (Postgres, cron, pg_dump) wins *only* because its failure
  modes are well understood — but understood failure modes still require
  practiced recovery.
- The payoff shows up in **Time to Restore Service**, not in fewer incidents.

## The core principle

> A backup you have not restored is a hypothesis. A restore you have
> rehearsed is a capability.

---

## The restore drill (run quarterly, minimum)

### 1. Pick a throwaway target
Use a box you are genuinely willing to lose: fresh VM, container, or ephemeral
cloud instance. Never rehearse against production.

### 2. Start from cold
Assume nothing: no existing data directory, no cached config. This surfaces
hidden dependencies (custom `postgresql.conf` values like `max_connections`,
extensions, roles, tablespaces).

### 3. Restore from the actual backup artifact
Pull the real backup from its real location (S3, snapshot, WAL archive). Do not
use a local copy you happen to have lying around.

### 4. Time the whole thing
Record wall-clock time from "start" to "application can read/write." That number
is your Time to Restore Service for this failure mode.

### 5. Verify correctness, not just startup
- Row counts match expectation
- A known checksum / sentinel record exists
- The application can authenticate and query

### 6. Write down what surprised you
Every config value, permission, or dependency you had to discover mid-drill is a
landed footgun you just defused.

---

## The `max_connections` lesson

GitLab's `max_connections = 8000` ran fine for almost a year, then blocked
Postgres from restarting mid-incident and starved replication. Config values
that "work in steady state" can be lethal during recovery.

**Drill implication:** always restore using the *same* config you run in
production, so recovery-time behavior of those values is exposed *before* an
incident, not during one.

---

## Checklist

- [ ] Restore rehearsed within the last 90 days
- [ ] Rehearsal used the real backup artifact from its real location
- [ ] Rehearsal started from a cold, empty box
- [ ] Production config was used (including `max_connections`, extensions)
- [ ] Restore time recorded and trended over time
- [ ] Data correctness verified, not just process startup
- [ ] Findings documented and fed back into runbooks

---

## DORA framing

| Metric | What the drill measures |
|---|---|
| Time to Restore Service | Directly measured by drill wall-clock time |
| Change Failure Rate | Indirectly: config drift caught before it fails |

Elite teams recover orders of magnitude faster than low performers. The
difference is rarely tooling — it is rehearsal.
