import { parseHTML, append } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle, getStyle } from '@pluginjs/styled'
import { Converter } from '@pluginjs/color'

class Saturation {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.$pointer = parseHTML(
      `<i class="${this.instance.classes.POINTER}"></i>`
    )

    append(this.$pointer, this.element)
    this.size = parseInt(getStyle('width', this.$pointer), 10) / 2

    this.init()
    this.bind()
  }

  init() {
    this.maxLengthX = parseInt(getStyle('width', this.element), 10)
    this.maxLengthY = parseInt(getStyle('height', this.element), 10)
  
    this.width = this.maxLengthX
  }

  bind() {
    let timer
    window.addEventListener('resize', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        timer = null
        if (
          this.width !== parseInt(getStyle('width', this.element), 10) &&
          this.element.offsetParent !== null
        ) {
          this.init()
          this.position( this.instance.COLOR.val(this.instance.color))
        }
      }, 400)
    })

    bindEvent(
      this.instance.eventName('mousedown'),
      e => {
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
          this.instance.eventNameWithId('mousemove'),
          e => {
            const sizeY = e.pageY - this.offsetY + pointerY
            const sizeX = e.pageX - this.offsetX + pointerX
            this.move([sizeX, sizeY])
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
    this.positionX = Math.max(0, Math.min(size[0], this.maxLengthX))
    this.positionY = Math.max(0, Math.min(size[1], this.maxLengthY))

    setStyle(
      {
        top: `${this.positionY - this.size}px`,
        left: `${this.positionX - this.size}px`
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

    setStyle(
      {
        top: `${top}px`,
        left: `${left}px`
      },
      this.$pointer
    )

    setStyle(
      {
        backgroundColor: Converter.HSLtoHEX({
          h: hue,
          s: 1,
          l: 0.5
        })
      },
      this.element
    )
  }

  update() {
    this.instance.setColor({
      s: this.positionX / this.maxLengthX,
      v: 1 - this.positionY / this.maxLengthY
    })
  }
}

export default Saturation
