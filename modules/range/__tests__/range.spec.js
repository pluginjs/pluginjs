import Range from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Range', () => {
  describe('Range()', () => {
    test('should have Range', () => {
      expect(Range).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Range.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Range.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Range.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Range.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const range = Range.of(generateHTMLSample())

      expect(range).toBeObject()
      expect(range.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const range = Range.of(generateHTMLSample())

      expect(range.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Range.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('range:ready', () => {
        called++
      })

      const api = Range.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample('10')
      api = Range.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Range.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('10')
        }
      })

      api.val('10')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Range.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('10')
        }
      })

      api.set(10)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample('20')
      api = Range.of($element)
      expect(api.get()).toBe(20)
    })

    test('should get the value with range', () => {
      $element = generateHTMLSample('20-30')
      api = Range.of($element, {
        range: true
      })
      expect(api.get()).toEqual([20, 30])
    })
  })

  describe('set()', () => {
    let $element
    let api

    test('should set the value', () => {
      $element = generateHTMLSample()
      api = Range.of($element)

      expect(api.get()).toBe(0)

      api.set(10)
      expect(api.get()).toBe(10)
    })

    test('should set the value with range', () => {
      $element = generateHTMLSample()
      api = Range.of($element, {
        range: true
      })

      expect(api.get()).toEqual([0, 0])

      api.set([10, 20])
      expect(api.get()).toEqual([10, 20])
    })
  })

  describe('val()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample('30')
      api = Range.of($element)

      expect(api.val()).toBe('30')
    })

    test('should set the value', () => {
      $element = generateHTMLSample()
      api = Range.of($element)

      api.val('100')

      expect(api.get()).toBe(100)
      expect(api.val()).toBe('100')
    })

    test('should set the value with range', () => {
      $element = generateHTMLSample('20-30')
      api = Range.of($element, {
        range: true
      })
      expect(api.val()).toBe('20-30')

      api.val('30-100')

      expect(api.get()).toEqual([30, 100])
      expect(api.val()).toBe('30-100')
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Range.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('range:enable', () => {
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
      api = Range.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('range:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
