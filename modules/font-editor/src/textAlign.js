import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { parseHTML, query, insertBefore, queryAll } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { hasClass, addClass, removeClass } from '@pluginjs/classes'

export default class TextAlign {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.textAlign.values
    this.defaultValue = instance.options.textAlign.value

    this.initialize()
  }

  initialize() {
    const that = this

    const html = template.compile(this.instance.options.textAlign.template())({
      namespace: this.instance.classes.NAMESPACE
    })
    this.$TextAlign = parseHTML(html)
    insertBefore(this.$TextAlign, this.instance.$expandControl)

    this.instance.$typoDecorations = query(
      `.${this.instance.classes.NAMESPACE}-decorations`,
      this.instance.$expandPanel
    )
    this.$items = queryAll(
      `.${this.instance.classes.NAMESPACE}-textAlign`,
      this.instance.$typoDecorations
    )

    this.values.forEach((value, key) => {
      that.$items[key].dataset.textAlign = value
    })

    const value = !is.undefined(this.instance.value.textAlign)
      ? this.instance.value.textAlign
      : this.defaultValue
    this.set(value)

    this.bind()
  }

  set(value) {
    let found = false
    this.$items.map(removeClass(this.instance.classes.ACTIVE))
    if (value === '') {
      this.instance.value.textAlign = ''
      found = true
    } else {
      for (let i = 0; i < this.values.length; i++) {
        if (value === this.values[i]) {
          this.instance.value.textAlign = value
          addClass(this.instance.classes.ACTIVE, this.$items[i])

          found = true
        }
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
    const that = this
    this.$items.map(
      bindEvent({
        type: 'click',
        handler: ({ target }) => {
          if (that.instance.is('disabled')) {
            return null
          }

          const align = target.dataset.textAlign
          if (hasClass(that.instance.classes.ACTIVE, target)) {
            removeClass(that.instance.classes.ACTIVE, target)
            that.instance.value.textAlign = this.defaultValue
          } else {
            that.set(align)
          }

          switch (that.instance.value.textAlign) {
            case 'left':
              that.instance.value.textAlign = 'flex-start'
              break
            case 'center':
              that.instance.value.textAlign = 'center'
              break
            case 'right':
              that.instance.value.textAlign = 'flex-end'
              break
            default:
              break
          }
          return null
        }
      })
    )
  }
}
