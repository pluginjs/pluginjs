import ScrollSpy from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('ScrollSpy', () => {
  describe('ScrollSpy()', () => {
    test('should have ScrollSpy', () => {
      expect(ScrollSpy).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollSpy.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollSpy.events).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollSpy.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollSpy = new ScrollSpy(element)

      expect(scrollSpy).toBeObject()
      expect(scrollSpy.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollSpy = new ScrollSpy(element)

      expect(scrollSpy.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      const instance = ScrollSpy.of(element)
      expect(instance.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      const instance = ScrollSpy.of(element)
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

      element.addEventListener('scrollSpy:ready', () => {
        called++
      })

      api = ScrollSpy.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollSpy.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('scrollSpy:destroy', () => {
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
      api = ScrollSpy.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('scrollSpy:enable', () => {
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
      api = ScrollSpy.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('scrollSpy:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
