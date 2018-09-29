import normalize from '../src/normalize'

describe('normalize()', () => {
  it('should remove diacritics', () => {
    expect(normalize('àáâãäå')).toBe('aaaaaa')
    expect(normalize('àƀćđĕƒ')).toBe('abcdef')
    expect(normalize('àbćdĕf')).toBe('abcdef')
    expect(normalize('âéħ ǩɱ')).toBe('aeh km')
  })

  it('should not remove diacritics if string is normalized', () => {
    expect(normalize('aaaaaaa')).toBe('aaaaaaa')
    expect(normalize('aaa aaa')).toBe('aaa aaa')
    expect(normalize('123456')).toBe('123456')
    expect(normalize('abcdef')).toBe('abcdef')
    expect(normalize('')).toBe('')
  })

  it('should case sensitivity', () => {
    expect(normalize('àƀç ÀƁÇ')).toBe('abc ABC')
  })
})
