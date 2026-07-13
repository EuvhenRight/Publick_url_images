# Cold Restore Runbook Template — <SERVICE / DATABASE NAME>

> Fill this in *before* an incident. If any field is unknown, that is a finding.

## Ownership
- Service owner:
- On-call rotation:
- Escalation contact:

## Backup inventory
| Mechanism | Location | Frequency | Last restore-tested |
|---|---|---|---|
| pg_dump | s3://... | daily | YYYY-MM-DD |
| WAL archive | s3://... | continuous | YYYY-MM-DD |
| Disk/volume snapshot | provider | hourly | YYYY-MM-DD |
| Streaming replica | host | continuous | YYYY-MM-DD |

> Note: A mechanism with no "last restore-tested" date is theory, not insurance.

## Critical config that affects recovery
Record production values that can block or slow a restart/rebuild:
- `max_connections`:
- `shared_buffers`:
- Required extensions:
- Custom roles / permissions:
- Tablespaces:

> The GitLab lesson: `max_connections = 8000` ran fine for a year, then blocked
> restart mid-incident. Config that works in steady state can be lethal in
> recovery. Rehearse with production config.

## Recovery procedure (step by step)
1. Provision a target box (spec / region):
2. Install matching Postgres version:
3. Apply production configuration:
4. Retrieve backup artifact from:
5. Restore command:
6. Replay WAL up to point-in-time (if applicable):
7. Verify: row counts, sentinel record, app connectivity
8. Repoint application / promote:

## Verification criteria
- [ ] Expected row counts present
- [ ] Sentinel/canary record exists
- [ ] Application authenticates and queries successfully
- [ ] Replication re-established (if applicable)

## Measured Time to Restore Service
| Drill date | Elapsed time | Notes / surprises |
|---|---|---|
| YYYY-MM-DD | | |

## Last full drill
- Date:
- Performed by:
- Result:
- Follow-up actions:
