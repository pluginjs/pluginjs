import template from '@pluginjs/template'
import {
  parseHTML,
  insertAfter,
  query,
  queryAll,
  setData,
  getData
} from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'

export default class Attachment {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.attachment.values
    this.defaultValue = instance.options.attachment.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.attachment.template())({
      attachNamespace: this.instance.options.attachment.namespace,
      classes: this.instance.classes,
      bgAttach: this.instance.translate('bgAttach')
    })

    this.$Attachment = parseHTML(html)
    insertAfter(this.$Attachment, this.instance.$imageWrap)

    this.$attachment = query(
      `.${this.instance.classes.ATTACHMENT}`,
      this.instance.$expandPanel
    )
    // console.log(this.$attachment)
    this.$dropdown = query(
      `.${this.instance.options.attachment.namespace}`,
      this.instance.$expandPanel
    )
    this.$attachTrigger = query('.pj-dropdown-trigger', this.$dropdown)
    this.values = this.instance.options.attachment.values
    const data = this.values.map(value => ({ label: value }))

    const that = this

    setData(
      'dropdown',
      Dropdown.of(this.$attachTrigger, {
        imitateSelect: true,
        data,
        width: this.$dropdown,
        icon: 'icon-char icon-chevron-down',
        exclusive: false,
        classes: {
          panel: `pj-dropdown-panel ${
            this.instance.classes.NAMESPACE
          }-dropdown-panel`
        },
        onChange(value) {
          if (that.instance.disabled) {
            return
          }
          that.instance.value.attachment = getData('value', value)
          setStyle(
            'background-attachment',
            that.instance.value.attachment,
            that.instance.$image
          )
          setStyle(
            'background-attachment',
            that.instance.value.attachment,
            that.instance.$fillImage
          )
        }
      }),
      this.$dropdown
    )

    this.$items = queryAll('.pj-dropdown-item', this.$attachment)
    console.log(this.$items)
    const value =
      typeof this.instance.value.attachment !== 'undefined'
        ? this.instance.value.attachment
        : this.defaultValue
    this.set(value)
  }

  set(value) {
    let found = false
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    for (let i = 0; i < this.values.length; i++) {
      if (value === this.values[i]) {
        const activeItem = this.$items.map( /* eslint-disable-line */
          addClass(this.instance.classes.ACTIVE)
        )
        // getData('dropdown', this.$dropdown).selectItem(activeItem)
        found = true
      }
    }

    if (!found) {
      this.set(this.defaultValue)
    }
  }

  clear() {
    this.set(this.defaultValue)
  }
}
