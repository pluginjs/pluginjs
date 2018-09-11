import Popover from '../src/main'
import generateHTMLSample from './fixtures/sample'

describe('Popover', () => {
  describe('Popover()', () => {
    test('should have Popover', () => {
      expect(Popover).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Popover.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Popover.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Popover.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Popover.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const popover = Popover.of(generateHTMLSample())

      expect(popover).toBeObject()
      expect(popover.options).toBeObject()
    })

    test('should have options', () => {
      const popover = Popover.of(generateHTMLSample())

      expect(popover.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const popover = Popover.of(generateHTMLSample())
      expect(popover.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('popover:ready', () => {
        called++
      })
      const instance = Popover.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Popover.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('popover:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Popover.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('popover:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Popover.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('popover:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
