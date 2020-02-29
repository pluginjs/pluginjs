import { appendTo } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'

export default class Clearable {
  constructor(instance) {
    this.element = appendTo(
      `<i class="${instance.classes.CLEAR}"></i>`,
      instance.$trigger
    )
    addClass(instance.classes.CLEARABLE, instance.$wrap)
    bindEvent(
      instance.eventName('mousedown'),
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
