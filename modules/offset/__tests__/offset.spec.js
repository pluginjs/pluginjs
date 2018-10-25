import Offset from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value = '{"top":"20","right":"20","bottom":"20","left":"20","unit":"%"}'
const valueObj = { top: '20', right: '20', bottom: '20', left: '20', unit: '%' }
describe('Offset', () => {
  describe('Offset()', () => {
    test('should have Offset', () => {
      expect(Offset).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Offset.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Offset.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Offset.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Offset.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const offset = Offset.of(generateHTMLSample())

      expect(offset).toBeObject()
      expect(offset.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const offset = Offset.of(generateHTMLSample())

      expect(offset.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Offset.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Offset.of(generateHTMLSample())
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('offset:ready', () => {
        called++
      })

      const api = Offset.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Offset.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('offset:destroy', () => {
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

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(value)
      api = Offset.of($element, {
        onChange() {
          called = true
        }
      })
      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Offset.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeString()
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Offset.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeString()
        }
      })

      api.set(valueObj)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value with value', () => {
      $element = generateHTMLSample()

      api = Offset.of($element)
      expect(api.get()).toBeObject()
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = Offset.of($element)

      expect(api.get()).toEqual(valueObj)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Offset.of($element)
    })

    test('should set the value', () => {
      $element = generateHTMLSample()
      api = Offset.of($element)

      expect(api.get()).toBeObject()

      api.set(valueObj)
      expect(api.get()).toEqual(valueObj)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Offset.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = Offset.of($element)

      expect(api.val()).toEqual(value)
    })

    test('should set the value', () => {
      $element = generateHTMLSample()
      api = Offset.of($element)

      api.val(value)

      expect(api.get()).toEqual(valueObj)
      expect(api.val()).toEqual(value)
    })

    test('should set the value with value', () => {
      $element = generateHTMLSample(value)
      api = Offset.of($element)
      expect(api.val()).toBe(value)

      api.val(value)

      expect(api.get()).toEqual(valueObj)
      expect(api.val()).toEqual(value)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Offset.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('offset:enable', () => {
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
      api = Offset.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('offset:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
