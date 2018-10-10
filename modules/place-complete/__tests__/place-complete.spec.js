import PlaceComplete from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('PlaceComplete', () => {
  describe('PlaceComplete()', () => {
    test('should have PlaceComplete', () => {
      expect(PlaceComplete).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PlaceComplete.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(PlaceComplete.events).toBeObject()
    })

    test('should have classes', () => {
      expect(PlaceComplete.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(PlaceComplete.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const placeComplete = PlaceComplete.of(generateHTMLSample())

      expect(placeComplete).toBeObject()
      expect(placeComplete.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const placeComplete = PlaceComplete.of(generateHTMLSample())

      expect(placeComplete.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = PlaceComplete.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('placeComplete:ready', () => {
        called++
      })
      const instance = PlaceComplete.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PlaceComplete.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('placeComplete:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })
  describe('change', () => {
    let $element
    let api

    test('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample()
      api = PlaceComplete.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    test('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = PlaceComplete.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('a')
        }
      })

      api.val('a')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = PlaceComplete.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('a')
        }
      })

      api.set('a')

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value without value', () => {
      $element = generateHTMLSample()
      api = PlaceComplete.of($element)

      expect(api.get()).toBeString()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PlaceComplete.of($element)
    })

    test('should set the value', () => {
      api.set('a')
      expect(api.get()).toEqual('a')
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PlaceComplete.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val('a')

      expect(api.get()).toBe('a')
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PlaceComplete.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('placeComplete:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = PlaceComplete.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('placeComplete:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
