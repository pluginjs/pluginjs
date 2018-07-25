import is from '@pluginjs/is'
import template from '@pluginjs/template'
import {
  parseHTML,
  insertAfter,
  query,
  queryAll,
  parentWith
} from '@pluginjs/dom'
import { removeClass, addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'

export default class Repeat {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.repeat.values
    this.defaultValue = instance.options.repeat.defaultValue

    this.initialize()
  }

  initialize() {
    const html = template.compile(this.instance.options.repeat.template())({
      classes: this.instance.classes,
      bgRepeat: this.instance.translate('bgRepeat')
    })
    this.$Repeat = parseHTML(html)
    insertAfter(this.$Repeat, this.instance.$imageWrap)

    this.$repeat = query(
      `.${this.instance.classes.REPEAT}`,
      this.instance.$expandPanel
    )
    this.$items = queryAll('li', this.$repeat)

    this.values.forEach((value, key) => {
      this.$items[key].dataset.repeat = value
    })

    const value = !is.undefined(this.instance.value.repeat)
      ? this.instance.value.repeat
      : this.defaultValue
    this.set(value)
    this.bind()
  }

  set(value) {
    let found = false
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    for (let i = 0; i < this.values.length; i++) {
      if (value === this.values[i]) {
        this.instance.value.repeat = value
        addClass(this.instance.classes.ACTIVE, this.$items[i])
        setStyle({ 'background-repeat': value }, this.instance.$image)
        setStyle({ 'background-repeat': value }, this.instance.$fillImage)
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
          const el =
            target.tagName === 'LI'
              ? target
              : parentWith(el => el.tagName === 'LI', target)
          if (this.instance.disabled) {
            return null
          }
          const value = el.dataset.repeat
          this.set(value)
          // that.instance.update();
          return false
        }
      },
      this.$repeat
    )
  }
}
