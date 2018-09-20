import template from '@pluginjs/template'
import Select from '@pluginjs/select'
import { query, parseHTML } from '@pluginjs/dom'
export default class FontWeight {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.fontWeight.values
    this.defaultValue = instance.options.fontWeight.value

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.fontWeight.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'fontWeight'
      ),
      weight: this.instance.translate('weight')
    })

    this.$FontWeight = parseHTML(html)

    this.$content = query(
      `.${this.instance.classes.FONTWEIGHTCONTENT}`,
      this.$FontWeight
    )
    this.$select = query(
      `.${this.instance.classes.FONTWEIGHTSELECT}`,
      this.$FontWeight
    )
    this.$selectWeight = query(
      `.${this.instance.classes.SELECTTRIGGER}`,
      this.$select
    )

    this.initSelect()
  }

  initSelect() {
    this.SELECT = Select.of(this.$selectWeight, {
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
        this.instance.TRIGGER.$fillContentName.style.fontWeight = value
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
