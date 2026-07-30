# 4-Minute Attack Self-Assessment

Answer yes/no. Each "no" is a gap that a fast-moving supply chain attack can exploit before a scheduled scan ever runs.

## Timing and detection
1. Do you have runtime monitoring that inspects build-job behavior (network, process) *during* the build, not on a schedule? [ ]
2. Would an unexpected outbound connection from a CI job trigger an alert or block within seconds? [ ]
3. Do you default-deny outbound network access in CI runners and allowlist only what's needed? [ ]

## Dependency install
4. Do you install untrusted dependencies with lifecycle scripts disabled (`--ignore-scripts`)? [ ]
5. Do you pin dependencies via lockfile with integrity verification? [ ]
6. Do you enforce a cooldown/quarantine window before newly published versions enter builds? [ ]

## Credentials
7. Do you use short-lived OIDC tokens instead of long-lived publish/registry PATs? [ ]
8. Are registry and cloud tokens scoped narrowly and hidden from arbitrary build steps? [ ]
9. Is 2FA / trusted publishing enforced for package publishing? [ ]

## Actions hygiene
10. Are all third-party actions pinned to a full commit SHA? [ ]
11. Are workflow/job `permissions` set to least privilege? [ ]
12. Are secret scanning and push protection enabled on the repo? [ ]

## Scoring
- 10-12 yes: You are largely prevention-first and would likely disrupt a fast attack.
- 6-9 yes: Meaningful exposure; prioritize items 1-6.
- 0-5 yes: Your defenses are primarily reactive and would probably miss a 4-minute attack.

## What to fix first
Start with items 4 and 1: disabling lifecycle scripts removes the most common execution path for install-time worms, and runtime egress monitoring catches the exfiltration/propagation stage regardless of the initial vector.
