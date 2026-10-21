const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
  path: '/',
} as const

// Cookies can be edited by the user, so anything that fails validation falls back.
function validatedCookie<T>(isValid: (value: unknown) => value is T, fallback: T) {
  return (raw: string): T => {
    try {
      const value = decodeURIComponent(raw)
      return isValid(value) ? value : fallback
    } catch {
      return fallback
    }
  }
}

export const useThemeStore = defineStore('theme', () => {
  // Cookie-backed so the server renders the visitor's theme on the first response.
  const mode = useCookie<ThemeMode>('theme-mode', {
    ...COOKIE_OPTIONS,
    default: () => DEFAULT_THEME_MODE,
    decode: validatedCookie(isThemeMode, DEFAULT_THEME_MODE),
  })

  /** The custom primary colour, or `null` while the theme default applies. */
  const primaryColor = useCookie<HexColor | null>('theme-primary', {
    ...COOKIE_OPTIONS,
    default: () => null,
    decode: validatedCookie(isHexColor, null),
  })

  const isDark = computed(() => mode.value === 'dark')
  const hasCustomPrimary = computed(() => primaryColor.value !== null)
  const resolvedPrimaryColor = computed<HexColor>(
    () => primaryColor.value ?? THEME_PRIMARY_DEFAULTS[mode.value],
  )

  /** Inline `--o-*` overrides applied to <html> on top of the active theme. */
  const tokenOverrides = computed<Partial<Record<`--o-${ColorToken}`, HexColor>>>(() => {
    if (!primaryColor.value) return {}
    return {
      '--o-primary': primaryColor.value,
      '--o-on-primary': readableTextOn(primaryColor.value),
    }
  })

  function setMode(newMode: ThemeMode) {
    mode.value = newMode
  }

  function toggleMode() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  function setPrimaryColor(color: string) {
    if (!isHexColor(color)) {
      if (import.meta.dev) {
        console.warn(`[theme] Ignoring invalid primary colour "${color}". Expected #rrggbb.`)
      }
      return
    }
    primaryColor.value = color.toLowerCase() as HexColor
  }

  function resetPrimaryColor() {
    primaryColor.value = null
  }

  return {
    mode,
    primaryColor,
    isDark,
    hasCustomPrimary,
    resolvedPrimaryColor,
    tokenOverrides,
    setMode,
    toggleMode,
    setPrimaryColor,
    resetPrimaryColor,
  }
})
