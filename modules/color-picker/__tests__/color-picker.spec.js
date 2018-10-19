import ColorPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value = 'rgba(176, 63, 63, 1)'

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
    test('should work wtesth element', () => {
      const colorPicker = ColorPicker.of(generateHTMLSample())

      expect(colorPicker).toBeObject()
      expect(colorPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const colorPicker = ColorPicker.of(generateHTMLSample())

      expect(colorPicker.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ColorPicker.of(generateHTMLSample())
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
      $element.addEventListener('colorPicker:ready', () => {
        called++
      })
      const instance = ColorPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
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

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(value)
      api = ColorPicker.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ColorPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe(value)
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ColorPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe(value)
        }
      })

      api.set(value)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value without value', () => {
      $element = generateHTMLSample()
      api = ColorPicker.of($element)

      expect(api.get()).toBeString()
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = ColorPicker.of($element)
      expect(api.get()).toEqual(value)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample(value)
      api = ColorPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBe(value)

      api.set(value)
      expect(api.get()).toBe(value)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ColorPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(value)

      expect(api.get()).toBe(value)
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
