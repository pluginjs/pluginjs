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
          // identity: this.$pointer,
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
    console.log(this.instance.element)
    // global event
    bindEvent(
      this.instance.selfEventName('change'),
      (e, el, data, D) => {
        console.log(D)
        console.log(1)
        this.position(data)
      },
      this.instance.element
    )
  }

  move(size) {
    const position = Math.max(0, Math.min(size, this.maxLength))
    setStyle('top', position - this.size, this.$pointer)

    this.alpha = (position / this.maxLength).toFixed(2)

    this.instance.trigger('alphaMove', position - this.size)
    this.update()
  }

  position(color) {
    this.alpha = color.value.a
    const position = this.alpha * this.maxLength - this.size

    setStyle('top', position, this.$pointer)
  }

  update() {
    this.instance.setSolid({ a: this.alpha })
  }
}

export default Alpha
