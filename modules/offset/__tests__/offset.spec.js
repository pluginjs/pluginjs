import Offset from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value =
  '{"margin-top": "20px","margin-right": "20px","margin-bottom": "20px","margin-left": "20px"}'

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

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = Offset.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
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

          expect(value).toBeObject()
        }
      })

      api.val(
        '{"margin-top": "30px","margin-right": "30px","margin-bottom": "30px","margin-left": "30px"}'
      )

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Offset.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeObject()
        }
      })

      api.set({
        'margin-bottom': 'px',
        'margin-left': 'px',
        'margin-right': 'px',
        'margin-top': 'px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value with value', () => {
      $element = generateHTMLSample(value)

      api = Offset.of($element)
      expect(api.get()).toEqual({
        'margin-bottom': '20px',
        'margin-left': '20px',
        'margin-right': '20px',
        'margin-top': '20px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })
    })

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = Offset.of($element)

      expect(api.get()).toEqual({
        'margin-bottom': 'px',
        'margin-left': 'px',
        'margin-right': 'px',
        'margin-top': 'px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })
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

      api.set({
        'margin-bottom': 'px',
        'margin-left': 'px',
        'margin-right': 'px',
        'margin-top': 'px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })
      expect(api.get()).toEqual({
        'margin-bottom': 'px',
        'margin-left': 'px',
        'margin-right': 'px',
        'margin-top': 'px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })
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

      expect(api.val()).toBe(
        '{"margin-top":"20px","margin-right":"20px","margin-bottom":"20px","margin-left":"20px","padding-top":"px","padding-right":"px","padding-bottom":"px","padding-left":"px"}'
      )
    })

    test('should set the value', () => {
      $element = generateHTMLSample()
      api = Offset.of($element)

      api.val(value)

      expect(api.get()).toEqual({
        'margin-bottom': '20px',
        'margin-left': '20px',
        'margin-right': '20px',
        'margin-top': '20px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })
      expect(api.val()).toEqual(
        '{"margin-top":"20px","margin-right":"20px","margin-bottom":"20px","margin-left":"20px","padding-top":"px","padding-right":"px","padding-bottom":"px","padding-left":"px"}'
      )
    })

    test('should set the value with value', () => {
      $element = generateHTMLSample(value)
      api = Offset.of($element)
      expect(api.val()).toBe(
        '{"margin-top":"20px","margin-right":"20px","margin-bottom":"20px","margin-left":"20px","padding-top":"px","padding-right":"px","padding-bottom":"px","padding-left":"px"}'
      )

      api.val(
        '{"margin-top": "30px","margin-right": "30px","margin-bottom": "30px","margin-left": "30px"}'
      )

      expect(api.get()).toEqual({
        'margin-bottom': '30px',
        'margin-left': '30px',
        'margin-right': '30px',
        'margin-top': '30px',
        'padding-bottom': 'px',
        'padding-left': 'px',
        'padding-right': 'px',
        'padding-top': 'px'
      })
      expect(api.val()).toEqual(
        '{"margin-top":"30px","margin-right":"30px","margin-bottom":"30px","margin-left":"30px","padding-top":"px","padding-right":"px","padding-bottom":"px","padding-left":"px"}'
      )
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
