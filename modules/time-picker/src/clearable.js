import { insertAfter } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'

export default class Clearable {
  constructor(instance) {
    this.element = insertAfter(
      `<i class="${instance.classes.CLEAR}"></i>`,
      instance.element
    )
    addClass(instance.classes.CLEARABLE, instance.$wrap)
    bindEvent(
      instance.eventName('click'),
      () => {
        instance.clear()

        return false
      },
      this.element
    )
  }

  destroy() {
    this.element.remove()
  }
}
