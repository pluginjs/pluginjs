import ScrollTo from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('ScrollTo', () => {
  describe('ScrollTo()', () => {
    test('should have ScrollTo', () => {
      expect(ScrollTo).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollTo.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollTo.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ScrollTo.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollTo.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollTo = new ScrollTo(element)

      expect(scrollTo).toBeObject()
      expect(scrollTo.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollTo = new ScrollTo(element)

      expect(scrollTo.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      const instance = ScrollTo.of(element)
      expect(instance.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      const instance = ScrollTo.of(element)
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

      element.addEventListener('scrollTo:ready', () => {
        called++
      })

      api = ScrollTo.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollTo.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('scrollTo:destroy', () => {
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
      api = ScrollTo.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('scrollTo:enable', () => {
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
      api = ScrollTo.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('scrollTo:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
