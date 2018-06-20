import FontEditor from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

// const defaultValue =
//   '{"fontFamily": "Arial", "fontSize": "30px", "lineHeight": "1.5em", "fontWeight": "bold", "textAlign": "left", "fontStyle": "italy", "textTransform": "capitalize", "textDecoration": "underline"}'

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
      const fontEditor = FontEditor.of(generateHTMLSample())
      // element.value = defaultValue
      // const fontEditor = new FontEditor(element)

      expect(fontEditor).toBeObject()
      expect(fontEditor.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      // const element = document.createElement('input')
      // element.value = defaultValue
      // const fontEditor = new FontEditor(element)
      const fontEditor = FontEditor.of(generateHTMLSample())

      expect(fontEditor.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      // const element = document.createElement('input')
      // element.value = defaultValue
      const $element = generateHTMLSample()
      const api = FontEditor.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = FontEditor.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = FontEditor.of(generateHTMLSample())
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('fontEditor:ready', () => {
        called++
      })

      api = FontEditor.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = FontEditor.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('fontEditor:destroy', () => {
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
      $element = generateHTMLSample()
      api = FontEditor.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('fontEditor:enable', () => {
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
      api = FontEditor.of($element)
    })

    test('should disable the plugin', () => {
      api.disable(0)

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('fontEditor:disable', () => {
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
      $element = generateHTMLSample()
      api = FontEditor.of($element)
    })

    test('should have I18N', () => {
      expect(FontEditor.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        api = FontEditor.of(generateHTMLSample(), {
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
