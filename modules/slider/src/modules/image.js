import { bindEvent } from '@pluginjs/events'
import Base from './base'

class Image extends Base {
  constructor(instance, data, loader) {
    super(instance, data, loader)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('image')
    this.element.src = this.data.src

    bindEvent(
      this.instance.eventName('mousedown'),
      event => {
        event.preventDefault()
      },
      this.element
    )

    this.load(this.element)
  }

  loadHandler(target) {
    this.loaded(target)
  }

  errorHandler(target) {
    return target
  }
}

export default Image
