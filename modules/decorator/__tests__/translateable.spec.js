import translateable from '../src/translateable'
import register from '../src/register'
import Component from '@pluginjs/component'
import optionable from '../src/optionable'

const TRANSLATIONS = {
  en: {
    hello: 'Hello World!',

    greetings: {
      stranger: 'Hello stranger!',
      name: 'Hello {name}!'
    },

    inbox: [
      'You have {count} message',
      'You have {count} messages',
      'You have no messages'
    ]
  },
  zh: {
    hello: '世界你好!',

    greetings: {
      stranger: '陌生人你好!',
      name: '{name}你好!'
    },

    inbox: ['你有 {count} 条消息', '你有 {count} 条消息', '你没有消息']
  }
}
const DEFAULTS = {
  locale: 'en',
  localeFallbacks: true
}

@translateable(TRANSLATIONS)
@optionable(DEFAULTS)
@register('sample')
class Sample extends Component {
  constructor(element, options) {
    super(element)
    this.setupOptions(options)
    this.setupI18n()
  }
}

describe('translateable()', () => {
  describe('i18n', () => {
    it('should have I18N', () => {
      expect(Sample.I18N).toBeObject()
    })

    it('should add translation', () => {
      Sample.I18N.addTranslation('tw', {
        hello: '世界妳好!'
      })

      const el = document.createElement('div')
      const api = Sample.of(el, {
        locale: 'tw'
      })

      expect(api.translate('hello')).toBe('世界妳好!')
    })
  })

  describe('getLocale()', () => {
    it('should return current locale', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        locale: 'zh'
      })

      expect(api.getLocale()).toBe('zh')
    })
  })

  describe('translate()', () => {
    it('should translate the string', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        locale: 'zh'
      })

      expect(api.translate('hello')).toBe('世界你好!')
    })

    it('should translate the string with arg', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(
        api.translate('greetings.name', {
          name: 'John'
        })
      ).toBe('Hello John!')
    })

    it('should fallback to default locale when locale undefined', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        locale: 'pt'
      })

      expect(api.translate('hello')).toBe('Hello World!')
    })

    describe('Pluralization', () => {
      it('should return translated and pluralized string', () => {
        const el = document.createElement('div')
        const api = Sample.of(el)

        expect(
          api.translate('inbox', {
            count: 0,
            _number: 'count'
          })
        ).toBe('You have no messages')

        expect(
          api.translate('inbox', {
            count: 1,
            _number: 'count'
          })
        ).toBe('You have 1 message')

        expect(
          api.translate('inbox', {
            count: 2,
            _number: 'count'
          })
        ).toBe('You have 2 messages')
      })
    })
  })
})
