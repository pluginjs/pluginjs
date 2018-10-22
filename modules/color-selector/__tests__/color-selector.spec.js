import ColorSelector from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value = 'red'

describe('ColorSelector', () => {
  describe('ColorSelector()', () => {
    test('should have ColorSelector', () => {
      expect(ColorSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ColorSelector.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ColorSelector.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ColorSelector.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ColorSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const colorSelector = ColorSelector.of(generateHTMLSample())

      expect(colorSelector).toBeObject()
      expect(colorSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const colorSelector = ColorSelector.of(generateHTMLSample())

      expect(colorSelector.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ColorSelector.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ColorSelector.of(generateHTMLSample())
      $element.destroy()
      expect($element).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ColorSelector.of($element)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('colorSelector:ready', () => {
        called++
      })

      api = ColorSelector.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ColorSelector.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('colorSelector:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('update', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(value)
      api = ColorSelector.of($element, {
        onUpdate() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when update the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ColorSelector.of($element, {
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
      api = ColorSelector.of($element, {
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
      api = ColorSelector.of($element)

      expect(api.get()).toBeString()
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = ColorSelector.of($element)
      expect(api.get()).toEqual(value)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample('red')
      api = ColorSelector.of($element)
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
      api = ColorSelector.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = ColorSelector.of($element)
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
      api = ColorSelector.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('colorSelector:enable', () => {
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
      api = ColorSelector.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('colorSelector:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
