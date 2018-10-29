import template from '@pluginjs/template'
import { parseHTML, query } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
export default class Title {
  constructor(instance) {
    this.instance = instance
    this.value = instance.value.title
    this.defaultValue = instance.options.title.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.title.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'title'
      ),
      title: this.instance.translate('title')
    })
    this.$wrap = parseHTML(html)
    this.$content = query('.pj-input', this.$wrap)
    bindEvent(
      this.instance.eventName('change'),
      () => {
        this.instance.value.title = this.$content.value

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
    this.set('')
  }
}
