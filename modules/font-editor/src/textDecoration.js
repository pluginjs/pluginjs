import template from '@pluginjs/template'
import { parseHTML, queryAll } from '@pluginjs/dom'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import Tooltip from '@pluginjs/tooltip'

export default class TextDecoration {
  constructor(instance) {
    this.instance = instance
    this.values = instance.options.textDecoration.values
    this.defaultValue = instance.options.textDecoration.value

    this.initialize()
  }

  initialize() {
    const that = this
    const html = template.compile(
      this.instance.options.textDecoration.template()
    )({
      classes: this.instance.classes,
      underLine: this.instance.translate('underLine'),
      lineThrough: this.instance.translate('lineThrough')
    })
    this.$wrap = []
    for (let i = 0; i < parseHTML(html).children.length; i++) {
      this.$wrap.push(parseHTML(html).children[i])
    }
    this.instance.$typoDecorations.append(...this.$wrap)

    this.$items = queryAll(
      `.${this.instance.classes.TEXTDECORATION}`,
      this.instance.$typoDecorations
    )

    for (let i = 0; i < this.$items.length; i++) {
      Tooltip.of(this.$items[i], {
        trigger: 'hover',
        title: '',
        placement: 'bottom'
      })
    }

    this.values.forEach((value, key) => {
      if (that.$items[key]) {
        that.$items[key].dataset.textDecoration = value
        // setData('textDecoration', value, that.$items[key])
      }
    })

    const value =
      typeof this.instance.value.textDecoration !== 'undefined'
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
      bindEvent(this.instance.eventName('click'), ({ target }) => {
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
      })
    )
  }
}
