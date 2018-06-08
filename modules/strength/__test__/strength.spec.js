import $ from 'jquery'
import Strength from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'

describe('Strength', () => {
  describe('Strength()', () => {
    test('should have Strength', () => {
      expect(Strength).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Strength.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Strength.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Strength.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Strength.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const strength = new Strength(element)

      expect(strength).toBeObject()
      expect(strength.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const strength = new Strength(element)

      expect(strength.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const element = document.createElement('div')
      const $element = $(element)

      expect($element.asStrength()).toEqual($element)

      const api = $element.data('strength')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = $(document.createElement('div')).asStrength()
      expect($element.asStrength('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = $(document.createElement('div')).asStrength()
      expect($element.asStrength('destroy')).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = $(document.createElement('div'))
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('strength:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asStrength()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('strength:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asStrength('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    test('should enable the plugin', () => {
      $element.asStrength('disable')
      $element.asStrength('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('strength:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asStrength('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    test('should disable the plugin', () => {
      $element.asStrength('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('strength:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asStrength('disable')
      expect(called).toEqual(1)
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = $(document.createElement('div')).asStrength()
      api = $element.data('strength')
    })

    test('should have I18N', () => {
      expect(Strength.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        $element = $(document.createElement('div')).asStrength({
          locale: 'zh-cn'
        })
        api = $element.data('strength')
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
        Strength.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        api.setLocale('zh')
        expect(api.translate('Weak')).toEqual('弱')
      })
    })

    describe('translate()', () => {
      test('should get translated message', () => {
        expect(api.translate('Weak')).toEqual('Weak')

        api.setLocale('zh')
        expect(api.translate('Weak')).toEqual('弱')
      })
    })
  })
})
