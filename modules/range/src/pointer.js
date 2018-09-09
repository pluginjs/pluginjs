import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, offset as getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { appendTo } from '@pluginjs/dom'
import { events as EVENTS } from './constant'

class Pointer {
  constructor(id, instance, value) {
    this.element = appendTo(
      `<div class="${instance.classes.POINTER} ${
        instance.classes.POINTER
      }-${id}"></div>`,
      instance.$control
    )

    this.id = id
    this.instance = instance
    this.set(value, false)

    this.updatePosition()
  }

  mousedown(event) {
    const { axis, position } = this.instance.direction
    const offset = getOffset(this.instance.$control)

    this.instance.trigger(EVENTS.POINTERMOVESTART, this)

    this.data = {}
    this.data.start = event[axis]
    this.data.position = event[axis] - offset[position]

    const value = this.instance.getValueFromPosition(this.data.position)
    this.set(value)
    this.instance.trigger(EVENTS.POINTERMOVE, this, value)

    this.instance.pointers.forEach(pointer => {
      if (pointer !== this) {
        pointer.deactive()
      } else {
        pointer.active()
      }
    })

    this.mousemove = event => {
      const value = this.instance.getValueFromPosition(
        this.data.position + (event[axis] || this.data.start) - this.data.start
      )
      this.set(value)
      this.instance.trigger(EVENTS.POINTERMOVE, this, value)
      return false
    }

    this.mouseup = () => {
      removeEvent(this.instance.eventNameWithId('mousemove'), window)
      removeEvent(this.instance.eventNameWithId('mouseup'), window)
      removeEvent(this.instance.eventNameWithId('touchmove'), window)
      removeEvent(this.instance.eventNameWithId('touchend'), window)
      this.instance.trigger(EVENTS.POINTERMOVEEND, this)

      this.deactive()
      return false
    }

    bindEvent(
      this.instance.eventNameWithId('touchmove'),
      this.mousemove,
      window
    )
    bindEvent(
      this.instance.eventNameWithId('mousemove'),
      this.mousemove,
      window
    )
    bindEvent(this.instance.eventNameWithId('touchend'), this.mouseup, window)
    bindEvent(this.instance.eventNameWithId('mouseup'), this.mouseup, window)
  }

  updatePosition() {
    setStyle(
      this.instance.direction.position,
      `${this.getPercent()}%`,
      this.element
    )
  }

  matchStep(value) {
    const step = this.instance.step
    const decimal = step.toString().split('.')[1]

    value = Math.round(value / step) * step

    if (decimal) {
      value = value.toFixed(decimal.length)
    }

    return parseFloat(value, 10)
  }

  matchLimit(value) {
    let left
    let right
    const instance = this.instance

    if (this.id === 1) {
      left = instance.min
      right = instance.p2.value
    } else {
      left = instance.p1.value
      right = instance.max
    }

    if (value <= left) {
      value = left
    }
    if (value >= right) {
      value = right
    }
    return value
  }

  getPercent() {
    return ((this.value - this.instance.min) / this.instance.interval) * 100
  }

  set(value, update = true) {
    const { min, max, step, options } = this.instance

    if (value > max) {
      value = max
    } else if (value < min) {
      value = min
    }

    if (step) {
      value = this.matchStep(value)
    }

    if (options.range && options.limit && this.instance.p2) {
      value = this.matchLimit(value)
    }

    this.value = value

    this.updatePosition()

    if (update) {
      this.instance.trigger(EVENTS.POINTERUPDATE, this, value)
    }
  }

  get() {
    return this.value
  }

  active() {
    addClass(this.instance.classes.POINTERACTIVE, this.element)
    this.instance.trigger(EVENTS.POINTERACTIVE, this)
  }

  deactive() {
    removeClass(this.instance.classes.POINTERACTIVE, this.element)
    this.instance.trigger(EVENTS.POINTERDEACTIVE, this)
  }

  destroy() {
    removeEvent(this.instance.eventNameWithId(), window)
    this.element.remove()
  }
}

export default Pointer
