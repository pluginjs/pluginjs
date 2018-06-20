import MapPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('MapPicker', () => {
  describe('MapPicker()', () => {
    test('should have MapPicker', () => {
      expect(MapPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(MapPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(MapPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(MapPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(MapPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const mapPicker = MapPicker.of(generateHTMLSample())

      expect(mapPicker).toBeObject()
      expect(mapPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const mapPicker = MapPicker.of(generateHTMLSample())

      expect(mapPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()

      expect($element.asMapPicker()).toEqual($element)

      const api = $element.data('mapPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = generateHTMLSample().asMapPicker()
      expect($element.asMapPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = generateHTMLSample().asMapPicker()
      $element.asMapPicker('destroy')
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

      $element.on('mapPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asMapPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = generateHTMLSample().asMapPicker()
      // api =
      $element.data('mapPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('mapPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asMapPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asMapPicker()
      api = $element.data('mapPicker')
    })

    test('should enable the plugin', () => {
      $element.asMapPicker('disable')
      $element.asMapPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('mapPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asMapPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asMapPicker()
      api = $element.data('mapPicker')
    })

    test('should disable the plugin', () => {
      $element.asMapPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('mapPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asMapPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
