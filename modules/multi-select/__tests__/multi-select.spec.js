import MultiSelect from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('MultiSelect', () => {
  describe('MultiSelect()', () => {
    test('should have MultiSelect', () => {
      expect(MultiSelect).toBeFunction()
    })

    test('should have defaults', () => {
      expect(MultiSelect.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(MultiSelect.events).toBeObject()
    })

    test('should have classes', () => {
      expect(MultiSelect.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(MultiSelect.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const multiSelect = MultiSelect.of(generateHTMLSample())

      expect(multiSelect).toBeObject()
      expect(multiSelect.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const multiSelect = MultiSelect.of(generateHTMLSample())

      expect(multiSelect.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = MultiSelect.of(generateHTMLSample())
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

      $element.addEventListener('multiSelect:ready', () => {
        called++
      })

      const api = MultiSelect.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MultiSelect.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('multiSelect:destroy', () => {
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
      $element = generateHTMLSample(['4'])
      api = MultiSelect.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = MultiSelect.of($element, {
        onChange(value) {
          called = true
          expect(value).toBeArray()
        }
      })

      api.val('4')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = MultiSelect.of($element, {
        onChange(value) {
          called = true
          expect(value).toEqual(['4'])
        }
      })

      api.set(['4'])

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MultiSelect.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toEqual(['4'])
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MultiSelect.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toEqual(['4'])

      api.set(['4'])
      expect(api.get()).toEqual(['4'])
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MultiSelect.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val('4')

      expect(api.get()).toBeArray(['4'])
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MultiSelect.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('multiSelect:enable', () => {
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
      api = MultiSelect.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('multiSelect:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
