# AI Devtools DX Checklist

Use this checklist to evaluate whether an AI coding tool improves the whole engineering workflow, not just code generation speed.

## 1. Control and reversibility

- Can every AI-made change be inspected before it is applied?
- Can changes be accepted, rejected, or edited in small chunks?
- Is there a clear undo path for agent actions?
- Does the tool show which files, commands, dependencies, and settings it touched?
- Can developers pause, stop, or constrain the agent at any point?

## 2. Context quality

- Does the tool understand project-specific conventions, architecture, and coding standards?
- Can teams define rules in version-controlled files?
- Does it distinguish between trusted repo context and untrusted external context?
- Does it cite the files, issues, tickets, or docs it used to make a decision?
- Can developers see and correct the context being used?

## 3. Reviewability

- Are AI-generated changes grouped into reviewable units?
- Does each change include an explanation of intent, risk, and test coverage?
- Does the tool avoid producing large mixed-purpose pull requests?
- Can it create a review summary for humans without hiding important details?
- Does it make uncertain or speculative changes obvious?

## 4. Testing and verification

- Does the tool run relevant tests before suggesting a pull request?
- Does it explain which tests were run and which were skipped?
- Can it propose missing tests for changed behavior?
- Does it avoid treating passing tests as proof of product correctness?
- Are test failures surfaced with enough context for a human to act?

## 5. Workflow fit

- Does the tool respect existing editor settings, keybindings, terminal habits, and repository workflows?
- Can developers keep using their preferred IDE, shell, branch strategy, and review process?
- Does it integrate with issue trackers, CI, code review, and deployment systems without forcing a full workflow replacement?
- Does it reduce handoffs, or create new ones?
- Does it support both quick local assistance and longer-running agent tasks?

## 6. Governance and accountability

- Is it clear who approved each AI-generated change?
- Are agent actions logged in a way that can be audited later?
- Can teams define boundaries for what the AI may modify?
- Are secrets, customer data, and proprietary code protected by default?
- Does the tool support organization-level policies without making local development painful?

## 7. Senior engineer load

AI tools can increase pull request volume. Track whether that creates hidden review burden.

Measure:

- Pull requests per developer per week
- Median pull request size
- Review turnaround time
- Number of review comments per pull request
- Rework rate after review
- Escaped defects
- Senior engineer review hours

Warning signs:

- More pull requests but slower merge time
- Larger review queues for senior engineers
- More superficial approvals
- More changes without clear product rationale
- More test-only confidence with weak design review

## 8. Decision rule

A useful AI coding workspace should make the moment after generation easier:

- What changed?
- Why did it change?
- What does it cost?
- What could break?
- Who approved it?
- How safely can it ship?

If a tool increases output but reduces confidence, it is improving typing speed rather than developer experience.