/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // block, block__element, block--modifier, block__element--modifier (kebab-case parts).
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        resolveNestedSelectors: true,
        message: 'Use BEM class names: block, block__element, block--modifier (kebab-case)',
      },
    ],
    'max-nesting-depth': [3, { ignore: ['blockless-at-rules', 'pseudo-classes'] }],
    'selector-max-id': 0,
    'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
    'declaration-no-important': true,

    // Colours come from tokens: o-color(), o-mix() or var(--o-*).
    'color-named': 'never',
    'declaration-property-value-disallowed-list': {
      '/^(color|background|background-color|border|border-color|outline|box-shadow|fill|stroke)$/':
        ['/#[0-9a-f]{3,8}\\b/i', '/\\brgba?\\(/', '/\\bhsla?\\(/'],
    },

    // Public helpers are o-prefixed; private ones start with an underscore.
    'scss/at-function-pattern': '^(o-[a-z0-9-]+|_[a-z0-9-]+)$',
    'scss/at-mixin-pattern': '^([a-z][a-z0-9-]*|_[a-z0-9-]+)$',
    'scss/dollar-variable-pattern': ['^(o-[a-z0-9-]+|_[a-z0-9-]*)$', { ignore: 'local' }],
    'scss/dollar-variable-empty-line-before': null,
    // The abstract layer is loaded with `@use ... as *` on purpose.
    'scss/at-use-no-unnamespaced': null,
    'scss/load-partial-extension': 'never',

    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted'] },
    ],
  },
}
