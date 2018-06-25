import InputMask from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const options = {
  type: 'custom',
  delimiter: '-',
  blocks: [2, 3, 5]
}
describe('InputMask', () => {
  describe('InputMask()', () => {
    test('should have InputMask', () => {
      expect(InputMask).toBeFunction()
    })

    test('should have defaults', () => {
      expect(InputMask.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(InputMask.events).toBeObject()
    })
    test('should have classes', () => {
      expect(InputMask.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(InputMask.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const inputMask = InputMask.of(generateHTMLSample(), options)

      expect(inputMask).toBeObject()
      expect(inputMask.options).toEqual({
        ...DEFAULTS,
        ...options
      })
    })

    test('should have options', () => {
      const inputMask = InputMask.of(generateHTMLSample(), options)

      expect(inputMask.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = InputMask.of($element, options)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = InputMask.of(generateHTMLSample(), options)
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = InputMask.of(generateHTMLSample(), options)
      $element.destroy()
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

      $element.addEventListener('inputMask:ready', () => {
        called++
      })

      const api = InputMask.of($element, options)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = InputMask.of($element, options)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('inputMask:destroy', () => {
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
      api = InputMask.of($element, options)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('inputMask:enable', () => {
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
      api = InputMask.of($element, options)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('inputMask:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
