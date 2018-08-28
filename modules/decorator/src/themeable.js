import { isString } from '@pluginjs/is'

export default function themeable() {
  return function(plugin) {
    plugin.prototype.getThemeClass = function(themes, THEME) {
      if (
        typeof themes === 'undefined' &&
        typeof this.options !== 'undefined' &&
        isString(this.options.theme)
      ) {
        return this.getThemeClass(this.options.theme)
      }
      if (isString(themes)) {
        if (
          typeof THEME === 'undefined' &&
          typeof this.classes !== 'undefined'
        ) {
          THEME = this.classes.THEME
        }
        themes = themes.split(' ')

        if (THEME) {
          for (let i = 0; i < themes.length; i++) {
            themes[i] = THEME.replace('{theme}', themes[i])
          }
        } else {
          for (let i = 0; i < themes.length; i++) {
            themes[i] = this.getClass(themes[i])
          }
        }
        return themes.join(' ')
      }

      return ''
    }
  }
}
