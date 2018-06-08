import $ from 'jquery'
import '@pluginjs/units'
import '@pluginjs/dropdown'
import '@pluginjs/range'
import '@pluginjs/tooltip'
import '@pluginjs/popover'
import '@pluginjs/pop-dialog'
// import '@pluginjs/pop-dialog'
import FontEditor from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

const defaultValue =
  "{'fontFamily': 'Arial', 'fontSize': '30px', 'lineHeight': '1.5em', 'fontWeight': 'bold', 'textAlign': 'left', 'fontStyle': 'italy', 'textTransform': 'capitalize', 'textDecoration': 'underline'}"
describe('FontEditor', () => {
  describe('FontEditor()', () => {
    test('should have FontEditor', () => {
      expect(FontEditor).toBeFunction()
    })

    test('should have defaults', () => {
      expect(FontEditor.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(FontEditor.events).toBeObject()
    })

    test('should have classes', () => {
      expect(FontEditor.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(FontEditor.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('input')
      element.value = defaultValue
      const fontEditor = new FontEditor(element)

      expect(fontEditor).toBeObject()
      expect(fontEditor.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('input')
      element.value = defaultValue
      const fontEditor = new FontEditor(element)

      expect(fontEditor.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('input')
      element.value = defaultValue
      const $element = $(element)

      expect($element.asFontEditor()).toEqual($element)

      const api = $element.data('fontEditor')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('input')).asFontEditor()
      expect($element.asFontEditor('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('input')).asFontEditor()
      expect($element.asFontEditor('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element, api

    beforeEach(() => {
      $element = $(document.createElement('input'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('fontEditor:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asFontEditor()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('fontEditor:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asFontEditor('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    test('should enable the plugin', () => {
      $element.asFontEditor('disable')
      $element.asFontEditor('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('fontEditor:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asFontEditor('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    test('should disable the plugin', () => {
      $element.asFontEditor('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('fontEditor:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asFontEditor('disable')
      expect(called).toEqual(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('input')).asFontEditor()
      api = $element.data('fontEditor')
    })

    test('should have I18N', () => {
      expect(FontEditor.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        $element = $(document.createElement('input')).asFontEditor({
          locale: 'zh-cn'
        })
        api = $element.data('fontEditor')
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
        FontEditor.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('change')).toEqual('更改')
      })
    })

    describe('translate()', () => {
      test('should get translated message', () => {
        expect(api.translate('change')).toEqual('Change')

        api.setLocale('zh')
        expect(api.translate('change')).toEqual('更改')
      })
    })
  })
})
