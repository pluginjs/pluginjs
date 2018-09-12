import ColorPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value = 'red'
const obj = {
  collection: 'red',
  gradient: 'linear-gradient(90deg, #fff 0%,#000 100%)',
  solid: '#000'
}

describe('ColorPicker', () => {
  describe('ColorPicker()', () => {
    test('should have ColorPicker', () => {
      expect(ColorPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ColorPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ColorPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ColorPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ColorPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const colorPicker = ColorPicker.of(generateHTMLSample())

      expect(colorPicker).toBeObject()
      expect(colorPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const colorPicker = ColorPicker.of(generateHTMLSample())

      expect(colorPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = ColorPicker.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ColorPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ColorPicker.of(generateHTMLSample())
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      // api = ColorPicker.of($element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('colorPicker:ready', () => {
        called++
      })

      api = ColorPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ColorPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('colorPicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ColorPicker.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample('red')
      api = ColorPicker.of($element)
      expect(api.get()).toEqual(obj)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample('red')
      api = ColorPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeObject()
      api.set(obj)
      expect(api.get()).toEqual(obj)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample('red')
      api = ColorPicker.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = ColorPicker.of($element)
      expect(api.val()).toBeString()
    })

    test('should set the value with string', () => {
      api.val(value)

      expect(api.val()).toBe('"red"')
      expect(api.get()).toEqual(obj)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ColorPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('colorPicker:enable', () => {
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
      api = ColorPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('colorPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
