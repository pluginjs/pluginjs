import Grids from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Grids', () => {
  describe('Grids()', () => {
    test('should have Grids', () => {
      expect(Grids).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Grids.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Grids.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Grids.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Grids.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const grids = Grids.of(generateHTMLSample())

      expect(grids).toBeObject()
      expect(grids.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const grids = Grids.of(generateHTMLSample())

      expect(grids.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const grids = Grids.of(generateHTMLSample())
      expect(grids.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const grids = Grids.of(generateHTMLSample())
      grids.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('grids:ready', () => {
        called++
      })

      const instance = Grids.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Grids.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('grids:destroy', () => {
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
      api = Grids.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('grids:enable', () => {
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
      api = Grids.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('grids:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
