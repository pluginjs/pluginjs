import { appendTo } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'
import { isIE, isIE11 } from '@pluginjs/is'

export default class Clearable {
  constructor(instance) {
    this.element = appendTo(
      `<i class="${instance.classes.CLEAR}"></i>`,
      instance.$trigger
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
