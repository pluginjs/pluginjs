import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { query } from '@pluginjs/dom'
import { hasClass } from '@pluginjs/classes'

class Marker {
  constructor(instance, el, options) {
    this.$el = el
    this.instance = instance
    this.options = options
    this.color = this.options.color
    this.percent = this.options.percent
    this.index = this.options.index
    this.$wrap = query(`.${this.instance.classes.BAR}`, this.instance.$panel)
    this.$wrap.append(this.$el)


    this.init()
  }

  init() {
    this.wrapSize = parseInt(getStyle('width', this.$wrap), 10)
    this.elSize = parseInt(getStyle('width', this.$el), 10)
    this.maxLenght = this.wrapSize - this.elSize
    
    const offset = this.getOffset()
    setStyle('background', this.color, this.$el)
    setStyle('left', offset, this.$el)

    this.bind()
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('colorChange'),
      (e, el, color) => {
        if (this.instance.is('noSelectedMarker')) {
          return false
        }
        this.update(color)
        return null
      },
      this.instance.element
    )

    bindEvent(
      this.instance.eventName('click'),
      e => {
        const color = getStyle('backgroundColor', e.target)
        this.instance.setGradientColor(color, this.index)
      },
      this.$el
    )
  }

  update(color) {
    if (!hasClass(this.instance.classes.MARKERACTIVE, this.$el)) {
      return false
    }
    this.color = color.toRGBA()
    setStyle('background', this.color, this.instance.$marker)
    return null
  }

  getOffset() {
    this.offset = (this.percent / 100) * this.maxLenght
    return Math.max(0, Math.min(this.maxLenght, this.offset))
  }
  position(percent) {
    this.percent = percent
  }

  destroy() {
    this.$el.remove()
  }
}

export default Marker
