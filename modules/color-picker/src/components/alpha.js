import core from '@pluginjs/pluginjs'
import { hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { parseHTML, append } from '@pluginjs/dom'
import { getStyle, setStyle } from '@pluginjs/styled'

class Alpha {
  constructor(instance, element) {
    this.element = element
    this.instance = instance
    this.$pointer = parseHTML(
      `<i class="${this.instance.classes.POINTER}"></i>`
    )

    this.alpha = null
    this.init()
  }

  init() {
    append(this.$pointer, this.element)
    this.size = parseInt(getStyle('width', this.$pointer), 10) / 2
    this.maxLength = parseInt(getStyle('height', this.element), 10)
    this.bind()
  }

  bind() {
    bindEvent(
      {
        type: 'mousedown',
        handler: e => {
          if (e.which === 2 || e.which === 3) {
            return false
          }
          if (!hasClass(this.instance.classes.POINTER, e.target)) {
            this.move(e.offsetY)
          }

          this.offset = e.pageY - this.size
          const pointerY = parseInt(getStyle('top', this.$pointer), 10)

          bindEvent(
            {
              type: 'mousemove',
              // identity: { type: 'dom', value: this.$pointer },
              handler: e => {
                const size = e.pageY - this.offset + pointerY
                this.move(size)
              }
            },
            core.doc
          )

          bindEvent(
            {
              type: 'mouseup',
              handler: () => {
                removeEvent('mousemove', core.doc)
                // removeEvent('mouseup', core.doc)
              }
            },
            core.doc
          )

          return null
        }
      },
      this.element
    )

    // global event
    bindEvent(
      {
        type: this.instance.eventName('colorPicker:change'),
        handler: ({
          detail: {
            data: [color]
          }
        }) => {
          this.position(color)
        }
      },
      this.instance.element
    )
  }

  move(size) {
    const position = Math.max(0, Math.min(size, this.maxLength))
    setStyle({ top: position - this.size }, this.$pointer)

    this.alpha = (position / this.maxLength).toFixed(2)

    this.instance.trigger('alphaMove', position - this.size)
    this.update()
  }

  position(color) {
    this.alpha = color.value.a
    const position = this.alpha * this.maxLength - this.size

    setStyle({ top: position }, this.$pointer)
  }

  update() {
    this.instance.setSolid({ a: this.alpha })
  }
}

export default Alpha
