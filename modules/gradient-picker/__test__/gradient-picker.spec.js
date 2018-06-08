import $ from 'jquery'
import '@pluginjs/modal'
import '@pluginjs/edit-panel'
import '@pluginjs/scrollbar'
import '@pluginjs/scrollable'
import '@pluginjs/dropdown'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import '@pluginjs/gradient'
import '@pluginjs/color-picker'
import '@pluginjs/range'
import GradientPicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const data = {
  'warm-flame':
    'linear-gradient(45deg, rgba(233,23,233,0.5) 0%, rgba(23,23,233,0.6) 99%, #fad0c4 100%)',
  'night-fade': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'spring-warnth':
    'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)',
  'juicy-peach': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'young-passion':
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'lady-lips': 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'sunny-morning': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'rainy-ashville': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
}
GradientPicker.setData(data)
describe('GradientPicker', () => {
  describe('GradientPicker()', () => {
    test('should have GradientPicker', () => {
      expect(GradientPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GradientPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(GradientPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(GradientPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(GradientPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const gradientPicker = new GradientPicker(element)

      expect(gradientPicker).toBeObject()
      expect(gradientPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const gradientPicker = new GradientPicker(element)

      expect(gradientPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asGradientPicker()).toEqual($element)

      const api = $element.data('gradientPicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asGradientPicker()
      expect($element.asGradientPicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asGradientPicker()
      $element.asGradientPicker('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('gradientPicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asGradientPicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGradientPicker()
      api = $element.data('gradientPicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('gradientPicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asGradientPicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGradientPicker()
      api = $element.data('gradientPicker')
    })

    test('should enable the plugin', () => {
      $element.asGradientPicker('disable')
      $element.asGradientPicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('gradientPicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asGradientPicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asGradientPicker()
      api = $element.data('gradientPicker')
    })

    test('should disable the plugin', () => {
      $element.asGradientPicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('gradientPicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asGradientPicker('disable')
      expect(called).toEqual(1)
    })
  })
})
