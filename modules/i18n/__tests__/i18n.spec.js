import I18N from '../src/main'
import translations from './fixtures/translations'

describe('I18N', () => {
  test('should have I18N', () => {
    expect(I18N).toBeFunction()
  })

  describe('constructor()', () => {
    test('should use defaults if no args', () => {
      const i18n = new I18N()

      expect(i18n.defaults).toEqual(I18N.defaults)
    })

    test('should override defaults', () => {
      const i18n = new I18N({ locale: 'zh-cn' })

      expect(i18n.defaults.locale).toEqual('zh-cn')
    })

    test('should have no translations if no args', () => {
      const i18n = new I18N()

      expect(i18n.translations).toEqual({})
    })

    test('should set translations with second arg', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N({}, translations)

      expect(i18n.translations).toEqual(translations)
    })
  })

  describe('setTranslations()', () => {
    test('should set translations', () => {
      const i18n = new I18N()

      expect(i18n.translations).toEqual({})

      const translations = { en: { hello: 'hello' } }

      i18n.setTranslations(translations)
      expect(i18n.translations).toEqual(translations)
    })

    test('should replace the translations', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N({}, translations)

      expect(i18n.translations).toEqual(translations)

      i18n.setTranslations({})
      expect(i18n.translations).toEqual({})
    })
  })

  describe('addTranslation()', () => {
    test('should add translation', () => {
      const i18n = new I18N()

      expect(i18n.translations).toEqual({})

      i18n.addTranslation('en', { hello: 'hello' })

      expect(i18n.getTranslation('en')).toEqual({ hello: 'hello' })

      expect(i18n.translations).toEqual({ en: { hello: 'hello' } })
    })

    test('should extends translation', () => {
      const i18n = new I18N()

      i18n.setTranslations({
        en: {
          hello: 'hello',
          foo: { bar: 'qux' }
        }
      })

      i18n.addTranslation('en', { foo: { bar: 'bar' } })

      expect(i18n.getTranslation('en')).toEqual({
        hello: 'hello',
        foo: { bar: 'bar' }
      })
    })
  })

  describe('getTranslation()', () => {
    test('should get translation by locale', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N()
      i18n.setTranslations(translations)

      expect(i18n.getTranslation('en')).toEqual(translations.en)
    })

    test('should get empty object if no translation', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N()
      i18n.setTranslations(translations)

      expect(i18n.getTranslation('zh-cn')).toEqual({})
    })
  })

  describe('instance()', () => {
    test('should get instance', () => {
      const i18n = new I18N()
      const instance = i18n.instance()

      expect(instance).toBeObject()
    })

    describe('getLocale()', () => {
      test('should use I18N defaults if no options set', () => {
        const i18n = new I18N()
        const instance = i18n.instance()

        expect(instance.getLocale()).toEqual(I18N.defaults.locale)
      })

      test('should use defaults if no options set', () => {
        const i18n = new I18N({ locale: 'zh-cn' })
        const instance = i18n.instance()

        expect(instance.getLocale()).toEqual('zh-cn')
      })

      test('should override locale using options', () => {
        const i18n = new I18N()
        const instance = i18n.instance({ locale: 'zh-cn' })

        expect(instance.getLocale()).toEqual('zh-cn')
      })
    })

    describe('setLocale()', () => {
      test('should set locale', () => {
        const i18n = new I18N()
        const instance = i18n.instance()

        instance.setLocale('zh-cn')

        expect(instance.getLocale()).toEqual('zh-cn')
      })
    })
  })
})

describe('Translate', () => {
  let i18n
  let instance

  beforeEach(() => {
    i18n = new I18N()
    i18n.setTranslations(translations)
    instance = i18n.instance()
  })

  test('should returns translation for single scope', () => {
    expect(instance.translate('hello')).toEqual('Hello World!')
  })

  test('should returns translation as object', () => {
    expect(instance.translate('greetings')).toEqual(
      i18n.translations.en.greetings
    )
  })

  test('should returns missing message translation for invalid scope', () => {
    const actual = instance.translate('invalid.scope')
    const expected = '[missing "en.invalid.scope" translation]'
    expect(actual).toEqual(expected)
  })

  test('should returns missing message translation with provided locale for invalid scope', () => {
    instance.setLocale('ja')
    const actual = instance.translate('invalid.scope')
    const expected = '[missing "ja.invalid.scope" translation]'
    expect(actual).toEqual(expected)
  })

  test('should returns translation for single scope on a custom locale', () => {
    instance.setLocale('pt-BR')
    expect(instance.translate('hello')).toEqual('Olá Mundo!')
  })

  test('should returns translation for multiple scopes', () => {
    expect(instance.translate('greetings.stranger')).toEqual('Hello stranger!')
  })

  test('should fallbacks to the default locale when I18N.fallbackss is enabled', () => {
    instance = i18n.instance({
      locale: 'pt-BR',
      fallbacks: true
    })
    expect(instance.translate('greetings.stranger')).toEqual('Hello stranger!')
  })

  test('should returns translation with locale option', () => {
    expect(instance.translate('hello', {}, 'en')).toEqual('Hello World!')
    expect(instance.translate('hello', {}, 'pt-BR')).toEqual('Olá Mundo!')
  })

  test('should fallbacks to default locale when providing an unknown locale', () => {
    instance = i18n.instance({
      locale: 'fr',
      fallbacks: true
    })
    expect(instance.translate('greetings.stranger')).toEqual('Hello stranger!')
  })

  test('should fallbacks to less specific locale', () => {
    instance = i18n.instance({
      locale: 'de-DE',
      fallbacks: true
    })
    expect(instance.translate('hello')).toEqual('Hallo Welt!')
  })

  test('should fallbacks using custom rules (function)', () => {
    instance = i18n.instance({
      locale: 'no',
      fallbacks: 'nb'
    })

    expect(instance.translate('hello')).toEqual('Hei Verden!')
  })
})

describe('Interpolation', () => {
  let i18n
  let instance

  beforeEach(() => {
    i18n = new I18N()
    i18n.setTranslations(translations)
    instance = i18n.instance()
  })

  test('performs single interpolation', () => {
    const actual = instance.translate('greetings.name', { name: 'John Doe' })
    expect(actual).toEqual('Hello John Doe!')
  })

  test('should performs multiple interpolations', () => {
    const actual = instance.translate('profile.details', {
      name: 'John Doe',
      age: 27
    })
    expect(actual).toEqual('John Doe is 27-years old')
  })

  describe('Pluralization', () => {
    let translationKey

    describe('when count is passed in', () => {
      describe('and translation key does contain pluralization', () => {
        beforeEach(() => {
          translationKey = 'inbox'
        })

        test('return translated and pluralized string', () => {
          expect(
            instance.translate(translationKey, {
              count: 0,
              _number: 'count'
            })
          ).toEqual('You have no messages')

          expect(
            instance.translate(translationKey, {
              count: 1,
              _number: 'count'
            })
          ).toEqual('You have 1 message')

          expect(
            instance.translate(translationKey, {
              count: 5,
              _number: 'count'
            })
          ).toEqual('You have 5 messages')
        })
      })

      describe('and translation key does NOT contain pluralization', () => {
        beforeEach(() => {
          translationKey = 'hello'
        })

        test('should return translated string ONLY', () => {
          expect(
            instance.translate(translationKey, {
              count: 0,
              _number: 'count'
            })
          ).toEqual('Hello World!')

          expect(
            instance.translate(translationKey, {
              count: 1,
              _number: 'count'
            })
          ).toEqual('Hello World!')

          expect(
            instance.translate(translationKey, {
              count: 5,
              _number: 'count'
            })
          ).toEqual('Hello World!')
        })
      })

      describe('and translation key does contain pluralization with null content', () => {
        beforeEach(() => {
          translationKey = 'sent'
        })

        test('should return empty string', () => {
          expect(
            instance.translate(translationKey, {
              count: 0,
              _number: 'count'
            })
          ).toEqual('[missing "en.sent" translation]')

          expect(
            instance.translate(translationKey, {
              count: 1,
              _number: 'count'
            })
          ).toEqual('[missing "en.sent" translation]')

          expect(
            instance.translate(translationKey, {
              count: 5,
              _number: 'count'
            })
          ).toEqual('[missing "en.sent" translation]')
        })
      })
    })

    describe('when count is NOT passed in', () => {
      describe('and translation key does contain pluralization', () => {
        beforeEach(() => {
          translationKey = 'inbox'
        })

        const expectedTranslationObject = [
          'You have {count} message',
          'You have {count} messages',
          'You have no messages'
        ]

        test('return translated and pluralized string', () => {
          expect(
            instance.translate(translationKey, {
              notCount: 0,
              _number: 'count'
            })
          ).toEqual(expectedTranslationObject)

          expect(
            instance.translate(translationKey, {
              notCount: 1,
              _number: 'count'
            })
          ).toEqual(expectedTranslationObject)

          expect(
            instance.translate(translationKey, {
              notCount: 5,
              _number: 'count'
            })
          ).toEqual(expectedTranslationObject)
        })
      })

      describe('and translation key does NOT contain pluralization', () => {
        beforeEach(() => {
          translationKey = 'hello'
        })

        test('return translated string ONLY', () => {
          expect(
            instance.translate(translationKey, {
              notCount: 0,
              _number: 'count'
            })
          ).toEqual('Hello World!')

          expect(
            instance.translate(translationKey, {
              notCount: 1,
              _number: 'count'
            })
          ).toEqual('Hello World!')

          expect(
            instance.translate(translationKey, {
              notCount: 5,
              _number: 'count'
            })
          ).toEqual('Hello World!')
        })
      })
    })
  })

  test('outputs missing placeholder message if interpolation value is missing', () => {
    const actual = instance.translate('greetings.name')
    expect(actual).toEqual('Hello [missing {{name}} value]!')
  })

  test('outputs missing placeholder message if interpolation value is null', () => {
    const actual = instance.translate('greetings.name', { name: null })
    expect(actual).toEqual('Hello [missing {{name}} value]!')
  })

  test('allows overriding the null placeholder message', () => {
    instance = i18n.instance({
      nullPlaceholder() {
        return ''
      }
    })
    const actual = instance.translate('greetings.name', { name: null })
    expect(actual).toEqual('Hello !')
  })

  test('allows overriding the missing placeholder message', () => {
    instance = i18n.instance({
      missingPlaceholder() {
        return '[missing-placeholder-debug]'
      }
    })
    const actual = instance.translate('greetings.name')
    expect(actual).toEqual('Hello [missing-placeholder-debug]!')
  })
})
