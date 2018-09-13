import Arrows from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Arrows', () => {
  describe('Arrows()', () => {
    test('should have Arrows', () => {
      expect(Arrows).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Arrows.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Arrows.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Arrows.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Arrows.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const arrows = Arrows.of(generateHTMLSample())

      expect(arrows).toBeObject()
      expect(arrows.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const arrows = Arrows.of(generateHTMLSample())

      expect(arrows.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const arrows = Arrows.of(generateHTMLSample())
      expect(arrows.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('arrows:ready', () => {
        called++
      })
      const instance = Arrows.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Arrows.of($element)
    })

    test('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()

      expect(api.is('initialized')).toBeFalse()
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('arrows:destroy', () => {
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
      api = Arrows.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('arrows:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })

    test('should trigger prev enable event', () => {
      let called = 0

      $element.addEventListener('arrows:prevEnable', () => {
        called++
      })

      api.disable('prev')
      api.enable('prev')
      expect(called).toEqual(1)
    })

    test('should trigger next enable event', () => {
      let called = 0

      $element.addEventListener('arrows:nextEnable', () => {
        called++
      })

      api.disable('next')
      api.enable('next')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Arrows.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('arrows:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })

    test('should trigger prev disable event', () => {
      let called = 0

      $element.addEventListener('arrows:prevDisable', () => {
        expect(api.is('prevDisabled')).toBeTrue()
        called++
      })

      api.disable('prev')
      expect(called).toEqual(1)
    })

    test('should trigger next disable event', () => {
      let called = 0

      $element.addEventListener('arrows:nextDisable', () => {
        expect(api.is('nextDisabled')).toBeTrue()
        called++
      })

      api.disable('next')
      expect(called).toEqual(1)
    })
  })
})
