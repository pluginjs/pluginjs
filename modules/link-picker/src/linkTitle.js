import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
export default class LinkTitle {
  constructor(instance) {
    this.instance = instance
    this.value = instance.value.linkTitle
    this.defaultValue = instance.options.linkTitle.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.linkTitle.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'linkTitle'
      ),
      linkTitle: this.instance.translate('linkTitle')
    })
    this.$wrap = parseHTML(html)
    this.$content = query('.pj-input', this.$wrap)
    bindEvent(
      this.instance.eventName('change'),
      () => {
        this.instance.value.title = this.$content.value
        console.log(111)
        return
      },
      this.$content
    )
  }

  set(value) {
    this.instance.value.title = value
    this.$content.value = value
  }

  clear() {
    this.set(this.defaultValue)
  }
}
