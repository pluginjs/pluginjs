import Infinite from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import '@pluginjs/scroll-end'

describe('Infinite', () => {
  describe('Infinite()', () => {
    test('should have Infinite', () => {
      expect(Infinite).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Infinite.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Infinite.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Infinite.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = Infinite.of(element)
    })

    test('should work with element', () => {
      expect(api).toBeObject()
      expect(api.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = Infinite.of(element)
    })

    test('should not call bind', () => {
      expect(api.bind()).toBeNil()
    })

    test('should call destroy', () => {
      expect(api.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    test('should trigger ready event', () => {
      let called = 0
      const element = document.createElement('div')

      element.addEventListener('infinite:ready', () => {
        called++
      })

      const api = Infinite.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    test('should trigger destroy event', () => {
      let called = 0
      const element = document.createElement('div')
      const api = Infinite.of(element)

      element.addEventListener('infinite:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()
      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = Infinite.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('infinite:enable', () => {
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
      api = Infinite.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('infinite:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
