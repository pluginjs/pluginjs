import { bindEvent } from '@pluginjs/events'
import { query } from '@pluginjs/dom'
import { getStyle, setStyle } from '@pluginjs/styled'

class Contrast {
  constructor(instance, element) {
    this.instance = instance
    this.element = element

    this.$now = query(`.${this.instance.classes.CONTRASTNOW}`, this.element)
    this.$prev = query(`.${this.instance.classes.CONTRASTPREV}`, this.element)

    this.first = true
    this.now = null
    this.init()
  }

  init() {
    this.bind()
  }

  bind() {
    bindEvent(
      {
        type: 'colorPicker:change',
        handler: ({
          detail: {
            data: [color]
          }
        }) => {
          if (this.instance.is('gradientModule')) {
            return false
          }
          this.now = color.toRGBA()
          this.update()

          return null
        }
      },
      this.instance.element
    )

    bindEvent(
      {
        type: 'colorPicker:update',
        handler: ({
          detail: {
            data: [color]
          }
        }) => {
          if (this.instance.is('gradientModule')) {
            return false
          }

          if (!color) {
            return false
          }

          setStyle('background-color', color, this.$prev)
          return null
        }
      },
      this.instance.element
    )

    // go back prev
    bindEvent(
      {
        type: this.instance.eventName('click'),
        handler: e => {
          const color = getStyle('background-color', e.target)
          this.instance.setSolid(color)
        }
      },
      this.$prev
    )
  }

  update() {
    setStyle('background-color', this.now, this.$now)
  }
}

export default Contrast
