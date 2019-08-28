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

    this.$wrap = parseHTML(html)

    this.$content = query(`.${this.instance.classes.FIELDCONTENT}`, this.$wrap)
    this.element = query(
      `.${this.instance.classes.SELECTTRIGGER}`,
      this.$content
    )

    this.initSelect()
  }

  initSelect() {
    this.element.value = this.instance.value.fontWeight
    this.SELECT = Select.of(this.element, {
      keyboard: true,
      source: resolve => {
        const data = []
        Object.entries(this.values).forEach(([i, v]) => {
          data[i] = { label: v, value: v }
        })
        resolve(data)
      },
      // value: this.instance.value.fontWeight,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
        // that.instance.update()
        this.set(value)
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
