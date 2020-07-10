import { insertAfter } from '@pluginjs/dom'
import { isIE, isIE11 } from '@pluginjs/is'
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
    if(isIE() || isIE11()) {
      this.element.removeNode(true);
    } else {
      this.element.remove()
    }
  }
}
