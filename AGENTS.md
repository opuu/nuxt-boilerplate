# AGENTS.md

Instructions for coding agents working in this repository. People should start with
[README.md](README.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

The point of this file is consistency: code written by an agent should look the same as code
written by anyone else here. If a rule below conflicts with general advice from a skill or
from your training, follow this file.

## Commands

```bash
pnpm dev          # dev server on http://localhost:3000
pnpm check        # lint + typecheck + tests, the gate for every change
pnpm lint:fix     # Biome (TS/Vue/JSON) and Stylelint (SCSS) autofix
pnpm test         # Vitest, unit and Nuxt projects
pnpm build        # production build
```

## Definition of done

1. `pnpm check` passes. Don't report a task as finished without running it.
2. New logic in `app/utils/` or `app/stores/` has tests in `test/`.
3. The UI change was looked at in a browser in both themes, or you say that you couldn't.
4. If you changed a convention, a token, or the folder layout, the docs say so.

Fix lint errors instead of suppressing them. If a suppression is genuinely needed, use
`// biome-ignore <rule>: <reason>` or `/* stylelint-disable-next-line <rule> -- <reason> */`
with a real reason.

## Layout

```text
app/
  assets/scss/
    abstract/    tokens, functions, mixins: injected into every SFC, must not output CSS
    base/        :root custom properties, reset, element typography
    components/  global BEM blocks (o-button)
  components/    auto-imported Vue components
  layouts/       default.vue: header and page container
  pages/         file-based routes
  plugins/       theme.ts: applies the theme store to <html>
  stores/        Pinia setup stores (useXStore.ts)
  utils/         pure, auto-imported functions and constants
test/
  unit/          plain Vitest in Node, for utils
  nuxt/          Vitest in the Nuxt environment, for stores and components
docs/            longer explanations (styling.md)
```

Nuxt auto-imports Vue APIs, Nuxt composables, `components/`, `stores/` and `utils/`. Don't add
manual imports for those in app code. Tests under `test/unit/` do import explicitly.

## Vue components

- `<script setup lang="ts">`, then `<template>`, then `<style lang="scss" scoped>`.
- Composition API only. Biome rejects the Options API.
- Props: type-only `defineProps<{...}>()` with destructured defaults
  (`const { variant = 'default' } = defineProps<...>()`). Emits: typed `defineEmits<{...}>()`.
- Keep templates declarative. Move branching and string building into `computed`.
- Prefer `computed` to `watch`. Use a watcher only for side effects.
- One component per responsibility. Don't extract components just to make files shorter.
- Component file names are PascalCase and multi-word (`ThemeModeSwitch.vue`).

## Styling

Read [docs/styling.md](docs/styling.md) before writing SCSS. The rules that matter most:

- Each component owns one BEM block named after the component in kebab-case:
  `ThemeModeSwitch.vue` → `.theme-mode-switch`. Write elements and modifiers with
  `@include e(name)` and `@include m(name)`, never `&__name` by hand.
- To style an element from a block modifier, use `@include when(block, modifier)`.
- Colours only through `o-color(token)`, `o-color(token, 0.4)`, `o-mix()`, `o-tint()`,
  `o-shade()`. Stylelint rejects hex, `rgb()`, `hsl()` and named colours.
- Spacing, radius, type, z-index and durations through `o-space()`, `o-radius()`,
  `o-font-size()`, `o-font-weight()`, `o-line-height()`, `o-z()`, `o-duration()`.
- Breakpoints with `@include bp-up(md)`. Transitions inside `@include motion-safe`.
- No IDs, no `!important`, nesting depth at most 3.
- A new colour token goes into every theme in `$o-themes` and into `COLOR_TOKENS` in
  `app/utils/theme.ts`.
- Global styles only in `app/assets/scss/base/` and `components/` (global blocks are
  prefixed `o-`). Everything else is scoped to its component.

## State (Pinia)

Stores are setup stores in `app/stores/useXStore.ts`. See `useThemeStore.ts`.

- Order inside the setup function: state (`ref`, `useCookie`), getters (`computed`),
  actions (functions), then one `return` with all three.
- Return every piece of state. Pinia only serializes returned state for SSR and devtools.
- Components change state through actions, not by assigning to store properties.
- Use `useCookie()` for preferences that must survive a reload and be known on the server.
- Destructure a store with `storeToRefs()`; plain destructuring loses reactivity.
- Validate anything user-controlled (cookies, query strings, storage) before it reaches the
  DOM or a request. The theme store validates cookies in `decode` with `isThemeMode` and
  `isHexColor`.

## SSR and hydration

- Every page is server-rendered. Don't touch `window`, `document` or `localStorage` during
  setup. Use `onMounted`, `import.meta.client`, or a Nuxt composable.
- Server and client must render the same markup. Anything that depends on the visitor
  (theme, locale) comes from a cookie or request header, not from browser-only APIs.
- Use `useHead` and `useSeoMeta` for head tags, and `useId()` for ids.

## Accessibility

- Use semantic elements first (`button`, `fieldset`/`legend`, `nav`, lists). Add ARIA only
  where no element fits.
- Every control has an accessible name. Icon-only buttons get `aria-label`.
- Keep the global `:focus-visible` ring. Don't remove outlines.
- Toggle buttons use `aria-pressed`, and active state is never shown by colour alone.

## TypeScript

Strict mode plus `noImplicitReturns`, `noImplicitOverride` and `noFallthroughCasesInSwitch`.
No `any` and no non-null assertions (`!`). Use `import type` for types. Narrow with type
guards, as in `app/utils/theme.ts`.

TypeScript stays on 6.x until vue-tsc supports 7.

## Tests

- Pure functions: `test/unit/*.test.ts`, Node environment, explicit imports.
- Stores and components: `test/nuxt/*.test.ts`, `environment: 'nuxt'`, with auto-imports
  available. Mount with `mountSuspended` from `@nuxt/test-utils/runtime`.
- Test behaviour through the public API (getters, actions, rendered output), not internals.

## Comments and naming

- Comment the why, never the what. Don't restate code, narrate changes ("now uses X"), or
  leave TODOs without an owner.
- No banner or divider comments.
- Names are full words: `primaryColor`, not `pc` or `clr`.

## Dependencies

Don't add a dependency for something a few lines of code or a platform API can do. If you
add one, say why in the PR. Use `pnpm`, never npm or yarn.

## Skills

Agent skills live in `.agents/skills/` (installed with the [`skills`](https://github.com/vercel-labs/skills)
CLI, pinned in `skills-lock.json`; `.claude/skills/` links to them). Use them for depth;
this file wins when they disagree.

| Task                              | Skill                                                    |
| --------------------------------- | -------------------------------------------------------- |
| Any Vue component or composable   | `vue-best-practices`                                     |
| Pinia stores                      | `vue-pinia-best-practices`                               |
| Routing, guards                   | `vue-router-best-practices`                              |
| Tests                             | `vue-testing-best-practices`                             |
| Runtime errors, hydration issues  | `vue-debug-guides`                                       |
| Reusable composables              | `create-adaptable-composable`                            |
| New UI or visual polish           | `frontend-design`, `ui-taste`, `ui-ux-pro-max`           |
| UI review, accessibility audit    | `web-design-guidelines`                                  |
| SCSS                              | `scss-best-practices` (folder layout here differs)       |

Known conflicts:

- `scss-best-practices` suggests the 7-1 folder pattern. This repo uses `abstract/`,
  `base/` and `components/`, plus scoped styles in components.
- `vue-options-api-best-practices` and `vue-jsx-best-practices` don't apply here.
