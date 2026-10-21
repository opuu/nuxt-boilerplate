export const THEME_MODES = ['dark', 'light'] as const
export type ThemeMode = (typeof THEME_MODES)[number]

export const DEFAULT_THEME_MODE: ThemeMode = 'dark'

export type HexColor = `#${string}`

// Must match the keys of $o-themes in app/assets/scss/abstract/_tokens.scss.
export const COLOR_TOKENS = [
  'bg',
  'surface',
  'surface-sunken',
  'border',
  'text',
  'text-muted',
  'primary',
  'on-primary',
  'success',
  'warning',
  'danger',
  'shadow',
] as const
export type ColorToken = (typeof COLOR_TOKENS)[number]

// Same values as `primary` in $o-themes. Only used to seed the colour picker;
// the rendered default always comes from CSS.
export const THEME_PRIMARY_DEFAULTS: Readonly<Record<ThemeMode, HexColor>> = {
  dark: '#94b2d4',
  light: '#17222d',
}

export interface ColorPreset {
  name: string
  value: HexColor
}

export const PRIMARY_PRESETS: readonly ColorPreset[] = [
  { name: 'Slate', value: '#17222d' },
  { name: 'Ocean', value: '#2563eb' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#f5b301' },
]

const HEX_COLOR_RE = /^#[\da-f]{6}$/i

export function isThemeMode(value: unknown): value is ThemeMode {
  return THEME_MODES.includes(value as ThemeMode)
}

export function isHexColor(value: unknown): value is HexColor {
  return typeof value === 'string' && HEX_COLOR_RE.test(value)
}

const TEXT_ON_LIGHT: HexColor = '#0d1116'
const TEXT_ON_DARK: HexColor = '#ffffff'

// WCAG 2.x relative luminance.
function relativeLuminance(hex: HexColor): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((offset) => {
    const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Returns near-black or white, whichever contrasts more with `background`. */
export function readableTextOn(background: HexColor): HexColor {
  const luminance = relativeLuminance(background)
  const contrastWithDarkText = (luminance + 0.05) / (relativeLuminance(TEXT_ON_LIGHT) + 0.05)
  const contrastWithWhiteText = 1.05 / (luminance + 0.05)
  return contrastWithDarkText >= contrastWithWhiteText ? TEXT_ON_LIGHT : TEXT_ON_DARK
}
