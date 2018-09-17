import template from '@pluginjs/template'
import Select from '@pluginjs/select'
import { parseHTML, query, insertBefore } from '@pluginjs/dom'

export default class FontFamily {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.fontFamily.values
    this.value = instance.value.fontFamily

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.fontFamily.template())({
      classes: this.instance.classes,
      typeface: this.instance.translate('typeface')
    })

    this.$FontFamily = parseHTML(html)
    insertBefore(this.$FontFamily, this.instance.$expandControl)

    this.$content = query(
      `.${this.instance.classes.FONTFAMILYCONTENT}`,
      this.instance.$expandPanel
    )
    this.$select = query(
      `.${this.instance.classes.FONTFAMILYDROPDOWN}`,
      this.instance.$expandPanel
    )
    this.$dropFamily = query('.pj-select-trigger', this.$select)

    this.SELECT = Select.of(this.$dropFamily, {
      value: this.instance.value.fontFamily,
      source: resolve => {
        const data = []
        Object.entries(this.values).forEach(([i, v]) => {
          data[i] = { label: v, value: v }
        })
        resolve(data)
      },
      keyboard: true,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
        this.instance.value.fontFamily = value
      }
    })
  }

  set(value) {
    for (const key in this.values) {
      if (value === this.values[key]) {
        this.SELECT.select(value)
      }
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
