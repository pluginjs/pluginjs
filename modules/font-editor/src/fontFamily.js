import template from '@pluginjs/template'
import FontPicker from '@pluginjs/font-picker'
import { parseHTML, query } from '@pluginjs/dom'

export default class FontFamily {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.fontFamily.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.fontFamily.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'fontFamily'
      ),
      typeface: this.instance.translate('typeface')
    })
    this.$wrap = parseHTML(html)

    this.$content = query(`.${this.instance.classes.FIELDCONTENT}`, this.$wrap)
    this.element = query(`.${this.instance.classes.FONTPICKER}`, this.$content)

    const options = {}

    if (this.instance.options.fontFamily.source) {
      options.source = this.instance.options.fontFamily.source
    }

    this.FONTPICKER = FontPicker.of(this.element, {
      ...options,
      keyboard: true,
      clearable: true,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
  
        this.instance.value.fontFamily = value ? JSON.parse(value) : "inherit"
      }
    })
  }

  set(value) {
    this.FONTPICKER.set(value && value !== "inherit" ? value : null)
  }

  clear() {
    this.instance.value.fontFamily = ""
    this.set(null)
  }
}
