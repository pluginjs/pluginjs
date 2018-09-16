import template from '@pluginjs/template'
import Select from '@pluginjs/select'
import { query, parseHTML, insertBefore } from '@pluginjs/dom'
export default class FontWeight {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.fontWeight.values
    this.defaultValue = instance.options.fontWeight.value

    this.emptyize()
  }

  emptyize() {
    const html = template.compile(this.instance.options.fontWeight.template())({
      classes: this.instance.classes,
      weight: this.instance.translate('weight')
    })

    this.$FontWeight = parseHTML(html)
    insertBefore(this.$FontWeight, this.instance.$expandControl)

    this.$content = query(
      `.${this.instance.classes.FONTWEIGHTCONTENT}`,
      this.instance.$expandPanel
    )
    this.$select = query(
      `.${this.instance.classes.FONTWEIGHTDROPDOWN}`,
      this.instance.$expandPanel
    )
    this.$dropWeight = query('.pj-select-trigger', this.$select)

    this.initSelect()
  }

  initSelect() {
    this.SELECT = Select.of(this.$dropWeight, {
      keyboard: true,
      source: resolve => {
        const data = []
        Object.entries(this.values).forEach(([i, v]) => {
          data[i] = { label: v, value: v }
        })
        resolve(data)
      },
      value: this.instance.value.fontWeight,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
        // that.instance.update()
        this.instance.$fillFontName.style.fontWeight = value
      }
    })
  }

  set(value) {
    if (!value) {
      this.SELECT.select('inherit')
      this.instance.value.fontWeight = 'inherit'
    } else {
      this.SELECT.select(value)
      this.instance.value.fontWeight = value
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
