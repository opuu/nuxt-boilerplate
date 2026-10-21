# Contributing

Thanks for helping out. This repository is a template, so changes should make sense for
most projects that start from it, not only for one app.

## Setup

```bash
pnpm install
pnpm dev
```

Use the Node version in `.nvmrc` and pnpm 12. The VS Code workspace recommends the
Biome, Stylelint and Vue extensions.

## Making a change

1. Open an issue first for anything larger than a fix, so we can agree on the approach.
2. Follow the conventions in [AGENTS.md](AGENTS.md). They apply to people as much as to
   agents.
3. Run `pnpm check` before pushing. CI runs the same checks plus a production build.
4. Keep the PR focused. Formatting churn in unrelated files makes review harder.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(styles): add o-gradient() helper
fix(theme): keep primary colour when switching modes
docs: explain adding a theme
```

## Changing conventions

If you change a convention, a token, or the folder layout, update `AGENTS.md` and
`docs/styling.md` in the same PR. Agents follow these documents literally, so out-of-date
docs lead straight to inconsistent code.

## Updating agent skills

Skills in `.agents/skills/` come from their upstream repositories through the
[`skills`](https://github.com/vercel-labs/skills) CLI. Don't edit them by hand. Update them
with the CLI so that `skills-lock.json` stays accurate, and record any project-specific
overrides in `AGENTS.md`.
