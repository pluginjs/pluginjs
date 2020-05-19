import template from '@pluginjs/template'
import { parseHTML, query, setData, getData } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import Select from '@pluginjs/select'

export default class Attachment {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.attachment.values
    this.defaultValue = instance.options.attachment.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.attachment.template())({
      classes: this.instance.classes,
      field: this.instance.getClassName(
        this.instance.classes.NAMESPACE,
        'attachment'
      ),
      bgAttach: this.instance.translate('bgAttach')
    })

    this.$wrap = parseHTML(html)

    this.$select = query(`.${this.instance.classes.SELECTTRIGGER}`, this.$wrap)
    this.values = this.instance.options.attachment.values

    const data = this.values.map(val => ({ label: val, value: val }))
    const that = this
    this.$select.value = 'inherit'
    setData(
      'select',
      Select.of(this.$select, {
        source: data,
        keyboard: true,
        onChange(value) {  /* eslint-disable-line */
          if (that.instance.is('disabled')) {
            return
          }

          that.instance.value.attachment = value
          
          setStyle(
            'background-attachment',
            that.instance.value.attachment,
            that.instance.$image
          )

          setStyle(
            'background-attachment',
            that.instance.value.attachment,
            that.instance.TRIGGER.$fillImage
          )
        }
      }),
      this.$select
    )
  }

  set(val) {
    getData('select', this.$select).set(val)
  }

  clear() {
    getData('select', this.$select).set(this.defaultValue)
  }
}
