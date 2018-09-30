import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
export default class External {
  constructor(instance) {
    this.instance = instance
    // this.values = instance.options.external.values
    this.value = instance.value.external
    this.defaultValue = instance.options.external.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.external.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'external'
      ),
      external: this.instance.translate('external')
    })
    this.$wrap = parseHTML(html)
    this.$content = query('.pj-input', this.$wrap)
    bindEvent(
      this.instance.eventName('change'),
      () => {
        this.instance.value.external = this.$content.value
        return
      },
      this.$content
    )
  }

  set(value) {
    this.instance.value.external = value
    this.$content.value = value
  }

  clear() {
    this.set('')
  }
}
