import template from '@pluginjs/template'
// import { addClass, removeClass } from '@pluginjs/classes'
import {
  query,
  // queryAll,
  parseHTML,
  // closest,
  insertAfter
  // setData,
  // getData
} from '@pluginjs/dom'
// import { bindEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import Dropdown from '@pluginjs/dropdown'

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
      bgSize: this.instance.translate('bgSize')
    })

    this.$Size = parseHTML(html)
    insertAfter(this.$Size, this.instance.$imageWrap)

    this.$size = query(`.${this.instance.classes.SIZE}`, this.instance.$Panel)

    this.$trigger = query(`.${this.instance.classes.SIZETRIGGER}`, this.$size)
    const data = this.values.map(val => ({ label: val, value: val }))
    const that = this
    this.$sizeDropdown = Dropdown.of(this.$trigger, {
      imitateSelect: true,
      data,
      value: this.defaultValue,
      keyboard: true,
      onChange: val => {
        if (that.instance.disabled) {
          return
        }
        this.instance.value.size = val
        setStyle('background-size', val, this.instance.$image)
        setStyle('background-size', val, this.instance.$fillImage)
      }
    })
  }

  set(val) {
    this.$sizeDropdown.set(val)
  }

  clear() {
    this.$sizeDropdown.set(this.defaultValue)
  }
}
