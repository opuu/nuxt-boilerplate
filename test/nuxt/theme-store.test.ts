import { beforeEach, describe, expect, it } from 'vitest'

describe('useThemeStore', () => {
  beforeEach(() => {
    const theme = useThemeStore()
    theme.setMode('dark')
    theme.resetPrimaryColor()
  })

  it('toggles between modes', () => {
    const theme = useThemeStore()
    theme.toggleMode()
    expect(theme.mode).toBe('light')
    expect(theme.isDark).toBe(false)
  })

  it('falls back to the theme default primary colour', () => {
    const theme = useThemeStore()
    expect(theme.hasCustomPrimary).toBe(false)
    expect(theme.resolvedPrimaryColor).toBe(THEME_PRIMARY_DEFAULTS.dark)
    expect(theme.tokenOverrides).toEqual({})
  })

  it('stores a custom primary colour with a readable text colour', () => {
    const theme = useThemeStore()
    theme.setPrimaryColor('#F5B301')
    expect(theme.primaryColor).toBe('#f5b301')
    expect(theme.tokenOverrides).toEqual({
      '--o-primary': '#f5b301',
      '--o-on-primary': '#0d1116',
    })
  })

  it('ignores invalid colours', () => {
    const theme = useThemeStore()
    theme.setPrimaryColor('url(evil)')
    expect(theme.primaryColor).toBeNull()
  })
})
