import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { parseHTML, queryAll } from '@pluginjs/dom'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'

export default class TextDecoration {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.textDecoration.values
    this.defaultValue = instance.options.textDecoration.value

    this.emptyize()
  }

  emptyize() {
    const that = this
    const html = template.compile(
      this.instance.options.textDecoration.template()
    )({ classes: this.instance.classes })
    this.$TextDecoration = parseHTML(html)
    this.instance.$typoDecorations.append(...this.$TextDecoration)

    this.$items = queryAll(
      `.${this.instance.classes.TEXTDECORATION}`,
      this.instance.$expandPanel
    )

    this.values.forEach((value, key) => {
      if (that.$items[key]) {
        that.$items[key].dataset.textDecoration = value
      }
    })

    const value = !is.undefined(this.instance.value.textDecoration)
      ? this.instance.value.textDecoration
      : this.defaultValue
    this.set(value)

    this.bind()
  }

  set(value) {
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    if (value === '') {
      this.instance.value.textDecoration = this.defaultValue
    } else {
      for (let i = 0; i < this.values.length; i++) {
        if (value === this.values[i]) {
          this.instance.value.textDecoration = value
          addClass(this.instance.classes.ACTIVE, this.$items[i])
        }
      }
    }
  }

  clear() {
    this.set(this.defaultValue)
  }

  bind() {
    const that = this
    this.$items.map(
      bindEvent({
        type: 'click',
        handler: ({ target }) => {
          if (that.instance.is('disabled')) {
            return null
          }

          const decoration = target.dataset.textDecoration
          if (hasClass(that.instance.classes.ACTIVE, target)) {
            removeClass(that.instance.classes.ACTIVE, target)
            that.instance.value.textDecoration =
              that.instance.options.textDecoration.defaultValue
          } else {
            that.set(decoration)
          }

          return null
        }
      })
    )
  }
}
