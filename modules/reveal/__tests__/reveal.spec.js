import Reveal from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import 'intersection-observer'

describe('Reveal', () => {
  describe('Reveal()', () => {
    test('should have Reveal', () => {
      expect(Reveal).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Reveal.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Reveal.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Reveal.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const reveal = Reveal.of(element)

      expect(reveal).toBeObject()
      expect(reveal.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const reveal = Reveal.of(element)

      expect(reveal.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      const api = Reveal.of(element)
      expect(api.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      const api = Reveal.of(element)
      expect(api.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element

    beforeEach(() => {
      element = document.createElement('div')
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('reveal:ready', () => {
        called++
      })

      const api = Reveal.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = Reveal.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('reveal:destroy', () => {
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
      api = Reveal.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('reveal:enable', () => {
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
      api = Reveal.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('reveal:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
