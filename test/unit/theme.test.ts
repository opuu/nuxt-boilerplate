import { describe, expect, it } from 'vitest'
import { isHexColor, isThemeMode, readableTextOn } from '../../app/utils/theme'

describe('isThemeMode', () => {
  it('accepts known modes only', () => {
    expect(isThemeMode('dark')).toBe(true)
    expect(isThemeMode('light')).toBe(true)
    expect(isThemeMode('sepia')).toBe(false)
    expect(isThemeMode(undefined)).toBe(false)
  })
})

describe('isHexColor', () => {
  it('accepts six-digit hex in either case', () => {
    expect(isHexColor('#2563eb')).toBe(true)
    expect(isHexColor('#2563EB')).toBe(true)
  })

  it('rejects anything that could inject CSS', () => {
    expect(isHexColor('#fff')).toBe(false)
    expect(isHexColor('red')).toBe(false)
    expect(isHexColor('#2563eb; color: red')).toBe(false)
    expect(isHexColor(null)).toBe(false)
  })
})

describe('readableTextOn', () => {
  it('uses dark text on light backgrounds', () => {
    expect(readableTextOn('#ffffff')).toBe('#0d1116')
    expect(readableTextOn('#f5b301')).toBe('#0d1116')
  })

  it('uses white text on dark backgrounds', () => {
    expect(readableTextOn('#000000')).toBe('#ffffff')
    expect(readableTextOn('#7c3aed')).toBe('#ffffff')
  })
})
