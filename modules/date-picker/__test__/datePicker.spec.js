import $ from 'jquery'
import DatePicker from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('DatePicker', () => {
  describe('DatePicker()', () => {
    test('should have DatePicker', () => {
      expect(DatePicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(DatePicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(DatePicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(DatePicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(DatePicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const datePicker = new DatePicker(element)

      expect(datePicker).toBeObject()
      expect(datePicker.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const datePicker = new DatePicker(element)

      expect(datePicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asDatePicker()).toEqual($element)

      const api = $element.data('datePicker')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asDatePicker()
      expect($element.asDatePicker('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asDatePicker()
      expect($element.asDatePicker('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('datePicker:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asDatePicker()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('datePicker:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asDatePicker('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    test('should enable the plugin', () => {
      $element.asDatePicker('disable')
      $element.asDatePicker('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('datePicker:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asDatePicker('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    test('should disable the plugin', () => {
      $element.asDatePicker('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('datePicker:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asDatePicker('disable')
      expect(called).toEqual(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asDatePicker()
      api = $element.data('datePicker')
    })

    test('should have I18N', () => {
      expect(DatePicker.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        $element = $(document.createElement('div')).asDatePicker({
          locale: 'zh-cn'
        })
        api = $element.data('datePicker')
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
        DatePicker.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        api.setLocale('zh')
        expect(api.translate('buttons')).toEqual(['取消', '保存'])
      })
    })

    describe('translate()', () => {
      test('should get translated message', () => {
        expect(api.translate('buttons')).toEqual(['Cancel', 'Save'])

        api.setLocale('zh')
        expect(api.translate('buttons')).toEqual(['取消', '保存'])
      })
    })
  })
})
