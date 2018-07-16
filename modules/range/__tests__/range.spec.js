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

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Range.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Range.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      // const $element = Range.of(generateHTMLSample())
      // $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
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

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Range.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeObject()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Range.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeObject()

      api.set(false)
      expect(api.get()).toBeObject()

      api.set(true)
      expect(api.get()).toBeObject()
    })

    test('should set the value with string', () => {
      expect(api.get()).toBeObject()

      api.set('false')
      expect(api.get()).toBeObject()

      api.set('true')
      expect(api.get()).toBeObject()
    })

    test('should set the value with number', () => {
      expect(api.get()).toBeObject()

      api.set(0)
      expect(api.get()).toBeObject()

      api.set(1)
      expect(api.get()).toBeObject()
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Range.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(false)

      expect(api.get()).toBeObject()

      api.val(true)

      expect(api.get()).toBeObject()
    })

    test('should set the value with string', () => {
      api.val('false')

      expect(api.get()).toBeObject()

      api.val('true')

      expect(api.get()).toBeObject()
    })

    test('should set the value with number', () => {
      expect(api.get()).toBeObject()

      api.val(0)
      expect(api.get()).toBeObject()

      api.val(1)
      expect(api.get()).toBeObject()
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
