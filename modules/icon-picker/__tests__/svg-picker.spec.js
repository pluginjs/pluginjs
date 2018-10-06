import IconPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('IconPicker', () => {
  describe('IconPicker()', () => {
    test('should have IconPicker', () => {
      expect(IconPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(IconPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(IconPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(IconPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(IconPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const api = IconPicker.of(generateHTMLSample())

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })

    test('should have options', () => {
      const api = IconPicker.of(generateHTMLSample())

      expect(api.options).toBeObject()
      expect(api.options).toEqual(DEFAULTS)
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = IconPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('iconPicker:ready', () => {
        called++
      })

      const api = IconPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = IconPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('iconPicker:destroy', () => {
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
      $element = generateHTMLSample('a')
      api = IconPicker.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = IconPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('c')
        }
      })

      api.val('c')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = IconPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('c')
        }
      })

      api.set('c')

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = IconPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBe('b')
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = IconPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBe('b')

      api.set('a')
      expect(api.get()).toBe('a')
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = IconPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val('a')

      expect(api.get()).toBe('a')
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = IconPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('iconPicker:enable', () => {
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
      api = IconPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('iconPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
