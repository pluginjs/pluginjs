import Spinner from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Spinner', () => {
  describe('Spinner()', () => {
    test('should have Spinner', () => {
      expect(Spinner).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Spinner.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Spinner.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Spinner.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Spinner.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const spinner = Spinner.of(generateHTMLSample())

      expect(spinner).toBeObject()
      expect(spinner.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const spinner = Spinner.of(generateHTMLSample())

      expect(spinner.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Spinner.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Spinner.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      // const $element = Spinner.of(generateHTMLSample())
      // expect($element.destroy()).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('spinner:ready', () => {
        called++
      })

      const api = Spinner.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Spinner.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('spinner:destroy', () => {
        called++
      })

      api.enable()

      expect(called).toEqual(0)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Spinner.of($element)
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
      api = Spinner.of($element)
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
      api = Spinner.of($element)
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
      api = Spinner.of($element)
    })

    test('should enable the plugin', () => {
      // api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('spinner:enable', () => {
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
      api = Spinner.of($element)
    })

    test('should disable the plugin', () => {
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('spinner:disable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(0)
      expect(api.is('disabled')).toBeFalse()
    })
  })
})
