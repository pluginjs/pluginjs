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
    // this.$attachTrigger = query('span', this.$select)
    this.values = this.instance.options.attachment.values

    const data = this.values.map(val => ({ label: val, value: val }))
    const that = this
    setData(
      'select',
      Select.of(this.$select, {
        value: 'inherit',
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

    // this.$items = queryAll('.pj-select-item', this.$attachment)
    // const value =
    //   typeof this.instance.value.attachment !== 'undefined'
    //     ? this.instance.value.attachment
    //     : this.defaultValue
    // this.set(value)
  }

  // set(value) {
  //   let found = false
  //   this.$items.map(removeClass(this.instance.classes.ACTIVE))
  //   // console.log(getData('select', this.$select))
  //   for (let i = 0; i < this.values.length; i++) {
  //     if (value === this.values[i]) {
  //       const activeItem = this.$items.map(
  //         addClass(this.instance.classes.ACTIVE)
  //       )
  //       getData('select', this.$select).set(activeItem)
  //       found = true
  //     }
  //   }

  //   if (!found) {
  //     this.set(this.defaultValue)
  //   }
  // }
  set(val) {
    getData('select', this.$select).set(val)
  }

  clear() {
    getData('select', this.$select).set(this.defaultValue)
  }
}
