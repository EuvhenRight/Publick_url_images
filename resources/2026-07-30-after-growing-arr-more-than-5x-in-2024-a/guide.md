# Defending Against Fast-Moving Software Supply Chain Attacks

The LinkedIn post that inspired this guide makes one core technical claim worth acting on: modern supply chain attacks (e.g., the 2025 "Shai-Hulud" npm worm) can push malicious code live within minutes of an account compromise. Scheduled scanners that run hourly or daily are structurally too slow to stop this class of attack. The defense has to be real-time and preventive, not periodic and reactive.

This guide is a vendor-neutral playbook for closing that gap.

## 1. Understand the threat model

| Attack stage | Old attacks (days) | Fast attacks (minutes) |
|---|---|---|
| Credential/token theft | Slow reuse | Immediate reuse |
| Malicious publish | Staged over time | Published in minutes |
| Propagation | Manual | Self-replicating worm (postinstall scripts) |
| Detection window for scheduled scans | Adequate | Missed entirely |

Key lesson from Shai-Hulud-style worms:
- Compromised maintainer tokens were used to publish trojanized package versions.
- `postinstall` lifecycle scripts executed on every `npm install`, harvesting secrets (npm tokens, GitHub tokens, cloud creds) and republishing to spread.
- The whole lifecycle from compromise to propagation was fast enough that after-the-fact alerting was useless.

## 2. Shift from detection to prevention

Prevention controls that operate *at the moment code is fetched, built, or published* beat scanners that run on a cron.

### CI/CD runtime protection
- Monitor egress network traffic from build jobs. A build that suddenly phones home to an unknown host is a strong signal.
- Default-deny outbound network access in CI runners; allowlist only required endpoints (registry, artifact store, etc.).
- Detect and block unexpected process execution during dependency install.

### Dependency install hardening
- Disable lifecycle scripts by default: `npm install --ignore-scripts` (and enforce via `.npmrc`).
- Pin dependencies with lockfiles and enable integrity verification.
- Use a cooldown / quarantine window for newly published versions before allowing them into builds.

### Credential hygiene
- Prefer short-lived OIDC tokens over long-lived PATs for publishing.
- Require 2FA and trusted publishing for package registries.
- Scope tokens narrowly; never expose registry tokens to arbitrary build steps.

## 3. Concrete GitHub Actions hardening checklist

- [ ] Pin all actions to a full commit SHA, not a tag.
- [ ] Set minimal `permissions:` at workflow and job level (default `read-all` or less).
- [ ] Add egress monitoring/blocking (network policy or a monitoring agent).
- [ ] Enforce `--ignore-scripts` for untrusted dependency installs.
- [ ] Use OIDC for cloud and registry auth instead of static secrets.
- [ ] Enable dependency review on pull requests.
- [ ] Turn on push protection / secret scanning for the repo.

## 4. Ask the honest question

The post ends with the right question: *would your current setup catch an attack that only lives for four minutes?*

Run the self-assessment in `assessment.md` to answer it concretely for your own pipeline.

## References
- npm lifecycle scripts and `--ignore-scripts` documentation
- GitHub Actions security hardening guidance
- Public write-ups of the 2025 Shai-Hulud npm worm

*This guide is independent and educational; it is not affiliated with or endorsed by StepSecurity, Chainguard, or Checkmarx.*
