import { bindEvent, removeEvent } from '@pluginjs/events'
import { getStyle, setStyle } from '@pluginjs/styled'
import { parseHTML, append } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'

class Hue {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.$pointer = parseHTML(
      `<i class="${this.instance.classes.POINTER}"></i>`
    )
    this.hue = 0
    this.init()
  }

  init() {
    append(this.$pointer, this.element)
    this.size = parseInt(getStyle('height', this.$pointer), 10) / 2
    this.maxLength = parseInt(getStyle('height', this.element), 10)
    this.bind()
  }

  bind() {
    bindEvent(
      this.instance.eventName('mousedown'),
      e => {
        if (e.which === 2 || e.which === 3) {
          return false
        }
        if (!hasClass(this.instance.classes.POINTER, e.target)) {
          this.move(e.offsetY)
        }

        this.offset = e.pageY - this.size
        const pointerY = parseInt(getStyle('top', this.$pointer), 10)

        bindEvent(
          this.instance.eventNameWithId('mousemove'),
          e => {
            const size = e.pageY - this.offset + pointerY
            this.move(size)
          },
          window.document
        )

        bindEvent(
          this.instance.eventNameWithId('mouseup'),
          () => {
            removeEvent(
              this.instance.eventNameWithId('mousemove'),
              window.document
            )
            // removeEvent('mouseup', window.document)
          },
          window.document
        )

        return null
      },
      this.element
    )

    // global event
    bindEvent(
      this.instance.selfEventName('changeColor'),
      (e, el, data) => {
        this.position(data)
      },
      this.instance.element
    )
  }

  move(size) {
    const position = Math.max(0, Math.min(size, this.maxLength))
    setStyle('top', `${position - this.size}px`, this.$pointer)
    this.hue = (1 - position / this.maxLength) * 360
    this.instance.trigger('hueMove', position - this.size)
    this.update()
  }

  position(color) {
    this.hue = color.value.h
    const position = (1 - this.hue / 360) * this.maxLength - this.size
    setStyle('top', `${position}px`, this.$pointer)
  }

  update() {
    this.instance.setColor({ h: this.hue })

    return null
  }
}

export default Hue
