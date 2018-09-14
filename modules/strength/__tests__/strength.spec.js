import Strength from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

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
      const $element = generateHTMLSample().querySelector('input')
      const strength = Strength.of($element)

      expect(strength).toBeObject()
      expect(strength.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const $element = generateHTMLSample().querySelector('input')
      const strength = Strength.of($element)

      expect(strength.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Strength.of(generateHTMLSample().querySelector('input'))
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Strength.of(generateHTMLSample().querySelector('input'))
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('input')
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('strength:ready', () => {
        called++
      })

      const api = Strength.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('input')
      api = Strength.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('strength:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('input')
      api = Strength.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('strength:enable', () => {
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
      $element = generateHTMLSample().querySelector('input')
      api = Strength.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('strength:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().querySelector('input')
      api = Strength.of($element)
    })

    test('should have I18N', () => {
      expect(Strength.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        api = Strength.of(generateHTMLSample().querySelector('input'), {
          locale: 'zh-cn'
        })
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
