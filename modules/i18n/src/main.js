import { getValueByPath, deepMerge } from '@pluginjs/utils'
import template from '@pluginjs/template'

class I18N {
  constructor(defaults, translations) {
    this.defaults = deepMerge(I18N.defaults, defaults)
    this.translations = translations ? translations : {}
  }

  hasTranslation(locale) {
    return locale in this.translations
  }

  addTranslation(locale, translation) {
    if (this.translations[locale]) {
      Object.assign(this.translations[locale], translation)
    } else {
      this.translations[locale] = translation
    }
  }

  getTranslation(locale) {
    if (this.translations[locale]) {
      return this.translations[locale]
    }
    return {}
  }

  instance(options = {}) {
    const that = this

    const _options = deepMerge(that.defaults, options)
    let _locale = _options.locale
    function getMessage(key, locale) {
      const translation = that.getTranslation(locale)
      const message = getValueByPath(translation, key)

      return message
    }

    return {
      translate(key, args = {}, locale = _locale) {
        let message = getMessage(key, locale)
        if (typeof message === 'undefined' && _options.fallbacks) {
          const locales = locale.split('-')
          if (locales.length > 1 && that.hasTranslation(locales[0])) {
            message = getMessage(key, locales[0])
          }

          if (typeof message === 'undefined') {
            let fallbackLocale
            if (
              _options.fallbacks !== true &&
              that.hasTranslation(_options.fallbacks)
            ) {
              fallbackLocale = _options.fallbacks
            } else {
              fallbackLocale = that.defaults.locale
            }

            message = getMessage(key, fallbackLocale)
          }
        }

        if (
          Object.prototype.toString.call(message) === '[object Array]' &&
          message.length >= 2
        ) {
          if (typeof args._number === 'string') {
            if (typeof args[args._number] !== 'undefined') {
              const _number = parseInt(args[args._number], 10)

              if (_number === 1) {
                message = message[0]
              } else if (_number > 1) {
                message = message[1]
              } else if (_number === 0 && message.length >= 3) {
                message = message[2]
              }
            }
          }
        }

        if (typeof message === 'string') {
          const parsed = template.parse(message)
          if (!parsed) {
            return message
          }
          let key
          for (let i = 0; i < parsed.length; i++) {
            key = parsed[i]
            if (typeof args[key] === 'undefined') {
              args[key] = _options.missingPlaceholder(key)
            } else if (args[key] === null) {
              args[key] = _options.nullPlaceholder(key)
            }
          }
          return template.render(message, args)
        }

        if (Object(message) === message) {
          return message
        }

        return `[missing "${locale}.${key}" translation]`
      },

      setLocale(locale) {
        _locale = locale
      },

      getLocale() {
        return _locale
      }
    }
  }

  setTranslations(translations) {
    this.translations = translations
  }
}

I18N.defaults = {
  locale: 'en',
  fallbacks: true,
  nullPlaceholder(key) {
    return `[missing {{${key}}} value]`
  },
  missingPlaceholder(key) {
    return `[missing {{${key}}} value]`
  }
}

export default I18N
