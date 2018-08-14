import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  query,
  queryAll,
  parseHTML,
  closest,
  insertAfter,
  setData,
  getData
} from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'

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

    this.$size = query(
      `.${this.instance.classes.SIZE}`,
      this.instance.$expandPanel
    )
    this.$items = queryAll('li', this.$size)

    this.values.forEach((value, key) => {
      // this.$items[key].dataset.size = value
      setData('size', value, this.$items[key])
    })

    const value =
      typeof this.instance.value.size !== 'undefined'
        ? this.instance.value.size
        : this.defaultValue
    this.set(value)

    this.bind()
  }

  set(value) {
    let found = false
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    for (let i = 0; i < this.values.length; i++) {
      if (value === this.values[i]) {
        this.instance.value.size = value
        addClass(this.instance.classes.ACTIVE, this.$items[i])
        setStyle('background-size', value, this.instance.$image)
        setStyle('background-size', value, this.instance.$fillImage)
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

  bind() {
    bindEvent(
      {
        type: 'click',
        identity: { type: 'tagName', value: 'li' },
        handler: ({ target }) => {
          const el = target.tagName === 'LI' ? target : closest('LI', target)
          if (this.instance.disabled) {
            return null
          }
          const value = getData('size', el)
          this.set(value)
          // that.instance.update();
          return false
        }
      },
      this.$size
    )
  }
}
