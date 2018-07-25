import is from '@pluginjs/is'

export default function themeable() {
  return function(plugin) {
    plugin.prototype.getThemeClass = function(themes, THEME) {
      if (is.undefined(themes) && this.options.theme) {
        return this.getThemeClass(this.options.theme)
      }
      if (is.string(themes)) {
        if (is.undefined(THEME)) {
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
