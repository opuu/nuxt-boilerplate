# Styling

The styling layer has three parts:

- **Tokens:** SCSS maps compiled into `--o-*` custom properties.
- **Helper functions** that read the tokens.
- **BEM mixins** that keep class names consistent.

Every `<style lang="scss">` block gets the helpers automatically through
`vite.css.preprocessorOptions.scss.additionalData` in `nuxt.config.ts`.

```text
app/assets/scss/
  abstract/          no CSS output, injected everywhere
    _variables.scss  breakpoints, z-index, durations, easing
    _tokens.scss     colour themes and design scales
    _functions.scss  o-color(), o-mix(), o-space(), ...
    _mixins.scss     e(), m(), when(), bp-up(), motion-safe, ...
  base/
    _root.scss       emits --o-* custom properties per theme
    _reset.scss
    _typography.scss
  components/
    _button.scss     global .o-button block
  main.scss          entry, registered in nuxt.config.ts
```

## Colour tokens

Colours are defined once per theme in `$o-themes`:

```scss
$o-themes: (
  dark: (bg: rgb(13 17 22), primary: rgb(148 178 212), ...),
  light: (bg: rgb(246 247 249), primary: rgb(23 34 45), ...),
);
```

`base/_root.scss` turns them into custom properties:

```css
:root, [data-theme='dark'] { color-scheme: dark; --o-bg: rgb(13 17 22); --o-primary: rgb(148 178 212); }
[data-theme='light']       { color-scheme: light; --o-bg: rgb(246 247 249); --o-primary: rgb(23 34 45); }
```

The theme plugin sets `data-theme` on `<html>`. If the visitor picked a custom primary colour,
it also adds `--o-primary` and `--o-on-primary` as inline styles there. Both are rendered on
the server from cookies, so the page never flashes the wrong theme.

### Using colours

Never write a colour value in a component. Use the helpers, which compile to `var()` and
`color-mix()`, so the browser resolves them at runtime and they follow theme changes:

| SCSS                              | CSS output                                                         |
| --------------------------------- | ------------------------------------------------------------------ |
| `o-color(primary)`                | `var(--o-primary)`                                                 |
| `o-color(primary, 0.8)`           | `color-mix(in srgb, var(--o-primary) 80%, transparent)`            |
| `o-color(primary, 80%)`           | same as above                                                      |
| `o-mix(primary, on-primary, 14%)` | `color-mix(in oklab, var(--o-primary), var(--o-on-primary) 14%)`   |
| `o-tint(danger, 0.2)`             | `color-mix(in oklab, var(--o-danger), white 20%)`                  |
| `o-shade(danger, 0.2)`            | `color-mix(in oklab, var(--o-danger), black 20%)`                  |
| `o-shadow(md)`                    | layered `box-shadow` tinted with `--o-shadow`                      |

A misspelt token name fails the build with the list of valid names.

For hover states, mixing towards the opposite token works in both themes:
`o-mix(primary, on-primary, 14%)` lightens a dark primary and darkens a light one.

### Adding a colour token

1. Add the key to **every** theme in `$o-themes`, in the same position. The build fails
   if the themes disagree.
2. Add the key to `COLOR_TOKENS` in `app/utils/theme.ts` so TypeScript knows about it.

### Adding a theme

Add another map to `$o-themes` and its name to `THEME_MODES` in `app/utils/theme.ts`, then
add a default to `THEME_PRIMARY_DEFAULTS`. `_root.scss` emits the new
`[data-theme='name']` block by itself.

## Scales

Everything else is fixed at compile time and read through a function:

| Function            | Keys                                            |
| ------------------- | ----------------------------------------------- |
| `o-space(n)`        | 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16 (n × 0.25rem) |
| `o-radius(k)`       | sm, md, lg, pill                                |
| `o-font(k)`         | sans, mono                                      |
| `o-font-size(k)`    | xs, sm, md, lg, xl, xxl, display                |
| `o-font-weight(k)`  | regular, medium, semibold, bold                 |
| `o-line-height(k)`  | tight, snug, base                               |
| `o-duration(k)`     | fast, base, slow                                |
| `o-z(k)`            | base, raised, sticky, overlay                   |

Sass map keys can't start with a digit (`2xl` parses as the number 2 with unit `xl`), which
is why the larger font sizes are named `xxl` and `display`.

## BEM

One block per component, named after the component in kebab-case. Elements and modifiers
are written with mixins, so a selector is never assembled by hand:

```scss
.app-card {
  padding: o-space(6);

  @include e(title) { ... }               // .app-card__title
  @include m(primary) { ... }             // .app-card--primary

  @include e(body) {
    color: o-color(text-muted);

    @include when(app-card, primary) {    // .app-card--primary .app-card__body
      color: o-color(on-primary, 0.85);
    }
  }
}
```

`when()` keeps all of an element's styles in one place, including the ones that depend on
a block modifier. The block name is passed explicitly because Sass can't reliably get it
from `&` once the selector is nested.

In templates, the modifier class goes next to the base class:

```vue
<article class="app-card" :class="`app-card--${variant}`">
```

### Global blocks

Styles shared across many components and elements (buttons on `<button>`, `<a>` and
`<NuxtLink>`) live in `app/assets/scss/components/` as global blocks prefixed `o-`:

```html
<button class="o-button o-button--primary o-button--sm">Save</button>
```

## Other mixins

| Mixin                       | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| `bp-up(md)`                 | `@media (min-width: 768px)`                                 |
| `motion-safe`               | wraps transitions in `prefers-reduced-motion: no-preference` |
| `focus-ring($token)`        | the outline used by the global `:focus-visible` style       |
| `visually-hidden`           | hides content visually but keeps it for screen readers      |
| `theme(light)`              | `[data-theme='light'] &`, a last resort                     |

## What Stylelint enforces

- BEM class names (`selector-class-pattern`, checked after nesting is resolved).
- No hex, `rgb()`, `hsl()` or named colours in colour properties.
- No IDs, no `!important`, nesting depth at most 3.
- Property order (recess order). `pnpm lint:fix` sorts it for you.
- Public SCSS functions and variables use the `o-` prefix; private ones start with `_`.

## Renaming the prefix

The `o-` prefix appears in custom property names, function names, variable names, the
Stylelint patterns and the store's `tokenOverrides`. To use a different one, search and
replace `o-` in `app/assets/scss/`, `app/stores/useThemeStore.ts`, `app/utils/theme.ts` and
`stylelint.config.mjs`, then run `pnpm check`.
