import { bindEvent } from '@pluginjs/events'
import { addClass, hasClass } from '@pluginjs/classes'
import {
  parseHTML,
  queryAll,
  parentWith,
  getData
  // parent,
  // query,
  // children
} from '@pluginjs/dom'
import { getStyle, setStyle } from '@pluginjs/styled'

class History {
  constructor(instance, element) {
    this.instance = instance
    this.classes = this.instance.classes
    this.element = element

    this.prevColor = null
    this.colors = []
    this.count = 0
    this.build()
    this.bind()
  }
  build() {
    for (let i = 0; i < 18; i++) {
      const $item = `<span class='${this.classes.HISTORYITEM}'></span>`
      this.element.append(parseHTML($item))
    }

    this.$items = queryAll(`.${this.classes.HISTORYITEM}`, this.element)
  }

  bind() {
    const that = this

    bindEvent(
      this.instance.selfEventName('update'),
      (e, el, color) => {
        if (!color) {
          return false
        }

        if (this.prevColor === color) {
          return false
        }
        this.prevColor = color
        this.update(this.prevColor)

        return null
      },
      this.instance.element
    )

    bindEvent(
      this.instance.eventName('click'),
      `.${this.classes.HISTORYITEM}`,
      ({ target }) => { /* eslint-disable-line */
        const el = target.matches(`.${this.classes.HISTORYITEM}`)
          ? target
          : parentWith(hasClass(this.classes.HISTORYITEM), target)
        if (getStyle('cursor', el) === 'not-allowed') {
          return false
        }
        const color = getStyle('background-color', el)
        if (this.instance.is('gradientModule')) {
          if (this.instance.is('SelectedMarker')) {
            this.instance.GRADIENT.setGradientColor(
              color,
              getData('value', this.instance.$marker).index
            )
          }
        } else {
          that.instance.SOLID.setSolid(color)
        }
      },
      this.element
    )
  }

  update(color) {
    if (this.colors.indexOf(color) === -1) {
      this.colors.push(color)
      this.count++

      if (this.count >= 18) {
        this.colors.shift()
      }
      this.$items.forEach((v, i) => {
        setStyle('background', this.colors[this.colors.length - 1 - i], v)
        if (i < this.count) {
          addClass(this.classes.HISTORYITEMEMPTY, v)
        }
      })
    }
  }
}

export default History
