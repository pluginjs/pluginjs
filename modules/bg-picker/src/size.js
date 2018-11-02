import template from '@pluginjs/template'
import { query, parseHTML } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import Select from '@pluginjs/select'

export default class Size {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.size.values
    this.defaultValue = instance.options.size.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.size.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'size'
      ),
      bgSize: this.instance.translate('bgSize')
    })

    this.$wrap = parseHTML(html)

    this.$trigger = query(`.${this.instance.classes.SELECTTRIGGER}`, this.$wrap)
    const data = this.values.map(val => ({ label: val, value: val }))
    const that = this
    this.$trigger.value = this.defaultValue
    this.$sizeSelect = Select.of(this.$trigger, {
      source: data,
      keyboard: true,
      onChange: val => {
        if (that.instance.disabled) {
          return
        }
        this.instance.value.size = val
        setStyle('background-size', val, this.instance.$image)
        setStyle('background-size', val, this.instance.TRIGGER.$fillImage)
      }
    })
  }

  set(val) {
    this.$sizeSelect.set(val)
  }

  clear() {
    this.$sizeSelect.set(this.defaultValue)
  }
}
