import Select from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Select', () => {
  describe('Select()', () => {
    test('should have Select', () => {
      expect(Select).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Select.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Select.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Select.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Select.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const select = Select.of(generateHTMLSample())

      expect(select).toBeObject()
      expect(select.options).toBeObject()
    })

    test('should have options', () => {
      const select = Select.of(generateHTMLSample())

      expect(select.options).toBeObject()
      expect(select.options).toEqual(DEFAULTS)
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Select.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Select.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Select.of(generateHTMLSample())
      expect($element.destroy()).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('select:ready', () => {
        called++
      })

      const api = Select.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Select.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('select:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Select.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('select:enable', () => {
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
      api = Select.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('select:disabled', () => {
        called++
      })

      $element.asSelect('disable')
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
