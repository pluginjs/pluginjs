import { query } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle, getStyle, offset } from '@pluginjs/styled'

class Wheel {
  constructor(instance, el) {
    this.instance = instance
    this.$el = el
    this.OFFSET = { x: 0, y: 1 }

    this.init()
  }
  init() {
    this.$handle = query(`.${this.instance.classes.WHEELHANDLE}`, this.$el)
    this.r = parseInt(getStyle('width', this.$el), 10) / 2

    this.bind()
    this.set(90)
  }

  bind() {
    // reset origin
    bindEvent(
      {
        type: this.instance.eventName('colorPicker:switchModule'),
        handler: ({
          detail: {
            data: [module]
          }
        }) => {
          if (module === 'gradient') {
            this.origin = {
              x: offset(this.$el).left + this.r,
              y: offset(this.$el).top + this.r
            }
          }
        }
      },
      this.instance.element
    )

    bindEvent(
      {
        type: this.instance.eventName('mousedown'),
        handler: e => {
          this.update(e)

          bindEvent(
            {
              type: this.instance.eventName('mousemove'),
              // identity: { type: 'dom', value: this.$el },
              handler: e => {
                this.update(e)
              }
            },
            window.document
          )
          bindEvent(
            {
              type: this.instance.eventName('mouseup'),
              handler: () => {
                removeEvent(
                  this.instance.eventName('mousemove'),
                  window.document
                )
                // removeEvent(this.instance.eventName('mouseup'), window.document)
              }
            },
            window.document
          )
        }
      },
      this.$el
    )
  }

  update(e) {
    const _coord = { x: e.pageX, y: e.pageY }

    const coord = this.getVector(_coord)
    const deg = this.getAngle(coord)

    // set wheel default val
    this.set(deg)

    this.instance.trigger('wheelChange', deg)
  }

  getVector(coord) {
    return { x: coord.x - this.origin.x, y: this.origin.y - coord.y }
  }

  getAngle(coord) {
    const _model =
      Math.sqrt(Math.pow(this.OFFSET.x, 2) + Math.pow(this.OFFSET.y, 2)) *
      Math.sqrt(Math.pow(coord.x, 2) + Math.pow(coord.y, 2))
    const _product = this.OFFSET.x * coord.x + this.OFFSET.y * coord.y
    let deg = Math.acos(_product / _model) * (180 / Math.PI)

    if (coord.x < 0) {
      deg = 360 - deg
    }
    return deg
  }

  set(deg) {
    setStyle({ transform: `translate(-50%) rotate(${deg}deg)` }, this.$handle)
  }
}

export default Wheel
