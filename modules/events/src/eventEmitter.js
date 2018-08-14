import Emitter from '@pluginjs/emitter'

class EventEmitter extends Emitter {
  constructor(element) {
    super()
    this.element = element
    this.element._eventEmitter = this
  }

  static getEventEmitter(element) {
    if (!element._eventEmitter) {
      element._eventEmitter = new this(element)
    }
    return element._eventEmitter
  }
}
export default EventEmitter
