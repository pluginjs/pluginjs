import GradientPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value = 'linear-gradient(to right, #fff, rgb(0, 0, 0))'

describe('GradientPicker', () => {
  describe('GradientPicker()', () => {
    test('should have GradientPicker', () => {
      expect(GradientPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GradientPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(GradientPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(GradientPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(GradientPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const gradientPicker = GradientPicker.of(generateHTMLSample())

      expect(gradientPicker).toBeObject()
      expect(gradientPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const gradientPicker = GradientPicker.of(generateHTMLSample())

      expect(gradientPicker.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = GradientPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = GradientPicker.of(generateHTMLSample())
      $element.destroy()
      expect($element).toEqual($element)
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('gradientPicker:ready', () => {
        called++
      })
      const instance = GradientPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:destroy', () => {
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
      api = GradientPicker.of($element, {
        onUpdate() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = GradientPicker.of($element, {
        onUpdate(value) {
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
      api = GradientPicker.of($element, {
        onUpdate(value) {
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
      api = GradientPicker.of($element)

      expect(api.get()).toBeString()
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = GradientPicker.of($element)
      expect(api.get()).toEqual(value)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeString()
      api.set(value)
      expect(api.get()).toEqual(value)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample(value)
      api = GradientPicker.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = GradientPicker.of($element)
      expect(api.val()).toBeString()
    })

    test('should set the value with string', () => {
      api.val(value)
      expect(api.get()).toEqual(value)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:enable', () => {
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
      api = GradientPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('gradientPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
