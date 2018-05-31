import core from '@pluginjs/pluginjs'
import { parseHTML } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle, getStyle } from '@pluginjs/styled'

class Saturation {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.$pointer = parseHTML(
      `<i class="${this.instance.classes.POINTER}"></i>`
    )

    this.init()
  }

  init() {
    this.element.append(this.$pointer)

    this.size = parseInt(getStyle('width', this.$pointer), 10) / 2
    this.maxLengthX = parseInt(getStyle('width', this.element), 10)
    this.maxLengthY = parseInt(getStyle('height', this.element), 10)
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
            this.move([e.offsetX, e.offsetY])
          }
          this.offsetY = e.pageY - this.size
          this.offsetX = e.pageX - this.size
          const pointerY = parseInt(getStyle('top', this.$pointer), 10)
          const pointerX = parseInt(getStyle('left', this.$pointer), 10)

          bindEvent(
            {
              type: 'mousemove',
              // value: { type: 'dom', value: this.$pointer },
              handler: e => {
                const sizeY = e.pageY - this.offsetY + pointerY
                const sizeX = e.pageX - this.offsetX + pointerX
                this.move([sizeX, sizeY])
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
    this.positionX = Math.max(0, Math.min(size[0], this.maxLengthX))
    this.positionY = Math.max(0, Math.min(size[1], this.maxLengthY))

    setStyle(
      {
        top: this.positionY - this.size,
        left: this.positionX - this.size
      },
      this.$pointer
    )

    this.instance.trigger('saturationMove', [
      this.positionX - this.size,
      this.positionY - this.size
    ])
    this.update()
  }

  position(color) {
    const left = color.value.s * this.maxLengthX - this.size
    const top = (1 - color.value.v) * this.maxLengthY - this.size
    const hue = color.value.h

    this.hue = color.value.h

    setStyle({ top, left }, this.$pointer)

    setStyle(
      {
        backgroundColor: core.color.HSLtoHEX({
          h: hue,
          s: 1,
          l: 0.5
        })
      },
      this.element
    )
  }

  update() {
    this.instance.setSolid({
      s: this.positionX / this.maxLengthX,
      v: 1 - this.positionY / this.maxLengthY
    })
  }
}

export default Saturation
