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
      const $element = Spinner.of(generateHTMLSample())
      $element.destroy()
      expect($element).toEqual($element)
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
      $element = generateHTMLSample('10')
      api = Spinner.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Spinner.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeString('10')
        }
      })

      api.val(10)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Spinner.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeString('10')
        }
      })

      api.set(10)

      expect(called).toBeTrue()
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
      expect(api.get()).toEqual(0)
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
      expect(api.get()).toEqual(0)

      api.set(10)
      expect(api.get()).toEqual(10)
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
      $element = generateHTMLSample('10')
      api = Spinner.of($element)

      expect(api.val()).toBeString('10')
    })

    test('should set the value', () => {
      api.val('10')

      expect(api.get()).toBe(10)
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
