import ScrollProgress from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('ScrollProgress', () => {
  describe('ScrollProgress()', () => {
    test('should have ScrollProgress', () => {
      expect(ScrollProgress).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollProgress.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollProgress.events).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollProgress.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollProgress = new ScrollProgress(element)

      expect(scrollProgress).toBeObject()
      expect(scrollProgress.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollProgress = new ScrollProgress(element)

      expect(scrollProgress.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      const instance = ScrollProgress.of(element)
      expect(instance.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      const instance = ScrollProgress.of(element)
      expect(instance.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('scrollProgress:ready', () => {
        called++
      })

      api = ScrollProgress.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollProgress.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('scrollProgress:destroy', () => {
        called++
      })

      api.destroy()
      expect(api.is('initialized')).toBeFalse()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollProgress.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('scrollProgress:enable', () => {
        called++
      })

      api.enable()
      expect(api.is('disabled')).toBeFalse()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollProgress.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('scrollProgress:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
