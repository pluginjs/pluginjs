import '@pluginjs/gmap'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
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
    test('should work wtesth element', () => {
      const mappicker = MapPicker.of(generateHTMLSample())

      expect(mappicker).toBeObject()
      expect(mappicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const mappicker = MapPicker.of(generateHTMLSample())

      expect(mappicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('mappicker:ready', () => {
        called++
      })
      const instance = MapPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
