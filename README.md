# nuxt-boilerplate

A Nuxt 4 starter for teams that write a lot of their frontend with coding agents and still
want the codebase to look like one person wrote it.

It brings together a runtime theming system, strict conventions, and tooling that enforces
those conventions:

- **Nuxt 4** with the `app/` directory, **Vue 3.5**, **Pinia** and strict **TypeScript**.
- **SCSS design tokens** compiled into `--o-*` custom properties. Opacity and shades are
  derived in the browser with `color-mix()`, so changing one token restyles every
  dependent colour without a rebuild.
- **BEM** with `e()`, `m()` and `when()` mixins. Stylelint rejects off-pattern class names
  and hard-coded colours.
- **Server-rendered theming:** light/dark mode and a custom primary colour, stored in
  cookies, with no flash on reload.
- **Biome** for TypeScript, Vue and JSON. **Stylelint** for SCSS. **Vitest** with
  `@nuxt/test-utils`.
- **Agent setup:** [`AGENTS.md`](AGENTS.md) with the project rules, Vue/Nuxt/UI skills in
  `.agents/skills/`, and a single `pnpm check` command that agents run before reporting
  that they're done.

## Getting started

Requires Node `^22.22.3`, `^24.15.0` or `>=26` and pnpm 12.

```bash
pnpm dlx giget@latest gh:opuu/nuxt-boilerplate my-app
cd my-app
pnpm install
pnpm dev
```

You can also click **Use this template** on GitHub.

## Scripts

| Command          | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Dev server on http://localhost:3000              |
| `pnpm build`     | Production build into `.output/`                 |
| `pnpm preview`   | Serve the production build                       |
| `pnpm check`     | Lint, typecheck and test. Run it before pushing. |
| `pnpm lint`      | Biome and Stylelint                              |
| `pnpm lint:fix`  | Same, with autofix                               |
| `pnpm format`    | Biome formatter                                  |
| `pnpm typecheck` | `vue-tsc` through `nuxt typecheck`               |
| `pnpm test`      | Vitest, unit and Nuxt environments               |

## Project structure

```text
app/
  assets/scss/   tokens, helpers, BEM mixins, base styles
  components/    AppCard, ThemeModeSwitch, ThemePrimaryPicker, TokenAlphaScale
  layouts/       default layout with header and theme toggle
  pages/         index.vue, the theme playground
  plugins/       theme.ts applies the theme store to <html>
  stores/        useThemeStore.ts
  utils/         theme.ts: types, validation, contrast calculation
  error.vue
docs/            styling.md
test/            unit/ and nuxt/ Vitest projects
AGENTS.md        rules for coding agents (CLAUDE.md imports it)
```

## Styling in short

```scss
.app-card {
  background-color: o-color(surface);
  border: 1px solid o-color(border);
  box-shadow: o-shadow(sm);

  @include e(eyebrow) {
    color: o-color(primary, 0.8); // color-mix(in srgb, var(--o-primary) 80%, transparent)
  }

  @include m(primary) {
    background: linear-gradient(145deg, o-color(primary), o-mix(primary, on-primary, 18%));
  }
}
```

The full reference is in [docs/styling.md](docs/styling.md): tokens, scales, mixins, adding
a colour or a theme, and what the linter enforces.

## State

Stores are Pinia setup stores in `app/stores/`, auto-imported. `useThemeStore` keeps its
state in cookies, so the server knows the visitor's theme before rendering, and it
validates cookie values before they reach the page. Components change state only through
actions.

## Working with coding agents

[`AGENTS.md`](AGENTS.md) is the single source of project rules. It is read by Codex, Cursor,
Copilot and other tools that follow the AGENTS.md convention. [`CLAUDE.md`](CLAUDE.md)
imports it for Claude Code. It covers component structure, BEM and token usage, store
patterns, SSR rules, accessibility, tests, and which skill to use for which task.

The tooling enforces what the rules describe:

| Rule                                    | Enforced by                     |
| --------------------------------------- | ------------------------------- |
| BEM class names, no raw colours         | Stylelint                       |
| No Options API, no `any`, typed imports | Biome                           |
| Strict types across `.vue` files        | `vue-tsc`                       |
| Behaviour of stores and utils           | Vitest                          |
| All of the above on every PR            | GitHub Actions (`ci.yml`)       |

Skills are installed with the [`skills`](https://github.com/vercel-labs/skills) CLI and
pinned in `skills-lock.json`. `.claude/skills/` contains symlinks into `.agents/skills/`.
`.claude/settings.json` pre-approves the check commands so Claude Code can run them
without asking.

## Starting your own project

1. Change `name`, `description`, `author` and the repository URLs in `package.json`, and
   `siteName` in `nuxt.config.ts`.
2. Replace `app/pages/index.vue` and delete `TokenAlphaScale.vue` if you don't need it.
   `AppCard`, `ThemeModeSwitch` and `ThemePrimaryPicker` are meant to be kept or adapted.
3. Set your palette in `app/assets/scss/abstract/_tokens.scss` and the matching
   `THEME_PRIMARY_DEFAULTS` in `app/utils/theme.ts`.
4. Read through `AGENTS.md` and adjust anything your team does differently.

## Version notes

- TypeScript is on 6.x because `vue-tsc` doesn't support TypeScript 7 yet. Dependabot is
  set to skip that major version.
- pnpm's default `minimumReleaseAge` holds back packages published in the last day, so a
  fresh release may need a day before `pnpm update` picks it up.

## License

[MIT](LICENSE)
