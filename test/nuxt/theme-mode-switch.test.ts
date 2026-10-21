import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ThemeModeSwitch from '~/components/ThemeModeSwitch.vue'

describe('ThemeModeSwitch', () => {
  it('marks the active mode and switches on click', async () => {
    const theme = useThemeStore()
    theme.setMode('dark')

    const wrapper = await mountSuspended(ThemeModeSwitch)
    const [light, dark] = wrapper.findAll('button')

    expect(dark?.attributes('aria-pressed')).toBe('true')
    expect(light?.attributes('aria-pressed')).toBe('false')

    await light?.trigger('click')

    expect(theme.mode).toBe('light')
    expect(light?.attributes('aria-pressed')).toBe('true')
  })
})
