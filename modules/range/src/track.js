import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { appendTo } from '@pluginjs/dom'
import { events as EVENTS } from './constant'

class Track {
  constructor(instance) {
    this.element = appendTo(
      `<span class="${instance.classes.TRACK}"></span>`,
      instance.$control
    )
    this.instance = instance
    this.update()

    bindEvent(
      instance.selfEventName(EVENTS.POINTERUPDATE),
      () => {
        this.update()
      },
      instance.element
    )
  }

  update() {
    const instance = this.instance

    if (instance.options.range) {
      let width = instance.p2.getPercent() - instance.p1.getPercent()
      let left
      if (width >= 0) {
        left = instance.p1.getPercent()
      } else {
        width = -width
        left = instance.p2.getPercent()
      }

      this.updatePosition(left, width)
    } else {
      this.updatePosition(0, instance.p1.getPercent())
    }
  }

  updatePosition(left, width) {
    if (this.instance.options.vertical) {
      setStyle(
        {
          top: `${left}%`,
          height: `${width}%`
        },
        this.element
      )
    } else {
      setStyle(
        {
          left: `${left}%`,
          width: `${width}%`
        },
        this.element
      )
    }
  }
}

export default Track
