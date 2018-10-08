import template from '@pluginjs/template'
import Select from '@pluginjs/select'
import { parseHTML, query } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'

export default class Type {
  constructor(instance) {
    this.instance = instance
    this.value = instance.value.type
    this.defaultValue = instance.options.type.value
    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.type.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'type'
      ),
      type: this.instance.translate('type')
    })
    this.$wrap = parseHTML(html)
    this.$content = query(`.${this.instance.classes.FIELDCONTENT}`, this.$wrap)
    this.element = query(
      `.${this.instance.classes.SELECTTRIGGER}`,
      this.$content
    )
    this.SELECT = Select.of(this.element, {
      value: this.instance.value.type,
      source: this.instance.options.source,
      keyboard: true,
      onChange: value => {
        if (this.instance.is('disabled')) {
          return
        }
        this.instance.value.type = value
        if (this.instance.value.type === 'internal') {
          addClass(
            `${this.instance.classes.TYPESHOW}`,
            query('.pj-linkPicker-internal', this.instance.$dropdown)
          )
          removeClass(
            `${this.instance.classes.TYPESHOW}`,
            query('.pj-linkPicker-external', this.instance.$dropdown)
          )
        } else {
          removeClass(
            `${this.instance.classes.TYPESHOW}`,
            query('.pj-linkPicker-internal', this.instance.$dropdown)
          )
          addClass(
            `${this.instance.classes.TYPESHOW}`,
            query('.pj-linkPicker-external', this.instance.$dropdown)
          )
        }
      }
    })
  }

  set(value) {
    if (!value) {
      this.SELECT.select('internal')
      this.instance.value.type = 'internal'
    } else {
      this.SELECT.select(value)
      this.instance.value.type = value
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
