//
import AutoComplete from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const source = [
  'JAVA',
  'java',
  'java Script',
  'go',
  'swift',
  'C++',
  '易语言',
  'C#',
  'Python',
  'Ruby'
]
describe('AutoComplete', () => {
  describe('AutoComplete()', () => {
    test('should have AutoComplete', () => {
      expect(AutoComplete).toBeFunction()
    })

    test('should have defaults', () => {
      expect(AutoComplete.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(AutoComplete.events).toBeObject()
    })
    test('should have classes', () => {
      expect(AutoComplete.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(AutoComplete.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const autoComplete = AutoComplete.of(generateHTMLSample(), { source })

      expect(autoComplete).toBeObject()
      expect(autoComplete.options).toEqual({
        ...DEFAULTS,
        source
      })
    })

    test('should have options', () => {
      const autoComplete = AutoComplete.of(generateHTMLSample(), { source })

      expect(autoComplete.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = AutoComplete.of($element, { source })
      // expect(api).toEqual($element)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = AutoComplete.of(generateHTMLSample(), { source })
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = AutoComplete.of(generateHTMLSample(), { source })
      $element.destroy()
      // expect().toEqual($element);
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

      $element.addEventListener('autoComplete:ready', () => {
        called++
      })

      const api = AutoComplete.of($element, { source })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { source })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('autoComplete:destroy', () => {
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
      $element = generateHTMLSample('java')
      api = AutoComplete.of($element, {
        source,
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = AutoComplete.of($element, {
        source,
        onChange(value) {
          called = true

          expect(value).toBe('java')
        }
      })

      api.val('java')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = AutoComplete.of($element, {
        source,
        onChange(value) {
          called = true

          expect(value).toBe('java')
        }
      })

      api.set('java')

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { source })

      expect(api.get()).toBeString()
    })

    test('should get the value with source', () => {
      $element = generateHTMLSample('java')
      api = AutoComplete.of($element, { source })

      expect(api.get()).toEqual('java')
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { source })
    })

    test('should set the value with string', () => {
      expect(api.get()).toBeString()

      api.set('java')
      expect(api.get()).toBeString('java')
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { source })
    })

    test('should get the value', () => {
      $element = generateHTMLSample('java')
      api = AutoComplete.of($element, { source })

      expect(api.val()).toBeString('java')
    })

    test('should set the value with string', () => {
      api.val('java')
      expect(api.val()).toBe('java')
      expect(api.get()).toBeString('java')
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { source })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('autoComplete:enable', () => {
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
      api = AutoComplete.of($element, { source })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('autoComplete:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
