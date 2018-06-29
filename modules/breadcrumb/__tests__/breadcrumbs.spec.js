import Breadcrumb from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import sample from './fixtures/sample'

describe('Breadcrumb', () => {
  describe('Breadcrumb()', () => {
    test('should have Breadcrumb', () => {
      expect(Breadcrumb).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Breadcrumb.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Breadcrumb.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Breadcrumb.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Breadcrumb.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = sample()
      const breadcrumb = new Breadcrumb(element)

      expect(breadcrumb).toBeObject()
      expect(breadcrumb.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = sample()
      const breadcrumb = new Breadcrumb(element)

      expect(breadcrumb.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const instance = Breadcrumb.of(sample())
      expect(instance.bind).toBeNil()
    })

    test('should call destroy', () => {
      const instance = Breadcrumb.of(sample())
      expect(instance.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element

    beforeEach(() => {
      element = sample()
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('breadcrumb:ready', () => {
        called++
      })

      const api = Breadcrumb.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = sample()
      api = Breadcrumb.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('breadcrumb:destroy', () => {
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
      element = sample()
      api = Breadcrumb.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('breadcrumb:enable', () => {
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
      element = sample()
      api = Breadcrumb.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('breadcrumb:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
