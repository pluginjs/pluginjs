import Fullscreen from '../../src/main'

describe('Fullscreen', () => {
  test('should have Fullscreen', () => {
    expect(Fullscreen).toBeFunction()
  })

  describe('constructor()', () => {
    test('should use documentElement when no args', () => {
      const fs = new Fullscreen()
      expect(fs.element).toEqual(document.documentElement)
    })

    test('should pass first arg as element', () => {
      const element = document.createElement('div')
      const fs = new Fullscreen(element)

      expect(fs.element).toEqual(element)
    })
  })

  describe('enabled()', () => {
    test('should return boolean', () => {
      expect(Fullscreen.enabled()).toBeBoolean()
    })
  })

  describe('isFullscreen()', () => {
    test('should return boolean', () => {
      expect(Fullscreen.isFullscreen()).toBeBoolean()
    })
  })
})
