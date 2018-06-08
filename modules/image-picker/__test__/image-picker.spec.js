import $ from 'jquery'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
import ImagePicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('ImagePicker', () => {
  describe('ImagePicker()', () => {
    test('should have ImagePicker', () => {
      expect(ImagePicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImagePicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ImagePicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ImagePicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ImagePicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const imagePicker = new ImagePicker(element)

      expect(imagePicker).toBeObject()
      expect(imagePicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const imagePicker = new ImagePicker(element)

      expect(imagePicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asImagePicker()).toEqual($element)

      const api = $element.data('imagePicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asImagePicker()
      expect($element.asImagePicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asImagePicker()
      expect($element.asImagePicker('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('imagePicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asImagePicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('imagePicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asImagePicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    test('should enable the plugin', () => {
      $element.asImagePicker('disable')
      $element.asImagePicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('imagePicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asImagePicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    test('should disable the plugin', () => {
      $element.asImagePicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('imagePicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asImagePicker('disable')
      expect(called).toEqual(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asImagePicker()
      api = $element.data('imagePicker')
    })

    test('should have I18N', () => {
      expect(ImagePicker.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        $element = $(document.createElement('div')).asImagePicker({
          locale: 'zh-cn'
        })
        api = $element.data('imagePicker')
        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('setLocale()', () => {
      test('should override default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)

        api.setLocale('zh-cn')

        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('addTransition', () => {
      test('should add transtion correctly', () => {
        ImagePicker.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('change')).toEqual('更换图片')
      })
    })
  })
})
