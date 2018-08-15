import { append } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'

class Overlay {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.element = this.instance.getElement('overlay')

    append(this.element, this.instance.container)

    this.bind()
  }

  bind() {
    bindEvent(
      this.instance.eventName('click'),
      event => {
        event.preventDefault()

        this.instance.hide()
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.instance.eventName('click'), this.element)
  }
}

export default Overlay
