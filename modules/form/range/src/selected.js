import { addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, parseHTML } from '@pluginjs/dom'

class selected {
  constructor(instance) {
    this.arrow = parseHTML('<span></span>')
    append(this.arrow, instance.control)
    addClass(instance.classes.SELECTED, this.arrow)
    if (instance.options.isRange === false) {
      bindEvent(
        {
          type: `${instance.plugin}:move`,
          handler: e => {
            const pointer = e.detail
            setStyle(
              {
                left: 0,
                width: `${pointer.getPercent()}%`
              },
              this.arrow
            )
          }
        },
        instance.p1.element
      )
    }

    if (instance.options.isRange === true) {
      const onUpdate = () => {
        let width = instance.p2.getPercent() - instance.p1.getPercent()
        let left
        if (width >= 0) {
          left = instance.p1.getPercent()
        } else {
          width = -width
          left = instance.p2.getPercent()
        }

        setStyle(
          {
            left: `${left}%`,
            width: `${width}%`
          },
          this.arrow
        )
      }

      bindEvent(
        {
          type: `${instance.plugin}:move`,
          handler: onUpdate
        },
        instance.p1.element
      )
      bindEvent(
        {
          type: `${instance.plugin}:move`,
          handler: onUpdate
        },
        instance.p2.element
      )
    }
  }

  static init(instance) {
    return new selected(instance)
  }
}

export default selected
