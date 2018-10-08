import template from '@pluginjs/template'
import Select from '@pluginjs/select'
import { parseHTML, query } from '@pluginjs/dom'

export default class Target {
  constructor(instance) {
    this.instance = instance
    // this.values = instance.options.type.values
    // this.value = instance.value.type
    this.defaultValue = instance.options.target.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.target.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'target'
      ),
      openMode: this.instance.translate('openMode')
    })
    this.$wrap = parseHTML(html)
    this.$content = query(`.${this.instance.classes.FIELDCONTENT}`, this.$wrap)
    this.element = query(
      `.${this.instance.classes.SELECTTRIGGER}`,
      this.$content
    )
    this.SELECT = Select.of(this.element, {
      value: this.instance.value.target,
      source: this.instance.options.targetValue,
      keyboard: true,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
        this.instance.value.target = value
      }
    })
  }

  set(value) {
    if (!value) {
      this.SELECT.select('_self ')
      this.instance.value.fontWeight = '_self '
    } else {
      this.SELECT.select(value)
      this.instance.value.target = value
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
