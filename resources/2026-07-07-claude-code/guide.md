# Scaling Claude Code by Task Time-Horizon

The core idea from the post: Claude Code's value scales with the *length and scope* of the task you hand it. Treating it like autocomplete leaves most of that value on the table. This guide turns that mental model into a practical workflow.

## The Time-Horizon Ladder

| Horizon | What to expect | How to prompt |
|---------|----------------|---------------|
| ~30 min | A snippet, a function, a bug fix | Direct, single-file ask |
| ~2-5 hrs | Module refactor, feature slice | Give context + acceptance criteria |
| Multi-day | Audit, migration, subsystem rewrite | Provide a plan, checkpoints, and guardrails |

The longer the horizon, the more your job shifts from *typing* to *specifying and reviewing*.

## Working With the Whole Repo

Claude Code reasons across the entire repository rather than one line. To exploit this:

1. **Point it at structure, not lines.** Ask "how does auth flow from the API layer to the DB?" before asking for edits.
2. **Let it read before it writes.** For big tasks, request an exploration/plan pass first, then approve it.
3. **Keep a `CLAUDE.md`** in your repo root describing conventions, commands, and gotchas so it starts with context.

Example `CLAUDE.md` skeleton:

```md
# Project Notes for Claude

## Commands
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Conventions
- TypeScript strict mode; no `any`.
- Prefer pure functions in `src/lib`.
- All new modules need a matching test file.

## Gotchas
- The `legacy/` folder is frozen; do not refactor it.
```

## Managing the Real Bottleneck: Reliability & Trust

The post is honest that capability is ahead of consistency. Mitigate that:

- **Checkpoint long tasks.** Break a multi-day audit into named phases and review after each.
- **Use version control aggressively.** Commit before large agent runs so you can roll back cleanly.
- **Ask for a diff summary** before accepting sweeping changes.
- **Watch quota/cache limits** on long sessions; save intermediate plans to a file so context survives a restart.

## A Repeatable Loop for Bigger Tasks

1. **Frame** the task with scope and acceptance criteria.
2. **Plan** — have Claude produce a step list; you edit it.
3. **Execute** one phase at a time.
4. **Verify** with tests/lint after each phase.
5. **Review** the diff and commit.
6. **Repeat** for the next phase.

## Takeaway

Stop asking the agent to type faster. Hand it bigger, longer, well-specified tasks and invest your effort in framing and review. That is where the leverage lives.