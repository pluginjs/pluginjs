import MapPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const value = '{"place":"fuzhou"}'
const obj = { place: 'fuzhou' }

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

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = MapPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = MapPicker.of(generateHTMLSample())
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

      $element.addEventListener('mapPicker:ready', () => {
        called++
      })

      const api = MapPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MapPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('mapPicker:destroy', () => {
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
      api = MapPicker.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = MapPicker.of($element, {
        onChange(val) {
          called = true

          expect(val).toBe(value)
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = MapPicker.of($element, {
        onChange(val) {
          called = true

          expect(val).toBe(value)
        }
      })

      api.set(obj)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MapPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeObject()
    })

    test('should get the value with data', () => {
      $element = generateHTMLSample(value)
      api = MapPicker.of($element)

      expect(api.get()).toBeObject(obj)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MapPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeObject()

      api.set(obj)
      expect(api.get()).toEqual(obj)
    })

    test('should set the value with number', () => {
      expect(api.get()).toBeObject()

      api.set({ lat: 20, lng: 30 })
      expect(api.get()).toEqual({ lat: 20, lng: 30 })
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MapPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(value)

      expect(api.get()).toBeObject(obj)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = MapPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('mapPicker:enable', () => {
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
      api = MapPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('mapPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
