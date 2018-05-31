import { bindEvent } from '@pluginjs/events'

class Hex {
  constructor(instance, element) {
    this.instance = instance
    this.element = element

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
          this.element.value = color.toHEX()
        }
      },
      this.instance.element
    )

    bindEvent(
      {
        type: this.instance.eventName('change'),
        handler: ({ target }) => {
          const color = target.value
          this.update(color)
        }
      },
      this.element
    )
  }

  update(value) {
    if (this.instance.asColor.isValid(value)) {
      this.instance.setSolid(value)
    }
  }
}

export default Hex
