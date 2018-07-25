import I18N from '@pluginjs/i18n'

export default function translateable(translations) {
  return function(plugin) {
    plugin.I18N = new I18N(
      {
        locale: plugin.defaults.locale,
        fallbacks: plugin.defaults.localeFallbacks
      },
      translations
    )
    Object.assign(plugin.prototype, {
      setupI18n() {
        this.i18n = plugin.I18N.instance({
          locale: this.options.locale,
          fallbacks: this.options.localeFallbacks
        })
      },
      translate(key, args) {
        return this.i18n.translate(key, args)
      },
      setLocale(locale) {
        return this.i18n.setLocale(locale)
      },
      getLocale() {
        return this.i18n.getLocale()
      }
    })
  }
}
