import Offset from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

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

      expect($element.asOffset()).toEqual($element)

      const api = $element.data('offset')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = generateHTMLSample().asOffset()
      expect($element.asOffset('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = generateHTMLSample().asOffset()
      expect($element.asOffset('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('offset:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asOffset()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = generateHTMLSample().asOffset()
      // api =
      $element.data('offset')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('offset:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asOffset('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asOffset()
      api = $element.data('offset')
    })

    test('should enable the plugin', () => {
      $element.asOffset('disable')
      $element.asOffset('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('offset:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asOffset('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asOffset()
      api = $element.data('offset')
    })

    test('should disable the plugin', () => {
      $element.asOffset('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('offset:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asOffset('disable')
      expect(called).toEqual(1)
    })
  })
})
