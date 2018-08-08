import Parallax from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'

describe('Parallax', () => {
  describe('Parallax()', () => {
    test('should have Parallax', () => {
      expect(Parallax).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Parallax.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Parallax.events).toBeObject()
    })
    test('should have methods', () => {
      expect(Parallax.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const parallax = new Parallax(element)

      expect(parallax).toBeObject()
      expect(parallax.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const parallax = new Parallax(element)

      expect(parallax.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      const api = new Parallax(element)

      expect(api.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      const api = new Parallax(element)

      expect(api.destroy()).toBeNil()
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

      element.addEventListener('parallax:ready', () => {
        called++
      })

      api = Parallax.of(element)

      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = Parallax.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('parallax:destroy', () => {
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
      api = Parallax.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('parallax:enable', () => {
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
      api = Parallax.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('parallax:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
