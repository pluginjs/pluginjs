//
import AutoComplete from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
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
      const autoComplete = AutoComplete.of(generateHTMLSample(), { data })

      expect(autoComplete).toBeObject()
      expect(autoComplete.options).toEqual({
        ...DEFAULTS,
        data
      })
    })

    test('should have options', () => {
      const autoComplete = AutoComplete.of(generateHTMLSample(), { data })

      expect(autoComplete.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = AutoComplete.of($element, { data })
      // expect(api).toEqual($element)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = AutoComplete.of(generateHTMLSample(), { data })
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = AutoComplete.of(generateHTMLSample(), { data })
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
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

      const api = AutoComplete.of($element, { data })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { data })
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

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { data })
    })

    test('should get the value', () => {
      expect(api.get()).toBeString()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { data })
    })

    test('should set the value', () => {
      expect(api.get()).toBeString()

      api.set(false)
      expect(api.get()).toBeString()

      api.set(true)
      expect(api.get()).toBeString()
    })

    test('should set the value with string', () => {
      expect(api.get()).toBeString()

      api.set('false')
      expect(api.get()).toBeString()

      api.set('true')
      expect(api.get()).toBeString()
    })

    test('should set the value with number', () => {
      expect(api.get()).toBeString()

      api.set(0)
      expect(api.get()).toBeString()

      api.set(1)
      expect(api.get()).toBeString()
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { data })
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(false)

      expect(api.get()).toBeString()

      api.val(true)

      expect(api.get()).toBeString()
    })

    test('should set the value with string', () => {
      api.val('false')

      expect(api.get()).toBeString()

      api.val('true')

      expect(api.get()).toBeString()
    })

    test('should set the value with number', () => {
      expect(api.get()).toBeString()

      api.val(0)
      expect(api.get()).toBeString()

      api.val(1)
      expect(api.get()).toBeString()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = AutoComplete.of($element, { data })
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
      api = AutoComplete.of($element, { data })
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
