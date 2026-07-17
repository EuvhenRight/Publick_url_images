## Complexity & Failure-Mode Review

> Fill this out for any change that adds a new mechanism (retry, cache, failover, timeout change, integration, background job, etc.). Delete this section for trivial changes.

**Mechanism being added (one sentence):**

_e.g. Add automatic retry (3 attempts, 200ms backoff) on calls from checkout -> inventory._

**New failure mode this introduces (be specific and causal):**

_e.g. During an inventory slowdown, retries triple request volume, which can exhaust inventory's DB connection pool and stall unrelated read traffic._

**Blast radius:**
- [ ] Local component only
- [ ] Single service
- [ ] Cross-service / whole system

**Detection:**
- [ ] An alert already catches this failure mode
- [ ] I am adding the alert in this PR
- [ ] No alert; I am deferring/not shipping this complexity

**Alert signal, threshold, and owner (if applicable):**

_e.g. Alert on inventory DB connection-pool utilization > 85% for 2m -> pages #inventory-oncall._

**Could a simpler design remove this failure mode entirely?**

_Yes/No + brief note._
