import { bindEvent } from '@pluginjs/events'
import { parseHTML, queryAll, parentWith } from '@pluginjs/dom'
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
    for (let i = 0; i < 12; i++) {
      const item = `<span class='${this.classes.HISTORYITEM}'></span>`
      this.element.append(parseHTML(item))
    }

    this.$items = queryAll(`.${this.classes.HISTORYITEM}`, this.element)
  }

  bind() {
    const that = this

    bindEvent(
      {
        type: this.instance.eventName('colorPicker:update'),
        handler: ({
          detail: {
            data: [color]
          }
        }) => {
          if (!color || this.instance.is('gradientModule')) {
            return false
          }

          if (this.prevColor === color) {
            return false
          }
          this.prevColor = color
          this.update(this.prevColor)

          return null
        }
      },
      this.instance.element
    )

    bindEvent(
      {
        type: 'click',
        identity: { type: 'selector', value: `.${this.classes.HISTORYITEM}` },
        handler: ({ target }) => {
          const el = target.matches(`.${this.classes.HISTORYITEM}`)
            ? target
            : parentWith(
                el => el.matches(`.${this.classes.HISTORYITEM}`),
                target
              )
          const color = getStyle('background-color', el)
          that.instance.setSolid(color)
        }
      },
      this.element
    )
  }

  update(color) {
    this.colors.push(color)
    if (this.count >= 12) {
      this.colors.shift()
    }
    this.$items.forEach((v, i) => {
      setStyle({ backgroundColor: this.colors[this.colors.length - 1 - i] }, v)
    })
    this.count++
  }
}

export default History
