import I18N from '../../src'
import translations from './fixtures/translations'

describe('I18N', () => {
  it('should have I18N', () => {
    expect(I18N).to.be.an('function')
  })

  describe('constructor()', () => {
    it('should use defaults if no args', () => {
      const i18n = new I18N()

      expect(i18n.defaults).to.be.eql(I18N.defaults)
    })

    it('should override defaults', () => {
      const i18n = new I18N({ locale: 'zh-cn' })

      expect(i18n.defaults.locale).to.be.equal('zh-cn')
    })

    it('should have no translations if no args', () => {
      const i18n = new I18N()

      expect(i18n.translations).to.be.eql({})
    })

    it('should set translations with second arg', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N({}, translations)

      expect(i18n.translations).to.be.eql(translations)
    })
  })

  describe('setTranslations()', () => {
    it('should set translations', () => {
      const i18n = new I18N()

      expect(i18n.translations).to.be.eql({})

      const translations = { en: { hello: 'hello' } }

      i18n.setTranslations(translations)
      expect(i18n.translations).to.be.eql(translations)
    })

    it('should replace the translations', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N({}, translations)

      expect(i18n.translations).to.be.eql(translations)

      i18n.setTranslations({})
      expect(i18n.translations).to.be.eql({})
    })
  })

  describe('addTranslation()', () => {
    it('should add translation', () => {
      const i18n = new I18N()

      expect(i18n.translations).to.be.eql({})

      i18n.addTranslation('en', { hello: 'hello' })

      expect(i18n.getTranslation('en')).to.be.eql({ hello: 'hello' })

      expect(i18n.translations).to.be.eql({ en: { hello: 'hello' } })
    })

    it('should extends translation', () => {
      const i18n = new I18N()

      i18n.setTranslations({
        en: {
          hello: 'hello',
          foo: { bar: 'qux' }
        }
      })

      i18n.addTranslation('en', { foo: { bar: 'bar' } })

      expect(i18n.getTranslation('en')).to.be.eql({
        hello: 'hello',
        foo: { bar: 'bar' }
      })
    })
  })

  describe('getTranslation()', () => {
    it('should get translation by locale', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N()
      i18n.setTranslations(translations)

      expect(i18n.getTranslation('en')).to.be.eql(translations.en)
    })

    it('should get empty object if no translation', () => {
      const translations = { en: { hello: 'hello' } }
      const i18n = new I18N()
      i18n.setTranslations(translations)

      expect(i18n.getTranslation('zh-cn')).to.be.eql({})
    })
  })

  describe('instance()', () => {
    it('should get instance', () => {
      const i18n = new I18N()
      const instance = i18n.instance()

      expect(instance).to.be.an('object')
    })

    describe('getLocale()', () => {
      it('should use I18N defaults if no options set', () => {
        const i18n = new I18N()
        const instance = i18n.instance()

        expect(instance.getLocale()).to.be.equal(I18N.defaults.locale)
      })

      it('should use defaults if no options set', () => {
        const i18n = new I18N({ locale: 'zh-cn' })
        const instance = i18n.instance()

        expect(instance.getLocale()).to.be.equal('zh-cn')
      })

      it('should override locale using options', () => {
        const i18n = new I18N()
        const instance = i18n.instance({ locale: 'zh-cn' })

        expect(instance.getLocale()).to.be.equal('zh-cn')
      })
    })

    describe('setLocale()', () => {
      it('should set locale', () => {
        const i18n = new I18N()
        const instance = i18n.instance()

        instance.setLocale('zh-cn')

        expect(instance.getLocale()).to.be.equal('zh-cn')
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

  it('should returns translation for single scope', () => {
    expect(instance.translate('hello')).to.be.equal('Hello World!')
  })

  it('should returns translation as object', () => {
    expect(instance.translate('greetings')).to.be.equal(
      i18n.translations.en.greetings
    )
  })

  it('should returns missing message translation for invalid scope', () => {
    const actual = instance.translate('invalid.scope')
    const expected = '[missing "en.invalid.scope" translation]'
    expect(actual).to.be.equal(expected)
  })

  it('should returns missing message translation with provided locale for invalid scope', () => {
    instance.setLocale('ja')
    const actual = instance.translate('invalid.scope')
    const expected = '[missing "ja.invalid.scope" translation]'
    expect(actual).to.be.equal(expected)
  })

  it('should returns translation for single scope on a custom locale', () => {
    instance.setLocale('pt-BR')
    expect(instance.translate('hello')).to.be.equal('Olá Mundo!')
  })

  it('should returns translation for multiple scopes', () => {
    expect(instance.translate('greetings.stranger')).to.be.equal(
      'Hello stranger!'
    )
  })

  it('should fallbacks to the default locale when I18N.fallbackss is enabled', () => {
    instance = i18n.instance({
      locale: 'pt-BR',
      fallbacks: true
    })
    expect(instance.translate('greetings.stranger')).to.be.equal(
      'Hello stranger!'
    )
  })

  it('should returns translation with locale option', () => {
    expect(instance.translate('hello', {}, 'en')).to.be.equal('Hello World!')
    expect(instance.translate('hello', {}, 'pt-BR')).to.be.equal('Olá Mundo!')
  })

  it('should fallbacks to default locale when providing an unknown locale', () => {
    instance = i18n.instance({
      locale: 'fr',
      fallbacks: true
    })
    expect(instance.translate('greetings.stranger')).to.be.equal(
      'Hello stranger!'
    )
  })

  it('should fallbacks to less specific locale', () => {
    instance = i18n.instance({
      locale: 'de-DE',
      fallbacks: true
    })
    expect(instance.translate('hello')).to.be.equal('Hallo Welt!')
  })

  it('should fallbacks using custom rules (function)', () => {
    instance = i18n.instance({
      locale: 'no',
      fallbacks: 'nb'
    })

    expect(instance.translate('hello')).to.be.equal('Hei Verden!')
  })
})

describe('Interpolation', () => {
  let actual, expected

  let i18n
  let instance

  beforeEach(() => {
    i18n = new I18N()
    i18n.setTranslations(translations)
    instance = i18n.instance()
  })

  it('performs single interpolation', () => {
    const actual = instance.translate('greetings.name', { name: 'John Doe' })
    expect(actual).to.be.equal('Hello John Doe!')
  })

  it('should performs multiple interpolations', () => {
    const actual = instance.translate('profile.details', {
      name: 'John Doe',
      age: 27
    })
    expect(actual).to.be.equal('John Doe is 27-years old')
  })

  describe('Pluralization', () => {
    let translation_key

    describe('when count is passed in', () => {
      describe('and translation key does contain pluralization', () => {
        beforeEach(() => {
          translation_key = 'inbox'
        })

        it('return translated and pluralized string', () => {
          expect(
            instance.translate(translation_key, {
              count: 0,
              _number: 'count'
            })
          ).to.be.equal('You have no messages')

          expect(
            instance.translate(translation_key, {
              count: 1,
              _number: 'count'
            })
          ).to.be.equal('You have 1 message')

          expect(
            instance.translate(translation_key, {
              count: 5,
              _number: 'count'
            })
          ).to.be.equal('You have 5 messages')
        })
      })

      describe('and translation key does NOT contain pluralization', () => {
        beforeEach(() => {
          translation_key = 'hello'
        })

        it('should return translated string ONLY', () => {
          expect(
            instance.translate(translation_key, {
              count: 0,
              _number: 'count'
            })
          ).to.be.equal('Hello World!')

          expect(
            instance.translate(translation_key, {
              count: 1,
              _number: 'count'
            })
          ).to.be.equal('Hello World!')

          expect(
            instance.translate(translation_key, {
              count: 5,
              _number: 'count'
            })
          ).to.be.equal('Hello World!')
        })
      })

      describe('and translation key does contain pluralization with null content', () => {
        beforeEach(() => {
          translation_key = 'sent'
        })

        it('should return empty string', () => {
          expect(
            instance.translate(translation_key, {
              count: 0,
              _number: 'count'
            })
          ).to.be.equal('[missing "en.sent" translation]')

          expect(
            instance.translate(translation_key, {
              count: 1,
              _number: 'count'
            })
          ).to.be.equal('[missing "en.sent" translation]')

          expect(
            instance.translate(translation_key, {
              count: 5,
              _number: 'count'
            })
          ).to.be.equal('[missing "en.sent" translation]')
        })
      })
    })

    describe('when count is NOT passed in', () => {
      describe('and translation key does contain pluralization', () => {
        beforeEach(() => {
          translation_key = 'inbox'
        })

        const expected_translation_object = [
          'You have {count} message',
          'You have {count} messages',
          'You have no messages'
        ]

        it('return translated and pluralized string', () => {
          expect(
            instance.translate(translation_key, {
              not_count: 0,
              _number: 'count'
            })
          ).to.be.eql(expected_translation_object)

          expect(
            instance.translate(translation_key, {
              not_count: 1,
              _number: 'count'
            })
          ).to.be.eql(expected_translation_object)

          expect(
            instance.translate(translation_key, {
              not_count: 5,
              _number: 'count'
            })
          ).to.be.eql(expected_translation_object)
        })
      })

      describe('and translation key does NOT contain pluralization', () => {
        beforeEach(() => {
          translation_key = 'hello'
        })

        it('return translated string ONLY', () => {
          expect(
            instance.translate(translation_key, {
              not_count: 0,
              _number: 'count'
            })
          ).to.be.equal('Hello World!')

          expect(
            instance.translate(translation_key, {
              not_count: 1,
              _number: 'count'
            })
          ).to.be.equal('Hello World!')

          expect(
            instance.translate(translation_key, {
              not_count: 5,
              _number: 'count'
            })
          ).to.be.equal('Hello World!')
        })
      })
    })
  })

  it('outputs missing placeholder message if interpolation value is missing', () => {
    const actual = instance.translate('greetings.name')
    expect(actual).to.be.equal('Hello [missing {{name}} value]!')
  })

  it('outputs missing placeholder message if interpolation value is null', () => {
    const actual = instance.translate('greetings.name', { name: null })
    expect(actual).to.be.equal('Hello [missing {{name}} value]!')
  })

  it('allows overriding the null placeholder message', () => {
    instance = i18n.instance({
      nullPlaceholder() {
        return ''
      }
    })
    const actual = instance.translate('greetings.name', { name: null })
    expect(actual).to.be.equal('Hello !')
  })

  it('allows overriding the missing placeholder message', () => {
    instance = i18n.instance({
      missingPlaceholder() {
        return '[missing-placeholder-debug]'
      }
    })
    const actual = instance.translate('greetings.name')
    expect(actual).to.be.equal('Hello [missing-placeholder-debug]!')
  })
})
