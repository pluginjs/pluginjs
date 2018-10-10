import template from '@pluginjs/template'
import Cascader from '@pluginjs/cascader'
import { parseHTML, query } from '@pluginjs/dom'

export default class Internal {
  constructor(instance) {
    this.instance = instance
    this.defaultValue = instance.options.internal.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.internal.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'internal'
      ),
      internal: this.instance.translate('internal')
    })
    this.$wrap = parseHTML(html)
    this.$content = query(`.${this.instance.classes.FIELDCONTENT}`, this.$wrap)
    this.element = query(
      `.${this.instance.classes.CASCADERTRIGGER}`,
      this.$content
    )
    this.CASCADER = Cascader.of(this.element, {
      source: this.instance.options.internalValue,
      keyboard: true,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
        this.instance.value.internal = value
      }
    })
  }

  set(value) {
    if (!value) {
      // this.CASCADER.select(value)
      this.instance.value.internal = []
    } else {
      this.CASCADER.select(0, value[0])
      this.CASCADER.select(1, value[1])

      this.instance.value.internal = value
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
