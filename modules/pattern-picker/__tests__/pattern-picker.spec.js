import PatternPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('PatternPicker', () => {
  describe('PatternPicker()', () => {
    test('should have PatternPicker', () => {
      expect(PatternPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(PatternPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(PatternPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(PatternPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(PatternPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const patternPicker = PatternPicker.of(generateHTMLSample())

      expect(patternPicker).toBeObject()
      expect(patternPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const patternPicker = PatternPicker.of(generateHTMLSample())

      expect(patternPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()

      expect($element.asPatternPicker()).toEqual($element)

      const api = $element.data('patternPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = generateHTMLSample().asPatternPicker()
      expect($element.asPatternPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = generateHTMLSample().asPatternPicker()
      $element.asPatternPicker('destroy')
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

      $element.on('patternPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asPatternPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = generateHTMLSample().asPatternPicker()
      // api = $element.data('patternPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('patternPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asPatternPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asPatternPicker()
      api = $element.data('patternPicker')
    })

    test('should enable the plugin', () => {
      $element.asPatternPicker('disable')
      $element.asPatternPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('patternPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asPatternPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asPatternPicker()
      api = $element.data('patternPicker')
    })

    test('should disable the plugin', () => {
      $element.asPatternPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('patternPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asPatternPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
