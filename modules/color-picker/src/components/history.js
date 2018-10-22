import { bindEvent } from '@pluginjs/events'
import { addClass, hasClass } from '@pluginjs/classes'
import { parseHTML, queryAll, parentWith } from '@pluginjs/dom'
import { getStyle, setStyle } from '@pluginjs/styled'

const colors = []
let count = 0

class History {
  constructor(instance, element) {
    this.instance = instance
    this.classes = this.instance.classes
    this.element = element
    this.prevColor = null
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
        that.instance.setColor(color)
      },
      this.element
    )
  }

  set(color) {
    if (this.prevColor === color) {
      return false
    }
    this.prevColor = color
    this.update(this.prevColor)

    return null
  }

  update(color) {
    if (colors.indexOf(color) === -1) {
      colors.push(color)
      count++
      this.updateHistory()
    }
  }

  updateHistory() {
    if (count >= 18) {
      colors.shift()
    }
    this.$items.forEach((v, i) => {
      setStyle('background', colors[colors.length - 1 - i], v)
      if (i < count) {
        addClass(this.classes.HISTORYITEMEMPTY, v)
      }
    })
  }
}

export default History
